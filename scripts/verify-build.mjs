import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, sep, dirname } from 'node:path';
import assert from 'node:assert/strict';
import { deployment } from '../deployment.config.mjs';
const root = resolve('docs');
const base = deployment.base.replace(/\/$/, '');
const files = readdirSync(root, { recursive: true }).filter((f) =>
  f.endsWith('.html'),
);
let links = 0;
for (const file of files) {
  const html = readFileSync(join(root, file), 'utf8');
  assert.ok(
    !html.includes('青岚'),
    `${file}: removed brand must not appear in published pages`,
  );
  assert.ok(html.includes('韦@舀'), `${file}: current author name must appear`);
  assert.ok(
    html.includes('images/table-tennis-logo.webp'),
    `${file}: supplied paddle logo must appear`,
  );
  assert.ok(
    html.includes('favicon.png'),
    `${file}: favicon must use paddle image`,
  );
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (/^(?:[a-z]+:|#|\/\/)/i.test(raw)) continue;
    assert.ok(!raw.startsWith('/'), `${file}: path must be relative: ${raw}`);
    const pathname = decodeURIComponent(raw.split(/[?#]/)[0]);
    const target = resolve(root, dirname(file), pathname);
    assert.ok(
      target.startsWith(root + sep) || target === root,
      'Path must stay inside docs',
    );
    assert.ok(existsSync(target), `${file}: missing ${raw}`);
    if (statSync(target).isDirectory())
      assert.ok(
        existsSync(join(target, 'index.html')),
        `Missing index: ${raw}`,
      );
    links++;
  }
}
assert.ok(
  existsSync(join(root, '.nojekyll')),
  'Pages must serve underscore assets',
);
const index = JSON.parse(readFileSync(join(root, 'search.json'), 'utf8'));
assert.ok(index.length >= 1, 'Search index should contain published posts');
for (const post of index) assert.ok(post.url.startsWith(`${base}/posts/`));
const rssXml = readFileSync(join(root, 'rss.xml'), 'utf8');
const rssHome = rssXml.match(/<link>([^<]+)<\/link>/)?.[1];
assert.equal(
  new URL(rssHome).pathname,
  `${base}/`,
  'RSS channel homepage must include project base',
);
if (base)
  assert.ok(
    !rssXml.includes(`${base}${base}/`),
    'RSS base must not be doubled',
  );
assert.ok(
  readFileSync(join(root, 'rss.xml'), 'utf8').includes(`${base}/posts/`),
  'RSS must include base path',
);
assert.ok(
  readFileSync(join(root, 'sitemap-0.xml'), 'utf8').includes(`${base}/`),
  'Sitemap must include base path',
);
console.log(
  `Verified ${files.length} HTML pages, ${links} local links/assets, RSS, sitemap, search index and .nojekyll.`,
);
