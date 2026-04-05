import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import FilterPills from "./FilterPills";
import SectionHeading from "./SectionHeading";

function Navigation({ name }) {
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Capabilities" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur surface-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300 bg-amber-50 text-sm font-semibold text-amber-700">
            ST
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">{name}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Leadership Portfolio</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ProjectListItem({ project, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="surface-hover w-full border-b border-slate-200 px-5 py-5 text-left last:border-b-0 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{project.role}</p>
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-amber-700">{project.status}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary ?? project.impact}</p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-slate-200 px-2 py-1 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-amber-700">
          Open {project.projectItems.length > 1 ? `${project.projectItems.length} projects` : "project"}
        </span>
      </div>
    </button>
  );
}

function DetailBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-7 text-slate-700">{value}</p>
    </div>
  );
}

function CapabilityGroup({ group }) {
  return (
    <div className="border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-950">{group.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
      <ul className="mt-4 space-y-3">
        {group.items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDrawer({ project, onClose }) {
  const [activeProjectItemId, setActiveProjectItemId] = useState(project?.projectItems?.[0]?.id ?? null);
  const [activeInteractionId, setActiveInteractionId] = useState(project?.projectItems?.[0]?.interactionFiles?.[0]?.id ?? null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project]);

  useEffect(() => {
    if (!project) {
      setActiveProjectItemId(null);
      setActiveInteractionId(null);
      return;
    }

    const firstProjectItem = project.projectItems[0] ?? null;
    setActiveProjectItemId(firstProjectItem?.id ?? null);
    setActiveInteractionId(firstProjectItem?.interactionFiles?.[0]?.id ?? null);
  }, [project]);

  if (!project) {
    return null;
  }

  const activeProjectItem =
    project.projectItems.find((item) => item.id === activeProjectItemId) ?? project.projectItems[0] ?? null;
  const activeInteraction =
    activeProjectItem?.interactionFiles.find((file) => file.id === activeInteractionId) ??
    activeProjectItem?.interactionFiles[0] ??
    null;
  const iframeUrl = activeInteraction?.url?.startsWith("/") ? activeInteraction.url : null;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="Close project drawer"
        className="absolute inset-0 bg-slate-950/30"
        onClick={onClose}
      />

      <aside className="animate-slide-in absolute right-0 top-0 flex h-full w-full md:w-[80vw] md:max-w-none flex-col border-l border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{project.status}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{project.title}</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              Project category{project.projectItems.length > 1 ? ` · ${project.projectItems.length} projects` : ""}
            </p>
            {project.summary ? <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{project.summary}</p> : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className="border border-slate-200 bg-slate-50">
              <div className="border-b border-slate-200 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Projects in this category</p>
              </div>
              <div>
                {project.projectItems.map((item) => {
                  const isActive = item.id === activeProjectItem?.id;

                  return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveProjectItemId(item.id);
                setActiveInteractionId(item.interactionFiles[0]?.id ?? null);
              }}
              className={`w-full border-b border-slate-200 px-4 py-4 text-left transition last:border-b-0 ${
                isActive ? "bg-white shadow-[inset_3px_0_0_0_rgb(245,158,11)]" : "hover:bg-white"
              }`}
            >
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                      {item.summary ? <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="min-w-0">
              {activeProjectItem ? (
                <>
                  <div className="grid gap-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Selected project</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-950">{activeProjectItem.title}</h3>
                      {activeProjectItem.summary ? (
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{activeProjectItem.summary}</p>
                      ) : null}
                    </div>

                    <DetailBlock label="What was the business problem?" value={activeProjectItem.problemStatement} />
                    <DetailBlock label="What was the response?" value={activeProjectItem.solution} />
                    <DetailBlock label="What changed?" value={activeProjectItem.impact} />
                    <DetailBlock label="Why does it matter for leadership?" value={activeProjectItem.leadershipValue} />
                  </div>

                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tools used</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeProjectItem.toolsUsed.map((tool) => (
                        <span key={tool} className="border border-slate-200 px-2 py-1 text-xs text-slate-600">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Interactive view</p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Switch between interaction assets and preview them directly inside the drawer.
                        </p>
                      </div>
                      {activeInteraction ? (
                        <a
                          href={activeInteraction.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-semibold text-amber-700 transition hover:text-amber-800"
                        >
                          Open in new tab
                        </a>
                      ) : null}
                    </div>

                    {activeProjectItem.interactionFiles.length > 1 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeProjectItem.interactionFiles.map((file) => {
                          const isActive = file.id === activeInteraction?.id;

                          return (
                            <button
                              key={file.id}
                              type="button"
                              onClick={() => setActiveInteractionId(file.id)}
                          className={`border px-3 py-2 text-sm transition ${
                            isActive
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950"
                              }`}
                            >
                              {file.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {iframeUrl ? (
                      <div className="mt-4 overflow-hidden border border-slate-200 bg-slate-50">
                        <iframe
                          title={`${activeProjectItem.title} interaction`}
                          src={iframeUrl}
                          className="h-[70vh] min-h-[520px] w-full border-0"
                        />
                      </div>
                    ) : (
                      <div className="mt-4 border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
                        Add an HTML interaction asset in `public/project-interactions/` to preview it here.
                      </div>
                    )}
                  </div>

                  <div className="mt-8 border-t border-slate-200 pt-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Interaction files</p>
                    <div className="mt-3 grid gap-3">
                      {activeProjectItem.interactionFiles.map((file) => (
                        <button
                          key={file.id}
                          type="button"
                          onClick={() => setActiveInteractionId(file.id)}
                          className={`border p-4 text-left transition ${
                            file.id === activeInteraction?.id
                              ? "border-slate-900 bg-slate-50"
                              : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">{file.label}</p>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{file.description}</p>
                            </div>
                            <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-amber-700">{file.type}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function PersonalWebsite() {
  const { profile, projects, skillGroups } = siteContent;
  const [activeTag, setActiveTag] = useState("All");
  const [drawerProjectId, setDrawerProjectId] = useState(null);

  const availableTags = useMemo(
    () => ["All", ...new Set(projects.flatMap((project) => project.tags))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }

    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  useEffect(() => {
    if (!drawerProjectId) {
      return;
    }

    const drawerProjectStillVisible = filteredProjects.some((project) => project.id === drawerProjectId);

    if (!drawerProjectStillVisible) {
      setDrawerProjectId(null);
    }
  }, [drawerProjectId, filteredProjects]);

  const drawerProject = filteredProjects.find((project) => project.id === drawerProjectId) ?? null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation name={profile.name} />

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-10 lg:px-8">
        <section className="grid gap-10 border-b border-slate-200 pb-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{profile.title}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {profile.headline}
            </h1>
            <div className="mt-5 max-w-3xl space-y-4">
              {(Array.isArray(profile.summary) ? profile.summary : [profile.summary]).map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="surface-hover surface-soft bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                Review projects
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="surface-hover border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="surface-hover border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
              >
                Email
              </a>
            </div>
          </div>

          <div className="animate-fade-up grid gap-px border border-slate-200 bg-slate-200 surface-soft">
            <div className="bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Target roles</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.targetRoles.map((role) => (
                  <span key={role} className="border border-slate-200 px-2 py-1 text-xs text-slate-600">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {profile.executiveSnapshot.map((item, index) => (
              <div key={item} className="bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Executive snapshot 0{index + 1}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-6 animate-fade-up">
          <SectionHeading
            eyebrow="How I Operate"
            title="The sequencing is designed to answer the most important questions early."
            description="Visitors first see positioning, role fit, and executive signals. Then they move into focused project evidence and supporting capabilities."
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-slate-200 bg-white p-5 surface-soft">
              <p className="text-sm font-semibold text-slate-950">What I focus on</p>
              <ul className="mt-4 space-y-3">
                {profile.focusAreas.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 bg-white surface-soft">
              {profile.workMethod.map((step, index) => (
                <div
                  key={step.title}
                  className={`grid gap-3 px-5 py-4 md:grid-cols-[60px_1fr] ${
                    index !== profile.workMethod.length - 1 ? "border-b border-slate-200" : ""
                  }`}
                >
                  <div className="text-sm font-semibold text-amber-700">0{index + 1}</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="grid gap-6 animate-fade-up">
          <SectionHeading
            eyebrow="Projects"
            title="Select a project to open a focused interaction drawer."
            description={profile.projectSectionIntro}
          />

          <FilterPills items={availableTags} activeItem={activeTag} onSelect={setActiveTag} />

          <div className="border border-slate-200 bg-white surface-soft">
            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} onSelect={() => setDrawerProjectId(project.id)} />
            ))}
          </div>
        </section>

        <section id="skills" className="grid gap-6 animate-fade-up">
          <SectionHeading
            eyebrow="Capabilities"
            title="Supporting strengths kept concise."
            description="This section stays compact so the page remains analytical and useful instead of turning into a long narrative."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.id} className="surface-soft surface-hover">
                <CapabilityGroup group={group} />
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="animate-fade-up border-t border-slate-200 pt-8">
          <SectionHeading
            eyebrow="Contact"
            title="Open to leadership and transformation conversations."
            description={profile.contactMessage}
          />

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-700">
            <a href={`mailto:${profile.contact.email}`} className="transition hover:text-slate-950">
              {profile.contact.email}
            </a>
            <p>{profile.contact.phone}</p>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-slate-950">
              LinkedIn profile
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-6 py-8 text-center text-sm text-slate-500 lg:px-8">
        Copyright {new Date().getFullYear()} {profile.name}
        <p className="mt-2">{profile.footerLine}</p>
      </footer>

      <ProjectDrawer project={drawerProject} onClose={() => setDrawerProjectId(null)} />
    </div>
  );
}
