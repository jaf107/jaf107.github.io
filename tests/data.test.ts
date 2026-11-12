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

describe('profile.json', () => {
  it('has a well-formed ORCID iD that matches its link', () => {
    expect(isValidOrcid(profile.orcidId)).toBe(true);
    expect(profile.links.orcid).toBe(`https://orcid.org/${profile.orcidId}`);
  });
});
