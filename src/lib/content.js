const sortByOrder = (left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER);

const loadModules = (modules) => Object.values(modules).filter(Boolean).sort(sortByOrder);

const [profile] = loadModules(import.meta.glob("../../content/about/*.json", { eager: true, import: "default" }));
const projects = loadModules(import.meta.glob("../../content/projects/*.json", { eager: true, import: "default" })).filter(
  (project) => !project.draft
);
const skillGroups = loadModules(import.meta.glob("../../content/skills/*.json", { eager: true, import: "default" })).filter(
  (group) => !group.draft
);

export const siteContent = {
  profile,
  projects,
  skillGroups,
};
