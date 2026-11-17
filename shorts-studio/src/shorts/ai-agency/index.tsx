// AI Agency Short (Nov 17 2026): "283 free AI specialists inside Claude Code" (msitarzewski/agency-agents, MIT).
// Scenes anchored to scripts/ai-agency.txt. Plan + verified facts: client-memories/finding-land-internal/youtube/shorts/05-ai-agency-in-claude-code/plan.md
// Example outputs (Acme...) are illustrative content, clearly tagged EXAMPLE on screen; the install result line is a mock until a real run.
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, EndCard, makeShort, SANS, SERIF, MONO, BLUE, INK, OK, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const FILE = "github.com/msitarzewski/agency-agents";
const SALES = "#E8590C", PROPOSAL = "#2563EB", SUPPORT = "#0F9C8A";
const count = (d: number, to: number, from = 0, len = 24) => Math.round(interpolate(d, [from, from + len], [0, to], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));

// Full-colour Fluent Flat icon in a white rounded square (Nick's logo tiles)
const Tile: React.FC<{src: string; size: number; k?: number}> = ({src, size, k = 1}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 6px 22px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}><Logo src={src} size={size * 0.66} /></div>
);
const Example: React.FC<{d: number; at: number; lines: string[]; step?: number; title: string}> = ({d, at, lines, step = 12, title}) => {
  const k = pop(d, at);
  return (
    <div style={{marginTop: 26, borderRadius: 18, border: "2px dashed #B8C4D2", background: "#F6F8FB", padding: "20px 24px", opacity: k, transform: `translateY(${(1 - k) * 30}px)`}}>
      <div style={{display: "flex", alignItems: "center", gap: 14}}>
        <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, letterSpacing: 2, color: "#fff", background: "#6B7480", borderRadius: 8, padding: "4px 12px"}}>EXAMPLE</span>
        <span style={{fontFamily: SANS, fontWeight: 700, fontSize: 34, color: "#3B434C"}}>{title}</span>
      </div>
      {lines.map((l, i) => {
        const q = pop(d, at + 6 + i * step);
        return <div key={l} style={{marginTop: 12, fontFamily: SANS, fontWeight: 600, fontSize: 38, color: INK, lineHeight: 1.25, opacity: q, transform: `translateX(${(1 - q) * -24}px)`}}>{l}</div>;
      })}
    </div>
  );
};
const AgentHead: React.FC<{d: number; icon: string; name: string; division: string; color: string; role: React.ReactNode}> = ({d, icon, name, division, color, role}) => (
  <div style={{fontFamily: SANS}}>
    <div style={{display: "flex", alignItems: "center", gap: 24}}>
      <Tile src={icon} size={120} k={pop(d, 2)} />
      <div>
        <div style={{fontSize: 28, fontWeight: 700, color, letterSpacing: 2}}>{division}</div>
        <div style={{fontSize: 60, fontWeight: 800, color: INK, letterSpacing: -1.5, lineHeight: 1.05}}>{name}</div>
      </div>
    </div>
    <div style={{marginTop: 22, fontSize: 42, fontWeight: 500, lineHeight: 1.35, color: INK}}>{role}</div>
  </div>
);

// 1 "283 free AI specialists, all inside Claude Code" (hook zone, under the hook title)
const S1Count: React.FC<{d: number}> = ({d}) => {
  const n = count(d, 283, 0, 26);
  const k = pop(d, 26);
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="Claude Code · ~/.claude/agents">
      <div style={{display: "flex", alignItems: "center", gap: 34, fontFamily: SANS}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 230, color: BLUE, lineHeight: 0.95, width: 400, textAlign: "center",
          transform: `scale(${1 + 0.06 * (1 - k)})`}}>{n}</div>
        <div>
          <div style={{fontSize: 58, fontWeight: 800, color: INK, letterSpacing: -1.5, lineHeight: 1.08}}>free AI<br />specialists</div>
          <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 14, opacity: pop(d, 40), fontSize: 40, fontWeight: 700, color: "#3B434C"}}>
            <Logo src="claude-icon.svg" size={54} />inside <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, color: INK}}>Claude Code</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// 2 "It's called Agency Agents, and it has almost 169 thousand stars on GitHub" (GitHub shows "169k")
