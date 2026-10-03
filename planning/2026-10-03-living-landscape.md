# Living lake and drifting clouds

User requested independently moving water, boat and clouds rather than a static landscape image.

Added a code-authored SVG lake layer that replaces the baked-in still water/boat region. Independent ripples stretch and drift, water highlights shimmer, and a separate boat travels slowly across the lake while bobbing. The oar rotates, concentric wake lines dissipate and the reflection changes. Three cloud banks travel at different speeds and directions over the mountain and lake. Existing foreground bamboo and text remain separate layers. All decorative layers ignore pointer input and honor reduced motion and background-tab pausing.

Verification: six scene elements change transforms over 700ms without mouse input; mobile fits the viewport; reduced-motion stops scene animations. Desktop/mobile screenshots inspected, mobile boat shifted away from foreground branches. Astro check zero diagnostics; four tests and 607 links/assets pass. Existing 3D depth checks retained.
