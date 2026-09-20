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
Strategic Development Leader | Business Transformation Executive
Email: shivamjthete123@gmail.com | Phone: +91-8263045370 | LinkedIn: https://www.linkedin.com/in/shivamjthete/ | Location: Pune, India

EXECUTIVE SUMMARY
Strategic Development Executive with 3+ years of enterprise leadership at SqurrEnergy and prior Zoho One consulting experience, specializing in cross-functional business transformation across finance, HR, sales, delivery, and operations. Proven ability to orchestrate alignment of business processes with executive vision through structured frameworks, digital automations, and enterprise dashboards. Adept at turning fragmented, manual workflows into governed operating models that deliver measurable execution discipline, data-driven decision-making, and scalable organizational growth.

CORE COMPETENCIES & KEYWORDS
- Strategic Leadership: Strategy-to-Execution Translation, Business Transformation, Operating Model Design, Cross-Functional Program Leadership, Change Management, Process Controls & Compliance.
- Operations & Revenue Operations: Revenue Operations (RevOps), Commercial Governance, Financial Controls, Cash Visibility, Cash Flow Forecasting, Corporate Cost Allocation, SLA Design.
- Technology & Enterprise Systems: Zoho One Ecosystem (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics, Desk), Deluge Scripting, REST APIs, Workflow Automation, Low-Code Application Development, Power BI, SAP SD (Certified).
- Delivery & Quality Governance: Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Quality Governance, Action Tracking, Executive Dashboarding.

PROFESSIONAL EXPERIENCE

Strategic Development Executive | SqurrEnergy (Jul 2023 – Present)
- Orchestrated alignment of business processes with executive vision through structured frameworks, documentation, and digital automations spanning finance, HR, sales, delivery, and operations.
- Championed development and adoption of enterprise dashboards and tools across the organization, cultivating a data-driven culture that empowers accountability and strategic decision-making.
- Led cross-functional teams in implementing technology workflows using Zoho One, delivering measurable operational enhancements and positioning the organization for scalable growth.
- Designed and deployed a governed CRM lifecycle covering lead qualification through receivables follow-up, reporting ~15 hours of monthly time saving across six users.
- Built cash-planning application with projected vs actual variance tracking, outflow calendar, and multi-entity consolidation for executive financial visibility.
- Created Project Pulse — delivery performance dashboard with background data sync, budget burn-rate tracking, and role-based access — estimated at 191.25 hours monthly saving across 45 users.
- Engineered HRMS optimization initiative connecting utilization dashboards, automated appraisal workflows, and performance-linked incentive systems.
- Implemented customer complaint and RCA engine with structured lifecycle, automated PDF reporting, and dashboard KPIs.

Zoho One Consultant | Samsoft IT Solutions LLC (Dec 2022 – Jun 2023)
- Collaborated with global clients to define requirements and deliver tailored Statements of Work across Zoho One solutions (CRM, Creator, Books, People, Projects).
- Engineered customized implementations including workflow automation, Deluge scripting, API integrations, and custom module development for diverse industry verticals.
- Managed client escalations and complex technical challenges, ensuring efficient end-to-end project delivery.

Functional Consultant | Target Integration (Jun 2022 – Nov 2022)
- Delivered Zoho One consulting services across CRM, Desk, Recruit, and Books for SMB and enterprise clients.
- Recognized for swift escalation resolution and excellence in project delivery.

Personal Goal Pursuit — Career Break | UPSC IES Prep, GATE & AFCAT (Jun 2018 – Dec 2021)
- Prepared for UPSC Indian Engineering Services (IES) examination, demonstrating commitment to ambitious national-level competitive goals.
- Secured All India Rank (AIR) 8003 in GATE examination, validating strong technical foundations.
- Qualified for AFCAT SSB Interview (2020), demonstrating leadership and defense services readiness.

Business Development Trainee | Byju's — The Learning App (Aug 2021 – Oct 2021)
- Engaged in direct sales and business development for India's leading edtech platform.

Project Intern | Sharda Motor Industries Ltd. (Jun 2016 – Jul 2016)
- Executed industrial ergonomics analysis on assembly floor, delivering workstation optimization recommendations.

KEY STRATEGIC TRANSFORMATION HIGHLIGHTS
- Revenue Operations & Commercial Execution: Governed CRM lifecycle, stage-gate approvals, custom SOW proposals, automated invoice sync (~15 hrs/mo saving).
- Finance Control & Cash Visibility: Deployed receivables ageing (30/60/90/120 days), automated collection escalations, cash planning calendar, corporate expense allocation (~6 hrs/mo saving).
- Delivery Governance (Project Pulse): BV Pulse dataset sync, budget burn-rate alerts, role-based views (Director/PM/Finance) (191.25 hrs/mo saving across 45 users).
- People & Performance Systems: Utilization tracking, automated appraisal cycles, performance-linked incentive calculation engine.
- Quality Governance & RCA (Communique): Closed-loop complaint intake to RCA PDF export (~7 hrs/mo saving); Communique MoM decision-tracking system.

