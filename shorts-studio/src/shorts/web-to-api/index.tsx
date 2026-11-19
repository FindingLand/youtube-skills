// Web-to-API Short v3 (Nov 18 2026): "This free tool pulls data from almost any website". Scenes anchored to scripts/web-to-api.txt.
// v3 follows Peter's style rules (shorts-guide 3-ter) and the frame study of Nick's Short fDpuRX6yr08: REAL images (reverseapi.dev
// hero art, the GitHub page) panned and highlighted on the spoken words; FULL shots (no face) for the name + the hard part
// (browser -> traffic -> code); on-screen text only repeats what is said; no music.
// Repo facts verified Nov 18 2026 (screenshot): kalil0321/reverse-api-engineer, 3.9k stars, MIT, "Works with Claude Code, Codex, ...".
// shop.example.com (reserved example domain) and every product / price below are ILLUSTRATIVE mocks of a fictional shop, not a real run.
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, makeShort, FullCtx, Shot, Chip, SANS, SERIF, MONO, BLUE, INK, OK, BAD, GOLDFISH, ELEPHANT, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const SHOP = "shop.example.com";
const PRODUCTS: [string, string][] = [["Desk Lamp", "$24.00"], ["Office Chair", "$31.00"], ["Notebook Set", "$19.00"], ["Water Bottle", "$12.50"]];

// 1. "This free tool pulls data from almost any website": the tool's real hero art; "Turn websites" boxed on "any website"
const S1Hero: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} url="reverseapi.dev">
    <Shot d={d} src="web-to-api/reverseapi.dev_hero.png" iw={1800} ih={2200} boxH={316}
      keys={[{at: 0, cx: 900, cy: 905, w: 1700}, {at: 75, cx: 890, cy: 900, w: 1560}]}
      marks={[{x: 278, y: 572, w: 505, h: 215, from: 68, to: 80, box: true}]} />
  </Card>
);

// 2. FULL. "It's called Reverse API Engineer, and it works inside Claude Code": the real GitHub page, the name highlighted as it
// is said, then a pan to the About box where "Claude Code" lights up on the word
const S2Repo: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url="github.com/kalil0321/reverse-api-engineer">
    <Shot d={d} src="web-to-api/kalil0321_reverse-api-engineer_top.png" iw={1800} ih={2200}
      keys={[{at: 0, cx: 375, cy: 400, w: 720}, {at: 88, cx: 375, cy: 400, w: 720}, {at: 106, cx: 1390, cy: 640, w: 700}]}
      marks={[{x: 92, y: 338, w: 390, h: 70, from: 14, to: 52}, {x: 1381, y: 638, w: 166, h: 56, from: 112, to: 132}]} />
  </Card>
);

// 3. "You give it a site and say what you want"
const S3Site: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 36);
  return (
    <Card top={TOP} h={H} d={d} title="Reverse API Engineer">
      <div style={{fontFamily: SANS, color: INK, paddingTop: 120}}>
        <div style={{display: "flex", alignItems: "center", gap: 22, border: "3px solid #D1D9E0", borderRadius: 22, padding: "30px 26px"}}>
          <Icon src="globe_flat.svg" color={ELEPHANT} size={74} />
          <div style={{fontFamily: MONO, fontSize: 52}}>{typed(SHOP, d, 4, 26)}{d < 30 && <Cursor d={d} />}</div>
          <div style={{marginLeft: "auto", fontSize: 24, fontWeight: 800, letterSpacing: 2, color: "#fff", background: "#6B7480", borderRadius: 8, padding: "4px 12px"}}>EXAMPLE</div>
        </div>
        <div style={{marginTop: 90, display: "flex", alignItems: "center", gap: 24, opacity: k, transform: `scale(${0.88 + 0.12 * k})`, transformOrigin: "left center"}}>
          <Logo src="claude-icon.svg" size={84} />
          <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 84, color: BLUE}}>What do you want?</div>
        </div>
      </div>
    </Card>
  );
};