const S2Repo: React.FC<{d: number}> = ({d}) => {
  const stars = count(d, 169, 14, 30);
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} fill={1.12} url={FILE}>
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 18}}>
          <Logo src="github-icon.svg" size={56} />
          <div style={{fontSize: 44, color: "#1F2328"}}><span style={{color: "#0969DA"}}>msitarzewski</span> / <b style={{color: "#0969DA"}}>agency-agents</b></div>
        </div>
        <div style={{marginTop: 16, fontSize: 34, color: "#3B434C", fontWeight: 500}}><Sweep d={d} from={4} to={18}>A complete AI agency at your fingertips</Sweep></div>
        <div style={{marginTop: 20, display: "flex", flexWrap: "wrap", gap: 14, fontSize: 34, fontWeight: 700, color: "#1F2328"}}>
          <span style={{padding: "8px 18px", border: `3px solid ${BLUE}`, borderRadius: 10, background: "#E7F1FF", color: "#0B3D91", opacity: pop(d, 10)}}>★ {stars}k stars</span>
          {["MIT", "283 agents"].map((x, i) => (
            <span key={x} style={{padding: "8px 18px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 46 + i * 10)}}>{x}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

// 3 "Each agent has one job": 18 divisions, real counts (plan.md, counted Nov 17 2026)
const DIVS: [string, number][] = [["Engineering", 66], ["Specialized", 59], ["Marketing", 37], ["Game Dev", 21], ["GIS", 13], ["Security", 12], ["Design", 10], ["Sales", 9], ["Testing", 9],
  ["Paid Media", 7], ["Project Mgmt", 7], ["Academic", 6], ["Product", 6], ["Spatial", 6], ["Support", 6], ["Finance", 5], ["Healthcare", 3], ["Research", 1]];
const S3Divisions: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url={FILE}>
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "baseline", gap: 18}}>
        <span style={{fontSize: 64, fontWeight: 800, color: INK, letterSpacing: -1.5}}>18 divisions</span>
        <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 56, color: BLUE}}>1 agent, 1 job</span>
      </div>
      <div style={{marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14}}>
        {DIVS.map(([n, c], i) => {
          const k = pop(d, 3 + i * 1.6);
          const hot = n === "Sales" || n === "Support" || n === "Finance";
          return (
            <div key={n} style={{height: 70, borderRadius: 14, background: hot ? "#E7F1FF" : "#F4F6F9", border: `2px solid ${hot ? BLUE : "#D1D9E0"}`, display: "flex", alignItems: "center",
              justifyContent: "space-between", padding: "0 16px", opacity: k, transform: `scale(${0.8 + 0.2 * k})`}}>
              <span style={{fontSize: 29, fontWeight: 700, color: INK}}>{n}</span>
              <span style={{fontSize: 30, fontWeight: 800, color: BLUE}}>{c}</span>
            </div>
          );
        })}
      </div>
    </div>
  </Card>
);

// 4 "Engineers, designers, marketers, sales reps, even a bookkeeper." one row pops per spoken word
const ROLES: [string, string, string, number][] = [["laptop_flat.svg", "Engineers", "66 agents", 0], ["artist_palette_flat.svg", "Designers", "10 agents", 15],
  ["megaphone_flat.svg", "Marketers", "37 agents", 30], ["chart_increasing_flat.svg", "Sales reps", "9 agents", 45], ["ledger_flat.svg", "Bookkeeper", "& Controller", 66]];
