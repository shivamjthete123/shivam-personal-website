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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300 bg-white text-sm font-semibold text-amber-700">
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

function MetricCard({ value, label }) {
  return (
    <div className="border border-slate-200 bg-white p-4">
      <p className="text-sm font-semibold text-slate-950">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{label}</p>
    </div>
  );
}

function ProjectListItem({ project, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full border-b border-slate-200 px-5 py-5 text-left transition last:border-b-0 hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{project.role}</p>
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-amber-700">{project.status}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{project.impact}</p>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-slate-200 px-2 py-1 text-xs text-slate-500">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-950">Open</span>
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
  const primaryInteraction = project?.interactionFiles?.[0] ?? null;
  const iframeUrl = primaryInteraction?.url?.startsWith("/") ? primaryInteraction.url : null;

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

  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        aria-label="Close project drawer"
        className="absolute inset-0 bg-slate-950/30"
        onClick={onClose}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-3xl flex-col border-l border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{project.status}</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{project.title}</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{project.role}</p>
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
          <div className="grid gap-6">
            <DetailBlock label="What was the business problem?" value={project.problemStatement} />
            <DetailBlock label="What was the response?" value={project.solution} />
            <DetailBlock label="What changed?" value={project.impact} />
            <DetailBlock label="Why does it matter for leadership?" value={project.leadershipValue} />
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tools used</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
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
                  Use the panel below to interact with the project artifact without leaving the page.
                </p>
              </div>
              {primaryInteraction ? (
                <a
                  href={primaryInteraction.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-amber-700 transition hover:text-amber-800"
                >
                  Open in new tab
                </a>
              ) : null}
            </div>

            {iframeUrl ? (
              <div className="mt-4 overflow-hidden border border-slate-200 bg-slate-50">
                <iframe
                  title={`${project.title} interaction`}
                  src={iframeUrl}
                  className="h-[420px] w-full border-0"
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
              {project.interactionFiles.map((file) => (
                <a
                  key={file.label}
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-slate-200 p-4 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">{file.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{file.description}</p>
                    </div>
                    <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-amber-700">{file.type}</span>
                  </div>
                </a>
              ))}
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
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{profile.title}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              {profile.headline}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{profile.summary}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Review projects
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Email
              </a>
            </div>
          </div>

          <div className="grid gap-px border border-slate-200 bg-slate-200">
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

            {profile.executiveSnapshot.map((item) => (
              <div key={item.label} className="bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {profile.metrics.map((metric) => (
            <MetricCard key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </section>

        <section id="about" className="grid gap-6">
          <SectionHeading
            eyebrow="How I Operate"
            title="The sequencing is designed to answer the most important questions early."
            description="Visitors first see positioning, role fit, and executive signals. Then they move into focused project evidence and supporting capabilities."
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-slate-200 bg-white p-5">
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

            <div className="border border-slate-200 bg-white">
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

        <section id="projects" className="grid gap-6">
          <SectionHeading
            eyebrow="Projects"
            title="Select a project to open a focused interaction drawer."
            description="This keeps the page itself compact while still giving each project enough space for detail, interaction, and supporting files."
          />

          <FilterPills items={availableTags} activeItem={activeTag} onSelect={setActiveTag} />

          <div className="border border-slate-200 bg-white">
            {filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} onSelect={() => setDrawerProjectId(project.id)} />
            ))}
          </div>
        </section>

        <section id="skills" className="grid gap-6">
          <SectionHeading
            eyebrow="Capabilities"
            title="Supporting strengths kept concise."
            description="This section stays compact so the page remains analytical and useful instead of turning into a long narrative."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <CapabilityGroup key={group.id} group={group} />
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-slate-200 pt-8">
          <SectionHeading
            eyebrow="Contact"
            title="Open to leadership and transformation conversations."
            description="If the role requires operating rigor, systems thinking, and cross-functional execution, this portfolio is meant to make that easy to evaluate."
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
      </footer>

      <ProjectDrawer project={drawerProject} onClose={() => setDrawerProjectId(null)} />
    </div>
  );
}
