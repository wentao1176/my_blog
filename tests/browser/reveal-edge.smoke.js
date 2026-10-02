// prettier-ignore
async (page) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://127.0.0.1:4321/');
  await page.waitForTimeout(1500);
  const heading = page.locator('.latest-section .section-heading');
  await heading.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const overlap = Math.max(3, rect.height * 0.12);
    window.scrollTo({
      top: scrollY + rect.top - (innerHeight - 16 - overlap),
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(1600);
  const active = await heading.evaluate((element) =>
    element
      .getAnimations()
      .some(
        (animation) =>
          animation.playState === 'running' &&
          animation.effect?.getKeyframes().some((frame) => 'clipPath' in frame),
      ),
  );
  if (active)
    throw new Error(
      'Unfold must settle after duration while stationary at viewport edge',
    );
  return { boundarySettles: true };
}
