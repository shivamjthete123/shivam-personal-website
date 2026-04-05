import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import FilterPills from "./FilterPills";
import SectionHeading from "./SectionHeading";

function Navigation({ name }) {
  const links = [
    { href: "#guide", label: "Guide" },
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

function AudienceGuide({ guides, activeGuideId, onChange }) {
  const activeGuide = guides.find((guide) => guide.id === activeGuideId) ?? guides[0];

  return (
    <section id="guide" className="grid gap-6">
      <SectionHeading
        eyebrow="Quick Guide"
        title="Start from the question you want answered."
        description="The page is structured so different visitors can get to the relevant signal quickly instead of reading everything in order."
      />

      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-wrap gap-2 lg:flex-col">
          {guides.map((guide) => {
            const isActive = guide.id === activeGuide.id;

            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => onChange(guide.id)}
                className={`border px-4 py-3 text-left text-sm transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950"
                }`}
              >
                {guide.label}
              </button>
            );
          })}
        </div>

        <div className="border border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{activeGuide.question}</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{activeGuide.summary}</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-950">What to look for</p>
              <ul className="mt-3 space-y-3">
                {activeGuide.lookFor.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold text-slate-950">Suggested path</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{activeGuide.startHere}</p>
              <a
                href={activeGuide.jumpTo}
                className="mt-4 inline-flex text-sm font-semibold text-amber-700 transition hover:text-amber-800"
              >
                Jump to section
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectListItem({ project, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full border-b border-slate-200 px-5 py-5 text-left transition last:border-b-0 ${
        selected ? "bg-slate-50" : "bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{project.role}</p>
        </div>
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.14em] text-amber-700">{project.status}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{project.impact}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="border border-slate-200 px-2 py-1 text-xs text-slate-500">
            {tag}
          </span>
        ))}
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

export default function PersonalWebsite() {
  const { profile, projects, skillGroups } = siteContent;
  const [activeGuideId, setActiveGuideId] = useState(profile.audienceGuides[0]?.id ?? "hr");
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id ?? null);

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
    if (!filteredProjects.length) {
      setSelectedProjectId(null);
      return;
    }

    const hasSelectedProject = filteredProjects.some((project) => project.id === selectedProjectId);

    if (!hasSelectedProject) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const selectedProject =
    filteredProjects.find((project) => project.id === selectedProjectId) ?? filteredProjects[0] ?? null;

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

        <AudienceGuide guides={profile.audienceGuides} activeGuideId={activeGuideId} onChange={setActiveGuideId} />

        <section id="about" className="grid gap-6">
          <SectionHeading
            eyebrow="How I Operate"
            title="The work is built around diagnosis, systems, and measurable outcomes."
            description="This section is intentionally concise so a visitor can understand the operating pattern quickly before going deeper into projects."
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
            title="Open one project at a time and compare challenge, response, and impact."
            description="The layout below is designed to be data-rich but easy to scan. Browse the list on the left, then review the selected project in the detail panel."
          />

          <FilterPills items={availableTags} activeItem={activeTag} onSelect={setActiveTag} />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="border border-slate-200 bg-white">
              {filteredProjects.map((project) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  selected={selectedProject?.id === project.id}
                  onSelect={() => setSelectedProjectId(project.id)}
                />
              ))}
            </div>

            <div className="border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
              {selectedProject ? (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-950">{selectedProject.title}</h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{selectedProject.role}</p>
                    </div>
                    <span className="border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                      {selectedProject.status}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-6">
                    <DetailBlock label="What was the business problem?" value={selectedProject.problemStatement} />
                    <DetailBlock label="What was the response?" value={selectedProject.solution} />
                    <DetailBlock label="What changed?" value={selectedProject.impact} />
                    <DetailBlock label="Why does it matter for leadership?" value={selectedProject.leadershipValue} />
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tools used</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.toolsUsed.map((tool) => (
                        <span key={tool} className="border border-slate-200 px-2 py-1 text-xs text-slate-600">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Interaction files</p>
                    <div className="mt-3 grid gap-3">
                      {selectedProject.interactionFiles.map((file) => (
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
                </>
              ) : (
                <p className="text-sm text-slate-600">No projects match the selected filter.</p>
              )}
            </div>
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
    </div>
  );
}
