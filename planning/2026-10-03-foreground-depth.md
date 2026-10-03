# Foreground landscape depth

User asked for branches that appear to extend out of the landscape. The previous flat-image translation was insufficient.

Added original inline SVG bamboo with stem highlights, leaf shading and cast shadows. Separate near and distant branches occupy positive Z positions inside a perspective scene; the near branch crosses the landscape's lower boundary. Leaf sprays sway independently, bamboo changes its 3D angle autonomously, pointer movement tilts the foreground more strongly than the background, and scroll progress moves near/far layers at different rates. Text stays on its existing plane. Foreground is decorative, noninteractive, and reduced-motion uses a static composition.

Verified desktop and 390px mobile screenshots. Browser checks confirm positive foreground depth, pointer tilt, autonomous leaves, scroll depth, no mobile overflow and reduced-motion. Existing unfold and stationary-edge checks pass; Astro check has zero diagnostics and all 607 local links/assets pass.

Independent review requested extreme-pointer overflow checks. Reproduced 7–23px horizontal overflow, then clipped only the foreground scene's horizontal axis, keeping vertical projection visible. Rechecked 1440, 768, 390 and 320px after transitions settle: document width equals viewport at each size. No other important review findings.
