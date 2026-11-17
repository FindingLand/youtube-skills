# Pull data from almost any website: Reverse API Engineer

From my YouTube Short. Tool: [kalil0321/reverse-api-engineer](https://github.com/kalil0321/reverse-api-engineer) (MIT, checked Nov 17 2026).

A browser opens the site and records the requests the page makes in the background. Then the AI reads that traffic and writes a small program (`api_client.py`) that asks the site for the data directly.

## Install

```
uv tool install reverse-api-engineer
```

or `pip install reverse-api-engineer`. As a skill for coding agents: `npx skills add kalil0321/reverse-api-engineer`

## Two catches

1. The tool is free and open source, but the AI model bills you for each build (about $0.11 on their demo run).
2. Sites with heavy bot protection can still block it. Check each site's terms before you pull its data.

Built by [Peter Israel](https://peterisrael.com)