// 4. "Say, every price on a competitor's page": the fictional shop page, every price highlighted
const S4Shop: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url={SHOP + "/shop"}>
    <div style={{fontFamily: SANS, color: INK}}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Icon src="cart_flat.svg" color={GOLDFISH} size={60} />
        <div style={{fontSize: 52, fontWeight: 800, letterSpacing: -1}}>Example Store</div>
        <div style={{marginLeft: "auto", fontSize: 26, fontWeight: 600, color: "#8A9199", border: "2px dashed #C9CED4", borderRadius: 10, padding: "4px 14px"}}>sample shop</div>
      </div>
      <div style={{marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20}}>
        {PRODUCTS.map(([n, p], i) => {
          const k = pop(d, i * 3);
          return (
            <div key={n} style={{borderRadius: 20, border: "2px solid #E1E5EA", background: "#F8FAFC", padding: "16px 20px", opacity: k, transform: `scale(${0.9 + 0.1 * k})`}}>
              <div style={{height: 84, borderRadius: 14, background: ["#E7F1FF", "#FFF1E4", "#EAF7EE", "#F3EAFE"][i], display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Icon src="label_flat.svg" color={[ELEPHANT, GOLDFISH, OK, "#8B5CF6"][i]} size={60} />
              </div>
              <div style={{marginTop: 10, fontSize: 34, fontWeight: 700}}>{n}</div>
              <div style={{marginTop: 2, fontSize: 46, fontWeight: 800}}><Sweep d={d} from={8 + i * 4} to={16 + i * 4}>{p}</Sweep></div>
            </div>
          );
        })}
      </div>
    </div>
  </Card>
);

// 5. FULL. "A browser opens the site and records every request": the live request list
const REQS: [string, string, string][] = [
  ["GET", "/shop", "200"], ["GET", "/static/app.js", "200"], ["GET", "/api/products?page=1", "200"], ["GET", "/api/products?page=2", "200"],
  ["GET", "/api/prices?ids=1,2,3", "200"], ["POST", "/api/cart/view", "204"], ["GET", "/api/products?page=3", "200"],
];
const S5Traffic: React.FC<{d: number}> = ({d}) => {
  const n = Math.min(REQS.length, Math.max(0, Math.floor((d - 24) / 8) + 1));
  const full = React.useContext(FullCtx);
  return (
    <Card dark top={TOP} h={H} d={d} title={"Browser · " + SHOP}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Icon src="globe_flat.svg" color="#7AB8FF" size={54} />
        <Mono c="#fff" size={46}>{d < 60 ? typed("Opening " + SHOP, d, 0, 40) : "Every request"}</Mono>
        {d >= 24 && <div style={{marginLeft: "auto", width: 22, height: 22, borderRadius: 11, background: BAD, opacity: Math.floor(d / 12) % 2 ? 0.35 : 1}} />}
      </div>
      <div style={{marginTop: 14}}>
        {REQS.slice(0, n).map(([m, p, c], i) => {
          const api = p.startsWith("/api/products");
          return (
            <div key={i} style={{display: "flex", gap: 18, fontFamily: MONO, fontSize: 38, lineHeight: full ? 2.3 : 1.5, padding: "0 10px", borderRadius: 8, background: api ? "rgba(0,133,255,.25)" : "transparent", opacity: pop(d, 24 + i * 8)}}>
              <span style={{color: m === "GET" ? "#5BD68A" : "#FFD479", width: 100}}>{m}</span>
              <span style={{color: api ? "#fff" : "#B8B8B8", flex: 1}}>{p}</span>
              <span style={{color: "#8A8A8A"}}>{c}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// 6. FULL. "Then the AI reads that traffic and writes a small program that asks the site for data directly"
const S6Code: React.FC<{d: number}> = ({d}) => {
  const code = `class StoreClient:
  def get_products(self):
    return self.get(
      "/api/products")`;
  const t = typed(code, d, 50, 40);
  const done = t.length === code.length;
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.0} title="Write(store_client.py)">
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", height: 700, gap: 34}}>
      <div style={{display: "flex", alignItems: "center", gap: 14, opacity: pop(d, 0)}}>
        <Logo src="claude-icon.svg" size={64} /><Mono c="#B8B8B8" size={44}>{typed("reads the traffic…", d, 4, 24)}</Mono>
      </div>
      <Mono size={48}>{t}{!done && d > 50 && <Cursor d={d} />}</Mono>
      <div style={{display: "flex", gap: 14, zoom: 1.4}}><Pill ok text="asks the site directly" d={d} at={160} /></div>
      </div>
    </Card>
  );
};

// 7. "Run it whenever you want": a clock face sweeping round
const S7Run: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 0), a = d * 9;
  return (
    <Card top={TOP} h={H} d={d} title="Run it">
      <div style={{fontFamily: SANS, color: INK, textAlign: "center", paddingTop: 30}}>
        <div style={{position: "relative", width: 300, height: 300, margin: "0 auto", borderRadius: 150, border: `14px solid ${BLUE}`, opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>
          <div style={{position: "absolute", left: 136, top: 50, width: 14, height: 100, background: INK, borderRadius: 7, transformOrigin: "7px 100px", transform: `rotate(${a}deg)`}} />
          <div style={{position: "absolute", left: 136, top: 80, width: 14, height: 70, background: GOLDFISH, borderRadius: 7, transformOrigin: "7px 70px", transform: `rotate(${a / 12}deg)`}} />
          <div style={{position: "absolute", left: 128, top: 128, width: 30, height: 30, borderRadius: 15, background: INK}} />
        </div>
        <div style={{marginTop: 40, fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 92, color: BLUE, opacity: pop(d, 8)}}>Whenever you want</div>
      </div>
    </Card>
  );
};

// 8. "Competitor prices, new listings, job posts": three uses, each on its word
const S8Uses: React.FC<{d: number}> = ({d}) => {
  const box = (bg: string, line: string, c: string, icon: string, t: string, k: number) => (
    <div style={{borderRadius: 22, background: bg, border: `2px solid ${line}`, padding: "28px 30px", display: "flex", alignItems: "center", gap: 28, opacity: k, transform: `scale(${0.9 + 0.1 * k})`, filter: `blur(${(1 - k) * 8}px)`}}>
      <Icon src={icon} color={c} size={110} />
      <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 72, color: c}}>{t}</div>
    </div>
  );
  return (
    <Card top={TOP} h={H} d={d} title="What you can pull">
      <div style={{display: "flex", flexDirection: "column", gap: 28}}>
        {box("#E7F1FF", "#C7DDFB", ELEPHANT, "label_flat.svg", "Competitor prices", pop(d, 0))}
        {box("#FFF1E4", "#FBD9B8", GOLDFISH, "house_flat.svg", "New listings", pop(d, 50))}
        {box("#EAF7EE", "#BFE5C9", OK, "briefcase_flat.svg", "Job posts", pop(d, 84))}
      </div>
    </Card>
  );
};

// 9. "Ready to drop into a sheet": rows land in a sheet
const S9Sheet: React.FC<{d: number}> = ({d}) => {
  const cell = (x: string, w: number, head?: boolean) => (
    <div style={{width: w, padding: "24px 18px", borderRight: "1px solid #D9DEE3", fontWeight: head ? 700 : 500, background: head ? "#E8F0FE" : undefined, boxSizing: "border-box"}}>{x}</div>
  );
  return (
    <Card top={TOP} h={H} d={d} fill={1.25} title="prices · Sheet">
      <div style={{fontFamily: SANS, fontSize: 36, color: INK, border: "1px solid #D9DEE3", borderRadius: 12, overflow: "hidden", width: 704}}>
        <div style={{display: "flex", borderBottom: "1px solid #D9DEE3"}}>{cell("Product", 314, true)}{cell("Price", 180, true)}{cell("Checked", 210, true)}</div>
        {PRODUCTS.map(([n, p], i) => {
          const k = pop(d, 10 + i * 4);
          return (
            <div key={n} style={{display: "flex", borderBottom: "1px solid #D9DEE3", opacity: k, transform: `translateX(${(1 - k) * 40}px)`}}>
              {cell(n, 314)}{cell(p, 180)}{cell("today", 210)}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// 10. "No copy and paste, and no monthly scraping bill"
const S10Zero: React.FC<{d: number}> = ({d}) => {
  const strike = interpolate(d, [2, 14], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const k = pop(d, 34);
  return (
    <Card top={TOP} h={H} d={d} fill={1.3} title="Your cost">
      <div style={{fontFamily: SANS, color: INK, textAlign: "center"}}>
        <div style={{display: "inline-block", position: "relative", fontSize: 60, fontWeight: 800, color: "#59636E", letterSpacing: -1}}>
          Copy and paste
          <div style={{position: "absolute", left: 0, top: "52%", height: 8, width: `${strike}%`, background: BAD, borderRadius: 4}} />
        </div>
        <div style={{marginTop: 36, display: "flex", alignItems: "center", justifyContent: "center", gap: 30, opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>
          <Logo src="money_flat.svg" size={130} />
          <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 180, color: BLUE, lineHeight: 1}}>$0</div>
        </div>
        <div style={{marginTop: 24, fontSize: 54, fontWeight: 800, letterSpacing: -1, opacity: k}}>monthly scraping bill</div>
      </div>
    </Card>
  );
};

// 11. "And sites with heavy bot protection can still block it". The AI-cost catch was dropped (Peter, Nov 18 2026: our own AI
// subscription is never a catch). Shield on "bot protection", the blocked request on "block it".
const S12Bots: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 36), k2 = pop(d, 82);   // "bot protection" ~1.4 s, "block it" ~2.8 s into the line
  return (
    <Card top={TOP} h={H} d={d} fill={1.2} title="Heavy bot protection">
      <div style={{fontFamily: SANS, color: INK, textAlign: "center", paddingTop: 20}}>
        <div style={{opacity: k, transform: `scale(${0.8 + 0.2 * k})`}}><Logo src="shield_flat.svg" size={220} /></div>
        <div style={{marginTop: 22, fontSize: 60, fontWeight: 800, letterSpacing: -1, opacity: k}}>Heavy bot protection</div>
        <div style={{marginTop: 26, display: "inline-flex", alignItems: "center", gap: 18, padding: "14px 26px", borderRadius: 16, background: "#FDEDEC", border: `3px solid ${BAD}`,
          opacity: k2, transform: `scale(${0.85 + 0.15 * k2})`}}>
          <span style={{fontFamily: MONO, fontSize: 44, color: BAD, fontWeight: 700}}>✕ blocked</span>
        </div>
      </div>
    </Card>
  );
};

// 13. "But the tool itself is free and open source": each word lands as it is said
const S13Free: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url="github.com/kalil0321/reverse-api-engineer">
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 46, paddingTop: 60}}>
      <Chip d={d} at={36} text="Free" />
      <Chip d={d} at={54} text="Open source" />
    </div>
  </Card>
);

// 14. "Link's in the description": closing card (kit EndCard look; "Open source" sized to one line)
const S14End: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 3);
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} url={REPO}>
      <div style={{textAlign: "center", paddingTop: 50, opacity: k, transform: `scale(${0.88 + 0.12 * k})`}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 130, color: BLUE, lineHeight: 1, whiteSpace: "nowrap"}}>Open source</div>
        <div style={{marginTop: 70, fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16}}>
          <Icon src="pin_flat.svg" color={BLUE} size={70} />Link in the description</div>
        <div style={{marginTop: 70, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: SANS, fontWeight: 600, fontSize: 38, color: "#59636E"}}>
          <Logo src="github-icon.svg" size={44} />FindingLand/youtube-skills</div>
      </div>
    </Card>
  );
};

