"""Real-page screenshots for Shorts (shorts-guide 3-ter rule 8), with the pixel boxes of the words to highlight.
    py shoot.py <url> <name> [--top 0] [--height 1100] [--full] [--find "text one" "text two" ...]
Writes C:/Users/Peter/Desktop/Shorts image library/<lib>/<name>.png (lib = repos for github.com, else sites) and copies it to
public/<slug>/ when --slug <slug> is given. Viewport 900x1100 CSS px, device_scale_factor 2, so the PNG is 1800 px wide.
--top/--height clip a band of the page (CSS px; --full = the whole page). --find prints, for each text, the box of its FIRST
match inside the band in IMAGE pixels (x, y, w, h), ready for a kit `Shot` mark: {x, y, w, h, from, to}. Added Nov 18 2026
(Short 05): in 04 every highlight box was measured by eye on the PNG; this prints them.
"""
import sys, json, shutil, pathlib, argparse
from playwright.sync_api import sync_playwright

ap = argparse.ArgumentParser()
ap.add_argument("url"); ap.add_argument("name")
ap.add_argument("--top", type=float, default=0); ap.add_argument("--height", type=float, default=1100)
ap.add_argument("--full", action="store_true"); ap.add_argument("--find", nargs="*", default=[])
ap.add_argument("--slug"); ap.add_argument("--wait", type=int, default=2500)
a = ap.parse_args()
LIB = pathlib.Path.home() / "Desktop" / "Shorts image library" / ("repos" if "github.com" in a.url else "sites")
LIB.mkdir(parents=True, exist_ok=True)
out = LIB / f"{a.name}.png"
FIND_JS = """(t) => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n; const low = t.toLowerCase(); const all = [];
  while ((n = w.nextNode())) {
    // exact case first (Nov 18 2026, egm: "Elephant" hit the lowercase repo name "elephant-goldfish-model" before the README's
    // bold "Elephant"; 05: "Outbound Strategist" hit a commit line); the case-insensitive match is only the fallback
    const ex = n.textContent.indexOf(t), i = ex >= 0 ? ex : n.textContent.toLowerCase().indexOf(low);
    if (i < 0) continue;
    const el = n.parentElement; const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || !el.offsetParent) continue;
    const r = document.createRange(); r.setStart(n, i); r.setEnd(n, i + t.length);
    const b = r.getBoundingClientRect(); if (!b.width) continue;
    // one rect per visual line: a phrase that wraps gets a highlight per line, not one box over both lines
    const lines = [...r.getClientRects()].filter(q => q.width > 2).map(q => [q.left + scrollX, q.top + scrollY, q.width, q.height]);
    all.push([b.left + scrollX, b.top + scrollY, b.width, b.height, lines, ex >= 0 ? 0 : 1]);
  }
  return all.sort((p, q) => p[5] - q[5]);   // stable: exact-case matches first, page order inside each group
}"""
with sync_playwright() as p:
    br = p.chromium.launch()
    pg = br.new_page(viewport={"width": 900, "height": 1100}, device_scale_factor=2, color_scheme="light")
    pg.goto(a.url, wait_until="domcontentloaded"); pg.wait_for_timeout(a.wait)
    H = pg.evaluate("document.documentElement.scrollHeight")
    if a.full: top, h = 0, H
    else: top, h = a.top, min(a.height, H - a.top)
    pg.screenshot(path=str(out), clip={"x": 0, "y": top, "width": 900, "height": h}, full_page=True)
    res = {}
    for t in a.find:
        # first match INSIDE the band (DOM order is not screen order: the README repeats the About line further down)
        ms = pg.evaluate(FIND_JS, t)
        b = next((m for m in ms if top <= m[1] and m[1] + m[3] <= top + h), None)
        box = lambda q: {"x": round(q[0] * 2) - 6, "y": round((q[1] - top) * 2) - 4, "w": round(q[2] * 2) + 12, "h": round(q[3] * 2) + 8}
        res[t] = None if not b else {**box(b), "pageY": round(b[1]), **({"lines": [box(q) for q in b[4]]} if len(b[4]) > 1 else {})}
    br.close()
from PIL import Image
iw, ih = Image.open(out).size
print(f"saved {out}  {iw}x{ih}  (page height {H} css px)")
for t, b in res.items(): print(f"  {t!r}: {json.dumps(b)}")
if a.slug:
    dst = pathlib.Path(__file__).parent / "public" / a.slug; dst.mkdir(parents=True, exist_ok=True)
    shutil.copy(out, dst / out.name); print("copied to", dst / out.name)
