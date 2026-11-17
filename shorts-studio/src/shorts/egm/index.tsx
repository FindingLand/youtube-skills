// EGM Short (Nov 17 2026): "Google's free fix for sloppy AI code". Scenes anchored to the script in scripts/egm.txt.
import React from "react";
import {AbsoluteFill} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, EndCard, makeShort, SANS, SERIF, MONO, BLUE, INK, BAD, ELEPHANT, GOLDFISH, BRAND_GRADIENT, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const S1Repo: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} url="github.com/google/elephant-goldfish-model">
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <Logo src="github-icon.svg" size={56} />
        <div style={{fontSize: 44, color: "#1F2328"}}><span style={{color: "#0969DA"}}>google</span> / <b style={{color: "#0969DA"}}>elephant-goldfish-model</b></div>
      </div>
      <div style={{marginTop: 18, fontSize: 32, color: "#59636E"}}>Open-source plugin for designing and reviewing software with agents</div>
      <div style={{marginTop: 22, display: "flex", gap: 16, fontSize: 32, fontWeight: 600, color: "#1F2328"}}>
        {["★ 20.6k", "Apache-2.0", "Claude Code"].map((x, i) => (
          <span key={x} style={{padding: "8px 18px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 4 + i * 4)}}>{x}</span>
        ))}
      </div>
    </div>
  </Card>
);

const S2Code: React.FC<{d: number}> = ({d}) => {
  const code = "function deliver(lead) {\n  fetch(hook.url, {body: lead})\n}";
  return (
    <Card dark top={HOOK_TOP} h={HOOK_H} d={d} title="Write(src/webhooks/deliver.js)">
      <Mono>{typed(code, d, 0, 60)}<Cursor d={d} /></Mono>
      <div style={{display: "flex", gap: 14}}><Pill text="no retry" d={d} at={18} /><Pill text="errors ignored" d={d} at={28} /></div>
    </Card>
  );
};

const S3Google: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 12);
  return (
    <Card top={TOP} h={H} d={d} url="opensource.googleblog.com">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{display: "flex", alignItems: "center", gap: 14, fontSize: 30, color: "#59636E", fontWeight: 500}}><Logo src="google-icon.svg" size={40} />Google Open Source Blog · Oct 22 2026</div>
        <div style={{marginTop: 22, fontSize: 66, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5}}>Introducing the Elephant Goldfish Model plugin</div>
        <div style={{marginTop: 26, fontSize: 42, lineHeight: 1.4, fontWeight: 500}}><Sweep d={d} from={6} to={20}>Developed for Google's own engineers, now open source.</Sweep></div>
        <div style={{marginTop: 44, display: "flex", alignItems: "center", gap: 30, opacity: k, transform: `scale(${0.85 + 0.15 * k})`, transformOrigin: "left center"}}>
          <div style={{width: 150, height: 150, borderRadius: 32, background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center"}}><Logo src="google-icon.svg" size={104} /></div>
          <div style={{fontSize: 56, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1}}>Built by <span style={{background: BRAND_GRADIENT, WebkitBackgroundClip: "text", color: "transparent"}}>Google</span><br /><span style={{fontFamily: SERIF, fontStyle: "italic", color: BLUE}}>Free for everyone</span></div>
        </div>
      </div>
    </Card>
  );
};

const S4Explainer: React.FC<{d: number}> = ({d}) => {
  const a = pop(d, 2), b = pop(d, 7);
  const box = (bg: string, line: string, c: string, icon: string, t: string, sub: string, k: number) => (
    <div style={{flex: 1, borderRadius: 22, background: bg, border: `2px solid ${line}`, padding: "40px 20px", textAlign: "center", opacity: k, transform: `scale(${0.9 + 0.1 * k})`, filter: `blur(${(1 - k) * 8}px)`}}>
      <Icon src={icon} color={c} size={190} />
      <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 76, color: c, marginTop: 10}}>{t}</div>
      <div style={{fontFamily: SANS, fontWeight: 600, fontSize: 40, color: "#3B434C", marginTop: 8}}>{sub}</div>
    </div>
  );
  return (
    <AbsoluteFill>
      <div style={{position: "absolute", top: 200, width: "100%", textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 70, color: INK, letterSpacing: -1.5}}>Elephant-Goldfish Model</div>
      <div style={{position: "absolute", top: 320, left: 60, right: 60, display: "flex", gap: 28}}>
        {box("#E7F1FF", "#C7DDFB", ELEPHANT, "elephant_flat.svg", "Elephant", "Remembers everything", a)}
        {box("#FFF1E4", "#FBD9B8", GOLDFISH, "fish_flat.svg", "Goldfish", "Remembers nothing", b)}
      </div>
    </AbsoluteFill>
  );
};

