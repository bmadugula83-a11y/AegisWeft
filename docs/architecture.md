# Architecture

The first release is a local-first modular monolith. The CLI and catalog contracts are the first interface; model and tool execution are intentionally not implemented yet.

## Boundary map

- Catalog definitions are versioned data, not executable code.
- The orchestration core owns workflow state and evidence requirements.
- Model providers and agent SDKs will be adapters behind stable interfaces.
- Tool connectors require explicit scopes and runtime enforcement.
- VS Code is a client adapter, not the place for business logic.
- Project profiles configure repository-specific conventions and gates.

## Initial implementation order

1. Validate catalog contracts and cross-references.
2. Create and inspect work items.
3. Define a workflow runner that checks transition evidence.
4. Add a provider interface and a deterministic fake provider for local development.
5. Add one approved model adapter and one read-only repository tool.
6. Add write-capable tools only after policy and approval behavior is established.
