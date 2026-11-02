import { chromium } from 'playwright'
const out = process.argv[2] || 'audit/before.json'
const pages = ['/', '/shop', '/product/bismillah-heart-frame', '/custom', '/gallery', '/about', '/faq', '/contact', '/saved', '/nope']
const vps = [[320,568,2],[360,640,3],[390,844,3],[430,932,3],[600,960,2],[768,1024,2],[1024,768,2],[1280,720,1],[1440,900,1],[1920,1080,1],[2560,1440,1],[844,390,3]]
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const res = []
for (const [w,h,d] of vps) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:d, isMobile:w<=1024, hasTouch:w<=1024 })
  const p = await ctx.newPage()
  for (const path of pages) {
    try {
      await p.goto('http://127.0.0.1:4173'+path, { waitUntil:'networkidle', timeout:20000 })
      await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))} window.scrollTo(0,0) })
      await p.waitForTimeout(250)
      const m = await p.evaluate(()=>{
        const vw = innerWidth
        const over = [...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>vw+1||r.left<-1)&&getComputedStyle(e).position!=='fixed'}).slice(0,4).map(e=>e.tagName+'.'+String(e.className).split(' ')[0])
        const fixed=[...document.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);return s.position==='fixed'&&s.visibility!=='hidden'&&s.display!=='none'&&e.getBoundingClientRect().width>0&&+s.opacity>0&&!/rr-(mobile-menu|chooser|qv|lightbox|search)/.test(e.className)}).map(e=>({c:String(e.className).split(' ')[0],r:e.getBoundingClientRect()}))
        const ov=[]
        for(let i=0;i<fixed.length;i++)for(let j=i+1;j<fixed.length;j++){const a=fixed[i].r,c=fixed[j].r;if(a.left<c.right&&c.left<a.right&&a.top<c.bottom&&c.top<a.bottom&&!/scroll-progress/.test(fixed[i].c+fixed[j].c))ov.push(fixed[i].c+'×'+fixed[j].c)}
        const small=vw<=1024?[...document.querySelectorAll('a,button,input,select,textarea')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&(r.width<40||r.height<40)&&getComputedStyle(e).visibility!=='hidden'}).length:0
        const fs=vw<=1024?[...document.querySelectorAll('input,select,textarea')].filter(e=>parseFloat(getComputedStyle(e).fontSize)<16).length:0
        return {sw:document.documentElement.scrollWidth-vw,over,ov,small,fs}
      })
      res.push({w,h,path,...m})
    } catch(e){ res.push({w,h,path,err:String(e).slice(0,80)}) }
  }
  await ctx.close()
}
await b.close()
import fs from 'fs'; fs.writeFileSync(out, JSON.stringify(res,null,1))
const bad=res.filter(r=>r.err||r.sw>0||r.ov?.length)
console.log('overflow pages:',res.filter(r=>r.sw>0).length,'| fixed overlaps:',res.filter(r=>r.ov?.length).length,'| errors:',res.filter(r=>r.err).length)
console.log('small tap targets total:',res.reduce((a,r)=>a+(r.small||0),0),'| inputs<16px:',res.reduce((a,r)=>a+(r.fs||0),0))
for(const r of bad.slice(0,25)) console.log(r.w+'x'+r.h,r.path,r.err||'', r.sw>0?'overflow '+r.sw+' '+r.over.join(','):'', r.ov?.length?'overlap '+[...new Set(r.ov)].join(','):'')
