import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import { useScrollReveal, staggerProps } from "../lib/useScrollReveal";
import FilterPills from "./FilterPills";
import SectionHeading from "./SectionHeading";
import AtsResumeModal from "./AtsResumeModal";
import MetricsBanner from "./MetricsBanner";
import ExtracurricularSection from "./ExtracurricularSection";

const navigationTree = [
  {
    id: "top",
    label: "Executive Summary",
    href: "#top",
    icon: "📌",
    subtabs: []
  },
  {
    id: "leadership-evidence",
    label: "Leadership Impact",
    href: "#leadership-evidence",
    icon: "📊",
    subtabs: [
      { id: "metrics-banner", label: "Impact Metrics", href: "#metrics-banner" },
      { id: "focus-areas", label: "Core Focus Areas", href: "#focus-areas" },
      { id: "work-method", label: "Operating Method", href: "#work-method" },
    ]
  },
  {
    id: "projects",
    label: "Project Portfolio",
    href: "#projects",
    icon: "🚀",
    subtabs: [
      { id: "project-revenue-operations", label: "RevOps & BD Lifecycle", href: "#projects", filter: "Revenue Operations" },
      { id: "project-finance-control", label: "Finance Control & Cash", href: "#projects", filter: "Finance Transformation" },
      { id: "project-project-management", label: "Delivery Governance (Pulse)", href: "#projects", filter: "Delivery Governance" },
      { id: "project-quality-communication", label: "Quality Governance", href: "#projects", filter: "Quality Governance" },
      { id: "project-hrms-enhancements", label: "People Systems & HRMS", href: "#projects", filter: "People Systems" },
    ]
  },
  {
    id: "capabilities",
    label: "Capabilities & Skills",
    href: "#capabilities",
    icon: "💡",
    subtabs: [
      { id: "capability-leadership", label: "Leadership & Strategy", href: "#capabilities" },
      { id: "capability-technology", label: "Systems & Technology", href: "#capabilities" },
      { id: "capability-certifications", label: "Certifications & GATE AIR 8003", href: "#capabilities" },
    ]
  },
  {
    id: "extracurricular",
    label: "Extracurricular",
    href: "#extracurricular",
    icon: "🏆",
    subtabs: [
      { id: "extracurricular-community", label: "Prayas Computer Literacy", href: "#extracurricular-community" },
      { id: "extracurricular-robotics", label: "Team Vector Robotics", href: "#extracurricular-robotics" },
    ]
  },
  {
    id: "contact",
    label: "Contact & Connect",
    href: "#contact",
    icon: "📞",
    subtabs: []
  }
];

