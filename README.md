# HUML Agent Skill

An [Agent Skill](https://agentskills.io) that teaches AI coding agents about HUML (Human-oriented Markup Language) - a strict, unambiguous serialization format.

## Installation

```bash
bunx skills add https://github.com/devaryakjha/huml-skill
```

## What is HUML?

HUML is a YAML-like configuration language designed to eliminate ambiguity:

- **Strict 2-space indentation** - no tabs, no flexibility
- **Explicit type markers** - single colon (`:`) for scalars, double colon (`::`) for vectors
- **Quoted strings only** - no bareword surprises like YAML's `yes`/`no` → boolean
- **Required comment spacing** - `# comment` not `#comment`

```huml
%HUML v0.2.0

app::
  name: "MyService"
  port: 8080
  debug: false

database::
  host: "localhost"
  credentials::
    user: "admin"
    pass: "secret"
```

## Skill Contents

```
skills/huml/
├── SKILL.md           # Core syntax guide and instructions
├── scripts/
│   └── validate.mjs   # Validation script using @huml-lang/huml
└── references/
    └── spec.md        # Complete v0.2.0 specification
```

## Usage

Once installed, the skill activates when you:
- Work with `.huml` files
- Ask about converting YAML/JSON/TOML to HUML
- Request human-readable configuration formats
- Mention "huml" in your prompts

## Validation Script

The skill includes a validation script that requires Node.js and the `@huml-lang/huml` package:

```bash
npm install @huml-lang/huml
node scripts/validate.mjs config.huml
```

## Resources

- [HUML Official Site](https://huml.io)
- [HUML Playground](https://huml.io/playground)
- [Agent Skills Specification](https://agentskills.io/specification)

## License

MIT
