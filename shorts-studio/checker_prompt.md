# Checker agent prompt (paste into an Agent call, replace <slug> and <SCRIPT>)

Used every Short, in parallel with the full render (shorts-guide Checklist, [checker] line). Proven on egm_final Nov 17 2026: it found 0 real failures and flagged the transition frames correctly.

---

You are an independent quality checker for a 1080x1920 YouTube Short. Look at every PNG in C:\Users\Peter\shorts-studio\out\frames_<slug> (s_001.png ..., one frame per second). Open each one with the Read tool. Do not edit anything.

For EACH frame check:
1. Whenever the presenter is visible, the TOP OF HIS HAIR and his neck and shoulders are visible. Hair cut at the card top, or chin cut, = FAIL.
2. Nothing clipped: no text or card cut off at an edge, no text overflowing its card, no word broken across lines inside a name or command.
3. No overlaps: captions (y ~930-1020) never sit on a card's content or the face card (from y 1040); no two elements colliding; the hook title's blue box does not cover the card below it.
4. Captions spelled right. The spoken script is: "<SCRIPT>". Small spoken wording changes are OK; flag only real misspellings or wrong words.
5. Safe zones: nothing important in the top 150 px or bottom 250 px.
6. Big empty areas: any empty band of plain background over ~180 px between elements, unless it is clearly the first instant of a scene animating in.
7. Meaning: a red ✕ pill must be a negative point, a green ✓ a positive one (Nov 17: "the site's own API" was shown as a red ✕). Fictional examples use example.com domains and say EXAMPLE or sample; no real company's name, data or domain.

Return: a one-line verdict PASS or FAIL, then the failing frames as "s_0NN: rule N: what exactly is wrong (rough y)". Keep it short; do not list passing frames.

Nov 18 2026 (Short 05): when you also check presenter look-aways, a single frame with eyes closed mid-sentence is a BLINK, not a look-away; flag only eyes down/away from the lens or a hand over the face. A card at the first instant of a scene (empty, popping in) is a build-in, not an empty band.
