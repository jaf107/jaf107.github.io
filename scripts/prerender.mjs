// Runs after the client and SSR builds. For every route (the home page and each
// project page) it writes server-rendered HTML with that page's own title,
// description, canonical URL and social tags, so crawlers and link previews
// that don't execute JS still see real content. It also writes sitemap.xml and
// adds JSON-LD (Person + ScholarlyArticle) to the home page.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));

const profile = readJson('src/data/profile.json');
const projects = readJson('src/data/projects.json');
const publications = readJson('src/data/publications.json');
const { render } = await import(new URL('dist-server/entry-server.js', root));

const SITE = profile.siteUrl.replace(/\/$/, '');
const template = readFileSync(new URL('dist/index.html', root), 'utf8');

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Replaces the content of a tag in the template; fails the build if the tag is missing,
// so a template edit can't silently drop a page's metadata.
function replaceOnce(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender: ${what} not found in dist/index.html`);
  return html.replace(pattern, replacement);
}

function setMeta(html, { title, description, url, type }) {
  const t = escapeAttr(title);
  const d = escapeAttr(description);
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>');
  html = replaceOnce(html, /(<meta name="description" content=")[^"]*/, `$1${d}`, 'meta description');
  html = replaceOnce(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`, 'canonical link');
  html = replaceOnce(html, /(<meta property="og:title" content=")[^"]*/, `$1${t}`, 'og:title');
  html = replaceOnce(html, /(<meta property="og:description" content=")[^"]*/, `$1${d}`, 'og:description');
  html = replaceOnce(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`, 'og:url');
  html = replaceOnce(html, /(<meta property="og:type" content=")[^"]*/, `$1${type}`, 'og:type');
  html = replaceOnce(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${t}`, 'twitter:title');
  html = replaceOnce(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${d}`, 'twitter:description');
  return html;
}

function injectBody(html, route) {
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) throw new Error('prerender: could not find root marker in dist/index.html');
  return html.replace(marker, `<div id="root">${render(route)}</div>`);
}

function injectHead(html, extra) {
  return html.replace('</head>', `${extra}\n  </head>`);
}

// JSON-LD for the home page. "<" is escaped so data can never close the script tag.
function jsonLd(data) {
  return `    <script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

const sameAs = Object.values(profile.links);
const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: profile.name,
  url: `${SITE}/`,
  image: `${SITE}/assets/portrait.webp`,
  jobTitle: profile.jobTitle,
  affiliation: { '@type': 'CollegeOrUniversity', name: profile.affiliation },
  alumniOf: { '@type': 'CollegeOrUniversity', name: profile.affiliation },
  worksFor: { '@type': 'Organization', name: profile.employer },
  identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: profile.orcidId },
  sameAs,
};
const articles = publications.map((p) => ({
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: p.title,
  name: p.title,
  datePublished: p.year,
  author: p.authors.split(',').map((name) => name.trim()).map((name) =>
    name === profile.name ? { '@id': `${SITE}/#person` } : { '@type': 'Person', name }
  ),
  ...(p.doi && {
    url: `https://doi.org/${p.doi}`,
    identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: p.doi },
  }),
}));
const identityLinks = sameAs.map((href) => `    <link rel="me" href="${escapeAttr(href)}" />`).join('\n');

const pages = [];

// Home page: keeps the default metadata from index.html.
{
  let html = injectBody(template, '/');
  html = injectHead(html, [identityLinks, jsonLd(person), ...articles.map(jsonLd)].join('\n'));
  writeFileSync(new URL('dist/index.html', root), html);
  pages.push('/');
}

// Project pages: dist/project/<id>/index.html, served by GitHub Pages at /project/<id>/.
for (const p of projects) {
  const path = `/project/${p.id}/`;
  let html = setMeta(template, {
    title: `${p.title}: ${p.subtitle} · ${profile.name}`,
    description: p.summary,
    url: `${SITE}${path}`,
    type: 'article',
  });
  html = injectBody(html, `/project/${p.id}`);
  const dir = new URL(`dist${path}`, root);
  mkdirSync(dir, { recursive: true });
  writeFileSync(new URL('index.html', dir), html);
  pages.push(path);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${SITE}${path}</loc></url>`).join('\n')}
</urlset>
`;
writeFileSync(new URL('dist/sitemap.xml', root), sitemap);

rmSync(new URL('dist-server', root), { recursive: true, force: true });
console.log(`prerender: wrote ${pages.length} pages and sitemap.xml (${pages.join(', ')})`);
