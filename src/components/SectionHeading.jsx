export default function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