const S5Terminal: React.FC<{d: number}> = ({d}) => {
  const cmd = "/egm:egm-brainstorm Add webhook delivery";
  const lines = ["Read(src/server.js)", "Read(src/leads.js)", "Read(README.md)", "Write(concepts_brief.md)"];
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.12} title="Claude Code · ~/lead-inbox">
      <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="claude-icon.svg" size={44} /><Mono c="#8A8A8A" size={34}>Claude Code · egm@egm loaded</Mono></div>
      <Mono c="#fff">{"> " + typed(cmd, d, 0, 70)}{d < 20 && <Cursor d={d} />}</Mono>
      {d > 16 && <div style={{display: "flex", alignItems: "center", gap: 12, marginTop: 6}}><Icon src="elephant_flat.svg" color={ELEPHANT} size={46} /><Mono c="#7AB8FF" size={40}>Elephant · full context</Mono></div>}
      {lines.map((l, i) => d > 22 + i * 5 && <Mono key={l} c={l.startsWith("Write") ? "#FFD479" : "#5BD68A"} size={36}>{"  ● " + l}</Mono>)}
    </Card>
  );
};

const S6Plan: React.FC<{d: number}> = ({d}) => {
  const issues = ["Same lead created twice in HubSpot", "Bad email retries 24h, then lost", "Alert can fail silently", "Lead list exposed with no login"];
  return (
    <Card top={TOP} h={H} d={d} fill={0.92} title="concepts_brief.md">
      <div style={{fontFamily: SANS, color: INK, position: "relative"}}>
        <div style={{fontSize: 30, color: "#59636E", fontWeight: 500}}>Here's the plan</div>
        <div style={{marginTop: 4, fontSize: 68, fontWeight: 800, letterSpacing: -1.5}}>Lead notifications</div>
        <div style={{marginTop: 8, fontSize: 34, lineHeight: 1.5, color: "#3B434C", fontWeight: 500}}>DELIVERY  retry with backoff, 24h<br />STORAGE  SQLite outbox<br />DEDUPE  search HubSpot by email</div>
        <div style={{position: "absolute", right: 0, top: 0, display: "flex", gap: 4}}>
          {[0, 1, 2, 3].map((i) => <Icon key={i} src="fish_flat.svg" color={GOLDFISH} size={60} style={{opacity: pop(d, 2 + i * 4), transform: `translateY(${(1 - pop(d, 2 + i * 4)) * -60}px)`}} />)}
        </div>
        <div style={{marginTop: 10}}>{issues.map((t, i) => <div key={t}><Pill text={t} d={d} at={4 + i * 8} /></div>)}</div>
      </div>
    </Card>
  );
};

