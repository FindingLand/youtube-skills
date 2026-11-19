# Claude Code now builds 3D models in Blender: Blender Skills

From my YouTube Short. Repo: [arjun988/blender-skills](https://github.com/arjun988/blender-skills) (MIT, checked Nov 18 2026): 94 skills, one 3D job each (modeling, materials, lighting, rigging, animation, export to Unity, Unreal and Godot).

## Install

1. Copy the skills into your project:

```
git clone https://github.com/arjun988/blender-skills.git
cp -r blender-skills/.claude/skills /path/to/your/project/.claude/skills/
```

2. Connect Blender once with the free [BlenderMCP add-on](https://github.com/ahujasid/blender-mcp) (now published as "MCP for Blender"): install it in Blender, then in Blender's sidebar (`N`) open **BlenderMCP** and click **Connect to Claude**. Restart Claude Code; it reads `.mcp.json` in your project.

You need Blender installed on the same computer.

## Use it

Describe what you want, for example "a low poly sci-fi rifle for a game". The `blender-director` skill reads the request and runs the right skills in order (model, then UVs, then materials, then export), inside Blender. You can also attach a reference photo and it builds a match.

Built by [Peter Israel](https://peterisrael.com)
