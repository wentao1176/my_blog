# Qinglan Blog Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. User explicitly requests autonomous delivery without confirmation.

**Goal:** Deliver a polished Chinese personal blog and push verified source to wentao1176/my_blog.
**Architecture:** Astro static routes, validated Markdown collection, shared layouts and small browser interaction modules. GitHub Pages is the selected delivery target; no separate Sites deployment is needed.
**Tech Stack:** Astro, TypeScript, Node test runner, CSS.
**Spec:** ../specs/2026-10-02-qinglan-blog-design.md

## Global Constraints

- Brand: 青岚 · Wentao; icy blue, ivory, restrained Chinese landscape and flute details.
- Do not infer biography, publish drafts, autoplay audio, or fake playback.
- Centralize base paths and configuration; preserve source and lockfile.

## Review Focus

- GitHub Pages /my_blog/ paths resolve for every route and asset.
- Draft content never appears in public feeds or indexes.
- Chinese search, empty results and category combinations behave consistently.
- Mobile navigation and 200% text size do not hide controls.
- Optional audio/comment integrations handle absent configuration without broken controls.

## Task 1 — Content and route foundations

Files: package.json, astro.config.mjs, tsconfig.json, src/content.config.ts, src/config.ts, src/lib/content.mjs, tests/content.test.mjs, src/content/posts/*.md.
Interfaces: withBase(path, base) returns URL path; published(posts) returns descending published entries; matchesPost(post, query, category) returns boolean.

- [ ] Write tests for subpath normalization, draft exclusion, descending dates, Chinese search and category intersection.
- [ ] Run `npm test`; expect assertion failures from stub behavior before implementing.
- [ ] Implement helpers, schema and sample content; install Astro, @astrojs/check, TypeScript, @astrojs/rss, @astrojs/sitemap.
- [ ] Run `npm test`; expect all passing. Commit foundations.

## Task 2 — Visual pages and interactions

Files: src/layouts/Layout.astro, src/components/_.astro, src/styles/global.css, src/pages/\**/_.astro, src/scripts/_.ts, public/images/_.

- [ ] Build shared navigation, footer, hero, article cards and curated sidebar.
- [ ] Implement home, filtered articles, detail/TOC/adjacent navigation, taxonomy, archive, projects, about, friends, music, 404.
- [ ] Add keyboard accessible theme/menu/search controls, copy-code feedback and optional music/comment settings.
- [ ] Run `npm run check` and `npm run build`; expect zero diagnostics and generated pages. Commit interface.

## Task 3 — Delivery and browser verification

Files: src/pages/rss.xml.ts, src/pages/search.json.ts, public/robots.txt, .github/workflows/deploy.yml, README.md, docs/ASSETS.md, docs/INTEGRATIONS.md.

- [ ] Generate RSS and sitemap using canonical base-aware URLs; record source attribution and content editing instructions.
- [ ] Add Pages workflow with build and deployment jobs. Workflow uses least required permissions and lockfile installs.
- [ ] Run full tests, type check, production build. Launch preview and inspect desktop/mobile with real browser; exercise search, article, menu, theme and music states.
- [ ] Review final code independently, resolve important findings and repeat relevant verification.
- [ ] Merge completed feature branch into main, push normally, verify remote commit matches local. Report source upload separately from online deployment status.
