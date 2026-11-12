// Runs axe-core (WCAG 2.2 A/AA rules) against every page of the built site, in light and
// dark themes, and fails on any violation. Run after `pnpm build`.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { AxeBuilder } from '@axe-core/playwright';
import { chromium } from 'playwright';

const PORT = 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

// Every page in the sitemap, plus the not-found page.
const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
paths.push('/?/no-such-page');

const server = spawn('pnpm', ['exec', 'vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
  stdio: 'inherit',
});
const serverExited = new Promise((_, reject) => {
  server.on('exit', (code) => reject(new Error(`vite preview exited with code ${code}`)));
});
// Wait until the preview server answers (up to 30 s).
async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      if ((await fetch(BASE)).ok) { return; }
    } catch { /* not listening yet */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('vite preview did not start');
}
await Promise.race([waitForServer(), serverExited]);

let failures = 0;
// CHROMIUM_PATH lets a machine with its own Chromium skip `playwright install`.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
try {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addInitScript((t) => localStorage.setItem('ajs-theme', t), theme);
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(BASE + path, { waitUntil: 'networkidle' });
      // Scroll reveals hide content until it enters the viewport: show everything, with
      // transitions off so contrast is measured on final colors, not mid-fade.
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; }' });
      await page.evaluate(() => document.documentElement.classList.remove('js'));
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      for (const v of violations) {
        failures += 1;
        console.error(`✗ ${path} [${theme}] ${v.id} (${v.impact}): ${v.help}`);
        for (const node of v.nodes.slice(0, 3)) {
          console.error(`    ${node.target.join(' ')}: ${node.failureSummary?.split('\n').slice(1).join(' ').trim()}`);
        }
      }
      if (violations.length === 0) { console.log(`✓ ${path} [${theme}]`); }
    }
    await context.close();
  }
} finally {
  await browser.close();
  server.kill();
}

if (failures > 0) {
  console.error(`a11y: ${failures} violation(s)`);
  process.exit(1);
}
console.log(`a11y: no violations on ${paths.length} pages in light and dark themes`);
