import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join, sep } from 'node:path';
import assert from 'node:assert/strict';
const root = resolve('docs');
const base = process.env.BASE_PATH || '/my_blog';
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
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (!raw.startsWith('/')) continue;
    assert.ok(raw.startsWith(`${base}/`), `${file}: missing base in ${raw}`);
    const pathname = decodeURIComponent(
      raw.split(/[?#]/)[0].slice(base.length),
    );
    const target = resolve(root, '.' + pathname);
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
assert.ok(!rssXml.includes(`${base}${base}/`), 'RSS base must not be doubled');
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
