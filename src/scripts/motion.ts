// Decorative interactions only; content and navigation remain available without JS.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const hero = document.querySelector<HTMLElement>('.hero');
const tiltSurfaces = [
  ...document.querySelectorAll<HTMLElement>(
    '.post-card, .profile-panel, .project-card, .music-room',
  ),
];

function setupPointerMotion(surface: HTMLElement, heroMode = false) {
  let frame = 0;
  let x = 0,
    y = 0;
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    surface.style.setProperty('--pointer-x', '0');
    surface.style.setProperty('--pointer-y', '0');
    surface.style.removeProperty('--glow-x');
    surface.style.removeProperty('--glow-y');
    surface.classList.remove('is-tilting');
  };
  surface.addEventListener(
    'pointermove',
    (event) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const bounds = surface.getBoundingClientRect();
      x = Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1),
      );
      y = Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1),
      );
      if (frame) return;
      frame = requestAnimationFrame(() => {
        surface.style.setProperty('--pointer-x', x.toFixed(3));
        surface.style.setProperty('--pointer-y', y.toFixed(3));
        surface.style.setProperty('--glow-x', `${(x + 1) * 50}%`);
        surface.style.setProperty('--glow-y', `${(y + 1) * 50}%`);
        if (!heroMode) surface.classList.add('is-tilting');
        frame = 0;
      });
    },
    { passive: true },
  );
  surface.addEventListener('pointerleave', reset);
  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
}
if (hero) setupPointerMotion(hero, true);
tiltSurfaces.forEach((surface) => setupPointerMotion(surface));

// One-shot, short entrance animation; never conceal content before JS loads.
const revealNodes = [
  ...document.querySelectorAll<HTMLElement>(
    '.post-card, .profile-panel, .side-section, .closing-note, .page-intro',
  ),
];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!reducedMotion.matches) {
          const element = entry.target as HTMLElement;
          element.animate(
            [
              { opacity: 0.35, translate: '0 18px' },
              { opacity: 1, translate: '0 0' },
            ],
            { duration: 650, easing: 'cubic-bezier(.2,.7,.3,1)' },
          );
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  revealNodes.forEach((element) => observer.observe(element));
}
