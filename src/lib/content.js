const sortByOrder = (left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER);

const loadModules = (modules) => Object.values(modules).filter(Boolean).sort(sortByOrder);

const normalizeInteractionFiles = (interactionFiles = []) =>
  interactionFiles.map((file, index) => ({
    id: file.id ?? `interaction-${index + 1}`,
    ...file,
  }));

const normalizeProjectItem = (item, category, index) => ({
  id: item.id ?? `${category.id}-item-${index + 1}`,
  title: item.title ?? category.title,
  summary: item.summary ?? category.summary ?? category.impact ?? "",
  problemStatement: item.problemStatement ?? category.problemStatement ?? "",
  solution: item.solution ?? category.solution ?? "",
  impact: item.impact ?? category.impact ?? "",
  leadershipValue: item.leadershipValue ?? category.leadershipValue ?? "",
  toolsUsed: item.toolsUsed ?? category.toolsUsed ?? [],
  tags: item.tags ?? category.tags ?? [],
  interactionFiles: normalizeInteractionFiles(item.interactionFiles ?? category.interactionFiles ?? []),
});

const normalizeProjectCategory = (category) => {
  const projectItems =
    category.projectItems?.length > 0
      ? category.projectItems.map((item, index) => normalizeProjectItem(item, category, index))
      : [normalizeProjectItem({}, category, 0)];

  return {
    ...category,
    summary: category.summary ?? projectItems[0]?.summary ?? "",
    projectItems,
    interactionFiles: normalizeInteractionFiles(category.interactionFiles ?? projectItems[0]?.interactionFiles ?? []),
  };
};

const [profile] = loadModules(import.meta.glob("../../content/about/*.json", { eager: true, import: "default" }));
const projects = loadModules(import.meta.glob("../../content/projects/*.json", { eager: true, import: "default" }))
  .filter((project) => !project.draft)
  .map(normalizeProjectCategory);
const skillGroups = loadModules(import.meta.glob("../../content/skills/*.json", { eager: true, import: "default" })).filter(
  (group) => !group.draft
);

export const siteContent = {
  profile,
  projects,
  skillGroups,
};
