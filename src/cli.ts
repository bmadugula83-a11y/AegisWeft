#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadAgents, loadSkills, loadWorkflows, validateCatalog } from "./catalog.js";

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

async function main(): Promise<void> {
  const [area, action, ...args] = process.argv.slice(2);
  if (area === "catalog" && action === "list") {
    const kind = args[0];
    const items = kind === "agents" ? await loadAgents() : kind === "skills" ? await loadSkills() : kind === "workflows" ? await loadWorkflows() : null;
    if (!items) throw new Error("Usage: aegisweft catalog list <agents|skills|workflows>");
    for (const item of items) console.log(`${item.id}\t${item.name}`);
    return;
  }
  if (area === "catalog" && action === "validate") {
    const errors = await validateCatalog();
    if (errors.length) {
      console.error(errors.map((error) => `- ${error}`).join("\n"));
      process.exitCode = 1;
    } else console.log("Catalog structure and references are valid.");
    return;
  }
  if (area === "work" && action === "init") {
    const id = option(args, "--id");
    const title = option(args, "--title");
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !title) throw new Error('Usage: aegisweft work init --id <kebab-case-id> --title "<title>"');
    const parent = join(process.cwd(), ".aegisweft", "work-items");
    await mkdir(parent, { recursive: true });
    const directory = join(parent, id);
    await mkdir(directory, { recursive: false });
    const item = { id, title, workflow: "change-delivery", state: "defined", createdAt: new Date().toISOString(), acceptanceCriteria: [], evidence: [], decisions: [] };
    await writeFile(join(directory, "work-item.json"), JSON.stringify(item, null, 2) + "\n", { flag: "wx" });
    await writeFile(join(directory, "README.md"), `# ${title}\n\n## Scope\n\n## Non-goals\n\n## Acceptance criteria\n\n- [ ] Add a measurable criterion\n\n## Design notes\n\n## Verification evidence\n\n- Tests/checks run:\n- Results:\n\n## Review and approvals\n\n## Release and rollback\n`, { flag: "wx" });
    console.log(`Created work item ${id} at ${directory}`);
    return;
  }
  if (area === "work" && action === "show") {
    const id = args[0];
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error("Usage: aegisweft work show <kebab-case-id>");
    const file = join(process.cwd(), ".aegisweft", "work-items", id, "work-item.json");
    console.log(await readFile(file, "utf8"));
    return;
  }
  console.log("AegisWeft 0.1.0\n\nCommands:\n  catalog list <agents|skills|workflows>\n  catalog validate\n  work init --id <slug> --title \"<title>\"\n  work show <id>");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