const S4Roles: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url={FILE}>
    <div style={{fontFamily: SANS, display: "flex", flexDirection: "column", gap: 14}}>
      {ROLES.map(([src, t, sub, at]) => {
        const k = pop(d, at);
        return (
          <div key={t} style={{display: "flex", alignItems: "center", gap: 28, height: 104, opacity: k, transform: `translateX(${(1 - k) * -40}px)`}}>
            <Tile src={src} size={100} k={k} />
            <span style={{fontSize: 64, fontWeight: 800, color: INK, letterSpacing: -1.5}}>{t}</span>
            <span style={{marginLeft: "auto", fontSize: 34, fontWeight: 600, color: t === "Bookkeeper" ? BLUE : "#59636E"}}>{sub}</span>
          </div>
        );
      })}
    </div>
  </Card>
);

// 5 + 6 "You install them once, and you can ask Claude for any of them by name." one terminal, two states
const Terminal: React.FC<{d: number; ask?: boolean}> = ({d, ask}) => {
  const cmd = "./scripts/install.sh\n  --tool claude-code";
  const prompt = "Use the Proposal Strategist on my call notes";
  const done = ask || d > 30;
  return (
    <Card dark top={TOP} h={H} d={d} title="Terminal · agency-agents">
      <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 10}}><Logo src="claude-icon.svg" size={44} /><Mono c="#8A8A8A" size={32}>Claude Code · ~/agency-agents</Mono></div>
      <Mono c={ask ? "#8A8A8A" : "#fff"} size={46}>{"$ " + (ask ? cmd : typed(cmd, d, 0, 75))}{!done && <Cursor d={d} />}</Mono>
      {done && <Mono c="#5BD68A" size={40}>{"✓ 283 agents copied to\n  ~/.claude/agents/"}</Mono>}
      {ask && (
        <div style={{marginTop: 22}}>
          <Mono c="#fff" size={46}>{"> " + typed(prompt, d, 2, 40)}{d < 40 && <Cursor d={d} />}</Mono>
          {d > 44 && <div style={{display: "flex", alignItems: "center", gap: 14, marginTop: 10}}><Icon src="memo_flat.svg" color="#7AB8FF" size={44} /><Mono c="#7AB8FF" size={40}>Proposal Strategist</Mono></div>}
          {d > 56 && <Mono c="#FFD479" size={36}>{"  ● Read(call-notes.txt)"}</Mono>}
          {d > 66 && <Mono c="#FFD479" size={36}>{"  ● Write(proposal.md)"}</Mono>}
        </div>
      )}
    </Card>
  );
};
const S5Install: React.FC<{d: number}> = ({d}) => <Terminal d={d} />;
const S6Ask: React.FC<{d: number}> = ({d}) => <Terminal d={d} ask />;

// 7 "Here are the three a small business would actually use."
const PICKS: [string, string, string, string][] = [["bullseye_flat.svg", "Outbound Strategist", "Sales", SALES], ["memo_flat.svg", "Proposal Strategist", "Sales", PROPOSAL],
  ["headphone_flat.svg", "Customer Service", "Support", SUPPORT]];
