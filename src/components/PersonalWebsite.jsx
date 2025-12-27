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
    linkedin: "https://www.linkedin.com/in/shivam-thete/",
    email: "shivamjthete123@gmail.com",
    phone: "+91-8263045370",
  },
  profile: `I combine strategic leadership with hands-on product development to transform operations into predictable, scalable engines for growth. I lead initiatives across Sales, Finance and HR using Zoho, Deluge and automation to reduce cycle-times, improve margin visibility, and align teams around measurable outcomes. Seeking senior leadership roles such as CEO to drive large-scale organisational transformation.`,

  projects: [
    {
      id: 'resource-planning-platform',
      title: 'Resource Planning Platform (Ongoing)',
      role: 'Product architect & lead developer',
      tech: ['Zoho Creator','Zoho Projects','Zoho Analytics','Deluge'],
      challenge: 'Lack of structured, skill-based resource allocation and limited visibility into utilization and revenue linkage.',
      approach: 'Built a unified Creator interface for skill-based allocation, calendar-driven planning, and automated timesheet conversion integrated with Zoho Projects. Designed KPIs covering performance hours, deviations, project exposure, and skill progression. Developed manager dashboards to translate attendance and task data into expected, potential, and actual revenue.',
      impact: 'Improved utilization transparency, enabled data-driven workforce planning, and strengthened revenue forecasting through operational metrics.'
    },

    {
      id: 'project-management-tools-suite',
      title: 'Project Management Tools Suite',
      role: 'Solution designer & implementer',
      tech: ['Zoho Creator','Deluge','AI Integrations','PDF Automation'],
      challenge: 'Legacy Excel-based processes caused fragmented data, poor traceability, and low user adoption.',
      approach: 'Modernized workflows by building interactive, AI-assisted Creator tools with centralized data, branded PDF exports, and user-centric interfaces aligned to organizational objectives. Implemented systems including Communique, Communication Matrix, Technical Query Sheet, Comment Resolution Sheet, Project Summary dashboards, Lessons Learned repository, and a Complaint Management System with SLAs.',
      impact: 'Centralized operational data, improved accountability and resolution speed, and aligned teams through standardized, insight-driven project tracking.'
    },

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
            <p className="text-sm text-slate-600 text-justify">{siteData.title}</p>
          </div>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#contact" className="hover:underline">Contact</a>
          
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="grid grid-cols-1 gap-6 items-start py-8">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight">{siteData.headline}</h2>
            <p className="mt-4 text-slate-700 text-justify leading-relaxed">{siteData.profile}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-semibold"><H>Leadership Focus</H></h3>
                <ul className="mt-2 text-sm text-slate-700 text-justify list-disc pl-5 space-y-1">
                  <li><H>Strategy-to-execution</H>: Convert strategic vision into measurable operational plans.</li>
                  <li><H>Systems & automation</H>: Build technology-first processes that scale.</li>
                  <li><H>Financial visibility</H>: Create dashboards that enable fast decisions.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-md">
                <h3 className="text-sm font-semibold"><H>Work Method</H></h3>
                <ol className="mt-2 text-sm text-slate-700 text-justify list-decimal pl-5 space-y-1">
                  <li><H>Diagnose</H>: Map process & KPIs</li>
                  <li><H>Design</H>: Define roles, SLAs & data model</li>
                  <li><H>Build</H>: Implement systems (Zoho + automation)</li>
                  <li><H>Adopt</H>: Train teams & measure outcomes</li>
                </ol>
              </div>
            </div>
          </div>

          
        </section>

        <section id="projects" className="py-8">
          <h3 className="text-2xl font-bold">Selected Strategic Projects</h3>

          <div className="mt-6 space-y-4">
            {siteData.projects.map(p => (
              <article key={p.id} className="p-6 border rounded-md bg-white hover:shadow-sm transition">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  <div className="lg:col-span-7">
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                    <p className="text-sm text-slate-600 text-justify mt-1">{p.role} • <span className="text-slate-500 text-justify">Tech:</span> <span className="text-slate-700 text-justify">{p.tech.join(' • ')}</span></p>
                  </div>
                  <div className="lg:col-span-5 text-sm text-slate-600 text-justify bg-slate-50 p-4 rounded-md h-full">
                      <h6 className="text-xs font-semibold uppercase text-slate-500 text-justify">Impact</h6>
                      <p className="mt-1">{p.impact}</p>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <div className="lg:col-span-4">
                    <h5 className="font-medium text-sm text-slate-600 text-justify">Problem</h5>
                    <p className="text-sm text-slate-700 text-justify mt-1">{p.challenge}</p>
                  </div>

                  <div className="lg:col-span-8">
                    <h5 className="font-medium text-sm text-slate-600 text-justify">Solution Architecture</h5>
                    <p className="text-sm text-slate-700 text-justify mt-1">{p.approach}</p>
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
              <ul className="mt-2 text-sm text-slate-700 text-justify list-disc pl-5">
                <li><H>Enterprise strategy</H> & transformation</li>
                <li><H>Financial architecture</H> & forecasting</li>
                <li><H>Sales strategy</H> & market research</li>
              </ul>
            </div>

            <div className="p-4 border rounded-md">
              <h5 className="font-semibold">Technology & Delivery</h5>
              <ul className="mt-2 text-sm text-slate-700 text-justify list-disc pl-5">
                <li><H>Zoho Creator</H>, CRM, Books, People</li>
                <li><H>Deluge scripting</H>, HTML Widgets, Extensions</li>
                <li><H>Dashboarding</H>, automation, API integrations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-8">
          <div className="max-w-3xl">
          <h3 className="text-2xl font-bold">Get in touch</h3>
          </div>
          <p className="mt-3 text-slate-700 text-justify">Email: <a href={`mailto:${siteData.contact.email}`} className="text-orange-600">{siteData.contact.email}</a> • Phone: {siteData.contact.phone} • LinkedIn: <a href={siteData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-orange-600">shivam-thete</a></p>
        </section>
      </main>

      <footer className="border-t mt-12 py-6 text-center text-sm text-slate-500 text-justify">
        © {new Date().getFullYear()} {siteData.name}
      </footer>
    </div>
  );
}