const Review: React.FC<{d: number; goldfish?: boolean}> = ({d, goldfish}) => (
  <Card top={TOP} h={H} d={d} fill={goldfish ? 1.32 : 1.3} url="github.com/lead-inbox/pull/12">
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 14}}>
        <Icon src={goldfish ? "fish_flat.svg" : "elephant_flat.svg"} color={goldfish ? GOLDFISH : ELEPHANT} size={64} />
        <div style={{fontSize: 46, fontWeight: 800, color: goldfish ? GOLDFISH : ELEPHANT, letterSpacing: -0.5}}>{goldfish ? "Goldfish · fresh eyes" : "Elephant · own plan"}</div>
      </div>
      <div style={{marginTop: 14, borderRadius: 12, border: "1px solid #D1D9E0", overflow: "hidden"}}>
        <div style={{fontFamily: MONO, fontSize: 36, padding: "6px 16px", background: goldfish ? "#FFEBE9" : "#fff"}}><span style={{color: "#777"}}>12 </span> createContact(lead)</div>
        <div style={{fontFamily: MONO, fontSize: 36, padding: "6px 16px", background: goldfish ? "#fff" : "#FFF8C5"}}><span style={{color: "#777"}}>13 </span> markSent(lead.id)</div>
      </div>
      {goldfish ? (
        d > 12 && <div style={{marginTop: 14, padding: "12px 16px", borderLeft: `6px solid ${BAD}`, background: "#FDEDEC", fontSize: 36, color: "#8E1B14", fontWeight: 500}}>If the reply is lost, the retry creates the contact twice.<div style={{marginTop: 8}}><Pill text="Changes requested" d={d} at={18} /></div></div>
      ) : (
        d > 6 && <div style={{marginTop: 14, padding: "12px 16px", borderLeft: `6px solid ${ELEPHANT}`, background: "#E7F1FF", fontSize: 36, color: "#0B3D91", fontWeight: 500}}>Looks right to me. I wrote it.<div style={{marginTop: 8}}><Pill ok text="Elephant approved" d={d} at={10} /></div></div>
      )}
    </div>
  </Card>
);
const S7Elephant: React.FC<{d: number}> = ({d}) => <Review d={d} />;
const S8Goldfish: React.FC<{d: number}> = ({d}) => <Review d={d} goldfish />;

const S9Approve: React.FC<{d: number}> = ({d}) => (
  <Card dark top={TOP} h={H} d={d} title="Claude Code · ~/lead-inbox">
    <Mono c="#fff" size={54}>Ready to code?</Mono>
    <Mono c="#9A9A9A" size={38}>{`Lead notifications · 4 steps
 1. SQLite outbox
 2. Retry worker
 3. HubSpot upsert by email
 4. Failure alert`}</Mono>
    <div style={{marginTop: 16, padding: "12px 20px", borderRadius: 12, background: d > 18 ? BLUE : "#2A2A2A"}}><Mono c="#fff" size={44}>❯ 1. Yes, approve the plan</Mono></div>
    <Mono c="#5BD68A" size={40}>{d > 28 ? `✓ User approved the plan
  Building… (esc to interrupt)` : "  Waiting for your approval…"}</Mono>
  </Card>
);

const S10Cost: React.FC<{d: number}> = ({d}) => (
  <Card dark top={TOP} h={H} d={d} fill={1.2} title="Claude Code · ~/lead-inbox · no review">
    {[0, 1, 2, 3].map((i) => (i === 0 || d > i * 10) && (
      <div key={i}><Mono size={42}>{"> fixing deliver.js"}</Mono><Mono c={BAD} size={42}>{"  ✕ tests failed"}</Mono></div>
    ))}
  </Card>
);

const S11End: React.FC<{d: number}> = ({d}) => <EndCard d={d} />;

export const egm = makeShort({
  slug: "egm",
  words: words as W[],
  fix: {kind: "kinds", links: "Link", modal: "Model", gup: "gap", bags: "bugs", kept: "get", off: "of"},
  key: ["sloppy", "free", "engineers", "plan", "zero", "blind", "mistakes", "seconds", "approve", "paper", "hours", "tokens"],
  noun: ["google", "elephant", "goldfish", "model", "claude"],
  anchors: [
    ["google just", S1Repo], ["fix for", S2Code], ["they built", S3Google], ["it's called", S4Explainer], ["you give", S5Terminal],
    ["the goldfish", S6Plan], ["every", S7Elephant], ["someone who", S8Goldfish], ["claude only", S9Approve], ["so the", S10Cost],
    ["and it's free", S11End],
  ],
  hookEnd: 2,
  hook: {brand: "Google's", rest: "Free Fix For", box: "Sloppy AI Code"},
  faceSrcTop: 690,
});
