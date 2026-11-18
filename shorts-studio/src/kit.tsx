// Shared Shorts kit: design tokens, building blocks, captions, face card, hook title, and makeShort() which turns one
// Short's config (words.json + scenes anchored to script phrases) into a Remotion component.
// A new Short = src/shorts/<slug>/index.tsx (scenes + config) + words.json. No layout code per Short.
import React from "react";
import {AbsoluteFill, OffthreadVideo, Audio, Img, staticFile, useCurrentFrame, interpolate, spring, Sequence} from "remotion";
import {loadFont as loadInter} from "@remotion/google-fonts/Inter";
import {loadFont as loadPlayfair} from "@remotion/google-fonts/PlayfairDisplay";

// ---------- design tokens: skills/youtube/references/nick-style-spec.md (measured from Nick Automates, Nov 17 2026) ----------
export const SANS = loadInter("normal", {weights: ["500", "600", "700", "800", "900"], subsets: ["latin"]}).fontFamily;
export const SERIF = loadPlayfair("italic", {weights: ["700", "800"], subsets: ["latin"]}).fontFamily;
export const MONO = "Consolas, 'Cascadia Code', monospace";
export const BLUE = "#0085FF";          // highlight box, keywords
export const BORDER = "#2174D1";        // card border
export const GLOW = "#89BEF7";          // card outer glow
export const INK = "#111617";           // spoken words, titles
export const GREY = "#9A9E9F";          // upcoming words
export const ELEPHANT = "#126EFA", GOLDFISH = "#F57300", OK = "#2EA043", BAD = "#E5534B", CURSOR = "#E37E55";
export const BRAND_GRADIENT = "linear-gradient(90deg,#FF7828,#FFA412,#A4AF2A,#25A958,#0F9C8A,#1E91C8,#2B86FF)";
export const FPS = 30;
export const s = (sec: number) => Math.round(sec * FPS);
export const TOP = 160, H = 740, HOOK_TOP = 470, HOOK_H = 440;
export const REPO = "github.com/FindingLand/youtube-skills";

export type Scene = React.FC<{d: number}>;
export type W = {w: string; s: number; e: number};

// ---------- building blocks ----------
export const pop = (d: number, delay = 0) => spring({frame: d - delay, fps: FPS, config: {damping: 14, stiffness: 170}});

// Flat icon in an exact colour: Fluent Flat SVG used as a mask (Nick uses flat silhouettes, not emoji)
export const Icon: React.FC<{src: string; color: string; size: number; style?: React.CSSProperties}> = ({src, color, size, style}) => (
  <div style={{width: size, height: size, background: color, WebkitMaskImage: `url(${staticFile("assets/" + src)})`, WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center", display: "inline-block", flexShrink: 0, ...style}} />
);
export const Logo: React.FC<{src: string; size: number; style?: React.CSSProperties}> = ({src, size, style}) => (
  <Img src={staticFile("assets/" + src)} style={{width: size, height: size, objectFit: "contain", flexShrink: 0, ...style}} />
);

export const Card: React.FC<{children: React.ReactNode; dark?: boolean; title?: string; url?: string; top: number; h: number; d: number; fill?: number}> = ({children, dark, title, url, top, h, d, fill = 1}) => {
  const k = pop(d);
  const BAR = 56;
  return (
    <div style={{position: "absolute", left: 60, right: 60, top, height: h, borderRadius: 26, background: dark ? "#1A1A1A" : "#fff",
      border: `3px solid ${BORDER}`, boxShadow: `0 0 0 1px ${dark ? "#052756" : "#BCEDFF"} inset, 0 0 14px ${GLOW}, 0 0 40px ${GLOW}88${dark ? "" : `, inset 0 0 12px #BCEDFF`}`,
      overflow: "hidden", transform: `scale(${0.95 + 0.05 * k})`, opacity: k, filter: `blur(${(1 - k) * 10}px)`}}>
      <div style={{height: BAR, position: "relative", display: "flex", alignItems: "center", gap: 12, padding: "0 22px", background: dark ? "#1D1D1B" : "#F4F6F9", borderBottom: dark ? "1px solid #2A2A2A" : "1px solid #E1E5EA"}}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />)}
        <div style={{position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontWeight: 500, fontSize: 24, color: dark ? "#8A8A8A" : "#6B7480"}}>
          {url ? <span style={{background: "#fff", border: "1px solid #E1E5EA", borderRadius: 10, padding: "6px 26px"}}>{url}</span> : title}
        </div>
      </div>
      <div style={{padding: 34, height: h - BAR, boxSizing: "border-box"}}><div style={{zoom: fill}}>{children}</div></div>
    </div>
  );
};

