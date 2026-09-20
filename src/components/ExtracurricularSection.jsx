import SectionHeading from "./SectionHeading";

export default function ExtracurricularSection() {
  const activities = [
    {
      title: "Prayas Youth Forum – Rural Computer Literacy Camp",
      period: "2016, 2017, 2018 (3 Years)",
      category: "Digital Literacy & Community Outreach",
      description:
        "Spearheaded 3 consecutive annual computer literacy camps in rural Nashik, developing soft skills while spreading essential digital literacy and computer awareness to underprivileged youth.",
      badge: "Community Leadership",
    },
    {
      title: "Swapnapurti Foundation – High School Mentorship",
      period: "2017, 2018 (2 Seasons)",
      category: "Youth Mentorship & Career Guidance",
      description:
        "Delivered interactive workshops on personality development, career guidance, and academic direction for secondary school students across two active seasons.",
      badge: "Youth Empowerment",
    },
    {
      title: "Prayas Youth Forum – Annual Eco Murti Immersion Drive",
      period: "2015, 2016, 2017 (3 Years)",
      category: "Environmental Sustainability",
      description:
        "Organized and executed 3 consecutive eco-friendly festival immersion and recycling drives with Prayas Youth Forum & Sanwardhan to prevent local water pollution.",
      badge: "Environmental Impact",
    },
    {
      title: "STEM Robotics & Quadcopter Aviation Seminars",
      period: "2018",
      category: "STEM Education Outreach",
      description:
        "Designed and presented foundational seminars on quadcopter electronics (BLDC motors, ESCs, flight controllers) with live flying demonstrations for 8th–10th grade students at Maratha Highschool, Nashik.",
      badge: "STEM Mentorship",
    },
    {
      title: "Mechanical Team Lead – Team Vector (ABU Robocon)",
      period: "2016, 2017, 2018",
      category: "Engineering Leadership & Robotics",
      description:
        "Led a 10-engineer mechanical team representing K. K. Wagh Institute across 3 national robotics events. Designed virtual mechanisms, pneumatic circuit controls, and functional prototypes.",
      badge: "Engineering Leadership",
    },
    {
      title: "SAP Certified Application Associate – Sales & Distribution",
      period: "Certified March 2022",
      category: "Global Enterprise Certification",
      description:
        "Globally certified in SAP SD module (SAP ERP 6.0 EhP7), demonstrating mastery in commercial sales workflows, pricing, delivery, and billing integrations.",
      badge: "Global Certification",
    },
  ];

  return (
    <section id="extracurricular" aria-labelledby="extracurricular-title" className="border-t border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          id="extracurricular-title"
          eyebrow="Leadership Beyond Work"
          title="Extracurricular leadership, community impact, and technical initiatives."
          description="A track record of initiative—from leading national robotics teams and environmental drives to empowering rural communities with digital literacy."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((act, index) => (
            <article key={index} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
                    {act.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{act.period}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{act.title}</h3>
                <p className="mt-1 text-xs font-semibold text-amber-700">{act.category}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{act.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