const S7Three: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 0);
  return (
    <Card top={TOP} h={H} d={d} title="For a small business">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 22, opacity: k, marginTop: -16}}>
          <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 170, color: BLUE, lineHeight: 0.95}}>3</span>
          <span style={{fontSize: 70, fontWeight: 800, color: INK, letterSpacing: -1.5}}>of <span style={{color: "#9A9E9F", textDecoration: d > 20 ? "line-through" : "none"}}>283</span></span>
        </div>
        <div style={{marginTop: 18, display: "flex", flexDirection: "column", gap: 18}}>
          {PICKS.map(([src, n, div, c], i) => {
            const q = pop(d, 14 + i * 12);
            return (
              <div key={n} style={{display: "flex", alignItems: "center", gap: 24, padding: "22px 20px", borderRadius: 18, background: "#F6F8FB", border: `3px solid ${c}`, opacity: q, transform: `scale(${0.9 + 0.1 * q})`}}>
                <Tile src={src} size={84} />
                <span style={{fontSize: 50, fontWeight: 800, color: INK, letterSpacing: -1}}>{n}</span>
                <span style={{marginLeft: "auto", fontSize: 30, fontWeight: 700, color: c}}>{div}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

// 8 "The Outbound Strategist picks who to target and plans your cold email sequence."
const S8Outbound: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} fill={1.03} url="agency-agents/sales/sales-outbound-strategist.md">
    <AgentHead d={d} icon="bullseye_flat.svg" name="Outbound Strategist" division="SALES" color={SALES}
      role={<><Sweep d={d} from={8} to={22}>Picks who to target.</Sweep> <Sweep d={d} from={24} to={40}>Plans the cold email sequence.</Sweep></>} />
    <Example d={d} at={36} title="Sequence for Acme Roofing" lines={["Target: roofers, 5 to 50 staff", "Day 1 email · Day 3 call · Day 7 email", "Subject: more jobs this storm season?"]} />
  </Card>
);

// 9 "The Proposal Strategist turns a sales call into a written proposal."
const S9Proposal: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} fill={1.1} url="agency-agents/sales/sales-proposal-strategist.md">
    <AgentHead d={d} icon="memo_flat.svg" name="Proposal Strategist" division="SALES" color={PROPOSAL}
      role={<span style={{display: "flex", alignItems: "center", gap: 16}}>
        <span style={{fontFamily: MONO, fontSize: 36, padding: "6px 14px", borderRadius: 10, background: "#F4F6F9", border: "2px solid #D1D9E0", opacity: pop(d, 6)}}>call-notes.txt</span>
        <span style={{fontWeight: 800, color: PROPOSAL, opacity: pop(d, 14)}}>→</span>
        <span style={{fontFamily: MONO, fontSize: 36, padding: "6px 14px", borderRadius: 10, background: "#E7F1FF", border: `2px solid ${PROPOSAL}`, opacity: pop(d, 22)}}>proposal.md</span>
      </span>} />
    <Example d={d} at={30} title="Proposal for Acme Dental" lines={["Problem: 40 missed calls a week", "Plan: AI books calls, live in 30 days", "Investment: $2,400 one time"]} />
  </Card>
);

// 10 + 11 "And the Customer Service agent handles questions and complaints, and knows when to pass it to a human."
const Bubble: React.FC<{d: number; at: number; me?: boolean; text: string}> = ({d, at, me, text}) => {
  const k = pop(d, at);
  return (
    <div style={{display: "flex", justifyContent: me ? "flex-end" : "flex-start", marginTop: 14, opacity: k, transform: `translateY(${(1 - k) * 24}px)`}}>
      <div style={{maxWidth: 650, padding: "14px 22px", borderRadius: 24, fontFamily: SANS, fontWeight: 600, fontSize: 38, lineHeight: 1.25,
        background: me ? SUPPORT : "#EEF1F4", color: me ? "#fff" : INK}}>{text}</div>
    </div>
  );
};
const Support: React.FC<{d: number; human?: boolean}> = ({d, human}) => (
  <Card top={TOP} h={H} d={d} fill={human ? 1.08 : 1.2} url="agency-agents/specialized/customer-service.md">
    <div style={{display: "flex", alignItems: "center", gap: 20, fontFamily: SANS}}>
      <Tile src="headphone_flat.svg" size={84} />
      <div>
        <div style={{fontSize: 50, fontWeight: 800, color: INK, letterSpacing: -1}}>Customer Service</div>
        <div style={{fontSize: 26, fontWeight: 800, letterSpacing: 2, color: "#fff", background: "#6B7480", borderRadius: 8, padding: "2px 10px", display: "inline-block"}}>EXAMPLE CHAT</div>
      </div>
    </div>
    {human ? <>
      <Bubble d={99} at={0} text="Where is my order #1042?" />
      <Bubble d={d} at={2} text="Third time it's late. I want a manager." />
      <Bubble d={d} at={26} me text="I'm passing you to Sam, our team lead." />
      <div style={{textAlign: "center"}}><Pill ok text="Handed to a human" d={d} at={40} /></div>
    </> : <>
      <Bubble d={d} at={4} text="Where is my order #1042?" />
      <Bubble d={d} at={30} me text="It ships today. Tracking is in your email." />
      <div style={{display: "flex", gap: 14, marginTop: 6}}>
        {["Questions", "Complaints"].map((x, i) => (
          <span key={x} style={{marginTop: 14, padding: "8px 20px", borderRadius: 12, border: `3px solid ${SUPPORT}`, color: SUPPORT, background: "#E6F6F3", fontFamily: SANS, fontWeight: 700, fontSize: 36, opacity: pop(d, 50 + i * 14)}}>{x}</span>
        ))}
      </div>
    </>}
  </Card>
);
const S10Support: React.FC<{d: number}> = ({d}) => <Support d={d} />;
const S11Human: React.FC<{d: number}> = ({d}) => <Support d={d} human />;

