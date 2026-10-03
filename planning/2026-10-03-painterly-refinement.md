# Restore painterly detail while retaining motion

The opaque procedural lake and geometric foreground reduced the fine detail of the original watercolor. Removed the flat water fill. Prepared a non-destructive clean landscape plate that removes only the static boat and its reflection, preserving the pavilion, mountains, watercolor paper texture and detailed lake reflections.

New alpha cutouts for the sampan and bamboo use the same watercolor treatment. They replace the previous SVG boat and foreground geometry, retaining autonomous drift/bob, a mirrored boat reflection, perspective and pointer/scroll depth. Reduced the visual weight of mist, ripples and branches. A masked copy of the original lake texture shifts very slightly to animate the actual reflections without covering them with a color block.

Built-in image generation was used for three assets. Source files remain under the Codex generated_images directory; project exports are public/images/mist-landscape-living.webp (2172x724), watercolor-boat.webp (480x103, alpha), watercolor-bamboo.webp (700x726, alpha). Original mist-landscape.webp retained for article covers. Deterministic Sharp trim/resize/WebP export preserves transparency.

Validation includes the boat's rendered slender aspect ratio, automatic transform changes, reduced motion, desktop/mobile screenshots, 3D motion and overflow checks, Astro diagnostics and built asset links.
