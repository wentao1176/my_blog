# Paddle, motion and portable deployment verification

- Replaced the brand glyph, profile artwork and favicon with the supplied paddle image. Added autonomous landscape, mist, particles and paddle motion, with repeatable viewport unfold effects and new-page introductions.
- Review found a viewport-edge animation loop. Reproduced a failing stationary-edge browser check; fixed exit detection to use layout coordinates; regression now passes.
- Live diagnosis: xuanwentao.cn redirects to www.xuanwentao.cn. Homepage responded 200, but /my_blog/_astro/Layout.Cml7YxLc.css responded 404. Root deployment was still using project-base asset paths.
- User requested relative paths. Production build now converts page resource and navigation URLs relative to each HTML directory. Canonical, RSS and sitemap URLs use www.xuanwentao.cn. public/CNAME preserves the existing custom domain on rebuild.
- Verification: four unit tests pass; Astro check has zero errors, warnings or hints; 25 pages and 607 local links/assets verified. Browser smoke checks pass for autonomous movement, scroll replay, new pages, reduced motion, viewport-edge stability, mobile, enlarged text and no-JavaScript content. Homepage, nested article and Chinese tag pages render with loaded styles and images at both / and /docs/ without failed requests.
- Optional browser checks: with the production preview on port 4321 and a workspace static server on port 4322, run each tests/browser/*.smoke.js using playwright-cli run-code --filename. These files are callback expressions for the CLI.
