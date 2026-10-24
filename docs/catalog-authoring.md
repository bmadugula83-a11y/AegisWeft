# Catalog authoring

Agent and skill definitions must be original, scoped, and reviewable. Keep role, procedure, and execution permissions separate.

## Agent definition checklist

State purpose, responsibilities, accepted inputs, expected outputs, referenced skills, required tools, prohibited actions, approval boundaries, and evaluation cases. An agent should not claim a check ran unless evidence records the result.

## Skill definition checklist

State when it applies, required context, ordered steps, expected outputs, safety limits, and completion checks. Prefer portable procedures over provider-specific commands. Put provider-specific behavior in adapters.

## Change process

Use stable kebab-case IDs. Bump versions for behavior changes. Add an evaluation case when a definition changes task behavior. Have an independent reviewer inspect new security-sensitive definitions.