export const typed = (text: string, d: number, start = 0, cps = 18) => text.slice(0, Math.max(0, Math.floor(((d - start) / FPS) * cps)));
export const Cursor: React.FC<{d: number}> = ({d}) => <span style={{display: "inline-block", width: "0.55em", height: "1em", background: CURSOR, verticalAlign: "-0.12em", opacity: Math.floor(d / 15) % 2 ? 0.3 : 1}} />;
export const Mono: React.FC<{children: React.ReactNode; c?: string; size?: number}> = ({children, c = "#E6E6E6", size = 40}) => (
  <div style={{fontFamily: MONO, fontSize: size, color: c, lineHeight: 1.45, whiteSpace: "pre-wrap"}}>{children}</div>
);
export const Pill: React.FC<{text: string; d: number; at: number; ok?: boolean}> = ({text, d, at, ok}) => {
  const k = pop(d, at);
  const c = ok ? OK : BAD;
  return (
    <div style={{display: "inline-flex", alignItems: "center", gap: 12, marginTop: 14, padding: "10px 22px", borderRadius: 14, border: `3px solid ${c}`, background: ok ? "#EAF7EE" : "#FDEDEC",
      color: c, fontFamily: SANS, fontWeight: 700, fontSize: 38, opacity: k, transform: `scale(${0.85 + 0.15 * k})`, transformOrigin: "left center"}}>
      <span style={{fontWeight: 900}}>{ok ? "✓" : "✕"}</span>{text}
    </div>
  );
};
export const Sweep: React.FC<{d: number; from: number; to: number; children: React.ReactNode}> = ({d, from, to, children}) => (
  <span style={{background: `linear-gradient(90deg, #B3D7FF ${interpolate(d, [from, to], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}%, transparent 0)`, padding: "0 4px"}}>{children}</span>
);

