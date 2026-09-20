import { useEffect, useState } from "react";

export default function AtsResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawTextResume = `SHIVAM J. THETE
Strategy, Operations & Business Transformation Leader | Zoho One & SAP SD Certified Consultant
Email: shivamjthete123@gmail.com | Phone: +91-8263045370 | LinkedIn: https://www.linkedin.com/in/shivamjthete/

EXECUTIVE SUMMARY
Results-driven Strategy, Operations, and Business Transformation Leader with extensive experience architecting enterprise workflow operating models, financial controls, Revenue Operations (RevOps), and delivery governance frameworks. Dual-background in Mechanical Engineering and Enterprise Systems (Zoho One & SAP SD Certified). Proven track record translating high-level business priorities into scalable low-code ecosystems (Zoho Creator, CRM, Books, Projects, People, Analytics, Deluge, REST APIs) that drive measurable productivity, cash flow transparency, and operational accountability.

CORE COMPETENCIES & KEYWORDS
- Strategic Leadership: Operating Model Design, Strategy-to-Execution Translation, Business Transformation, Cross-Functional Leadership, Change Management, SLA & KPI Architecture.
- Financial & Commercial Operations: Revenue Operations (RevOps), Commercial Governance, Cash Flow Forecasting, Receivables Management, Corporate Cost Allocation, Financial Workflow Control.
- Systems & Technology: Enterprise Low-Code Architecture, Zoho One Ecosystem (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics, Desk), SAP SD Module, Deluge Scripting, REST APIs, Automation.
- Delivery & Quality Governance: Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Quality Assurance Workflows, Action Tracking, Industrial Ergonomics.

PROFESSIONAL EXPERIENCE

Samsoft IT Solutions LLC | Zoho One Consultant (Dec 2022 – Present)
- Consult with executive stakeholders across industries to translate complex operational challenges into structured, scalable Zoho One enterprise architectures.
- Author detailed technical requirement specifications, process maps, and implementation blueprints for RevOps, finance controls, and workforce management.
- Architect custom Deluge workflows, REST API integrations, and HTML dashboards, driving measurable productivity gains (up to 191+ hours/month across client teams).
- Manage end-to-end implementation lifecycles, change management, user adoption, and escalation handling across multi-entity deployments.

Target Integration | Associate Functional Consultant (Jun 2022 – Dec 2022)
- Configured, customized, and integrated core Zoho One modules including Zoho CRM, Books, Analytics, People, Payroll, Recruit, Desk, and Forms.
- Designed automated CRM sales blueprints, custom module workflows, and multi-app data synchronization to streamline commercial and HR hand-offs.

Byju's The Learning App | Business Development Trainee (Aug 2021 – Oct 2021)
- Achieved batch-topping revenue generation by driving consultative sales engagements, demonstrating commercial drive and client communication.

Sharda Motor Industries Ltd. | Project Intern (Jun 2016 – Jul 2016)
- Executed an industrial ergonomics analysis on the assembly floor, delivering actionable workstation optimization recommendations to improve worker safety and posture efficiency.

KEY STRATEGIC TRANSFORMATION PROJECTS & IMPACT
1. Delivery Governance & Executive Performance Visibility (Project Pulse): Delivered 191.25 hours/month in productivity savings across 45 users while elevating management margin visibility.
2. Revenue Operations & Commercial Governance (RevOps): Created 100% traceable hand-offs between sales, delivery, and finance, saving ~15 hours/month across 6 core users.
3. Financial Control & Shared Cost Allocation: Saved 6+ hours/month in accounting review time while establishing auditable cash visibility.
4. Resource Capacity & Timesheet Governance System: Standardized single-view capacity management across engineering verticals.
5. Quality Governance, Customer RCA & Action Tracking: Saved 7+ hours/month in administrative overhead and created closed-loop accountability.
6. Workforce Utilization & Performance Incentive System: Grounded performance reviews in objective operational data.

ENGINEERING & INNOVATION PROJECTS
- Omni-Vehicle "Universalus" (Lead Designer): Designed and fabricated a concept vehicle capable of land driving, swimming, and flying. Engineered custom 3-way transmission, conducted SolidWorks/ANSYS stress simulations, and 3D-printed custom gearboxes.
- Team Vector – ABU Robocon National (Mechanical Lead, 2016–2018): Led a 10-engineer mechanical team across 3 national robotics competitions; designed virtual mechanisms, pneumatic circuits, and functional prototypes.
- Skylark Drone Competition (2017): Built and calibrated custom quadcopters (BLDC motors, ESCs, flight controllers, radio tuning).

EXTRACURRICULAR LEADERSHIP & SOCIAL IMPACT
- Prayas Youth Forum – Computer Literacy Drive (2016–2018): Spearheaded 3 consecutive annual rural computer literacy camps, bringing digital skills awareness to underprivileged students.
- Swapnapurti Foundation (2017–2018): Conducted career guidance, soft skills, and personality development workshops for high school students across 2 seasons.
- Prayas Eco-Immersion Drive (2015–2017): Organized 3 annual eco-friendly immersion and recycling initiatives to prevent river pollution.
- STEM & Robotics Community Workshops (2018): Conducted hands-on drone physics seminars with live flight demos for 8th–10th grade students at Maratha Highschool, Nashik.

EDUCATION & GLOBAL CERTIFICATIONS
- B.E. in Mechanical Engineering | K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | Percentage: 66.18%
- GATE 2021 Qualified: Score 549 | All India Rank (AIR): 6057
- SAP Certified Application Associate – Sales and Distribution (SD) with SAP ERP 6.0 EhP7 (Global Certification, March 2022)`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([rawTextResume], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "SHIVAM_THETE_ATS_RESUME.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6" role="presentation">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm no-print" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ats-resume-title"
        className="relative flex h-full max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-900 px-6 py-4 text-white no-print">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-bold text-amber-300">
              ATS & AI Parsable Format
            </span>
            <h2 id="ats-resume-title" className="mt-1 text-xl font-bold tracking-tight text-white">
              Shivam J. Thete — Executive ATS Resume
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              title="Print or Save as PDF"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Text for ATS
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700"
              title="Download Markdown file"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .md
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Printable ATS Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-slate-900 bg-white" id="ats-resume-print-area">
          <div className="border-b border-slate-300 pb-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase md:text-3xl">SHIVAM J. THETE</h1>
            <p className="mt-1 text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Strategy, Operations & Business Transformation Leader | Zoho One & SAP SD Certified
            </p>
            <p className="mt-2 text-xs text-slate-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span><strong>Email:</strong> shivamjthete123@gmail.com</span>
              <span>•</span>
              <span><strong>Phone:</strong> +91-8263045370</span>
              <span>•</span>
              <span><strong>LinkedIn:</strong> linkedin.com/in/shivamjthete</span>
              <span>•</span>
              <span><strong>Location:</strong> India</span>
            </p>
          </div>

          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EXECUTIVE SUMMARY
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-800">
              Results-driven Strategy, Operations, and Business Transformation Leader with extensive experience architecting enterprise workflow operating models, financial controls, Revenue Operations (RevOps), and delivery governance frameworks. Dual-background in Mechanical Engineering and Enterprise Systems (Zoho One & SAP SD Certified). Proven track record translating high-level business priorities into scalable low-code ecosystems (Zoho Creator, CRM, Books, Projects, People, Analytics, Deluge, REST APIs) that drive measurable productivity, cash flow transparency, and operational accountability.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              CORE COMPETENCIES & KEYWORDS
            </h2>
            <div className="mt-3 grid gap-2 text-xs text-slate-800">
              <div>
                <strong className="text-slate-950">Strategic Leadership:</strong> Operating Model Design, Strategy-to-Execution Translation, Business Transformation, Cross-Functional Leadership, Change Management, SLA & KPI Architecture.
              </div>
              <div>
                <strong className="text-slate-950">Financial & Commercial Operations:</strong> Revenue Operations (RevOps), Commercial Governance, Cash Flow Forecasting, Receivables Management, Corporate Cost Allocation, Financial Workflow Control.
              </div>
              <div>
                <strong className="text-slate-950">Systems & Technology:</strong> Enterprise Low-Code Architecture, Zoho One Ecosystem (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics, Desk), SAP SD Module, Deluge Scripting, REST APIs, Automation.
              </div>
              <div>
                <strong className="text-slate-950">Delivery & Quality Governance:</strong> Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Quality Assurance Workflows, Action Tracking, Industrial Ergonomics.
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="mt-4 space-y-4 text-xs text-slate-800">
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Samsoft IT Solutions LLC | Zoho One Consultant</span>
                  <span className="text-slate-600 font-normal">Dec 2022 – Present</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Consult with executive stakeholders across industries to translate complex operational challenges into structured, scalable Zoho One enterprise architectures.</li>
                  <li>Author detailed technical requirement specifications, process maps, and implementation blueprints for RevOps, finance controls, and workforce management.</li>
                  <li>Architect custom Deluge workflows, REST API integrations, and HTML dashboards, driving measurable productivity gains (up to 191+ hours/month across client teams).</li>
                  <li>Manage end-to-end implementation lifecycles, change management, user adoption, and escalation handling across multi-entity deployments.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Target Integration | Associate Functional Consultant</span>
                  <span className="text-slate-600 font-normal">Jun 2022 – Dec 2022</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Configured, customized, and integrated core Zoho One modules including Zoho CRM, Books, Analytics, People, Payroll, Recruit, Desk, and Forms.</li>
                  <li>Designed automated CRM sales blueprints, custom module workflows, and multi-app data synchronization to streamline commercial and HR hand-offs.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Byju's The Learning App | Business Development Trainee</span>
                  <span className="text-slate-600 font-normal">Aug 2021 – Oct 2021</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Achieved batch-topping revenue generation by driving consultative sales engagements, demonstrating commercial drive and client communication.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Sharda Motor Industries Ltd. | Project Intern</span>
                  <span className="text-slate-600 font-normal">Jun 2016 – Jul 2016</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Executed an industrial ergonomics analysis on the assembly floor, delivering actionable workstation optimization recommendations to improve worker safety and posture efficiency.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              KEY STRATEGIC TRANSFORMATION PROJECTS & IMPACT
            </h2>
            <ul className="mt-3 list-disc pl-4 space-y-2 text-xs text-slate-800">
              <li><strong>Delivery Governance (Project Pulse):</strong> Delivered 191.25 hours/month in productivity savings across 45 users while elevating management margin visibility.</li>
              <li><strong>Revenue Operations (RevOps):</strong> Created 100% traceable hand-offs between sales, delivery, and finance, saving ~15 hours/month across 6 core users.</li>
              <li><strong>Financial Control & Cost Allocation:</strong> Saved 6+ hours/month in accounting review time while establishing auditable cash visibility.</li>
              <li><strong>Resource Capacity & Timesheet Governance:</strong> Standardized single-view capacity management across engineering verticals.</li>
              <li><strong>Quality Governance & RCA (Communique):</strong> Saved 7+ hours/month in administrative overhead and created closed-loop accountability.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              ENGINEERING & EXTRACURRICULAR LEADERSHIP
            </h2>
            <div className="mt-3 space-y-2 text-xs text-slate-800">
              <div><strong>Omni-Vehicle "Universalus":</strong> Designed and fabricated concept vehicle capable of land driving, swimming, and flying with custom 3-way transmission.</div>
              <div><strong>Team Vector Robotics Lead (ABU Robocon National):</strong> Led 10-engineer team across 3 national robotics events; designed pneumatic circuits & physical prototypes.</div>
              <div><strong>Prayas Youth Forum – Computer Literacy Drive:</strong> Spearheaded 3 annual rural computer literacy camps for underprivileged students (2016–2018).</div>
              <div><strong>Swapnapurti Foundation Youth Mentorship:</strong> Conducted career guidance & soft skills workshops for high school students (2017–2018).</div>
            </div>
          </section>

          <section className="mt-6 pb-4">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EDUCATION & GLOBAL CERTIFICATIONS
            </h2>
            <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-slate-800">
              <li><strong>B.E. in Mechanical Engineering:</strong> K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | Percentage: 66.18%</li>
              <li><strong>GATE 2021 Qualified:</strong> Score 549 | All India Rank (AIR): 6057</li>
              <li><strong>SAP Certified Application Associate:</strong> Sales and Distribution (SD) with SAP ERP 6.0 EhP7 (Global Certification, March 2022)</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500 flex justify-between items-center no-print">
          <span>Tip: Click "Print / Save PDF" to generate a clean 2-page PDF formatted for ATS algorithms.</span>
          <button type="button" onClick={onClose} className="font-semibold text-slate-700 hover:text-slate-900">
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
