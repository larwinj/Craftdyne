/**
 * Post-build step: emit robots.txt and a sitemap with hreflang alternates.
 *
 * Generated rather than hand-maintained so that adding a page to ROUTE_PATHS or
 * a language to LOCALES updates the sitemap automatically — a hand-written one
 * drifts out of date the first time someone forgets.
 */
import { readdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { LOCALES, ROUTE_PATHS, SITE_URL, DEFAULT_LOCALE } from '../app/config/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'build', 'client');

const url = (lang, path) => new URL(path ? `/${lang}/${path}` : `/${lang}`, SITE_URL).toString();

/** Pages that should rank; legal pages are indexable but low priority. */
const priorityFor = (path) => {
  if (path === '') return '1.0';
  if (path.startsWith('products')) return '0.9';
  if (path === 'privacy' || path === 'terms') return '0.3';
  return '0.8';
};

const entries = ROUTE_PATHS.flatMap((path) =>
  LOCALES.map((lang) => {
    const alternates = [
      ...LOCALES.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${url(code, path)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url(DEFAULT_LOCALE, path)}"/>`,
    ].join('\n');

    return `  <url>
    <loc>${url(lang, path)}</loc>
${alternates}
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`;
  }),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', SITE_URL).toString()}
`;

await writeFile(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(outDir, 'robots.txt'), robots, 'utf8');

// Guard against a silent SSG regression: if the prerenderer ever falls back to
// shipping an empty shell, every page would still "build" but contain nothing.
const sample = join(outDir, 'en', 'index.html');
const { readFile } = await import('node:fs/promises');
const html = await readFile(sample, 'utf8');
if (!html.includes('Green Chemistry for Sustainable Agriculture')) {
  console.error('\n✗ Prerender check FAILED: build/client/en/index.html has no rendered content.');
  process.exit(1);
}

const pageCount = (await readdir(outDir, { recursive: true })).filter((f) => f.endsWith('index.html')).length;
console.log(`✓ sitemap.xml (${entries.length} URLs), robots.txt`);
console.log(`✓ prerender check passed — ${pageCount} HTML pages`);
