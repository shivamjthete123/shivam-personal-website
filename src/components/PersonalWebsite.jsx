import React from "react";

/*
  Shivam Thete - Personal Website (Clean, professional, keyword-highlighted)
  - Edit content in `siteData` at the top.
  - Designed for clarity: compact project cards with emphasized keywords.
  - Use inside a Vite React app (src/components/PersonalWebsite.jsx)
*/

const H = ({ children }) => <span className="text-orange-600 font-semibold">{children}</span>;

const siteData = {
  name: "Shivam J. Thete",
  title: "Strategic Development Leader | Technology-Driven Execution",
  headline: "I design systems that convert strategy into measurable business outcomes.",
  contact: {
    email: "shivamjthete123@gmail.com",
    phone: "+91-8263045370",
  },
  profile: `I combine strategic leadership with hands-on product development to transform operations into predictable, scalable engines for growth. I lead initiatives across Sales, Finance and HR using Zoho, Deluge and automation to reduce cycle-times, improve margin visibility, and align teams around measurable outcomes. Seeking senior leadership roles such as CEO to drive large-scale organisational transformation.`,

  projects: [
    {
      id: 'sales-blueprint',
      title: 'Business Development Sales Blueprint & Dashboards',
      role: 'Lead strategist & developer',
      tech: ['Zoho CRM','Zoho Creator','Deluge','HTML Snippets'],
      challenge: 'Inconsistent sales stages and weak forecasting led to missed revenue and inefficient resource allocation.',
      approach: 'Defined a standardized sales lifecycle, implemented role-based handoffs, and built dashboards for funnel health and weighted forecasting.',
      impact: 'Forecast accuracy improved; sales cycle shortened by ~20%; lead-to-opportunity conversion increased within six months.'
    },

    {
      id: 'financial-automation',
      title: 'Financial Systems Integration & Automation',
      role: 'Product owner & principal developer',
      tech: ['Zoho Creator','Zoho Books','Deluge','APIs'],
      challenge: 'Fragmented financial data and slow invoicing caused revenue leakage and low margin visibility.',
      approach: 'Architected an integrated data model, automated invoice workflows, and built Project Pulse & BV Pulse dashboards for real‑time financial oversight.',
      impact: 'Invoice processing time reduced by 60%; receivables efficiency improved; near real‑time cashflow forecasts enabled leadership decisions.'
    },

    {
      id: 'operational-tools',
      title: 'Operational Tools & Document Systems',
      role: 'Architect & implementer',
      tech: ['Zoho Creator','Deluge','Document Storage'],
      challenge: 'Unstructured communications and undocumented decisions slowed problem resolution and risked knowledge loss.',
      approach: 'Built Communique (decision logs), TQ Sheets, Lessons Learned repository and Document Management to standardize documentation and accelerate resolution.',
      impact: 'Technical query resolution time reduced by 40%; institutional knowledge preserved in searchable repository.'
    },

    {
      id: 'erc-system',
      title: 'Efficiency Reward Credits (ERC) System',
      role: 'Product lead & developer',
      tech: ['Zoho Creator','Deluge','Zoho Analytics'],
      challenge: 'Subjective performance reviews caused low transparency and inconsistent incentives.',
      approach: 'Built a digital ERC platform to capture measurable contribution metrics and automate credits calculation and approvals.',
      impact: 'Improved perceived fairness in incentives and faster approvals tied to contribution data.'
    },

    {
      id: 'hrms-enhancements',
      title: 'HRMS Enhancements',
      role: 'Lead implementer',
      tech: ['Zoho People','Zoho Creator','Deluge'],
      challenge: 'Limited visibility on utilization and no structured skill-matching or automated appraisals.',
      approach: 'Developed utilization dashboards, skill-based resourcing tools and an automated appraisal workflow.',
      impact: 'Better resource planning, reduced bench time, and standardized appraisal fairness.'
    }
  ]
};

