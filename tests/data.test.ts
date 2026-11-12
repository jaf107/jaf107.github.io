// Guards the content files: a typo in src/data/*.json should fail CI, not ship a broken page.
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import profile from '../src/data/profile.json';
import projects from '../src/data/projects.json';
import publications from '../src/data/publications.json';

const publicFile = (path: string) => new URL(`../public${path}`, import.meta.url);

// Every site-relative path ("/assets/...", "/papers/...") mentioned anywhere in the data files.
const dataFiles = ['projects', 'publications', 'research', 'news', 'awards', 'jobs', 'education', 'skills'];
const localPaths = dataFiles.flatMap((name) => {
  const text = readFileSync(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8');
  return [...text.matchAll(/"(\/(?:assets|papers)\/[^"]+)"/g)].map((m) => ({ file: name, path: m[1] }));
});

// ISO 7064 Mod 11-2, the check digit ORCID uses.
function isValidOrcid(id: string): boolean {
  if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(id)) { return false; }
  const digits = id.replace(/-/g, '');
  let total = 0;
  for (const d of digits.slice(0, -1)) { total = (total + Number(d)) * 2; }
  const result = (12 - (total % 11)) % 11;
  return digits.at(-1) === (result === 10 ? 'X' : String(result));
}

// Reads pixel dimensions from a PNG or WebP header.
function imageSize(file: URL): { width: number; height: number } {
  const b = readFileSync(file);
  if (b.toString('ascii', 1, 4) === 'PNG') {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8X') { return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 }; }
    if (chunk === 'VP8L') {
      const bits = b.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8 ') { return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }; }
  }
  throw new Error(`unsupported image format: ${file.pathname}`);
}

const figures = projects.flatMap((p) =>
  p.sections.flatMap((s) => ('figures' in s && s.figures ? s.figures : []))
);

describe('projects.json', () => {
  it('has unique, URL-safe ids', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) { expect(id).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/); }
  });

  it.each(projects.map((p) => [p.id, p] as const))('%s has the fields its page needs', (_, p) => {
    for (const key of ['title', 'subtitle', 'category', 'year', 'summary'] as const) {
      expect(p[key], key).toBeTruthy();
    }
    expect(Array.isArray(p.sections)).toBe(true);
    expect(Array.isArray(p.links)).toBe(true);
  });
});

describe('publications.json', () => {
  it.each(publications.map((p) => [p.id, p] as const))('%s has a title, authors and a valid DOI', (_, p) => {
    expect(p.title).toBeTruthy();
    expect(p.authors).toContain(profile.name);
    if (p.doi) {expect(p.doi).toMatch(/^10\.\d{4,9}\/\S+$/);}
  });
});

describe('local files referenced from data', () => {
  it.each(localPaths.map(({ file, path }) => [path, file]))('%s (from %s.json) exists in public/', (path) => {
    expect(existsSync(publicFile(path))).toBe(true);
  });
});

describe('project figures', () => {
  // The width/height reserve space before lazy images load; wrong values distort or shift the page.
  it.each(figures.map((f) => [f.src, f] as const))('%s declares its real size', (src, f) => {
    expect(imageSize(publicFile(src))).toEqual({ width: f.width, height: f.height });
  });
});

describe('profile.json', () => {
  it('has a well-formed ORCID iD that matches its link', () => {
    expect(isValidOrcid(profile.orcidId)).toBe(true);
    expect(profile.links.orcid).toBe(`https://orcid.org/${profile.orcidId}`);
  });
});
