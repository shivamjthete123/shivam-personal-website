export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