export const webtoapi = makeShort({
  slug: "web-to-api",
  words: words as W[],
  fix: {cloud: "Claude", claud: "Claude", plotcode: "Claude Code", "plot code": "Claude Code", sides: "sites", butt: "bot", links: "Link's", lifts: "listings", shift: "sheet", shit: "sheet", "scraping build": "scraping bill"},
  key: ["free", "website", "request", "directly", "whenever", "sheet", "monthly", "block"],
  noun: ["reverse", "api", "engineer", "claude", "code"],
  anchors: [
    ["this free tool", S1Hero], ["it's called", S2Repo], ["you give it", S3Site], ["say every price", S4Shop], ["a browser opens", S5Traffic],
    ["then the ai", S6Code], ["run it whenever", S7Run], ["competitor prices new", S8Uses], ["ready to drop", S9Sheet], ["no copy and", S10Zero],
    ["and sites with", S12Bots], ["but the tool", S13Free], ["link's in the", S14End],
  ],
  // FULL (no face): the name on the real repo page, and the hard part (browser -> traffic -> program). Peter: hard parts = animation only
  full: [["it's called", 5.6], ["a browser opens", 12.2]],
  hookEnd: 1,   // the hook title must be gone before the FULL repo shot (it would sit on the big card)
  hook: {brand: "Free Tool", rest: "Pulls Data", box: "From Any Website", brandColor: "#0085FF"},
  faceSrcTop: 640,
});
