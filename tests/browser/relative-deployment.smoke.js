// prettier-ignore
async (page) => {
  for (const home of ['http://127.0.0.1:4321/', 'http://127.0.0.1:4322/docs/']) {
    for (const path of ['', 'posts/first-entry/', 'tags/%E9%9A%8F%E7%AC%94/']) {
      const failed = [];
      const listener = (response) => { if (response.status() >= 400) failed.push(response.url()); };
      page.on('response', listener);
      await page.goto(home + path);
      await page.waitForTimeout(300);
      const rendered = await page.evaluate(() => ({
        styles: document.styleSheets.length > 0,
        logo: document.querySelector('.brand-mark img').naturalWidth > 0,
        images: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
      }));
      page.off('response', listener);
      if (!rendered.styles || !rendered.logo || rendered.images.length || failed.length) throw new Error(JSON.stringify({home,path,rendered,failed}));
      const brand = page.locator('.site-header .brand');
      await brand.click();
      if (page.url() !== home) throw new Error('Home navigation escaped deployment directory');
    }
  }
  return { rootDeployment: true, subdirectoryDeployment: true, nestedPages: true, loadedAssets: true };
}
