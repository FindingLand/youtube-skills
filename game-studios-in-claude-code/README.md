# Claude Code builds a game from one sentence: Claude Code Game Studios

From my YouTube Short. Repo: [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) (MIT, checked Nov 18 2026): 49 AI agents and 75 skills, set up like a game studio.

## Install

You need Git, [Claude Code](https://code.claude.com/docs/en/setup), Python 3, and Chrome, Edge or Chromium (it plays and checks each game in the browser). Node.js is recommended once a game grows into a real project.

```
git clone https://github.com/Donchitos/Claude-Code-Game-Studios.git my-game
cd my-game
claude
```

Start Claude Code in that root folder (the one with `CLAUDE.md`), not a subfolder.

## Use it

Type `/prototype` and your idea, for example:

```
/prototype paper boats racing down a rainy street
```

1. Claude asks a few questions (each has a usual answer, so "you pick" works)
2. It writes a one-page brief, `design/game-brief.md`; you say Build it or change something first
3. It builds a browser game in `prototypes/<name>/` that opens with a double click
4. Before you get it, it tests the game in a headless browser and fixes what is broken

Then change it just by asking; each change you accept is a checkpoint you can go back to. When you like it, it grows into a real web project (Vite and TypeScript). Godot 4, Unity and Unreal Engine 5 are supported too (the repo's own tests have not shown the engine route yet).

Built by [Peter Israel](https://peterisrael.com)