// ---------- reusable scenes ----------
// GitHub repo card: owner/name, one-line description, badges popping in
export const RepoCard: React.FC<{d: number; owner: string; name: string; desc: string; badges: string[]; top?: number; h?: number; fill?: number}> = ({d, owner, name, desc, badges, top = TOP, h = H, fill = 1}) => (
  <Card top={top} h={h} d={d} fill={fill} url={`github.com/${owner}/${name}`}>
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <Logo src="github-icon.svg" size={56} />
        <div style={{fontSize: 44, color: "#1F2328"}}><span style={{color: "#0969DA"}}>{owner}</span> / <b style={{color: "#0969DA"}}>{name}</b></div>
      </div>
      <div style={{marginTop: 18, fontSize: 32, color: "#59636E"}}>{desc}</div>
      <div style={{marginTop: 22, display: "flex", flexWrap: "wrap", gap: 16, fontSize: 32, fontWeight: 600, color: "#1F2328"}}>
        {badges.map((x, i) => <span key={x} style={{padding: "8px 18px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 4 + i * 4)}}>{x}</span>)}
      </div>
    </div>
  </Card>
);

// Closing card: "It's free" (or any line) + link to OUR repo (skills/youtube/shorts-guide.md: never the original author's)
export const EndCard: React.FC<{d: number; big?: string; folder?: string}> = ({d, big = "It's free", folder}) => {
  const k = pop(d, 3);
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} url={REPO}>
      <div style={{textAlign: "center", paddingTop: 70, opacity: k, transform: `scale(${0.88 + 0.12 * k})`}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 150, color: BLUE, lineHeight: 1}}>{big}</div>
        <div style={{marginTop: 50, fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16}}>
          <Icon src="pin_flat.svg" color={BLUE} size={70} />Link in the description</div>
        <div style={{marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: SANS, fontWeight: 600, fontSize: 34, color: "#59636E"}}>
          <Logo src="github-icon.svg" size={44} />FindingLand/youtube-skills{folder ? "/" + folder : ""}</div>
      </div>
    </Card>
  );
};

// ---------- one Short ----------
export type ShortConfig = {
  slug: string;                       // public/<slug>/face.mp4 + wall.jpg, composition id
  words: W[];                         // words.json of the CUT video (transcribe.py)
  fix?: Record<string, string>;       // Whisper spelling -> script spelling, lower-case keys
  key?: string[];                     // caption words in blue serif italic (one per idea)
  noun?: string[];                    // brand / proper nouns in serif italic
  anchors: [string, Scene][];         // [first words of the line where the scene starts, scene]; the first one starts at 0
  hookEnd: number;                    // hook title shows until anchors[hookEnd] starts
  hook: {brand: string; rest: string; box: string; brandColor?: string}; // line 1: brand word (gradient, or brandColor) + rest, line 2: blue italic box
  faceSrcTop?: number;                // source y (of 1920) shown at the face card's top edge: ~60 px above the hair
};

const FACE_CARD_TOP = 1040;
const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9']/g, "");

export const makeShort = (cfg: ShortConfig) => {
  const FIX = cfg.fix ?? {};
  const KEY = new Set(cfg.key ?? []), NOUN = new Set(cfg.noun ?? []);
  const words: W[] = cfg.words.map((x) => {
    const m = x.w.match(/^(.*?)([.,!?]?)$/)!;
    const f = FIX[m[1].toLowerCase()];
    return {...x, w: f ? f + m[2] : x.w};
  });
  const pages: W[][] = [];
  {
    let cur: W[] = [];
    words.forEach((w, i) => {
      cur.push(w);
      const next = words[i + 1];
      const chars = cur.reduce((a, x) => a + x.w.length + 1, 0);
      const brk = /[.,!?]$/.test(w.w) || cur.length >= 3 || chars + (next?.w.length ?? 0) > 17 || (next && next.s - w.e > 0.25);
      if (brk || !next) { pages.push(cur); cur = []; }
    });
  }
  const bare = (w: string) => w.toLowerCase().replace(/[.,!?']/g, "");

  const Captions: React.FC = () => {
    const t = useCurrentFrame() / FPS;
    const page = pages.find((p, i) => t >= p[0].s - 0.05 && t < (pages[i + 1]?.[0].s ?? 999));
    if (!page) return null;
    return (
      <div style={{position: "absolute", top: 930, left: 40, right: 40, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 84, letterSpacing: -1.5, lineHeight: 1.05}}>
        {page.map((w, i) => {
          const said = t >= w.s;
          const b = bare(w.w);
          const key = KEY.has(b), noun = NOUN.has(b) || NOUN.has(b.replace(/s$/, ""));
          const color = !said ? GREY : key ? BLUE : INK;
          const k = interpolate(t - w.s, [0, 0.1], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
          return (
            <span key={i} style={{color, fontFamily: noun || key ? SERIF : SANS, fontStyle: noun || key ? "italic" : "normal", fontWeight: noun || key ? 800 : 700,
              filter: said ? `blur(${(1 - k) * 4}px)` : "none", marginRight: 22}}>
              {w.w.replace(/[.,!?]$/, "")}
            </span>
          );
        })}
      </div>
    );
  };

  // Scenes are ANCHORED to the spoken words: a new recording re-times itself (no hand timing).
  const at = (phrase: string, after = 0): number => {
    const p = phrase.split(" ").map(norm);
    for (let i = 0; i < words.length; i++) {
      if (words[i].s < after) continue;
      if (p.every((q, j) => words[i + j] && norm(words[i + j].w) === q)) return Math.max(0, words[i].s - 0.06);
    }
    throw new Error(`[${cfg.slug}] anchor not found in words.json: "${phrase}" (use a fuzzier/shorter phrase, never hand timing)`);
  };
  const DURATION = words[words.length - 1].e + 0.75;
  const shots: {from: number; to: number; el: Scene}[] = [];
  {
    let after = 0;
    const starts = cfg.anchors.map(([ph], i) => { const t = i === 0 ? 0 : at(ph, after); after = t + 0.1; return t; });
    cfg.anchors.forEach(([, el], i) => shots.push({from: starts[i], to: starts[i + 1] ?? DURATION, el}));
  }
  const HOOK_END = shots[cfg.hookEnd].from;

  const HookTitle: React.FC = () => {
    const f = useCurrentFrame();
    if (f > s(HOOK_END)) return null;
    const k = spring({frame: f, fps: FPS, config: {damping: 16}});
    const wipe = interpolate(f, [6, 18], [100, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
    const sharp = interpolate(f, [16, 26], [8, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
    return (
      <div style={{position: "absolute", top: 200, width: "100%", textAlign: "center", opacity: k}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 86, color: INK, letterSpacing: -2}}>
          <span style={cfg.hook.brandColor ? {color: cfg.hook.brandColor} : {background: BRAND_GRADIENT, WebkitBackgroundClip: "text", color: "transparent"}}>{cfg.hook.brand}</span> {cfg.hook.rest}
        </div>
        <div style={{display: "inline-block", marginTop: 14, padding: "4px 26px 14px", background: BLUE, borderRadius: 8, clipPath: `inset(0 ${wipe}% 0 0)`}}>
          <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 100, color: "#fff", filter: `blur(${sharp}px)`}}>{cfg.hook.box}</span>
        </div>
      </div>
    );
  };

  // Face card: rounded top + gutters, bottom-aligned so neck and shoulders always show, zoomed OUT so the top of the hair
  // shows too (Peter, Nov 17 2026). Side gaps are filled with a blurred still of the wall (public/<slug>/wall.jpg, made by
  // make_short.py): a still, not a second video, because a second OffthreadVideo doubled the render time.
  // srcTop = source row shown at the card's top edge (~60 px above the hair). Height = the larger of "full width, no side gaps"
  // (cover) and "bottom-aligned zoom-out". A wide take (Nov 18) fits with cover: no blurred side bars; a close take (Nov 17)
  // needs the zoom-out and gets the wall still at the sides.
  const srcTop = cfg.faceSrcTop ?? 690;
  const VIS_H = 1920 - FACE_CARD_TOP, CARD_W = 1080 - 92;
  const FACE_H = Math.max(Math.round(VIS_H / (1920 - srcTop) * 1920), Math.ceil(CARD_W * 1920 / 1080));
  const FACE_TOP = -Math.round(srcTop * FACE_H / 1920);   // video top, in card coordinates
  const ShotWrap: React.FC<{el: Scene}> = ({el: El}) => <El d={useCurrentFrame()} />;

  const Short: React.FC = () => {
    const face = staticFile(`${cfg.slug}/face.mp4`);
    return (
      <AbsoluteFill style={{background: "radial-gradient(120% 80% at 20% 10%, #F3F4F1 0%, #E9F0F1 45%, #DFECF2 75%, #CEE2ED 100%)"}}>
        <Audio src={face} />
        <div style={{position: "absolute", left: 46, right: 46, top: FACE_CARD_TOP, bottom: -60, borderRadius: 65, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.18)"}}>
          <Img src={staticFile(`${cfg.slug}/wall.jpg`)} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover"}} />
          <OffthreadVideo src={face} muted style={{position: "absolute", top: FACE_TOP, left: "50%", transform: "translateX(-50%)",
            height: FACE_H, width: FACE_H * 1080 / 1920, maxWidth: "none",
            // edge fade only when zoomed out (side gaps); a full-width take needs none (Nov 18: the fade darkened the card edges)
          WebkitMaskImage: FACE_H * 1080 / 1920 < CARD_W - 2 ? "linear-gradient(90deg, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)" : "none"}} />
        </div>
        <HookTitle />
        {shots.map((x) => (
          <Sequence key={x.from} from={s(x.from)} durationInFrames={s(x.to) - s(x.from)}>
            <ShotWrap el={x.el} />
          </Sequence>
        ))}
        <Captions />
      </AbsoluteFill>
    );
  };
  return {Short, DURATION};
};