export default function PersonalWebsite() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased font-sans">
      <header className="max-w-5xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-orange-600 w-12 h-12 flex items-center justify-center text-white text-lg font-bold">ST</div>
          <div>
            <h1 className="text-lg font-semibold">{siteData.name}</h1>
            <p className="text-sm text-slate-600">{siteData.title}</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a href="/Shivam_Thete_Leadership_CV_Updated.docx" className="ml-4 inline-block px-3 py-2 rounded-md border border-slate-200">Download CV</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start py-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-extrabold leading-tight">{siteData.headline}</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">{siteData.profile}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-semibold"><H>Leadership Focus</H></h3>
                <ul className="mt-2 text-sm text-slate-700 list-disc pl-5 space-y-1">
                  <li><H>Strategy-to-execution</H>: Convert strategic vision into measurable operational plans.</li>
                  <li><H>Systems & automation</H>: Build technology-first processes that scale.</li>
                  <li><H>Financial visibility</H>: Create dashboards that enable fast decisions.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-semibold"><H>Work Method</H></h3>
                <ol className="mt-2 text-sm text-slate-700 list-decimal pl-5 space-y-1">
                  <li><H>Diagnose</H>: Map process & KPIs</li>
                  <li><H>Design</H>: Define roles, SLAs & data model</li>
                  <li><H>Build</H>: Implement systems (Zoho + automation)</li>
                  <li><H>Adopt</H>: Train teams & measure outcomes</li>
                </ol>
              </div>
            </div>
          </div>

          <aside className="p-4 border rounded-md">
            <h4 className="font-semibold">Contact</h4>
            <p className="text-sm text-slate-700 mt-2">Email: <a href={`mailto:${siteData.contact.email}`} className="text-orange-600">{siteData.contact.email}</a></p>
            <p className="text-sm text-slate-700">Phone: {siteData.contact.phone}</p>
            <div className="mt-4">
              <a href={`mailto:${siteData.contact.email}`} className="inline-block px-4 py-2 bg-orange-600 text-white rounded-md">Email</a>
            </div>
          </aside>
        </section>

        <section id="projects" className="py-8">
          <h3 className="text-2xl font-bold">Selected Strategic Projects</h3>

          <div className="mt-6 space-y-4">
            {siteData.projects.map(p => (
              <article key={p.id} className="p-5 border rounded-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                    <p className="text-sm text-slate-600 mt-1">{p.role} • <span className="text-slate-500">Tech:</span> <span className="text-slate-700">{p.tech.join(' • ')}</span></p>
                  </div>
                  <div className="text-sm text-slate-500">{p.impact}</div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-sm">Challenge</h5>
                    <p className="text-sm text-slate-700 mt-1">{p.challenge.replace(/(sales|invoice|cashflow|automation|Zoho|Deluge|ERC|appraisal|utilization)/gi, match => `<strong class=\"text-orange-600\">${match}</strong>` )}</p>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm">Approach</h5>
                    <p className="text-sm text-slate-700 mt-1">{p.approach}</p>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="py-8">
          <h3 className="text-2xl font-bold">Skills & Capabilities</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
              <h5 className="font-semibold">Strategic Leadership</h5>
              <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">
                <li><H>Enterprise strategy</H> & transformation</li>
                <li><H>Financial architecture</H> & forecasting</li>
                <li><H>Sales strategy</H> & market research</li>
              </ul>
            </div>

            <div className="p-4 border rounded-md">
              <h5 className="font-semibold">Technology & Delivery</h5>
              <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">
                <li><H>Zoho Creator</H>, CRM, Books, People</li>
                <li><H>Deluge scripting</H>, HTML Widgets, Extensions</li>
                <li><H>Dashboarding</H>, automation, API integrations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-8">
          <h3 className="text-2xl font-bold">Get in touch</h3>
          <p className="mt-3 text-slate-700">Email: <a href={`mailto:${siteData.contact.email}`} className="text-orange-600">{siteData.contact.email}</a> • Phone: {siteData.contact.phone}</p>
        </section>
      </main>

      <footer className="border-t mt-12 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {siteData.name}
      </footer>
    </div>
  );
}