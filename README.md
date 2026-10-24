# AegisWeft

AegisWeft is an original, local-first foundation for governed agentic software delivery, released under Apache-2.0. It organizes reusable agent roles, procedural skills, workflows, project context, and later provider/tool adapters behind stable contracts.

**Current release:** 0.1.0 foundation  
**Runtime:** Node.js 20+ / TypeScript  
**License:** Apache-2.0. See [LICENSE](LICENSE).

## Current capabilities

- List agent, skill, and workflow catalog entries.
- Validate catalog structure and cross-references.
- Initialize a local work item with a project profile and acceptance/evidence sections.
- Keep model and developer-tool integrations out of the core until their contracts are ready.

No model calls, shell execution, network access, or deployment actions are implemented in this foundation.

## Quick start

```sh
npm install
npm run build
node dist/cli.js catalog list agents
node dist/cli.js catalog validate
node dist/cli.js work init --id sample-change --title "Describe the change"
```

Run commands from the AegisWeft repository root. The work-item command writes beneath the current project’s .aegisweft/work-items directory.

## Concepts

- **Agent:** a bounded role with permitted responsibilities, inputs, outputs, and tool requirements.
- **Skill:** a reusable procedure an agent may apply.
- **Workflow:** state transitions and evidence requirements for a category of work.
- **Tool connector:** a separately permissioned integration; prompts never grant tool access.
- **Project profile:** repository-specific conventions, commands, classifications, and approval gates.

See [docs/architecture.md](docs/architecture.md), [docs/governance.md](docs/governance.md), and [docs/catalog-authoring.md](docs/catalog-authoring.md).
