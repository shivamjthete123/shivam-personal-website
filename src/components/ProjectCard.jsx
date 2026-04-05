function DetailBlock({ label, text }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

export default function ProjectCard({ project, expanded, onToggle }) {
  return (
    <article className="rounded-[28px] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)] backdrop-blur md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              {project.status}
            </span>
            {project.featured ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Featured
              </span>
            ) : null}
          </div>

          <h3 className="mt-4 text-2xl font-semibold text-slate-950">{project.title}</h3>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-slate-500">{project.role}</p>
        </div>

        <div className="max-w-md rounded-2xl border border-stone-200 bg-stone-50/90 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Leadership value</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">{project.leadershipValue}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.35fr_1fr]">
        <DetailBlock label="Business problem" text={project.problemStatement} />
        <DetailBlock label="System response" text={project.solution} />
        <DetailBlock label="Business impact" text={project.impact} />
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-stone-200 pt-6">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.toolsUsed.map((tool) => (
            <span key={tool} className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white">
              {tool}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {project.interactionFiles.length} interaction {project.interactionFiles.length === 1 ? "asset" : "assets"} available
          </p>

          <button
            type="button"
            onClick={onToggle}
            className="rounded-full border border-slate-950 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-950 hover:text-white"
          >
            {expanded ? "Hide project interactions" : "Explore project interactions"}
          </button>
        </div>
      </div>

      {expanded ? (
        <div className="mt-6 rounded-[24px] border border-amber-100 bg-amber-50/70 p-5 md:p-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">Interaction options</p>
            <p className="text-sm leading-6 text-slate-600">
              These assets are designed to help visitors review the project as a leadership case, not just a delivery summary.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {project.interactionFiles.map((file) => (
              <div key={file.label} className="rounded-2xl border border-amber-100 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{file.type}</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-950">{file.label}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{file.description}</p>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
                >
                  {file.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