EXTRACURRICULAR LEADERSHIP & COMMUNITY ENGAGEMENT
- Team Vector & Skylark Drone Competition (2016–2018): Mechanical Engineer on drone design & engineering team; building custom quadcopters.
- Prayas Youth Forum (2015–2018): Volunteer for social awareness, rural computer literacy drives, and environmental conservation.
- Swapnapurti Foundation (2016–2017): Volunteer conducting student mentorship and soft skills workshops.
- Sanwardhan NGO (2014–2018): Environmental volunteer across 4 years of active initiatives.

EDUCATION & GLOBAL CERTIFICATIONS
- Bachelor of Engineering (Mechanical Engineering) | K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | First Class With Distinction (66.18%)
- Business Intelligence Using Power BI | Skill Nation (Dec 2023)
- SAP Certified Application Associate — Sales and Distribution (SAP ERP 6.0 EhP7) | SAP (Mar 2022)
- GATE Qualified | All India Rank (AIR) 8003`;

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawTextResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
    <div id="ats-resume-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6" role="presentation">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm no-print" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ats-resume-title"
        className="relative flex h-full max-h-[92vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden z-10"
      >
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-slate-950 px-6 py-4 text-white no-print">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-400 border border-amber-500/30">
              ATS & AI Parsable Format
            </span>
            <h2 id="ats-resume-title" className="mt-1 text-xl font-bold tracking-tight text-white">
              Shivam J. Thete — Executive ATS Resume
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-500 shadow-sm"
              title="Download clean 2-page PDF formatted for ATS algorithms"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700"
              title="Download Markdown file"
            >
              .md
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

        {/* Printable ATS Content Area - Strictly Isolated for Clean 2-Page Printing */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-slate-900 bg-white" id="ats-resume-print-area">
          <div className="border-b border-slate-300 pb-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase md:text-3xl">SHIVAM J. THETE</h1>
            <p className="mt-1 text-sm font-semibold text-amber-800 uppercase tracking-wider">
              Strategic Development Leader | Business Transformation Executive
            </p>
            <p className="mt-2 text-xs text-slate-600 flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span><strong>Email:</strong> shivamjthete123@gmail.com</span>
              <span>•</span>
              <span><strong>Phone:</strong> +91-8263045370</span>
              <span>•</span>
              <span><strong>LinkedIn:</strong> linkedin.com/in/shivamjthete</span>
              <span>•</span>
              <span><strong>Location:</strong> Pune, India</span>
            </p>
          </div>

          <section className="mt-5">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EXECUTIVE SUMMARY
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-800">
              Strategic Development Executive with 3+ years of enterprise leadership at SqurrEnergy and prior Zoho One consulting experience, specializing in cross-functional business transformation across finance, HR, sales, delivery, and operations. Proven ability to orchestrate alignment of business processes with executive vision through structured frameworks, digital automations, and enterprise dashboards. Adept at turning fragmented, manual workflows into governed operating models that deliver measurable execution discipline, data-driven decision-making, and scalable organizational growth.
            </p>
          </section>

          <section className="mt-5">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              CORE COMPETENCIES
            </h2>
            <div className="mt-2.5 grid gap-2 text-xs text-slate-800">
              <div>
                <strong className="text-slate-950">Strategic Leadership:</strong> Strategy-to-Execution Translation, Business Transformation, Operating Model Design, Cross-Functional Program Leadership, Change Management, Process Controls & Compliance.
              </div>
              <div>
                <strong className="text-slate-950">Operations & Revenue Operations:</strong> Revenue Operations (RevOps), Commercial Governance, Financial Controls, Cash Visibility, Cash Flow Forecasting, Corporate Cost Allocation, SLA Design.
              </div>
              <div>
                <strong className="text-slate-950">Technology & Enterprise Systems:</strong> Zoho One Ecosystem (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics, Desk), Deluge Scripting, REST APIs, Workflow Automation, Low-Code Application Development, Power BI, SAP SD (Certified).
              </div>
              <div>
                <strong className="text-slate-950">Delivery & Quality Governance:</strong> Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Quality Governance, Action Tracking, Executive Dashboarding.
              </div>
            </div>
          </section>

          <section className="mt-5">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="mt-3.5 space-y-3.5 text-xs text-slate-800">
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>SqurrEnergy | Strategic Development Executive</span>
                  <span className="text-slate-600 font-normal">Jul 2023 – Present (3+ years)</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Orchestrated alignment of business processes with executive vision through structured frameworks, documentation, and digital automations spanning finance, HR, sales, delivery, and operations.</li>
                  <li>Championed development and adoption of enterprise dashboards and tools across the organization, cultivating a data-driven culture that empowers accountability and strategic decision-making.</li>
                  <li>Led cross-functional teams in implementing technology workflows using Zoho One, delivering measurable operational enhancements and positioning the organization for scalable growth.</li>
                  <li>Designed and deployed a governed CRM lifecycle covering lead qualification through receivables follow-up, reporting ~15 hours of monthly time saving across 6 users.</li>
                  <li>Built cash-planning application with projected vs actual variance tracking, outflow calendar, and multi-entity consolidation for executive financial visibility.</li>
                  <li>Created Project Pulse — delivery performance dashboard with background data sync, budget burn-rate tracking, and role-based access — estimated at 191.25 hours monthly saving across 45 users.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Samsoft IT Solutions LLC | Zoho One Consultant</span>
                  <span className="text-slate-600 font-normal">Dec 2022 – Jun 2023</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Collaborated with global clients to define requirements and deliver tailored Statements of Work across Zoho One solutions.</li>
                  <li>Engineered customized implementations including workflow automation, Deluge scripting, API integrations, and custom module development.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Target Integration | Functional Consultant</span>
                  <span className="text-slate-600 font-normal">Jun 2022 – Nov 2022</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Delivered Zoho One consulting services across CRM, Desk, Recruit, and Books for SMB and enterprise clients.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Personal Goal Pursuit — Career Break | UPSC IES Prep, GATE AIR 8003 & AFCAT</span>
                  <span className="text-slate-600 font-normal">Jun 2018 – Dec 2021</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Prepared for UPSC Indian Engineering Services (IES) exam; secured All India Rank (AIR) 8003 in GATE exam; qualified for AFCAT SSB Interview (2020).</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Byju's — The Learning App | Business Development Trainee</span>
                  <span className="text-slate-600 font-normal">Aug 2021 – Oct 2021</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Engaged in direct sales and business development during early career transition.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Sharda Motor Industries Ltd. | Project Intern</span>
                  <span className="text-slate-600 font-normal">Jun 2016 – Jul 2016</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Executed industrial ergonomics analysis on assembly floor, delivering workstation optimization recommendations.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-5">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              KEY STRATEGIC TRANSFORMATION PROJECTS & IMPACT
            </h2>
            <ul className="mt-2.5 list-disc pl-4 space-y-1.5 text-xs text-slate-800">
              <li><strong>Delivery Governance (Project Pulse):</strong> Delivered 191.25 hours/month in productivity savings across 45 users while elevating management margin visibility.</li>
              <li><strong>Revenue Operations (RevOps):</strong> Created 100% traceable hand-offs between sales, delivery, and finance, saving ~15 hours/month across 6 core users.</li>
              <li><strong>Financial Control & Cost Allocation:</strong> Saved 6+ hours/month in accounting review time while establishing auditable cash visibility.</li>
              <li><strong>Resource Capacity & Timesheet Governance:</strong> Standardized single-view capacity management across engineering verticals.</li>
              <li><strong>Quality Governance & RCA (Communique):</strong> Saved 7+ hours/month in administrative overhead and created closed-loop accountability.</li>
            </ul>
          </section>

          <section className="mt-5">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EXTRACURRICULAR LEADERSHIP & COMMUNITY ENGAGEMENT
            </h2>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-800">
              <div><strong>Team Vector & Skylark Drone Competition (2016–2018):</strong> Mechanical Engineer on drone design & engineering team; building custom quadcopters.</div>
              <div><strong>Prayas Youth Forum (2015–2018):</strong> Volunteer for social awareness, rural computer literacy drives, and environmental conservation.</div>
              <div><strong>Swapnapurti Foundation (2016–2017):</strong> Volunteer conducting student mentorship and soft skills workshops.</div>
              <div><strong>Sanwardhan NGO (2014–2018):</strong> Environmental volunteer across 4 years of active initiatives.</div>
            </div>
          </section>

          <section className="mt-5 pb-2">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EDUCATION & GLOBAL CERTIFICATIONS
            </h2>
            <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-slate-800">
              <li><strong>B.E. in Mechanical Engineering:</strong> K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | First Class With Distinction (66.18%)</li>
              <li><strong>GATE Qualified:</strong> All India Rank (AIR) 8003</li>
              <li><strong>Business Intelligence Using Power BI:</strong> Skill Nation (Dec 2023)</li>
              <li><strong>SAP Certified Application Associate:</strong> Sales and Distribution (SD) with SAP ERP 6.0 EhP7 (Global Certification, March 2022)</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500 flex justify-between items-center no-print">
          <span>Tip: Click "Download PDF" to generate a clean 2-page PDF formatted for ATS scanners.</span>
          <button type="button" onClick={onClose} className="font-semibold text-slate-700 hover:text-slate-900">
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
