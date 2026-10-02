// Runtime-only animations: no CSS ever hides content while waiting for JavaScript.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Map<HTMLElement, Animation>();
const visible = new Set<HTMLElement>();
const targets = [
  ...document.querySelectorAll<HTMLElement>(
    '.section-heading, .post-card, .profile-panel, .side-section, .quote-panel, .closing-note, .page-intro, .article-header, .prose > *, .adjacent-posts, .archive-year, .large-tag-cloud > a, .category-list > a, .about-portrait, .project-card, .empty-state, .music-room, .music-reading, .friend-card, .site-footer',
  ),
];

function unfold(element: HTMLElement, delay = 0, introductory = false) {
  if (
    preference.matches ||
    document.hidden ||
    element.contains(document.activeElement)
  )
    return;
  running.get(element)?.cancel();
  const animation = element.animate(
    [
      {
        opacity: 0.12,
        clipPath: 'inset(0 0 85% 0 round 6px)',
        translate: introductory ? '0 32px' : '0 38px',
        rotate: 'x 7deg',
      },
      {
        opacity: 1,
        clipPath: 'inset(0 0 0% 0 round 0px)',
        translate: '0 0',
        rotate: 'x 0deg',
      },
    ],
    {
      duration: introductory ? 1050 : 900,
      delay,
      easing: 'cubic-bezier(.16,1,.3,1)',
      fill: 'backwards',
    },
  );
  running.set(element, animation);
  const clear = () => {
    if (running.get(element) === animation) running.delete(element);
  };
  animation.addEventListener('finish', clear, { once: true });
  animation.addEventListener('cancel', clear, { once: true });
}

function intro() {
  const sections = [
    ...document.querySelectorAll<HTMLElement>('.hero-copy > *'),
  ];
  sections.forEach((element, index) => unfold(element, index * 120, true));
}

// Observer rectangles include the animation's translation. Only reset a reveal
// when its original layout position actually leaves the viewport.
function hasLeftViewport(element: HTMLElement) {
  let layoutTop = 0;
  let ancestor: HTMLElement | null = element;
  while (ancestor) {
    layoutTop += ancestor.offsetTop;
    ancestor = ancestor.offsetParent as HTMLElement | null;
  }
  const top = layoutTop - window.scrollY;
  return top + element.offsetHeight <= 0 || top >= innerHeight - 16;
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        if (!entry.isIntersecting && hasLeftViewport(element)) {
          visible.delete(element);
          running.get(element)?.cancel();
        } else if (entry.intersectionRatio >= 0.08 && !visible.has(element)) {
          visible.add(element);
          const siblingIndex = element.parentElement
            ? [...element.parentElement.children].indexOf(element)
            : 0;
          unfold(element, Math.min(siblingIndex, 3) * 90);
        }
      });
    },
    { threshold: [0, 0.08], rootMargin: '0px 0px -16px 0px' },
  );
  targets.forEach((element) => observer.observe(element));
}

preference.addEventListener('change', () => {
  if (preference.matches) {
    running.forEach((animation) => animation.cancel());
    running.clear();
  }
});
function syncVisibility() {
  document.documentElement.dataset.motionPaused = String(document.hidden);
  running.forEach((animation) =>
    document.hidden ? animation.pause() : animation.play(),
  );
}
document.addEventListener('visibilitychange', syncVisibility);
syncVisibility();
intro();
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  intro();
  targets.forEach((element) => {
    const bounds = element.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < innerHeight) unfold(element);
  });
});
