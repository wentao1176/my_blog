// prettier-ignore
async (page) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('http://127.0.0.1:4321/');
  await page.waitForTimeout(1800);
  const branch=page.locator('.depth-branch-near');
  const depth=await branch.evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).m43);
  if(depth<80) throw new Error('Foreground must project toward viewer');
  const before=await branch.evaluate(el=>getComputedStyle(el).transform);
  await page.mouse.move(1100,300);
  await page.waitForTimeout(900);
  const after=await branch.evaluate(el=>getComputedStyle(el).transform);
  if(before===after) throw new Error('Foreground must tilt with pointer');
  const leaf=page.locator('.leaf-spray').first();
  const leafBefore=await leaf.evaluate(el=>getComputedStyle(el).transform);
  await page.waitForTimeout(450);
  if(leafBefore===await leaf.evaluate(el=>getComputedStyle(el).transform)) throw new Error('Leaves must move autonomously');
  await page.evaluate(()=>scrollTo(0,250));
  await page.waitForTimeout(100);
  if(!await page.locator('.hero').evaluate(el=>Number(el.style.getPropertyValue('--scene-scroll'))>0)) throw new Error('Scroll must change scene depth');
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>scrollTo(0,0));
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error('Mobile depth must not overflow');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForTimeout(100);
  if(await leaf.evaluate(el=>getComputedStyle(el).animationName)!=='none') throw new Error('Reduced motion must stop leaves');
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const width of [1440,768,390,320]) {
    await page.setViewportSize({width,height:900});
    await page.evaluate(()=>scrollTo(0,0));
    await page.mouse.move(1,300);
    await page.waitForTimeout(2000);
    if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw new Error(`Foreground overflow at ${width}px`);
  }
  return {foregroundDepth:true,pointerTilt:true,automaticLeaves:true,scrollDepth:true,mobile:true,reducedMotion:true};
}
