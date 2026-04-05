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
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur surface-soft">
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

      <aside className="animate-slide-in absolute right-0 top-0 flex h-full w-full flex-col border-l border-slate-200 bg-white shadow-2xl md:w-[80vw] md:max-w-none">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{project.status}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{project.title}</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">
              Project category{project.projectItems.length > 1 ? ` | ${project.projectItems.length} projects` : ""}
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
  const heroSummary = (Array.isArray(profile.summary) ? profile.summary : [profile.summary]).slice(0, 2);
  const keySnapshots = profile.executiveSnapshot.slice(0, 3);

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
    <div className="flex h-screen flex-col overflow-hidden bg-white text-slate-900">
      <Navigation name={profile.name} />

      <main
        id="top"
        className="mx-auto flex w-full max-w-6xl flex-1 snap-y snap-proximity flex-col gap-0 overflow-y-auto px-6 lg:snap-mandatory lg:px-8"
      >
        <section className="animate-fade-up flex min-h-[calc(100svh-76px)] snap-start flex-col justify-center border-b border-slate-200 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{profile.title}</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                {profile.headline}
              </h1>
              <div className="mt-5 max-w-3xl space-y-4">
                {heroSummary.map((paragraph) => (
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
                  href="#contact"
                  className="surface-hover border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 hover:border-amber-400"
                >
                  Contact
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="surface-hover border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-950"
                >
                  LinkedIn
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {profile.targetRoles.map((role) => (
                  <span key={role} className="surface-soft border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="border border-slate-200 bg-white p-5 surface-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Why this profile stands out</p>
                <div className="mt-4 space-y-4">
                  {keySnapshots.map((item) => (
                    <div key={item} className="border-l-2 border-amber-300 pl-4">
                      <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-5 surface-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Reason to contact</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  If the role needs someone who can bring structure to fragmented operations, align teams, and turn execution into visibility, that is where my work is strongest.
                </p>
                <a href="#contact" className="mt-4 inline-flex text-sm font-semibold text-amber-700 transition hover:text-amber-800">
                  Go to contact
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="animate-fade-up flex min-h-[calc(100svh-76px)] snap-start flex-col justify-center border-b border-slate-200 py-12">
          <div className="grid gap-6">
            <SectionHeading
              eyebrow="How I Work"
              title="A simple operating model: define, build, implement, measure."
              description="This section keeps the process visible without making the page feel heavy. It answers how I work before a visitor opens project detail."
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
          </div>
        </section>

        <section id="projects" className="animate-fade-up flex min-h-[calc(100svh-76px)] snap-start flex-col justify-center border-b border-slate-200 py-12">
          <div className="grid gap-6">
            <SectionHeading
              eyebrow="Projects"
              title="Open the project categories that best prove leadership fit."
              description={profile.projectSectionIntro}
            />

            <FilterPills items={availableTags} activeItem={activeTag} onSelect={setActiveTag} />

            <div className="border border-slate-200 bg-white surface-soft">
              {filteredProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} onSelect={() => setDrawerProjectId(project.id)} />
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="animate-fade-up flex min-h-[calc(100svh-76px)] snap-start flex-col justify-center border-b border-slate-200 py-12">
          <div className="grid gap-6">
            <SectionHeading
              eyebrow="Capabilities"
              title="Supporting capabilities, kept visible but secondary."
              description="This section reinforces breadth without competing with the projects or the leadership message."
            />

            <div className="grid gap-6 lg:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.id} className="surface-soft surface-hover">
                  <CapabilityGroup group={group} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="animate-fade-up flex min-h-[calc(100svh-76px)] snap-start flex-col justify-center py-12">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="If the role needs structure, execution, and operating clarity, let's talk."
                description={profile.contactMessage}
              />

              <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
                <p>I am most relevant where the business needs stronger systems, clearer execution, and better operating visibility.</p>
                <p>The website is designed to show that quickly. The next step is a conversation.</p>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-6 surface-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Contact options</p>
              <div className="mt-5 grid gap-4">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="surface-hover border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-950 hover:border-amber-300"
                >
                  {profile.contact.email}
                </a>
                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="surface-hover border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-950 hover:border-amber-300"
                >
                  LinkedIn profile
                </a>
                <div className="border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">{profile.contact.phone}</div>
              </div>

              <p className="mt-6 text-xs leading-6 text-slate-500">{profile.footerLine}</p>
            </div>
          </div>
        </section>
      </main>

      <ProjectDrawer project={drawerProject} onClose={() => setDrawerProjectId(null)} />
    </div>
  );
}
