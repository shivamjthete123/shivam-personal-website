import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import FilterPills from "./FilterPills";
import SectionHeading from "./SectionHeading";
import AtsResumeModal from "./AtsResumeModal";
import MetricsBanner from "./MetricsBanner";

const navigation = [
  { href: "#leadership-evidence", label: "Leadership evidence" },
  { href: "#projects", label: "Project portfolio" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
];

function Navigation({ name, onOpenAtsResume }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={`${name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold tracking-wide text-white">ST</span>
          <span>
            <span className="block text-sm font-semibold text-slate-950">{name}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Strategy and operations</span>
          </span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {navigation.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAtsResume}
            className="rounded-md border border-slate-900 bg-white px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-slate-900 hover:text-white flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            ATS Resume
          </button>
          <a href="#contact" className="rounded-md bg-amber-400 px-3 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-300">
            Start a conversation
          </a>
        </div>
      </div>
    </header>
  );
}

function Label({ children }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">{children}</p>;
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/50">
      <div className="flex items-start justify-between gap-4">
        <Label>{project.status}</Label>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {project.projectItems.length} {project.projectItems.length === 1 ? "case study" : "case studies"}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 group-hover:text-slate-900">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600 flex-1">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 bg-slate-50/50 px-2.5 py-1 text-xs text-slate-600 font-medium">
            {tag}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-900 transition border border-slate-200 group-hover:border-slate-950 group-hover:bg-slate-950 group-hover:text-white"
      >
        Review case studies <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}

function Detail({ label, children }) {
  return (
    <div className="border-t border-slate-200 py-5 first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm leading-7 text-slate-700">{children}</dd>
    </div>
  );
}

function ProjectDrawer({ project, onClose }) {
  const [activeItemId, setActiveItemId] = useState(null);

  useEffect(() => {
    setActiveItemId(project?.projectItems?.[0]?.id ?? null);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose, project]);

  if (!project) return null;
  const activeItem = project.projectItems.find((item) => item.id === activeItemId) ?? project.projectItems[0];

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      <button type="button" aria-label="Close project details" onClick={onClose} className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-5xl flex-col bg-white shadow-2xl animate-slide-in"
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 px-5 py-5 md:px-8 bg-slate-50">
          <div>
            <Label>{project.title}</Label>
            <h2 id="project-dialog-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Project Evidence & Case Studies
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
            Close
          </button>
        </div>
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[290px_minmax(0,1fr)]">
          <nav aria-label="Case studies" className="border-b border-slate-200 bg-slate-50/80 p-4 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Select case study</p>
            <div className="grid gap-1.5">
              {project.projectItems.map((item) => {
                const active = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemId(item.id)}
                    className={`rounded-lg px-3.5 py-3 text-left text-sm font-semibold transition ${active ? "bg-slate-950 text-white shadow-md" : "text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"}`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </nav>
          <article className="p-5 md:p-8">
            <Label>{activeItem.tags.slice(0, 2).join(" · ")}</Label>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{activeItem.title}</h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{activeItem.summary}</p>
            <dl className="mt-8 max-w-3xl space-y-2">
              <Detail label="Business problem">{activeItem.problemStatement}</Detail>
              <Detail label="Strategic response">{activeItem.solution}</Detail>
              <Detail label="Operating impact">{activeItem.impact}</Detail>
              <Detail label="Leadership signal">{activeItem.leadershipValue}</Detail>
            </dl>
            <div className="mt-4 max-w-3xl border-t border-slate-200 pt-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Systems and tools deployed</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeItem.toolsUsed.map((tool) => (
                  <span key={tool} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 border border-slate-200">{tool}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </aside>
    </div>
  );
}

function CapabilityGroup({ group }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-bold text-slate-950">{group.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
      <ul className="mt-5 space-y-3">
        {group.items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PersonalWebsite() {
  const { profile, projects, skillGroups } = siteContent;
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);

  const tags = useMemo(() => ["All", ...projects.map((project) => project.tags[0])], [projects]);

  const visibleProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag = activeTag === "All" || project.tags[0] === activeTag;
      if (!matchesTag) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchInTitle = project.title.toLowerCase().includes(q);
      const matchInSummary = project.summary.toLowerCase().includes(q);
      const matchInTags = project.tags.some((t) => t.toLowerCase().includes(q));
      const matchInItems = project.projectItems.some(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.toolsUsed.some((tool) => tool.toLowerCase().includes(q))
      );

      return matchInTitle || matchInSummary || matchInTags || matchInItems;
    });
  }, [projects, activeTag, searchQuery]);

  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? null;

  return (
    <div id="top" className="min-h-screen bg-[#fcfcfb] text-slate-900">
      <Navigation name={profile.name} onOpenAtsResume={() => setIsAtsModalOpen(true)} />
      <main>
        {/* HERO SECTION */}
        <section aria-labelledby="hero-title" className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Label>{profile.title}</Label>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  Open for Leadership Roles
                </span>
              </div>
              <h1 id="hero-title" className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 md:text-6xl">
                {profile.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{profile.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800">
                  Review project evidence
                </a>
                <button
                  type="button"
                  onClick={() => setIsAtsModalOpen(true)}
                  className="rounded-md border-2 border-slate-900 bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 flex items-center gap-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View & Download ATS Resume
                </button>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-slate-300 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950">
                  LinkedIn profile
                </a>
              </div>
            </div>
            <aside aria-label="Leadership positioning" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
              <Label>Leadership profile</Label>
              <ul className="mt-5 space-y-5">
                {profile.executiveSnapshot.map((item, index) => (
                  <li key={item} className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-slate-700">
                    <span className="font-bold text-amber-700">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* LEADERSHIP EVIDENCE & METRICS BANNER */}
        <section id="leadership-evidence" aria-labelledby="evidence-title" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionHeading
            id="evidence-title"
            eyebrow="Leadership evidence"
            title="A strategy-to-execution track record built in live operating environments."
            description="The portfolio focuses on the leadership signals that matter in strategy and transformation roles: structured problem solving, cross-functional ownership, financial and operational judgment, and measurable execution."
          />

          <div className="mt-10">
            <MetricsBanner />
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {profile.focusAreas.map((area, index) => (
              <article key={area} className="border-t-2 border-amber-400 bg-white p-5 shadow-sm rounded-b-xl border-x border-b border-slate-100">
                <p className="text-xs font-bold text-slate-400">0{index + 1}</p>
                <h3 className="mt-4 text-base font-semibold leading-6 text-slate-950">{area}</h3>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-8 border-t border-slate-200 pt-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <Label>Operating approach</Label>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Make the route from priority to performance visible.</h3>
            </div>
            <ol className="grid gap-6 sm:grid-cols-2">
              {profile.workMethod.map((step, index) => (
                <li key={step.title} className="border-l-2 border-slate-300 pl-4">
                  <p className="text-xs font-bold text-amber-700">STEP 0{index + 1}</p>
                  <h4 className="mt-2 font-bold text-slate-950">{step.title}</h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECT PORTFOLIO */}
        <section id="projects" aria-labelledby="projects-title" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading
              id="projects-title"
              eyebrow="Project portfolio"
              title="Business systems grouped by the leadership outcome they support."
              description={profile.projectSectionIntro}
            />

            {/* Filter and Search Bar */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <FilterPills items={tags} activeItem={activeTag} onSelect={setActiveTag} />
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search projects or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-xs text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-none"
                />
                <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {visibleProjects.length === 0 ? (
              <div className="mt-10 rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No projects found matching "{searchQuery}". Try clearing your search query.
              </div>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} onOpen={() => setSelectedProjectId(project.id)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" aria-labelledby="capabilities-title" className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Capabilities"
            title="The practical capabilities behind the operating outcomes."
            description="Technology is presented as an enabler, while the emphasis remains on leadership, governance, and execution."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">{skillGroups.map((group) => <CapabilityGroup key={group.id} group={group} />)}</div>
        </section>

        {/* FOOTER / CONTACT */}
        <section id="contact" aria-labelledby="contact-title" className="border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400">Contact & Recruitment</p>
              <h2 id="contact-title" className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
                For roles that need stronger operating clarity, disciplined execution, and cross-functional momentum.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">{profile.contactMessage}</p>
            </div>
            <div className="grid gap-3 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setIsAtsModalOpen(true)}
                className="rounded-md bg-amber-400 px-4 py-4 text-center text-slate-950 font-bold transition hover:bg-amber-300"
              >
                View / Save ATS Resume (PDF)
              </button>
              <a href={`mailto:${profile.contact.email}`} className="rounded-md bg-white px-4 py-4 text-center text-slate-950 transition hover:bg-slate-100">
                {profile.contact.email}
              </a>
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-slate-700 px-4 py-4 text-center text-white transition hover:border-white">
                Connect on LinkedIn
              </a>
              <p className="px-1 text-center text-slate-400">{profile.contact.phone}</p>
            </div>
          </div>
        </section>
      </main>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      <AtsResumeModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
    </div>
  );
}
