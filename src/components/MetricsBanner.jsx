export default function MetricsBanner() {
  const metrics = [
    {
      value: "191.25 hrs/mo",
      label: "Productivity Saved",
      detail: "Across 45 users via Project Pulse delivery governance dashboard",
    },
    {
      value: "15 hrs/mo",
      label: "RevOps Efficiency",
      detail: "Commercial BD lifecycle governance & CRM hand-offs",
    },
    {
      value: "6 hrs/mo",
      label: "Month-End Savings",
      detail: "Automated corporate expense allocation & journal reviews",
    },
    {
      value: "7 hrs/mo",
      label: "Quality RCA Savings",
      detail: "Customer complaint tracking & action closure workflows",
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-950 p-6 md:p-8 text-white shadow-xl border border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-400">Measured Operational Impact</p>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-white md:text-2xl">
            Quantifiable results from strategy translation & workflow automation.
          </h3>
        </div>
        <span className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300 border border-teal-400/20">
          Empirical Leadership Evidence
        </span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="rounded-xl bg-slate-900/80 p-5 border border-slate-800/80 hover:border-teal-500/30 transition group hover:shadow-lg hover:shadow-teal-950/40">
            <p className="text-3xl font-extrabold tracking-tight text-teal-400 group-hover:text-teal-300 transition-colors">{m.value}</p>
            <p className="mt-1 text-sm font-bold text-slate-200">{m.label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
