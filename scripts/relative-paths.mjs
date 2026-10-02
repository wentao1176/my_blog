import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { deployment } from '../deployment.config.mjs';

const base = deployment.base.replace(/\/$/, '');
for (const file of readdirSync('docs', { recursive: true })) {
  if (!file.endsWith('.html')) continue;
  const path = join('docs', file);
  const directory = dirname(file).replaceAll('\\', '/');
  const html = readFileSync(path, 'utf8').replace(
    /\b(href|src)="(\/[^"\s]*)"/g,
    (match, attribute, value) => {
      if (value.startsWith('//') || !value.startsWith(`${base}/`)) return match;
      const [, pathname, suffix = ''] = value.match(/^([^?#]*)(.*)$/);
      const target = decodeURIComponent(pathname.slice(base.length + 1));
      let relative = posix.relative(directory, target) || '.';
      relative = relative
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/');
      if (pathname.endsWith('/')) relative += '/';
      return `${attribute}="${relative}${suffix}"`;
    },
  );
  writeFileSync(path, html);
}
console.log('Converted page assets and navigation to relative paths.');
