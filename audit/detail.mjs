import { chromium } from 'playwright'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const tag = process.argv[2]||'before'
const run = async (w,h,d,path,shot)=>{
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:d, isMobile:w<=1024, hasTouch:w<=1024 })
  const p = await ctx.newPage()
  await p.goto('http://127.0.0.1:4173'+path,{waitUntil:'networkidle'})
  await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))} window.scrollTo(0,0) })
  await p.waitForTimeout(300)
  if(shot) await p.screenshot({path:`audit/${tag}-${shot}.png`})
  const r = await p.evaluate(()=>{
    const cnt={}
    ;[...document.querySelectorAll('a,button,input,select,textarea,summary')].forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&(r.width<44||r.height<44)){const k=e.tagName.toLowerCase()+'.'+String(e.className).split(' ')[0];cnt[k]=(cnt[k]||0)+1}})
    const cont=document.querySelector('.container')?.getBoundingClientRect()
    return {cnt:Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,12),cont:cont&&Math.round(cont.width)}
  })
  // scrolled overlap check
  await p.evaluate(()=>window.scrollTo(0,1500)); await p.waitForTimeout(500)
  const fx = await p.evaluate(()=>[...document.querySelectorAll('.rr-wa-fab,.rr-back-to-top,.rr-sticky-order')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return [e.className.split(' ')[0],Math.round(r.left),Math.round(r.top),Math.round(r.right),Math.round(r.bottom),s.visibility]}))
  await ctx.close(); return {...r,fx}
}
console.log('390 home', JSON.stringify(await run(390,844,3,'/','m-home')))
console.log('390 product', JSON.stringify(await run(390,844,3,'/product/bismillah-heart-frame','m-product')))
console.log('1920 home', JSON.stringify(await run(1920,1080,1,'/','d-home')))
console.log('2560 shop', JSON.stringify(await run(2560,1440,1,'/shop','xl-shop')))
await b.close()
