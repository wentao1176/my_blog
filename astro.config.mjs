import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { deployment } from './deployment.config.mjs';
export default defineConfig({
  ...deployment,
  outDir: './docs',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
