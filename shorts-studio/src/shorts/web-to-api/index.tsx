// Web-to-API Short (Nov 17 2026): "Claude Code reads almost any website". Scenes anchored to scripts/web-to-api.txt.
// Repo facts verified Nov 17 2026 (plan.md + GitHub API): kalil0321/reverse-api-engineer, 3,815 stars, MIT, Python.
// shop.example.com (reserved example domain) and every product / price below are ILLUSTRATIVE mocks of a fictional shop, not a real run.
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, makeShort, SANS, SERIF, MONO, BLUE, INK, OK, BAD, GOLDFISH, ELEPHANT, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const SHOP = "shop.example.com";
const PRODUCTS: [string, string][] = [["Desk Lamp", "$24.00"], ["Office Chair", "$31.00"], ["Notebook Set", "$19.00"], ["Water Bottle", "$12.50"]];

// 1. "This free tool": the real repo page
const S1Repo: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} fill={1.12} url="github.com/kalil0321/reverse-api-engineer">
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Logo src="github-icon.svg" size={50} />
        <div style={{fontSize: 40, color: "#1F2328"}}><span style={{color: "#0969DA"}}>kalil0321</span> / <b style={{color: "#0969DA"}}>reverse-api-engineer</b></div>
      </div>
      <div style={{marginTop: 26, fontSize: 32, color: "#3B434C", lineHeight: 1.35}}><Sweep d={d} from={8} to={30}>Reverse engineer any website into a typed API client.</Sweep></div>
      <div style={{marginTop: 30, display: "flex", gap: 14, fontSize: 34, fontWeight: 600, color: "#1F2328"}}>
        {["★ 3.8k", "MIT", "Python"].map((x, i) => (
          <span key={x} style={{padding: "6px 16px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 30 + i * 8)}}>{x}</span>
        ))}
      </div>
    </div>
  </Card>
);

// 2. "It's called Reverse": name + Claude Code
const S2Name: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 30);
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="Reverse API Engineer">
      <div style={{fontFamily: SANS, color: INK, textAlign: "center"}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 92, color: BLUE, lineHeight: 1.05, letterSpacing: -1}}>Reverse API Engineer</div>
        <div style={{marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>
          <div style={{fontSize: 50, fontWeight: 800, letterSpacing: -1}}>works inside</div>
          <div style={{width: 96, height: 96, borderRadius: 24, background: "#fff", boxShadow: "0 8px 26px rgba(0,0,0,.14)", display: "flex", alignItems: "center", justifyContent: "center"}}><Logo src="claude-icon.svg" size={66} /></div>
          <div style={{fontSize: 50, fontWeight: 800, letterSpacing: -1}}>Claude Code</div>
        </div>
      </div>
    </Card>
  );
};

// 3. "You give it": terminal, the ask, the browser starting
const S3Ask: React.FC<{d: number}> = ({d}) => {
  const ask = "> get every price from\n  " + SHOP;
  const steps = ["● Launching browser", "● Visiting " + SHOP, "● Recording traffic"];
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.45} title="Terminal · ~/projects">
      <Mono c="#fff" size={44}>{"$ " + typed("reverse-api-engineer", d, 0, 70)}{d < 9 && <Cursor d={d} />}</Mono>
      {d > 8 && <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="claude-icon.svg" size={40} /><Mono c="#8A8A8A" size={32}>Reverse API Engineer · ready</Mono></div>}
      {d > 10 && <Mono c="#7AB8FF" size={44}>{typed(ask, d, 8, 100)}{d < 8 + 22 && <Cursor d={d} />}</Mono>}
      {steps.map((x, i) => d > 24 + i * 8 && <Mono key={x} c="#5BD68A" size={36}>{x}</Mono>)}
    </Card>
  );
};

// 4. "Say, every price": the fictional shop page, every price highlighted
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
              <div style={{marginTop: 2, fontSize: 46, fontWeight: 800}}><Sweep d={d} from={26 + i * 4} to={34 + i * 4}>{p}</Sweep></div>
            </div>
          );
        })}
      </div>
    </div>
  </Card>
);

