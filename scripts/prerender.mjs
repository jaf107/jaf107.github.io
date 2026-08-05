// Injects server-rendered home-page HTML into dist/index.html after the client
// build, so crawlers and link previews that don't execute JS still see content.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';

const { render } = await import(new URL('../dist-server/entry-server.js', import.meta.url));

const html = render('/');
const indexPath = new URL('../dist/index.html', import.meta.url);
const template = readFileSync(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error('prerender: could not find root marker in dist/index.html');
}
writeFileSync(indexPath, template.replace(marker, `<div id="root">${html}</div>`));
rmSync(new URL('../dist-server', import.meta.url), { recursive: true, force: true });
console.log(`prerender: injected ${html.length} chars into dist/index.html`);