// 12 "That's prospecting, closing, and support, without three new hires."
const JOBS: [string, string, string, number][] = [["bullseye_flat.svg", "Prospecting", "Outbound Strategist", 0], ["memo_flat.svg", "Closing", "Proposal Strategist", 30],
  ["headphone_flat.svg", "Support", "Customer Service", 45]];
const S12Recap: React.FC<{d: number}> = ({d}) => {
  const cross = interpolate(d, [70, 82], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <Card top={TOP} h={H} d={d} title="Your new team">
      <div style={{fontFamily: SANS}}>
        {JOBS.map(([src, t, who, at]) => {
          const k = pop(d, at);
          return (
            <div key={t} style={{display: "flex", alignItems: "center", gap: 24, height: 146, opacity: k, transform: `translateX(${(1 - k) * -40}px)`}}>
              <Tile src={src} size={96} k={k} />
              <div>
                <div style={{fontSize: 62, fontWeight: 800, color: INK, letterSpacing: -1.5, lineHeight: 1}}>{t}</div>
                <div style={{fontSize: 30, fontWeight: 600, color: "#59636E", marginTop: 6}}>{who}</div>
              </div>
              <span style={{marginLeft: "auto", fontSize: 64, fontWeight: 900, color: OK}}>✓</span>
            </div>
          );
        })}
        <div style={{marginTop: 34, display: "flex", alignItems: "center", gap: 22, opacity: pop(d, 62)}}>
          <span style={{position: "relative", fontSize: 54, fontWeight: 800, color: "#59636E"}}>3 new hires
            <span style={{position: "absolute", left: 0, top: "52%", height: 7, width: `${cross}%`, background: "#E5534B", borderRadius: 4}} /></span>
          <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 62, color: BLUE, opacity: pop(d, 80)}}>0 new salaries</span>
        </div>
      </div>
    </Card>
  );
};

const S13End: React.FC<{d: number}> = ({d}) => <EndCard d={d} />;

export const aiagency = makeShort({
  slug: "ai-agency",
  words: words as W[],
  fix: {cloud: "Claude", claud: "Claude", agencies: "Agency", "169,000": "169 thousand", links: "Link's"},
  key: ["free", "169", "one", "once", "name", "three", "target", "proposal", "human", "prospecting", "closing", "support", "hires"],
  noun: ["claude", "agency", "agents", "github", "outbound", "strategist", "customer", "service"],
  anchors: [
    ["283 free", S1Count], ["it's called", S2Repo], ["each agent", S3Divisions], ["engineers designers", S4Roles], ["you install", S5Install],
    ["and you can", S6Ask], ["here are", S7Three], ["the outbound", S8Outbound], ["the proposal", S9Proposal], ["and the customer", S10Support],
    ["and knows", S11Human], ["that's prospecting", S12Recap], ["and it's free", S13End],
  ],
  hookEnd: 2,
  hook: {brand: "Claude Code", rest: "Just Got", box: "283 Free Specialists", brandColor: "#D97757"},
  faceSrcTop: 690,
});