// 5. "A browser opens": live list of the requests the page makes
const REQS: [string, string, string][] = [
  ["GET", "/shop", "200"], ["GET", "/static/app.js", "200"], ["GET", "/api/products?page=1", "200"], ["GET", "/api/products?page=2", "200"],
  ["GET", "/api/prices?ids=1,2,3", "200"], ["POST", "/api/cart/view", "204"], ["GET", "/api/products?page=3", "200"], ["GET", "/api/stock?ids=1,2,3", "200"],
];
const S5Traffic: React.FC<{d: number}> = ({d}) => {
  const n = Math.min(REQS.length, Math.max(0, Math.floor(d / 4) + 1));
  return (
    <Card dark top={TOP} h={H} d={d} title={"Browser · " + SHOP + " · recording"}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Icon src="globe_flat.svg" color="#7AB8FF" size={54} />
        <Mono c="#fff" size={44}>Network</Mono>
        <div style={{marginLeft: "auto", display: "flex", alignItems: "center", gap: 10}}>
          <div style={{width: 22, height: 22, borderRadius: 11, background: BAD, opacity: Math.floor(d / 12) % 2 ? 0.35 : 1}} />
          <Mono c="#FF8A80" size={36}>{`REC · ${n}`}</Mono>
        </div>
      </div>
      <div style={{marginTop: 10}}>
        {REQS.slice(0, n).map(([m, p, c], i) => {
          const api = p.startsWith("/api/products");
          return (
            <div key={i} style={{display: "flex", gap: 18, fontFamily: MONO, fontSize: 40, lineHeight: 1.45, padding: "0 10px", borderRadius: 8, background: api ? "rgba(0,133,255,.25)" : "transparent", opacity: pop(d, i * 4)}}>
              <span style={{color: m === "GET" ? "#5BD68A" : "#FFD479", width: 100}}>{m}</span>
              <span style={{color: api ? "#fff" : "#B8B8B8", flex: 1}}>{p}</span>
              <span style={{color: "#8A8A8A"}}>{c}</span>
            </div>
          );
        })}
      </div>
      {d > 44 && <div style={{marginTop: 8}}><Mono c="#5BD68A" size={36}>✓ Saved 8 requests · traffic.har</Mono></div>}
    </Card>
  );
};

// 6. "Then the AI": the generated client, typing
const S6Code: React.FC<{d: number}> = ({d}) => {
  const code = `class StoreClient:
  def get_products(self, page=1):
    r = self.get("/api/products",
                 page=page)
    return r["items"]`;
  const CPS = 200;
  const t = typed(code, d, 2, CPS);
  const done = t.length === code.length;
  const doneAt = 2 + Math.ceil((code.length / CPS) * 30);
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.1} title="Write(example_store/api_client.py)">
      <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 8}}><Logo src="python.svg" size={44} /><Mono c="#8A8A8A" size={32}>AI read 8 requests · writing client</Mono></div>
      <Mono size={40}>{t}{!done && <Cursor d={d} />}</Mono>
      {done && <div style={{marginTop: 14, padding: "8px 18px", borderRadius: 12, border: "2px solid #3A3A3A", background: "#232323"}}>
        <Mono c="#5BD68A" size={40}>{">>> " + typed("client.get_products()", d, doneAt + 4, 24)}</Mono>
      </div>}
      <div style={{display: "flex", gap: 14}}><Pill ok text="asks the site directly" d={d} at={doneAt + 30} /></div>
    </Card>
  );
};

// 7. "Run it whenever": run the program, JSON comes back
const S7Run: React.FC<{d: number}> = ({d}) => (
  <Card dark top={TOP} h={H} d={d} fill={1.25} title="Terminal · ~/projects">
    <Mono c="#fff" size={36}>{"$ " + typed("python example_usage.py", d, 0, 70)}{d < 10 && <Cursor d={d} />}</Mono>
    {PRODUCTS.map(([n, p], i) => d > 4 + i * 3 && (
      <Mono key={n} c="#FFD479" size={30}>{`${i === 0 ? "[" : " "}{"name": "${n}", "price": ${p.slice(1)}}${i === PRODUCTS.length - 1 ? "]" : ","}`}</Mono>
    ))}
    {d > 16 && <div style={{marginTop: 20}}><Mono c="#5BD68A" size={64}>✓ 4 prices pulled</Mono></div>}
    <div><Pill ok text="No browser, no clicking" d={d} at={20} /></div>
  </Card>
);

