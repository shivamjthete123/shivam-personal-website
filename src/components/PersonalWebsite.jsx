import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import { useScrollReveal, staggerProps } from "../lib/useScrollReveal";
import FilterPills from "./FilterPills";
import SectionHeading from "./SectionHeading";
import AtsResumeModal from "./AtsResumeModal";
import MetricsBanner from "./MetricsBanner";
import ExtracurricularSection from "./ExtracurricularSection";

const navigation = [
  { href: "#leadership-evidence", label: "Leadership Evidence" },
  { href: "#projects", label: "Projects" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#extracurricular", label: "Extracurricular" },
  { href: "#contact", label: "Contact" },
];

function Navigation({ name, onOpenAtsResume }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 border-b border-slate-200/80 backdrop-blur transition-all duration-300 ${scrolled ? "nav-scrolled bg-white/98" : "bg-white/95"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3 group" aria-label={`${name} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold tracking-wide text-white group-hover:bg-amber-600 transition-colors duration-300">ST</span>
          <span>
            <span className="block text-sm font-semibold text-slate-950">{name}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Strategy & Operations</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600 lg:flex">
          {navigation.map((link) => (
            <a key={link.href} href={link.href} className="nav-link transition hover:text-amber-700 py-1">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenAtsResume}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-amber-600/40 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 transition hover:bg-amber-600 hover:text-white shadow-sm"
          >
            <svg className="h-3.5 w-3.5 text-amber-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
          <a href="#contact" className="hidden sm:block rounded-lg bg-amber-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-amber-600 shadow-sm">
            Contact
          </a>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden rounded-md p-2 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-slate-100 bg-white/98 px-5 py-4 mobile-menu-enter">
          <div className="flex flex-col gap-3">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-amber-700 transition py-2 border-b border-slate-100 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => { onOpenAtsResume(); setMobileMenuOpen(false); }}
                className="rounded-lg border border-amber-600 bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-900 transition hover:bg-amber-600 hover:text-white"
              >
                Download PDF Resume
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg bg-amber-700 px-3 py-2.5 text-xs font-bold text-white text-center transition hover:bg-amber-600"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Label({ children }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-700">{children}</p>;
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <article
      className="group flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 card-hover hover:border-amber-500/40 hover:shadow-lg transition duration-300"
      {...staggerProps(index)}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <Label>{project.status}</Label>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800 border border-amber-200/60">
            {project.projectItems.length} {project.projectItems.length === 1 ? "case study" : "case studies"}
          </span>
        </div>
        <h3 className="mt-3.5 text-xl font-bold tracking-tight text-slate-950 group-hover:text-amber-900 transition-colors">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-900 transition border border-slate-200 group-hover:border-amber-700 group-hover:bg-amber-700 group-hover:text-white"
      >
        Review Case Studies <span aria-hidden="true">→</span>
      </button>
    </article>
  );
}

function Detail({ label, children }) {
  return (
    <div className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">{label}</dt>
      <dd className="mt-1.5 text-sm leading-6 text-slate-700">{children}</dd>
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
      <button type="button" aria-label="Close project details" onClick={onClose} className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm drawer-backdrop" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-5xl flex-col bg-white shadow-2xl drawer-panel"
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 px-5 py-5 md:px-8 bg-slate-50">
          <div>
            <Label>{project.title}</Label>
            <h2 id="project-dialog-title" className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Project Evidence & Case Studies
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
            Close
          </button>
        </div>
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[290px_minmax(0,1fr)]">
          <nav aria-label="Case studies" className="border-b border-slate-200 bg-slate-50/80 p-4 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Select Case Study</p>
            <div className="grid gap-1.5">
              {project.projectItems.map((item) => {
                const active = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemId(item.id)}
                    className={`rounded-lg px-3.5 py-3 text-left text-xs font-bold transition ${active ? "bg-amber-700 text-white shadow-md" : "text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"}`}
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
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{activeItem.summary}</p>
            <dl className="mt-6 max-w-3xl space-y-2">
              <Detail label="Business Problem">{activeItem.problemStatement}</Detail>
              <Detail label="Strategic Response">{activeItem.solution}</Detail>
              <Detail label="Operating Impact">{activeItem.impact}</Detail>
              <Detail label="Leadership Signal">{activeItem.leadershipValue}</Detail>
            </dl>
            <div className="mt-5 max-w-3xl border-t border-slate-200 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Systems and Tools Deployed</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {activeItem.toolsUsed.map((tool) => (
                  <span key={tool} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900 border border-amber-200">{tool}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </aside>
    </div>
  );
}

function CapabilityGroup({ group, index }) {
  return (
    <article
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm card-hover hover:border-amber-500/30"
      {...staggerProps(index)}
    >
      <h3 className="text-lg font-bold text-slate-950">{group.title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">{group.description}</p>
      <ul className="mt-4 space-y-2.5">
        {group.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" aria-hidden="true" />
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll detection for back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll reveal refs for each section
  const heroRef = useScrollReveal();
  const evidenceRef = useScrollReveal();
  const projectsRef = useScrollReveal();
  const capabilitiesRef = useScrollReveal();
  const contactRef = useScrollReveal();

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
    <div id="main-website-root" className="min-h-screen bg-[#fafafa] text-slate-900">
      <Navigation name={profile.name} onOpenAtsResume={() => setIsAtsModalOpen(true)} />
      
      <main id="top">
        {/* HERO SECTION */}
        <section ref={heroRef} aria-labelledby="hero-title" className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3" data-reveal>
                <Label>{profile.title}</Label>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200">
                  Open for Transformation Roles
                </span>
              </div>
              <h1 id="hero-title" className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-950 md:text-5xl hero-title-mobile" data-reveal data-reveal-delay="100">
                {profile.headline}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600" data-reveal data-reveal-delay="200">{profile.summary}</p>
              
              <div className="mt-7 flex flex-wrap gap-3" data-reveal data-reveal-delay="300">
                <a href="#projects" className="rounded-lg bg-slate-950 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-800 shadow-sm">
                  Review Projects
                </a>
                <button
                  type="button"
                  onClick={() => setIsAtsModalOpen(true)}
                  className="rounded-lg border-2 border-amber-700 bg-amber-700 px-5 py-3 text-xs font-bold text-white transition hover:bg-amber-600 flex items-center gap-2 shadow-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume (PDF)
                </button>
                <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-300 px-4 py-3 text-xs font-bold text-slate-800 transition hover:border-amber-700 hover:text-amber-800">
                  LinkedIn Profile
                </a>
              </div>
            </div>
            
            <aside aria-label="Leadership positioning" className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm" data-reveal data-reveal-delay="200" data-reveal-dir="right">
              <Label>Leadership Profile</Label>
              <ul className="mt-4 space-y-4">
                {profile.executiveSnapshot.map((item, index) => (
                  <li key={item} className="grid grid-cols-[24px_1fr] gap-3 text-xs leading-5 text-slate-700">
                    <span className="font-bold text-amber-700">0{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* QUICK JUMP SUB-NAV BAR (COMPACT & USER FRIENDLY) */}
        <div className="sticky top-[57px] z-20 border-b border-slate-200 bg-slate-900/90 text-white backdrop-blur px-5 py-2.5 hidden md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-xs font-semibold">
            <span className="text-amber-400 uppercase tracking-widest text-[10px]">Quick Jump:</span>
            <div className="flex gap-6">
              <a href="#leadership-evidence" className="hover:text-amber-300 transition">Impact Metrics</a>
              <a href="#projects" className="hover:text-amber-300 transition">Project Portfolio ({projects.length})</a>
              <a href="#capabilities" className="hover:text-amber-300 transition">Capabilities</a>
              <a href="#extracurricular" className="hover:text-amber-300 transition">Extracurricular</a>
              <a href="#contact" className="hover:text-amber-300 transition">Contact</a>
            </div>
            <button
              type="button"
              onClick={() => setIsAtsModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 underline font-bold"
            >
              Get Resume PDF ↓
            </button>
          </div>
        </div>

        {/* LEADERSHIP EVIDENCE & METRICS BANNER */}
        <section ref={evidenceRef} id="leadership-evidence" aria-labelledby="evidence-title" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div data-reveal>
            <SectionHeading
              id="evidence-title"
              eyebrow="Leadership Evidence"
              title="A strategy-to-execution track record built in live operating environments."
              description="Demonstrated results across structured problem solving, cross-functional ownership, financial controls, and measurable execution."
            />
          </div>

          <div className="mt-8" data-reveal data-reveal-delay="150">
            <MetricsBanner />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile.focusAreas.map((area, index) => (
              <article key={area} className="border-t-2 border-amber-600 bg-white p-5 shadow-sm rounded-b-xl border-x border-b border-slate-200 card-hover" {...staggerProps(index)}>
                <p className="text-xs font-bold text-amber-700">0{index + 1}</p>
                <h3 className="mt-3 text-sm font-semibold leading-5 text-slate-950">{area}</h3>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div data-reveal data-reveal-dir="left">
              <Label>Operating Approach</Label>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Make the route from priority to performance visible.</h3>
            </div>
            <ol className="grid gap-5 sm:grid-cols-2">
              {profile.workMethod.map((step, index) => (
                <li key={step.title} className="border-l-2 border-amber-600 pl-4" {...staggerProps(index, 100)}>
                  <p className="text-[10px] font-bold text-amber-700">STEP 0{index + 1}</p>
                  <h4 className="mt-1 text-sm font-bold text-slate-950">{step.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PROJECT PORTFOLIO (COMPACT CARD GRID) */}
        <section ref={projectsRef} id="projects" aria-labelledby="projects-title" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <div data-reveal>
              <SectionHeading
                id="projects-title"
                eyebrow="Project Portfolio"
                title="Business systems grouped by leadership outcome."
                description={profile.projectSectionIntro}
              />
            </div>

            {/* Filter and Search Bar */}
            <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-reveal data-reveal-delay="100">
              <FilterPills items={tags} activeItem={activeTag} onSelect={setActiveTag} />
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search projects or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600/20 transition"
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
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelectedProjectId(project.id)} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CAPABILITIES */}
        <section ref={capabilitiesRef} id="capabilities" aria-labelledby="capabilities-title" className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div data-reveal>
            <SectionHeading
              id="capabilities-title"
              eyebrow="Capabilities"
              title="The practical capabilities behind operating outcomes."
              description="Technology is presented as an enabler, while the emphasis remains on strategy execution and governance."
            />
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, index) => <CapabilityGroup key={group.id} group={group} index={index} />)}
          </div>
        </section>

        {/* EXTRACURRICULAR LEADERSHIP */}
        <ExtracurricularSection />

        {/* FOOTER / CONTACT */}
        <section ref={contactRef} id="contact" aria-labelledby="contact-title" className="border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 md:py-18 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-400" data-reveal>Contact & Recruitment</p>
              <h2 id="contact-title" className="mt-3 max-w-3xl text-2xl font-bold tracking-tight md:text-3xl" data-reveal data-reveal-delay="100">
                For roles that need stronger operating clarity, disciplined execution, and cross-functional momentum.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300" data-reveal data-reveal-delay="200">{profile.contactMessage}</p>
            </div>
            <div className="grid gap-3 text-xs font-semibold" data-reveal data-reveal-delay="150" data-reveal-dir="right">
              <button
                type="button"
                onClick={() => setIsAtsModalOpen(true)}
                className="rounded-lg bg-amber-600 px-4 py-3.5 text-center text-white font-bold transition hover:bg-amber-500 shadow-md flex items-center justify-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume (PDF)
              </button>
              <a href={`mailto:${profile.contact.email}`} className="rounded-lg bg-white px-4 py-3.5 text-center text-slate-950 transition hover:bg-slate-100 font-bold">
                {profile.contact.email}
              </a>
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-slate-700 px-4 py-3.5 text-center text-white transition hover:border-amber-400 hover:text-amber-400 font-bold">
                Connect on LinkedIn
              </a>
              <p className="px-1 text-center text-slate-400">{profile.contact.phone}</p>
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING BACK TO TOP BUTTON FOR OPTIMIZED USER FRIENDLY SCROLLING */}
      {showBackToTop && (
        <a
          href="#top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-amber-700 text-white shadow-xl transition-all duration-300 hover:bg-amber-600 hover:scale-105 border border-amber-500/30"
          title="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      )}

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      <AtsResumeModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
    </div>
  );
}
