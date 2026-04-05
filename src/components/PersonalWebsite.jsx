import { useMemo, useState } from "react";
import { siteContent } from "../lib/content";
import FilterPills from "./FilterPills";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

function Navigation({ name }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Capabilities" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-[#f8f2e8]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200 bg-white text-sm font-bold text-amber-700">
            ST
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Leadership Portfolio</p>
            <p className="text-base font-semibold text-slate-950">{name}</p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
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

function SnapshotCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-3 text-lg font-semibold leading-7 text-slate-950">{value}</p>
    </div>
  );
}

function CapabilityCard({ title, description, items }) {
  return (
    <div className="rounded-[28px] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Capability area</p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span className="mt-2 h-2 w-2 rounded-full bg-amber-700" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PersonalWebsite() {
  const { profile, projects, skillGroups } = siteContent;
  const [activeTag, setActiveTag] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState(projects[0]?.id ?? null);

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

  return (
    <div className="min-h-screen text-slate-900">
      <Navigation name={profile.name} />

      <main id="top" className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-10 lg:px-8 lg:py-14">
        <section className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Built for decision-makers</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 md:text-6xl">
              {profile.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View strategic projects
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Open LinkedIn
              </a>
              <a
                href={`mailto:${profile.contact.email}`}
                className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Contact directly
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {profile.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]"
                >
                  <p className="text-lg font-semibold text-slate-950">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {profile.executiveSnapshot.map((item) => (
              <SnapshotCard key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-8">
          <SectionHeading
            eyebrow="Executive positioning"
            title="A clean portfolio focused on leadership substance."
            description="The layout is designed to help recruiters, hiring managers, and business leaders quickly understand the scale of problems you solve, the way you operate, and the outcomes your work creates."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Strategic focus</p>
              <ul className="mt-5 space-y-4">
                {profile.focusAreas.map((item) => (
                  <li key={item} className="flex gap-4 text-sm leading-6 text-slate-600">
                    <span className="mt-2 h-2 w-2 rounded-full bg-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Operating method</p>
              <div className="mt-5 space-y-4">
                {profile.workMethod.map((step, index) => (
                  <div key={step.title} className="flex gap-4 rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="grid gap-8">
          <SectionHeading
            eyebrow="Strategic projects"
            title="Case studies framed around business decisions and operating outcomes."
            description="Each project is organized to highlight the underlying business challenge, the system or process response, and the value created for leadership stakeholders. Interaction assets can open deeper walkthroughs for visitors who want more detail."
          />

          <FilterPills items={availableTags} activeItem={activeTag} onSelect={setActiveTag} />

          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expanded={expandedProjectId === project.id}
                onToggle={() =>
                  setExpandedProjectId((currentProjectId) => (currentProjectId === project.id ? null : project.id))
                }
              />
            ))}
          </div>
        </section>

        <section id="skills" className="grid gap-8">
          <SectionHeading
            eyebrow="Capabilities"
            title="Leadership signal with delivery credibility."
            description="The positioning here stays intentionally practical: enough operational and systems depth to show execution strength, without distracting from the broader transformation and leadership narrative."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <CapabilityCard
                key={group.id}
                title={group.title}
                description={group.description}
                items={group.items}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="rounded-[32px] border border-stone-200 bg-slate-950 px-6 py-8 text-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.8)] md:px-8 md:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Contact</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold leading-tight md:text-4xl">Open to leadership conversations and strategic roles.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                This portfolio is structured for business conversations, not just project browsing. If a role demands operating rigor, systems thinking, and cross-functional execution, this is the type of work I can bring to the table.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-200">
              <a href={`mailto:${profile.contact.email}`} className="transition hover:text-white">
                {profile.contact.email}
              </a>
              <p>{profile.contact.phone}</p>
              <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">
                LinkedIn profile
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/40 px-6 py-8 text-center text-sm text-slate-500 lg:px-8">
        Copyright {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