// 8. "Competitor prices, new": three uses
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
        {box("#FFF1E4", "#FBD9B8", GOLDFISH, "house_flat.svg", "New listings", pop(d, 6))}
        {box("#EAF7EE", "#BFE5C9", OK, "briefcase_flat.svg", "Job posts", pop(d, 12))}
      </div>
    </Card>
  );
};

// 9. "Ready to drop": rows land in a sheet
const S9Sheet: React.FC<{d: number}> = ({d}) => {
  const cell = (x: string, w: number, head?: boolean, bg?: string) => (
    <div style={{width: w, padding: "14px 18px", borderRight: "1px solid #D9DEE3", fontWeight: head ? 700 : 500, background: head ? "#E8F0FE" : bg, boxSizing: "border-box"}}>{x}</div>
  );
  return (
    <Card top={TOP} h={H} d={d} fill={1.25} title="prices · Sheet">
      <div style={{fontFamily: SANS, fontSize: 36, color: INK, border: "1px solid #D9DEE3", borderRadius: 12, overflow: "hidden", width: 704}}>
        <div style={{display: "flex", borderBottom: "1px solid #D9DEE3"}}>{cell("Product", 314, true)}{cell("Price", 180, true)}{cell("Checked", 210, true)}</div>
        {PRODUCTS.map(([n, p], i) => {
          const k = pop(d, i * 3);
          return (
            <div key={n} style={{display: "flex", borderBottom: "1px solid #D9DEE3", opacity: k, transform: `translateX(${(1 - k) * 40}px)`}}>
              {cell(n, 314)}{cell(p, 180, false, d > 34 && i === 1 ? "#FFF8C5" : undefined)}{cell("today", 210)}
            </div>
          );
        })}
      </div>
      <div style={{marginTop: 6}}><Pill ok text="Ready to use" d={d} at={8} /></div>
    </Card>
  );
};

// 10. "No copy and": no manual work, no monthly bill
const S10Zero: React.FC<{d: number}> = ({d}) => {
  const strike = interpolate(d, [4, 16], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const k = pop(d, 14), k2 = pop(d, 34);
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
        <div style={{marginTop: 24, fontSize: 54, fontWeight: 800, letterSpacing: -1, opacity: k2}}>monthly scraping bill</div>
        <Pill ok text="No scraping subscription" d={d} at={50} />
      </div>
    </Card>
  );
};

