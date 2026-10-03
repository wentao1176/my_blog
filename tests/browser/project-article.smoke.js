// prettier-ignore
async (page) => {
  const home='http://127.0.0.1:4321/';
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(home+'posts/lite-md-viewer/');
  await page.waitForTimeout(1300);
  if(!await page.locator('.article-header h1').innerText().then(text=>text.includes('lite-md-viewer'))) throw new Error('Project article title missing');
  if(await page.locator('.toc nav a').count()!==6) throw new Error('Article section navigation missing');
  if(!await page.locator('.prose a[href="https://github.com/wentao1176/lite-md-viewer"]').count()) throw new Error('Repository link missing');
  await page.screenshot({path:'output/playwright/project-article-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(200);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Article overflows mobile');
  await page.screenshot({path:'output/playwright/project-article-mobile.png'});
  await page.goto(home);
  if(!await page.locator('.post-card a[href="posts/lite-md-viewer/"]').count()) throw new Error('Homepage article entry missing');
  const search=await page.request.get(home+'search.json');
  if(!(await search.json()).some(post=>post.title.includes('lite-md-viewer'))) throw new Error('Search index missing article');
  const rss=await page.request.get(home+'rss.xml');
  if(!(await rss.text()).includes('lite-md-viewer')) throw new Error('RSS missing article');
  return {article:true,toc:true,repositoryLink:true,mobile:true,homepage:true,search:true,rss:true};
}
