import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: process.env.SITE_URL || 'https://wentao1176.github.io',
  base: process.env.BASE_PATH || '/my_blog',
  outDir: './docs',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
