// prettier-ignore
async (page) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:4321/');
  await page.mouse.move(0,0);
  const ratio=await page.locator('.boat-body').evaluate(el=>el.clientWidth/el.clientHeight);
  if(ratio<4) throw new Error('Watercolor boat must preserve its slender aspect ratio');
  const selectors=['.drifting-boat','.boat-body','.boat-reflection','.lake-texture','.lake-ripple','.cloud-stream-high','.cloud-stream-low'];
  const before=await page.evaluate(selectors=>selectors.map(selector=>getComputedStyle(document.querySelector(selector)).transform),selectors);
  await page.waitForTimeout(700);
  const after=await page.evaluate(selectors=>selectors.map(selector=>getComputedStyle(document.querySelector(selector)).transform),selectors);
  for(let i=0;i<selectors.length;i++) if(before[i]===after[i]) throw new Error(`${selectors[i]} must move without input`);
  await page.screenshot({path:'output/playwright/living-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  await page.waitForTimeout(500);
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Living scene must fit mobile width');
  await page.screenshot({path:'output/playwright/living-mobile.png'});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForTimeout(100);
  if(await page.locator('.living-landscape').evaluate(el=>el.getAnimations({subtree:true}).some(a=>a.playState==='running'))) throw new Error('Reduced motion must stop living scene');
  await page.emulateMedia({reducedMotion:'no-preference'});
  return {boatDrift:true,boatBob:true,reflection:true,waterRipples:true,independentClouds:true,mobile:true,reducedMotion:true};
}
