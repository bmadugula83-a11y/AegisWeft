import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { AgentDefinition, SkillDefinition, WorkflowDefinition } from "./types.js";

const root = fileURLToPath(new URL("../catalog/", import.meta.url));

async function readJsonFiles<T>(folder: string): Promise<T[]> {
  const directory = join(root, folder);
  const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  return Promise.all(names.map(async (name) => JSON.parse(await readFile(join(directory, name), "utf8")) as T));
}

export const loadAgents = () => readJsonFiles<AgentDefinition>("agents");
export const loadSkills = () => readJsonFiles<SkillDefinition>("skills");
export const loadWorkflows = () => readJsonFiles<WorkflowDefinition>("workflows");

export async function validateCatalog(): Promise<string[]> {
  const [agents, skills, workflows] = await Promise.all([loadAgents(), loadSkills(), loadWorkflows()]);
  const errors: string[] = [];
  const all = [...agents, ...skills, ...workflows];
  const ids = new Set<string>();

  for (const item of all) {
    if (!item.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) errors.push(`Invalid or missing id: ${item.id ?? "(missing)"}`);
    if (ids.has(item.id)) errors.push(`Duplicate catalog id: ${item.id}`);
    ids.add(item.id);
    if (!item.version) errors.push(`Missing version: ${item.id}`);
  }
  for (const agent of agents) {
    for (const skill of agent.skills) if (!skills.some((candidate) => candidate.id === skill)) errors.push(`Agent ${agent.id} references missing skill ${skill}`);
  }
  for (const workflow of workflows) {
    for (const state of workflow.states) {
      if (!workflow.transitions.some((transition) => transition.from === state || transition.to === state)) errors.push(`Workflow ${workflow.id} has unconnected state ${state}`);
    }
  }
  return errors;
}
