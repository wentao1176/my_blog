// prettier-ignore
async (page) => {
  const home='http://127.0.0.1:4321/';
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(home+'posts/shilongxi-summer/');
  await page.waitForTimeout(1300);
  if(!await page.locator('.article-header h1').innerText().then(text=>text.includes('石垅溪'))) throw new Error('Countryside article missing');
  if(await page.locator('.prose figure').count()!==3) throw new Error('Article photos missing');
  for(const figure of await page.locator('.prose figure').all()) {
    await figure.scrollIntoViewIfNeeded();
    await figure.locator('img').evaluate(img=>img.decode());
    if(!await figure.locator('img').evaluate(img=>img.naturalWidth>0 && Math.abs(img.clientWidth/img.clientHeight-4/3)<.02)) throw new Error('Photo failed or distorted');
  }
  if(!await page.locator('.prose a[href="https://www.myshilongxi.cn/"]').count()) throw new Error('Practice website link missing');
  if(await page.locator('.toc nav a').count()!==6) throw new Error('Article contents missing');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/countryside-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.prose figure').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1300);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Photo article overflows mobile');
  await page.screenshot({path:'output/playwright/countryside-mobile.png'});
  for(const resource of ['search.json','rss.xml']) {
    const r=await page.request.get(home+resource);
    if(!(await r.text()).includes('shilongxi-summer')) throw new Error(`Article missing in ${resource}`);
  }
  return {article:true,threePhotos:true,photoAspect:true,websiteLink:true,toc:true,mobile:true,search:true,rss:true};
}
