export default function MetricsBanner() {
  const metrics = [
    {
      value: "191.25",
      unit: "hrs/mo",
      label: "Productivity Saved",
      detail: "Across 45 users via Project Pulse delivery governance dashboard",
    },
    {
      value: "15",
      unit: "hrs/mo",
      label: "RevOps Efficiency",
      detail: "Commercial BD lifecycle governance & CRM hand-offs",
    },
    {
      value: "6",
      unit: "hrs/mo",
      label: "Month-End Savings",
      detail: "Automated corporate expense allocation & journal reviews",
    },
    {
      value: "7",
      unit: "hrs/mo",
      label: "Quality RCA Savings",
      detail: "Customer complaint tracking & action closure workflows",
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-5 sm:p-6 md:p-8 text-white shadow-2xl border border-slate-800">
      {/* Ambient background glow circle */}
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-5 md:pb-6">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-amber-400">Measured Operational Impact</p>
          <h3 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl md:text-2xl">
            Quantifiable results from strategy translation & workflow automation.
          </h3>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-amber-400/10 px-3 py-1 text-[11px] sm:text-xs font-bold text-amber-300 border border-amber-400/20 backdrop-blur-md shrink-0">
          Empirical Leadership Evidence
        </span>
      </div>

      <div className="relative z-10 mt-5 md:mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl bg-slate-900/90 p-4 sm:p-5 border border-slate-800 hover:border-amber-500/50 transition duration-300 hover:shadow-xl hover:shadow-amber-950/40"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-gradient-saffron group-hover:scale-105 transition-transform duration-300">{m.value}</span>
              <span className="text-xs font-bold text-amber-400/90 uppercase tracking-wider">{m.unit}</span>
            </div>
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">{m.label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
