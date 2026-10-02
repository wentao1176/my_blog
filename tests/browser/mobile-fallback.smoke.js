// prettier-ignore
async (page) => {
  const browser = page.context().browser();
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  try {
    const tab = await mobile.newPage();
    await tab.goto('http://127.0.0.1:4321/');
    await tab.waitForTimeout(1400);
    const state = await tab.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
      fine: matchMedia('(hover:hover) and (pointer:fine)').matches,
      logo: document.querySelector('.brand-mark img').naturalWidth,
    }));
    if (state.width > state.viewport || state.fine || !state.logo)
      throw new Error('Mobile layout, pointer gating or logo failed');
    await tab.goto('http://127.0.0.1:4321/posts/astro-writing/');
    await tab.evaluate(
      () => (document.documentElement.style.fontSize = '200%'),
    );
    await tab.waitForTimeout(1400);
    const overflow = await tab.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    if (overflow) throw new Error('Enlarged article text must not overflow');
    await tab.screenshot({
      path: 'output/playwright/paddle-mobile-article.png',
    });
  } finally {
    await mobile.close();
  }
  const fallback = await browser.newContext({ javaScriptEnabled: false });
  try {
    const tab = await fallback.newPage();
    await tab.goto('http://127.0.0.1:4321/');
    if (
      !(await tab.locator('.post-card').first().isVisible()) ||
      !(await tab.locator('.hero-copy h1').isVisible())
    )
      throw new Error('No-JS content must remain visible');
  } finally {
    await fallback.close();
  }
  return { mobile: true, enlargedText: true, noJavaScript: true };
}
