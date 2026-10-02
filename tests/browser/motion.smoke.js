// prettier-ignore
async (page) => {
  const home = 'http://127.0.0.1:4321/';
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.mouse.move(0, 0);
  await page.goto(home);
  const before = await page
    .locator('.hero-art')
    .evaluate((element) => getComputedStyle(element).translate);
  await page.waitForTimeout(550);
  const after = await page
    .locator('.hero-art')
    .evaluate((element) => getComputedStyle(element).translate);
  if (before === after)
    throw new Error('Landscape must move without pointer input');
  const card = page.locator('.latest-list .post-card').first();
  await card.evaluate((element) =>
    element.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await page.waitForTimeout(120);
  const first = await card.evaluateHandle((element) =>
    element
      .getAnimations()
      .find((animation) =>
        animation.effect?.getKeyframes().some((frame) => 'clipPath' in frame),
      ),
  );
  if (!(await first.evaluate((animation) => Boolean(animation))))
    throw new Error('Card must unfold on entering viewport');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(180);
  await card.evaluate((element) =>
    element.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await page.waitForTimeout(120);
  const replayed = await card.evaluate(
    (element, previous) =>
      element
        .getAnimations()
        .some(
          (animation) =>
            animation !== previous &&
            animation.effect
              ?.getKeyframes()
              .some((frame) => 'clipPath' in frame),
        ),
    first,
  );
  if (!replayed)
    throw new Error('Card must unfold again after leaving and reentering');
  await first.dispose();
  await page.goto(home + 'about/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(120);
  const newPageUnfolds = await page
    .locator('.page-intro')
    .evaluate((element) =>
      element
        .getAnimations()
        .some((animation) =>
          animation.effect?.getKeyframes().some((frame) => 'clipPath' in frame),
        ),
    );
  if (!newPageUnfolds)
    throw new Error('New page title must unfold automatically');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(100);
  const reduced = await page.evaluate(() => ({
    running: document
      .getAnimations()
      .filter((animation) => animation.playState === 'running').length,
    logo: getComputedStyle(document.querySelector('.brand-mark img'))
      .animationName,
  }));
  if (reduced.running || reduced.logo !== 'none')
    throw new Error('Reduced motion must cancel running animations');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  return {
    automaticMovement: true,
    scrollUnfold: true,
    replay: true,
    newPageUnfold: true,
    reducedMotion: true,
  };
}
