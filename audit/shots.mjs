import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const tag = process.argv[2]
const jobs = [
 ['m-home',390,844,3,'/',0],['m-product',390,844,3,'/product/bismillah-heart-frame',1400],['m-shop',390,844,3,'/shop',900],
 ['d-home',1920,1080,1,'/',0],['xl-shop',2560,1440,1,'/shop',0],['land',844,390,3,'/',0],['t-home',768,1024,2,'/',0],['xs',320,568,2,'/',0]]
for (const [n,w,h,d,path,y] of jobs) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:d, isMobile:w<=1024, hasTouch:w<=1024 })
  const p = await ctx.newPage()
  await p.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'})
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'})
  await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,30))} })
  await p.evaluate(yy=>window.scrollTo(0,yy),y); await p.waitForTimeout(700)
  await p.screenshot({path:`audit/${tag}-${n}.png`})
  await ctx.close()
}
await b.close()