function SidebarNavigation({ name, title, linkedin, email, phone, onOpenAtsResume, onSelectFilter }) {
  const [activeId, setActiveId] = useState("top");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Two-way scroll spy handler tracking both main sections and subtabs
  useEffect(() => {
    // Gather all target element IDs
    const allIds = [];
    navigationTree.forEach((item) => {
      allIds.push(item.id);
      item.subtabs.forEach((sub) => allIds.push(sub.id));
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = allIds.length - 1; i >= 0; i--) {
        const elem = document.getElementById(allIds[i]);
        if (elem && elem.offsetTop <= scrollPosition) {
          setActiveId(allIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, targetId, filter) => {
    e.preventDefault();
    if (filter) onSelectFilter(filter);
    
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveId(targetId);
    setMobileDrawerOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between overflow-y-auto pr-1">
      <div>
        {/* Sidebar Header / Branding */}
        <div className="flex items-center gap-3.5 pb-5 border-b border-slate-800/80">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 text-slate-950 font-black tracking-wider text-sm shadow-lg shadow-amber-950/60">
            ST
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-white">{name}</h2>
            <p className="text-[10px] font-bold text-amber-400/90 uppercase tracking-wider">{title}</p>
          </div>
        </div>

        <div className="mt-3.5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SqurrEnergy Leadership
        </div>

        {/* Structured Multi-level Tree Navigation with Sub-tabs */}
        <nav aria-label="Sidebar navigation tree" className="mt-6 space-y-3">
          <p className="px-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Navigation Tree</p>
          
          {navigationTree.map((item) => {
            const isParentActive = activeId === item.id || item.subtabs.some((s) => s.id === activeId);

            return (
              <div key={item.id} className="space-y-1">
                {/* Main Category Tab */}
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all duration-250 ${
                    isParentActive
                      ? "bg-amber-500/15 text-amber-300 border-l-4 border-amber-500 shadow-inner"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${isParentActive ? "bg-amber-400 shadow-sm shadow-amber-400 scale-125" : "bg-transparent group-hover:bg-slate-600"}`} />
                </a>

                {/* Sub-tabs List */}
                {item.subtabs.length > 0 && (
                  <div className="pl-5 space-y-1 border-l border-slate-800/80 ml-3">
                    {item.subtabs.map((sub) => {
                      const isSubActive = activeId === sub.id;
                      return (
                        <a
                          key={sub.id}
                          href={sub.href}
                          onClick={(e) => handleNavClick(e, sub.id, sub.filter)}
                          className={`block rounded-lg px-2.5 py-1.5 text-[11px] transition-all duration-200 truncate ${
                            isSubActive
                              ? "bg-amber-500/20 text-amber-300 font-bold border-l-2 border-amber-400 pl-3"
                              : "text-slate-400 hover:bg-slate-900/80 hover:text-amber-300 font-medium"
                          }`}
                        >
                          • {sub.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / CTA Actions */}
      <div className="pt-5 mt-6 border-t border-slate-800/80 space-y-3">
        <button
          type="button"
          onClick={() => { onOpenAtsResume(); setMobileDrawerOpen(false); }}
          className="w-full rounded-xl bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold py-3 px-4 text-xs transition duration-200 shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 border border-amber-500/30"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF File
        </button>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
          <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition font-semibold">LinkedIn</a>
          <span>•</span>
          <a href={`mailto:${email}`} className="hover:text-amber-400 transition font-semibold">Email</a>
          <span>•</span>
          <span className="text-[10px] text-slate-400">{phone}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP FIXED LEFT SIDEBAR WITH MULTI-LEVEL SUBTABS */}
      <aside className="hidden lg:flex w-72 fixed inset-y-0 left-0 z-40 bg-slate-950 text-white flex-col justify-between border-r border-slate-800/80 p-5 shadow-2xl backdrop-blur-2xl no-print">
        {navContent}
      </aside>

      {/* MOBILE TOP HEADER BAR */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-slate-950 px-5 py-3 text-white border-b border-slate-800 no-print">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-600 font-black text-slate-950 text-xs">
            ST
          </div>
          <div>
            <p className="text-xs font-bold text-white">{name}</p>
            <p className="text-[10px] text-amber-400 uppercase tracking-wider">{title}</p>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAtsResume}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-500 shadow-sm"
          >
            Download PDF
          </button>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-900 transition"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT LEFT DRAWER OVERLAY */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex no-print">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setMobileDrawerOpen(false)} />
          <div className="relative w-80 max-w-[85vw] bg-slate-950 p-5 text-white shadow-2xl z-10 border-r border-slate-800">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}

function Label({ children }) {
  return <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">{children}</p>;
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <article
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 card-hover-artistic hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/5 transition duration-300 overflow-hidden"
      {...staggerProps(index)}
    >
      <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-amber-500/20 transition duration-300" />

      <div>
        <div className="flex items-start justify-between gap-4">
          <Label>{project.status}</Label>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-amber-900 border border-amber-200/80">
            {project.projectItems.length} {project.projectItems.length === 1 ? "case study" : "case studies"}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950 group-hover:text-amber-950 transition-colors">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600 font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold text-white transition duration-200 group-hover:bg-amber-700 shadow-sm"
      >
        Explore Case Studies <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </article>
  );
}

function Detail({ label, children }) {
  return (
    <div className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
      <dt className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">{label}</dt>
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
      <button type="button" aria-label="Close project details" onClick={onClose} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm drawer-backdrop" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-5xl flex-col bg-white shadow-2xl drawer-panel"
      >
        <div className="flex items-start justify-between gap-5 border-b border-slate-200 px-5 py-5 md:px-8 bg-slate-950 text-white">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-400">{project.title}</span>
            <h2 id="project-dialog-title" className="mt-1.5 text-2xl font-bold tracking-tight text-white md:text-3xl">
              Project Evidence & Case Studies
            </h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700">
            Close
          </button>
        </div>
        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[290px_minmax(0,1fr)]">
          <nav aria-label="Case studies" className="border-b border-slate-200 bg-slate-50/80 p-4 lg:border-b-0 lg:border-r">
            <p className="px-2 pb-3 text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">Select Case Study</p>
            <div className="grid gap-2">
              {project.projectItems.map((item) => {
                const active = item.id === activeItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItemId(item.id)}
                    className={`rounded-xl px-4 py-3.5 text-left text-xs font-bold transition duration-200 ${active ? "bg-amber-700 text-white shadow-md shadow-amber-950/20" : "text-slate-700 hover:bg-white border border-transparent hover:border-slate-200"}`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </nav>
          <article className="p-6 md:p-8">
            <Label>{activeItem.tags.slice(0, 2).join(" · ")}</Label>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{activeItem.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{activeItem.summary}</p>
            <dl className="mt-6 max-w-3xl space-y-2">
              <Detail label="Business Problem">{activeItem.problemStatement}</Detail>
              <Detail label="Strategic Response">{activeItem.solution}</Detail>
              <Detail label="Operating Impact">{activeItem.impact}</Detail>
              <Detail label="Leadership Signal">{activeItem.leadershipValue}</Detail>
            </dl>
            <div className="mt-6 max-w-3xl border-t border-slate-200 pt-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">Systems & Tools Deployed</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {activeItem.toolsUsed.map((tool) => (
                  <span key={tool} className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 border border-amber-200">{tool}</span>
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
  const ids = ["capability-leadership", "capability-technology", "capability-certifications"];
  return (
    <article
      id={ids[index] ?? `capability-${index}`}
      className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm card-hover-artistic hover:border-amber-500/40 hover:shadow-lg scroll-snap-section"
      {...staggerProps(index)}
    >
      <h3 className="text-lg font-bold text-slate-950">{group.title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">{group.description}</p>
      <ul className="mt-4 space-y-2.5">
        {group.items.map((item) => (
          <li key={item} className="flex gap-2.5 text-xs leading-5 text-slate-700">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" aria-hidden="true" />
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

  // Scroll reveal refs
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
    <>
      <div id="main-website-root" className="min-h-screen bg-[#fcfcfd] text-slate-900 scroll-snap-container">
        {/* MULTI-LEVEL LEFT SIDEBAR WITH SUBTABS */}
        <SidebarNavigation
          name={profile.name}
          title="Strategic Development Leader"
          linkedin={profile.contact.linkedin}
          email={profile.contact.email}
          phone={profile.contact.phone}
          onOpenAtsResume={() => setIsAtsModalOpen(true)}
          onSelectFilter={(filter) => setActiveTag(filter)}
        />

        {/* MAIN CONTENT AREA */}
        <div className="lg:pl-72 flex-1 min-h-screen flex flex-col">
          <main>
            {/* HERO SECTION */}
            <section ref={heroRef} id="top" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-slate-200 bg-white min-h-[90vh] flex items-center scroll-snap-section">
              <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 right-0 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3" data-reveal>
                    <Label>{profile.title}</Label>
                    <span className="rounded-full bg-amber-50 px-3 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-200/80">
                      SqurrEnergy & Transformation Leadership
                    </span>
                  </div>

                  <h1 id="hero-title" className="mt-4 max-w-3xl text-3xl font-black leading-[1.1] tracking-tight text-slate-950 md:text-5xl hero-title-mobile" data-reveal data-reveal-delay="100">
                    Build the operating systems that turn strategy into <span className="text-gradient-saffron">measurable execution.</span>
                  </h1>

                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600" data-reveal data-reveal-delay="200">
                    {profile.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3" data-reveal data-reveal-delay="300">
                    <button
                      type="button"
                      onClick={() => setIsAtsModalOpen(true)}
                      className="rounded-xl bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-5 py-3.5 text-xs font-extrabold text-white transition duration-200 flex items-center gap-2 shadow-lg shadow-amber-950/20 border border-amber-500/30"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF Resume
                    </button>
                    <a href="#projects" className="rounded-xl bg-slate-950 px-5 py-3.5 text-xs font-bold text-white transition hover:bg-slate-800 shadow-md">
                      Review Projects
                    </a>
                    <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 px-4 py-3.5 text-xs font-bold text-slate-800 transition hover:border-amber-600 hover:text-amber-800">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <aside aria-label="Leadership positioning" className="relative rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl overflow-hidden" data-reveal data-reveal-delay="200" data-reveal-dir="right">
                  <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-400">Executive Snapshot</span>
                  <ul className="mt-4 space-y-4 relative z-10">
                    {profile.executiveSnapshot.map((item, index) => (
                      <li key={item} className="grid grid-cols-[26px_1fr] gap-3 text-xs leading-5 text-slate-300 border-b border-slate-900 pb-3 last:border-b-0 last:pb-0">
                        <span className="font-extrabold text-amber-400">0{index + 1}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </section>

            {/* LEADERSHIP EVIDENCE & METRICS BANNER */}
            <section ref={evidenceRef} id="leadership-evidence" aria-labelledby="evidence-title" className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20 min-h-[90vh] flex flex-col justify-center scroll-snap-section">
              <div data-reveal>
                <SectionHeading
                  id="evidence-title"
                  eyebrow="Leadership Impact"
                  title="A strategy-to-execution track record built in live operating environments."
                  description="Proven impact across structured problem solving, cross-functional ownership, financial controls, and measurable execution."
                />
              </div>

              <div id="metrics-banner" className="mt-8" data-reveal data-reveal-delay="150">
                <MetricsBanner />
              </div>

              <div id="focus-areas" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {profile.focusAreas.map((area, index) => (
                  <article key={area} className="border-t-2 border-amber-600 bg-white p-5 shadow-sm rounded-b-2xl border-x border-b border-slate-200 card-hover-artistic" {...staggerProps(index)}>
                    <p className="text-xs font-bold text-amber-700">0{index + 1}</p>
                    <h3 className="mt-3 text-sm font-semibold leading-5 text-slate-950">{area}</h3>
                  </article>
                ))}
              </div>

              <div id="work-method" className="mt-12 grid gap-8 border-t border-slate-200 pt-10 lg:grid-cols-[0.7fr_1.3fr]">
                <div data-reveal data-reveal-dir="left">
                  <Label>Operating Approach</Label>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Make the route from priority to performance visible.</h3>
                </div>
                <ol className="grid gap-5 sm:grid-cols-2">
                  {profile.workMethod.map((step, index) => (
                    <li key={step.title} className="border-l-2 border-amber-600 pl-4" {...staggerProps(index, 100)}>
                      <p className="text-[10px] font-extrabold text-amber-700">STEP 0{index + 1}</p>
                      <h4 className="mt-1 text-sm font-bold text-slate-950">{step.title}</h4>
                      <p className="mt-1 text-xs leading-5 text-slate-600">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* PROJECT PORTFOLIO SECTION */}
            <section ref={projectsRef} id="projects" aria-labelledby="projects-title" className="border-y border-slate-200 bg-white min-h-[90vh] flex flex-col justify-center scroll-snap-section">
              <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20 w-full">
                <div data-reveal>
                  <SectionHeading
                    id="projects-title"
                    eyebrow="Project Portfolio"
                    title="Business systems grouped by leadership outcome."
                    description={profile.projectSectionIntro}
                  />
                </div>

                <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-reveal data-reveal-delay="100">
                  <FilterPills items={tags} activeItem={activeTag} onSelect={setActiveTag} />
                  <div className="relative w-full md:w-72">
                    <input
                      type="text"
                      placeholder="Search projects or tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 pl-9 text-xs text-slate-900 placeholder-slate-400 focus:border-amber-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600/20 transition"
                    />
                    <svg className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {visibleProjects.length === 0 ? (
                  <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
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

            {/* CAPABILITIES SECTION */}
            <section ref={capabilitiesRef} id="capabilities" aria-labelledby="capabilities-title" className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20 min-h-[90vh] flex flex-col justify-center scroll-snap-section">
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

            {/* EXTRACURRICULAR SECTION */}
            <div className="scroll-snap-section">
              <ExtracurricularSection />
            </div>

            {/* FOOTER & CLOSING CONTACT HERO */}
            <section ref={contactRef} id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-white min-h-[85vh] flex items-center scroll-snap-section">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
              <div className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center relative z-10 w-full">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-400" data-reveal>Contact & Recruitment</p>
                  <h2 id="contact-title" className="mt-3 max-w-2xl text-2xl font-bold tracking-tight md:text-3xl" data-reveal data-reveal-delay="100">
                    For roles that need stronger operating clarity, disciplined execution, and cross-functional momentum.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300" data-reveal data-reveal-delay="200">{profile.contactMessage}</p>
                </div>
                <div className="grid gap-3 text-xs font-semibold" data-reveal data-reveal-delay="150" data-reveal-dir="right">
                  <button
                    type="button"
                    onClick={() => setIsAtsModalOpen(true)}
                    className="rounded-xl bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-4 text-center text-white font-extrabold transition shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 border border-amber-500/30"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF Resume
                  </button>
                  <a href={`mailto:${profile.contact.email}`} className="rounded-xl bg-white px-4 py-3.5 text-center text-slate-950 transition hover:bg-slate-100 font-extrabold">
                    {profile.contact.email}
                  </a>
                  <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-700 px-4 py-3.5 text-center text-white transition hover:border-amber-400 hover:text-amber-400 font-extrabold">
                    Connect on LinkedIn
                  </a>
                  <p className="px-1 text-center text-slate-400">{profile.contact.phone}</p>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* FLOATING BACK TO TOP BUTTON */}
        {showBackToTop && (
          <a
            href="#top"
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-amber-600 text-white shadow-xl transition-all duration-300 hover:bg-amber-500 hover:scale-105 border border-amber-400/30 no-print"
            title="Scroll to top"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </a>
        )}

        <ProjectDrawer project={selectedProject} onClose={() => setSelectedProjectId(null)} />
      </div>

      {/* PORTAL CONTAINER FOR ATS RESUME MODAL */}
      <div id="ats-resume-modal-portal">
        <AtsResumeModal isOpen={isAtsModalOpen} onClose={() => setIsAtsModalOpen(false)} />
      </div>
    </>
  );
}
