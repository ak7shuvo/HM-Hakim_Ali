import os
BASE = os.environ.get("BASE", "http://localhost:3000")  # running `npm run start`
import asyncio
from playwright.async_api import async_playwright
B=BASE
res=[]
def ok(name,cond,detail=""): res.append(("PASS" if cond else "FAIL",name,detail))
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        # --- mobile menu
        ctx=await b.new_context(viewport={"width":390,"height":844}); pg=await ctx.new_page()
        await pg.goto(B+"/about",wait_until="networkidle")
        await pg.click(".nav-toggle")
        await pg.wait_for_selector("#mobile-nav")
        foc=await pg.evaluate("document.activeElement.textContent")
        ok("menu: focus moves into sheet", "Home" in foc, foc)
        ok("menu: main is inert", await pg.evaluate("document.querySelector('main').hasAttribute('inert')"))
        ok("menu: current page marked", await pg.evaluate("document.querySelector('#mobile-nav [aria-current=page]')?.textContent.includes('About')"))
        for _ in range(12): await pg.keyboard.press("Tab")
        inside=await pg.evaluate("!!document.activeElement.closest('#mobile-nav,.nav-toggle')")
        ok("menu: Tab contained", inside)
        await pg.keyboard.press("Escape")
        ok("menu: Esc closes + focus to toggle", await pg.evaluate("!document.querySelector('#mobile-nav') && document.activeElement.classList.contains('nav-toggle')"))
        await pg.click(".nav-toggle"); await pg.click("#mobile-nav a[href='/career']"); await pg.wait_for_url("**/career"); await pg.wait_for_timeout(400)
        ok("menu: link navigates + closes", await pg.evaluate("!document.querySelector('#mobile-nav') && location.pathname==='/career'"))
        await pg.click(".nav-toggle"); await pg.set_viewport_size({"width":1300,"height":900}); await pg.wait_for_timeout(300)
        ok("menu: closes on resize to desktop", await pg.evaluate("!document.querySelector('#mobile-nav')"))
        await ctx.close()
        # --- skip link + header condense
        ctx=await b.new_context(viewport={"width":1440,"height":900}); pg=await ctx.new_page()
        await pg.goto(B+"/",wait_until="networkidle")
        await pg.keyboard.press("Tab")
        ok("skip link first tab stop", await pg.evaluate("document.activeElement.classList.contains('skip-link')"))
        await pg.keyboard.press("Enter"); await pg.wait_for_timeout(200)
        ok("skip link focuses main", await pg.evaluate("document.activeElement.id==='main'"))
        h0=await pg.evaluate("document.querySelector('main').getBoundingClientRect().top+scrollY")
        await pg.mouse.wheel(0,600); await pg.wait_for_timeout(600)
        h1=await pg.evaluate("document.querySelector('main').getBoundingClientRect().top+scrollY")
        ok("header condenses without layout shift", await pg.evaluate("document.querySelector('.site-header-wrap').classList.contains('is-condensed')") and abs(h0-h1)<1, f"{h0} {h1}")
        # back to top
        await pg.evaluate("window.scrollTo({top:3000,behavior:'instant'})"); await pg.wait_for_timeout(500)
        vis=await pg.evaluate("document.querySelector('.to-top').classList.contains('is-visible')")
        prog=await pg.evaluate("document.querySelector('.to-top').style.getPropertyValue('--scroll')")
        ok("back-to-top appears with progress", vis and float(prog or 0)>0, prog)
        await pg.click(".to-top"); await pg.wait_for_timeout(1500)
        ok("back-to-top scrolls to top + focus main", await pg.evaluate("scrollY<5 && document.activeElement.id==='main'"))
        # client navigation & reveal re-scan
        await pg.click(".nav-desktop a[href='/experience']"); await pg.wait_for_url("**/experience"); await pg.wait_for_timeout(800)
        ok("nav active state after client navigation", await pg.evaluate("document.querySelector('.nav-desktop a[aria-current=page]')?.getAttribute('href')==='/experience'"))
        await pg.mouse.wheel(0,900); await pg.wait_for_timeout(900)
        n_in=await pg.evaluate("document.querySelectorAll('[data-reveal].is-in').length")
        ok("reveals run after client-side navigation", n_in>3, str(n_in))
        # archive filters
        await pg.click("button.filter-chip:has-text('Hospitality')"); await pg.wait_for_timeout(500)
        shown=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).length")
        status=await pg.evaluate("document.querySelector('.filter-count').textContent")
        visible_ok=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).every(c=>getComputedStyle(c).display!=='none')")
        ok("experience filter: Hospitality shows 2 + announces", shown==2 and "Hospitality" in status and visible_ok, f"{shown} {status}")
        ok("filter in URL", "category=Hospitality" in pg.url, pg.url)
        await pg.wait_for_timeout(800)
        op=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).map(c=>getComputedStyle(c).opacity)")
        ok("filtered cards fully visible after animation", all(float(x)>0.99 for x in op), str(op))
        await pg.reload(wait_until="networkidle"); await pg.wait_for_timeout(1200)
        shown=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).length")
        op=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).map(c=>getComputedStyle(c).opacity)")
        ok("filter restored from URL on reload (visible)", shown==2 and all(float(x)>0.99 for x in op), f"{shown} {op}")
        # keyboard arrow among chips
        await pg.focus("button.filter-chip"); await pg.keyboard.press("ArrowRight")
        ok("arrow keys move between chips", await pg.evaluate("document.activeElement.classList.contains('filter-chip') && document.activeElement!==document.querySelector('button.filter-chip')"))
        # career eras
        await pg.goto(B+"/career",wait_until="networkidle")
        await pg.click(".career-nav button:has-text('2011–2018')"); await pg.wait_for_timeout(800)
        shown=await pg.evaluate("[...document.querySelectorAll('.timeline > li')].filter(c=>!c.hidden).length")
        msg=await pg.evaluate("document.querySelector('.career-nav ~ p[role=status], p[role=status].visually-hidden')?.textContent")
        op=await pg.evaluate("[...document.querySelectorAll('.timeline > li')].filter(c=>!c.hidden).map(c=>getComputedStyle(c).opacity)")
        last=await pg.evaluate("[...document.querySelectorAll('.timeline > li')].filter(c=>!c.hidden).pop().classList.contains('is-last-visible')")
        ok("career era 2011–2018 shows 2, announced, visible, rail ends", shown==2 and "2 of 15" in (msg or "") and all(float(x)>0.99 for x in op) and last, f"{shown} {msg} {op}")
        await pg.goto(B+"/career?era=era-2020-2026",wait_until="networkidle"); await pg.wait_for_timeout(1200)
        shown=await pg.evaluate("[...document.querySelectorAll('.timeline > li')].filter(c=>!c.hidden).length")
        op=await pg.evaluate("[...document.querySelectorAll('.timeline > li')].filter(c=>!c.hidden).map(c=>getComputedStyle(c).opacity)")
        ok("career deep link era-2020-2026 shows 5 visible", shown==5 and all(float(x)>0.99 for x in op), f"{shown} {op}")
        # gallery lightbox
        await pg.goto(B+"/gallery",wait_until="networkidle")
        await pg.focus(".gallery-open"); await pg.keyboard.press("Enter"); await pg.wait_for_timeout(500)
        ok("lightbox opens from keyboard", await pg.evaluate("document.querySelector('dialog.lightbox').open"))
        await pg.keyboard.press("ArrowRight"); await pg.keyboard.press("ArrowRight"); await pg.wait_for_timeout(200)
        st=await pg.evaluate("document.querySelector('.lb-bar [role=status]').textContent")
        ok("lightbox arrow keys step (3 / 8)", "3" in st and "8" in st, st)
        await pg.keyboard.press("ArrowLeft"); await pg.keyboard.press("ArrowLeft"); await pg.keyboard.press("ArrowLeft"); await pg.wait_for_timeout(200)
        st=await pg.evaluate("document.querySelector('.lb-bar [role=status]').textContent")
        ok("lightbox wraps (8 / 8)", st.strip().startswith("8"), st)
        await pg.keyboard.press("Escape"); await pg.wait_for_timeout(300)
        ok("lightbox Esc closes + focus restored", await pg.evaluate("!document.querySelector('dialog.lightbox').open && document.activeElement.classList.contains('gallery-open')"))
        await pg.click("button:has-text('Organize gallery')"); await pg.wait_for_timeout(1200)
        ok("organize toggle", await pg.evaluate("document.querySelector('.gallery').dataset.organized==='true'"))
        await ctx.close()
        # contact copy
        ctx=await b.new_context(viewport={"width":1440,"height":900}, permissions=["clipboard-read","clipboard-write"]); pg=await ctx.new_page()
        await pg.goto(B+"/contact",wait_until="networkidle")
        await pg.click(".copy-btn"); await pg.wait_for_timeout(300)
        clip=await pg.evaluate("navigator.clipboard.readText()")
        st=await pg.evaluate("document.querySelector('.copy-btn').dataset.state")
        ann=await pg.evaluate("document.querySelector('.copy-btn [role=status]').textContent")
        ok("copy LinkedIn link: clipboard + feedback", clip.startswith("https://bd.linkedin.com/in/") and st=="copied" and "copied" in ann.lower(), clip)
        hrefs=await pg.evaluate("[...document.querySelectorAll('a[target=_blank]')].map(a=>[a.href,a.rel])")
        ok("external links open safely", all("noopener" in r for _,r in hrefs), str(hrefs[:2]))
        await ctx.close()
        # reduced motion: everything visible without scrolling
        ctx=await b.new_context(viewport={"width":1440,"height":900}, reduced_motion="reduce"); pg=await ctx.new_page()
        await pg.goto(B+"/",wait_until="networkidle"); await pg.wait_for_timeout(400)
        hidden=await pg.evaluate("[...document.querySelectorAll('[data-reveal]')].filter(e=>parseFloat(getComputedStyle(e).opacity)<0.99).length")
        ok("reduced motion: no hidden reveals", hidden==0, str(hidden))
        await ctx.close()
        # no JS: everything visible
        ctx=await b.new_context(viewport={"width":1440,"height":900}, java_script_enabled=False); pg=await ctx.new_page()
        for r in ["/","/career","/experience"]:
            await pg.goto(B+r,wait_until="load")
            hidden=await pg.evaluate("[...document.querySelectorAll('[data-reveal]')].filter(e=>parseFloat(getComputedStyle(e).opacity)<0.99).length") if False else None
        # JS disabled -> evaluate not possible; check via screenshot text length
        await ctx.close()
        ctx=await b.new_context(viewport={"width":1440,"height":900}); pg=await ctx.new_page()
        await pg.route("**/_next/static/chunks/**", lambda route: route.abort())
        await pg.goto(B+"/experience",wait_until="load"); await pg.wait_for_timeout(3000)
        hidden=await pg.evaluate("[...document.querySelectorAll('[data-reveal]')].filter(e=>parseFloat(getComputedStyle(e).opacity)<0.99).length")
        cells=await pg.evaluate("[...document.querySelectorAll('.archive-cell')].filter(c=>!c.hidden).length")
        ok("JS bundle blocked: boot fallback shows all content", hidden==0 and cells==11, f"hidden={hidden} cells={cells}")
        await ctx.close()
        # internal links all resolve
        ctx=await b.new_context(); pg=await ctx.new_page(); seen=set(); bad=[]
        for r in ["/","/about","/career","/experience","/education","/skills","/achievements","/gallery","/contact"]:
            await pg.goto(B+r,wait_until="networkidle")
            for h in await pg.evaluate("[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))"):
                if h.startswith("/") and h not in seen:
                    seen.add(h); resp=await pg.request.get(B+h.split('#')[0]); 
                    if resp.status!=200: bad.append((h,resp.status))
                elif h.startswith("#") and h!="#main":
                    if not await pg.evaluate(f"!!document.getElementById('{h[1:]}')"): bad.append((r+h,"missing anchor"))
        for asset in ["/robots.txt","/sitemap.xml","/manifest.webmanifest","/og-image.png","/icon.svg","/favicon.ico","/apple-icon.png","/icon-192.png","/icon-512.png"]:
            resp=await pg.request.get(B+asset)
            if resp.status!=200: bad.append((asset,resp.status))
        ok("all internal links, anchors and SEO assets resolve", not bad, f"{len(seen)} links; bad={bad}")
        nf=await pg.request.get(B+"/no-such-page"); ok("unknown route returns 404", nf.status==404)
        await ctx.close(); await b.close()
    for r in res: print(*r)
    print("pass",sum(1 for r in res if r[0]=="PASS"),"/",len(res))
asyncio.run(main())
