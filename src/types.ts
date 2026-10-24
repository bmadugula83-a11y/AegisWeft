export type AgentDefinition = {
  kind: "agent";
  id: string;
  version: string;
  name: string;
  purpose: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  skills: string[];
  toolAccess: string[];
  approvalRequiredFor: string[];
  instruction: string;
};

export type SkillDefinition = {
  kind: "skill";
  id: string;
  version: string;
  name: string;
  category: string;
  useWhen: string[];
  inputs: string[];
  procedure: string[];
  outputs: string[];
  safety: string[];
  completionChecks: string[];
};

export type WorkflowDefinition = {
  kind: "workflow";
  id: string;
  version: string;
  name: string;
  states: string[];
  transitions: Array<{ from: string; to: string; requires: string[] }>;
  requiredArtifacts: string[];
};

export type CatalogItem = AgentDefinition | SkillDefinition | WorkflowDefinition;
