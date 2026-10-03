import os
BASE = os.environ.get("BASE", "http://localhost:3000")  # running `npm run start`
BASE_V2 = os.environ.get("BASE_V2", "http://localhost:3200")  # a running v2.0 build to compare against
import asyncio, re, json
from playwright.async_api import async_playwright
ROUTES=["/","/about","/career","/experience","/education","/skills","/achievements","/gallery","/contact","/does-not-exist"]
JS_NODES="""() => { const out=[]; const w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 while(w.nextNode()){ const n=w.currentNode; const p=n.parentElement; if(!p||p.closest('script,style,noscript')) continue; const t=n.textContent.replace(/\\s+/g,' ').trim(); if(t.length>=2) out.push(t);} return out; }"""
JS_ALL="""() => document.body.textContent.replace(/\\s+/g,' ')"""
norm=lambda s: re.sub(r"\s+"," ",s.replace(" "," ")).strip()
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(); pg=await b.new_page()
        missing={}; total=0
        for r in ROUTES:
            await pg.goto(BASE_V2+r, wait_until="networkidle"); old=await pg.evaluate(JS_NODES)
            await pg.goto(BASE+r, wait_until="networkidle"); new=norm(await pg.evaluate(JS_ALL))
            # also add alt texts / aria-labels of images in v3 for gallery alt checks
            alts=" ".join(await pg.evaluate("()=>Array.from(document.querySelectorAll('img[alt],[aria-label]')).map(e=>e.getAttribute('alt')||e.getAttribute('aria-label')||'')"))
            new+= " "+norm(alts)
            miss=[]
            for t in old:
                t=norm(t); total+=1
                if t not in new: miss.append(t)
            missing[r]=sorted(set(miss))
        print("v2 text nodes checked:", total)
        for r,m in missing.items():
            print(f"\n{r}: {len(m)} not found verbatim")
            for x in m: print("   -", x[:160])
        await b.close()
asyncio.run(main())