// 11-12. "Two catches": the AI model bills each build; bot protection can block
const Catches: React.FC<{d: number; second?: boolean}> = ({d, second}) => {
  const cents = interpolate(d, [10, 40], [0, 11], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const k = pop(d, 2);
  if (!second) return (
    <Card top={TOP} h={H} d={d} fill={1.3} title="Two catches">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 66, fontWeight: 800, letterSpacing: -1.5}}>Two catches</div>
        <div style={{marginTop: 16, borderRadius: 22, background: "#FFF1E4", border: "2px solid #FBD9B8", padding: "22px 26px", textAlign: "center"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 24}}>
            <Logo src="coin_flat.svg" size={120} />
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 140, color: GOLDFISH, lineHeight: 1}}>{`$${(Math.round(cents) / 100).toFixed(2)}`}</div>
          </div>
          <div style={{marginTop: 10, fontSize: 42, fontWeight: 700}}>AI model cost per build</div>
          <Pill text="billed per build (their demo)" d={d} at={44} />
        </div>
      </div>
    </Card>
  );
  return (
    <Card top={TOP} h={H} d={30} fill={1.0} title="Two catches">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 66, fontWeight: 800, letterSpacing: -1.5}}>Two catches</div>
        <div style={{marginTop: 14, borderRadius: 22, background: "#FFF1E4", border: "2px solid #FBD9B8", padding: "18px 26px", display: "flex", alignItems: "center", gap: 26}}>
          <Logo src="coin_flat.svg" size={96} />
          <div>
            <div style={{fontSize: 40, fontWeight: 700}}>AI model cost per build</div>
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 80, color: GOLDFISH, lineHeight: 1.05}}>$0.11</div>
            <Pill text="billed per build" d={99} at={44} />
          </div>
        </div>
        {second && (
          <div style={{marginTop: 18, borderRadius: 22, background: "#FDEDEC", border: "2px solid #F5C2BE", padding: "18px 26px", display: "flex", alignItems: "center", gap: 26, opacity: k, transform: `scale(${0.9 + 0.1 * k})`}}>
            <Logo src="shield_flat.svg" size={96} />
            <div>
              <div style={{fontSize: 40, fontWeight: 700}}>Heavy bot protection</div>
              <div style={{fontFamily: MONO, fontSize: 34, color: BAD, marginTop: 6}}>{d > 24 ? "GET /api/products  403" : "GET /api/products  …"}</div>
              <Pill text="can still block it" d={d} at={40} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
const S11Cost: React.FC<{d: number}> = ({d}) => <Catches d={d} />;
const S12Bots: React.FC<{d: number}> = ({d}) => <Catches d={d} second />;

// 13. "But the tool": install line, open source
const S13Install: React.FC<{d: number}> = ({d}) => (
  <Card dark top={TOP} h={H} d={d} fill={1.4} title="Terminal · install">
    <Mono c="#fff" size={46}>{typed("$ uv tool install\n    reverse-api-engineer", d, 0, 100)}{d < 14 && <Cursor d={d} />}</Mono>
    {d > 15 && <Mono c="#5BD68A" size={40}>✓ Installed</Mono>}
    <div style={{marginTop: 20, display: "flex", gap: 18}}>
      {["Open source", "MIT", "Free tool"].map((x, i) => (
        <div key={x} style={{padding: "12px 18px", borderRadius: 14, border: "3px solid #2E6FD1", background: "#0F2A4D", color: "#fff", fontFamily: SANS, fontWeight: 800, fontSize: 36, opacity: pop(d, 18 + i * 6), transform: `scale(${0.85 + 0.15 * pop(d, 18 + i * 6)})`}}>{x}</div>
      ))}
    </div>
    <div style={{marginTop: 22, display: "flex", alignItems: "center", gap: 14, opacity: pop(d, 34)}}>
      <div style={{width: 52, height: 52, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center"}}><Logo src="github-icon.svg" size={40} /></div>
      <Mono c="#B8B8B8" size={32}>kalil0321/reverse-api-engineer</Mono>
    </div>
  </Card>
);

// 14. "Link's in the": closing card. Same look as kit EndCard, but "Open source" at 150 px wraps and pushed the
// repo line out of the card, so this copy sizes the big line to fit on one line.
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
  fix: {cloud: "Claude", claud: "Claude", plotcode: "Claude Code", links: "Link's", lifts: "listings", shift: "sheet", shit: "sheet", "scraping build": "scraping bill", builds: "bills", "11": "eleven", "your demo": "their demo"},
  key: ["free", "website", "request", "directly", "whenever", "sheet", "monthly", "catches", "cents", "block"],
  noun: ["reverse", "api", "engineer", "claude", "code"],
  anchors: [
    ["this free tool", S1Repo], ["it's called", S2Name], ["you give it", S3Ask], ["say every price", S4Shop], ["a browser opens", S5Traffic],
    ["then the ai", S6Code], ["run it whenever", S7Run], ["competitor prices new", S8Uses], ["ready to drop", S9Sheet], ["no copy and", S10Zero],
    ["two catches", S11Cost], ["and sites with", S12Bots], ["but the tool", S13Install], ["link's in the", S14End],
  ],
  hookEnd: 2,
  hook: {brand: "Claude Code", rest: "Reads", box: "Almost Any Website", brandColor: "#D97757"},
  faceSrcTop: 640,
});
