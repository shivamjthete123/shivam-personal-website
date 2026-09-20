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
Strategy, Operations & Business Transformation Leader
Email: shivamjthete123@gmail.com | Phone: +91-8263045370 | LinkedIn: https://www.linkedin.com/in/shivamjthete/

EXECUTIVE SUMMARY
Strategic, systems-driven Operations and Business Transformation Leader with extensive experience converting complex business challenges into scalable operating models, governed workflows, and actionable executive visibility. Proven track record across Revenue Operations (RevOps), Financial Controls, Delivery Governance, HRMS Optimization, and Quality Assurance. Expert in architecting custom enterprise workflow solutions using the Zoho One ecosystem (Creator, CRM, Books, Projects, People, Analytics), Deluge automation, and REST APIs to drive measurable productivity gains, cash flow transparency, and operational accountability.

CORE COMPETENCIES & KEYWORDS
- Strategic Leadership: Strategy-to-Execution Translation, Operating Model Design, Business Transformation, Cross-Functional Program Leadership, Change Management, SLA & KPI Architecture.
- Financial & Commercial Operations: Revenue Operations (RevOps), Commercial Governance, Cash Flow Forecasting, Receivables Management, Corporate Cost Allocation, Financial Workflow Control.
- Delivery & Quality Governance: Delivery Governance, Resource Capacity Planning, Project Profitability Analytics, Root Cause Analysis (RCA), Quality Assurance Workflows, Action Tracking.
- Enterprise Systems & Technology: Zoho One Architecture (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics), Deluge Scripting, REST API Integration, HTML Widgets, Custom Workflow Automation.

KEY TRANSFORMATION PROJECTS & BUSINESS IMPACT

1. Revenue Operations & Commercial Governance System (RevOps)
- Problem: Commercial execution and downstream hand-offs lacked single-source-of-truth governance, causing friction between BD, Delivery, and Finance.
- Solution: Designed and deployed a unified Zoho CRM commercial backbone covering lead intake, proposal tracking, project handover readiness, sales order processing, and invoice follow-up.
- Impact & Value: Established 100% traceable commercial workflows, saving ~15 hours/month across 6 primary operational users and eliminating revenue leakage during hand-offs.
- Tech & Tools: Zoho CRM, Zoho Creator, Zoho Books, Zoho Analytics, Zoho Projects, Deluge Scripting.

2. Financial Control, Cash Visibility & Allocation Automation
- Problem: Financial operations suffered from fragmented invoicing, auditable cash planning gaps, and labor-intensive manual cost allocations.
- Solution: Engineered integrated finance workflow automation covering invoicing, procurement, receivables CRM synchronization, and an automated Creator cash-flow planning layer. Built an automated month-end shared cost allocation engine.
- Impact & Value: Saved 6+ hours monthly in month-end accounting reviews; established real-time ageing and collection task assignment; built auditable cash position forecasting.
- Tech & Tools: Zoho Creator, Zoho Books, Zoho CRM, Zoho Analytics, Deluge, Custom HTML Widgets.

3. Delivery Governance & Executive Performance Visibility (Project Pulse)
- Problem: Project financial health and resource tracking relied on scattered ad-hoc API checks, creating latency and reducing management visibility.
- Solution: Architected "Project Pulse"—a centralized executive performance engine built on processed BV Pulse datasets with automated background sync, budget monitoring, and role-based data security.
- Impact & Value: Delivered 191.25 hours of monthly operational productivity savings across 45 users; dramatically improved real-time margin and budget visibility.
- Tech & Tools: Zoho Projects, Zoho Creator, BV Pulse, Scheduled APIs, Deluge.

4. Resource Capacity & Timesheet Governance System
- Problem: Spreadsheet-based planning concealed true workload distribution, capacity constraints, and time-logging compliance.
- Solution: Developed a multi-role resource planning and timesheet approval module connecting weekly engineer load planning, manager review, and automatic Zoho Projects posting.
- Impact & Value: Established single-view capacity tracking across engineering verticals, streamlining weekly timesheet compliance and resource allocation.
- Tech & Tools: Zoho Creator, Zoho Analytics, Zoho Projects, Deluge, Custom Widgets.

5. Quality Governance, Customer RCA & Action Tracking (Communique)
- Problem: Customer complaints and meeting decisions suffered from inconsistent ownership, lack of root-cause traceability, and lost action items.
- Solution: Implemented an integrated Complaint & RCA engine in Zoho Projects/Creator with lifecycle notifications, structured decision records, and automated PDF export ("Communique").
- Impact & Value: Generated 7+ hours/month of administrative time savings while establishing closed-loop accountability for client issue resolution.
- Tech & Tools: Zoho Projects, Zoho Creator, Deluge, PDF Automation, Workflows.

6. People & Performance Systems (HRMS Optimization)
- Problem: Workforce evaluation and incentives were loosely coupled with operational output and utilization metrics.
- Solution: Upgraded Zoho People/Recruit/Payroll workflows to track real-time resource utilization and introduced metric-linked incentive calculation frameworks.
- Impact & Value: Enhanced evaluation objectivity and aligned employee performance directly with delivery and profitability targets.
- Tech & Tools: Zoho People, Zoho Creator, Zoho Recruit, Zoho Payroll, Zoho Analytics.

PROFESSIONAL EXPERIENCE & METHODOLOGY
Strategy & Operations Leader | Business Transformation Specialist
- Lead cross-functional transformation initiatives across RevOps, Finance, Delivery, HR, and Executive Governance.
- Standardize operating procedures, design custom data models, and build automated workflow solutions that align strategic goals with daily operational execution.
- Implement data-driven decision frameworks for executive leadership, replacing manual reporting with real-time analytics.

Four-Step Operating Framework:
1. Frame the Decision: Define underlying business problem, operational constraints, ownership structure, and metrics of success.
2. Design the Operating Model: Map end-to-end workflows, identify control points, data structures, and cross-functional hand-offs.
3. Implement with the Team: Build resilient tools, automated workflows, and governance rules tailored to frontline user adoption.
4. Make Performance Visible: Establish real-time dashboards, review cadences, and continuous feedback loops to ensure lasting impact.

EDUCATION & CREDENTIALS
- Academic Background: Business, Systems & Technology Operations Management
- Technical Specialization: Enterprise Low-Code Architecture, Zoho One Ecosystem, Deluge Scripting, REST APIs, Process Re-engineering.`;

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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm no-print" onClick={onClose} />

      {/* Modal Card */}
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

        {/* Printable & Scrollable ATS Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-slate-900 bg-white" id="ats-resume-print-area">
          {/* Resume Header */}
          <div className="border-b border-slate-300 pb-5 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase md:text-3xl">SHIVAM J. THETE</h1>
            <p className="mt-1 text-sm font-semibold text-slate-700 uppercase tracking-wider">
              Strategy, Operations & Business Transformation Leader
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

          {/* Executive Summary */}
          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EXECUTIVE SUMMARY
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-slate-800">
              Strategic, systems-driven Operations and Business Transformation Leader with extensive experience converting complex business challenges into scalable operating models, governed workflows, and actionable executive visibility. Proven track record across Revenue Operations (RevOps), Financial Controls, Delivery Governance, HRMS Optimization, and Quality Assurance. Expert in architecting custom enterprise workflow solutions using the Zoho One ecosystem (Creator, CRM, Books, Projects, People, Analytics), Deluge automation, and REST APIs to drive measurable productivity gains, cash flow transparency, and operational accountability.
            </p>
          </section>

          {/* Core Competencies */}
          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              CORE COMPETENCIES & ATS KEYWORDS
            </h2>
            <div className="mt-3 grid gap-2 text-xs text-slate-800">
              <div>
                <strong className="text-slate-950">Strategic Leadership:</strong> Strategy-to-Execution Translation, Operating Model Design, Business Transformation, Cross-Functional Program Leadership, Change Management, SLA & KPI Architecture.
              </div>
              <div>
                <strong className="text-slate-950">Financial & Commercial Operations:</strong> Revenue Operations (RevOps), Commercial Governance, Cash Flow Forecasting, Receivables Management, Corporate Cost Allocation, Financial Workflow Control.
              </div>
              <div>
                <strong className="text-slate-950">Delivery & Quality Governance:</strong> Delivery Governance, Resource Capacity Planning, Project Profitability Analytics, Root Cause Analysis (RCA), Quality Assurance Workflows, Action Tracking.
              </div>
              <div>
                <strong className="text-slate-950">Enterprise Systems & Technology:</strong> Zoho One Architecture (Creator, CRM, Books, Projects, People, Recruit, Payroll, Analytics), Deluge Scripting, REST API Integration, HTML Widgets, Custom Workflow Automation.
              </div>
            </div>
          </section>

          {/* Transformation Projects */}
          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              KEY TRANSFORMATION PROJECTS & BUSINESS IMPACT
            </h2>

            <div className="mt-4 space-y-4 text-xs text-slate-800">
              {/* Project 1 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>1. Revenue Operations & Commercial Governance System (RevOps)</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Commercial execution and downstream hand-offs lacked single-source-of-truth governance, causing friction between BD, Delivery, and Finance.</li>
                  <li><strong>Solution:</strong> Designed and deployed a unified Zoho CRM commercial backbone covering lead intake, proposal tracking, project handover readiness, sales order processing, and invoice follow-up.</li>
                  <li><strong>Impact:</strong> Established 100% traceable commercial workflows, saving ~15 hours/month across 6 primary operational users and eliminating revenue leakage.</li>
                  <li><strong>Tools:</strong> Zoho CRM, Zoho Creator, Zoho Books, Zoho Analytics, Zoho Projects, Deluge Scripting.</li>
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>2. Financial Control, Cash Visibility & Shared Cost Allocation Automation</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Financial operations suffered from fragmented invoicing, auditable cash planning gaps, and labor-intensive manual month-end cost allocations.</li>
                  <li><strong>Solution:</strong> Engineered integrated finance workflow automation covering invoicing, procurement, receivables CRM sync, and an automated Creator cash-flow planning layer. Built automated month-end shared cost allocation engine.</li>
                  <li><strong>Impact:</strong> Saved 6+ hours monthly in month-end accounting reviews; established real-time ageing and collection task assignment; built auditable cash position forecasting.</li>
                  <li><strong>Tools:</strong> Zoho Creator, Zoho Books, Zoho CRM, Zoho Analytics, Deluge, Custom HTML Widgets.</li>
                </ul>
              </div>

              {/* Project 3 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>3. Delivery Governance & Executive Performance Visibility (Project Pulse)</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Project financial health and resource tracking relied on scattered ad-hoc API checks, creating latency and reducing management visibility.</li>
                  <li><strong>Solution:</strong> Architected "Project Pulse"—a centralized executive performance engine built on processed BV Pulse datasets with automated background sync, budget monitoring, and role-based data security.</li>
                  <li><strong>Impact:</strong> Delivered 191.25 hours of monthly operational productivity savings across 45 users; dramatically improved real-time margin and budget visibility.</li>
                  <li><strong>Tools:</strong> Zoho Projects, Zoho Creator, BV Pulse, Scheduled APIs, Deluge.</li>
                </ul>
              </div>

              {/* Project 4 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>4. Resource Capacity & Timesheet Governance System</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Spreadsheet-based planning concealed true workload distribution, capacity constraints, and time-logging compliance.</li>
                  <li><strong>Solution:</strong> Developed a multi-role resource planning and timesheet approval module connecting weekly engineer load planning, manager review, and automatic Zoho Projects posting.</li>
                  <li><strong>Impact:</strong> Established single-view capacity tracking across engineering verticals, streamlining weekly timesheet compliance and resource allocation.</li>
                  <li><strong>Tools:</strong> Zoho Creator, Zoho Analytics, Zoho Projects, Deluge, Custom Widgets.</li>
                </ul>
              </div>

              {/* Project 5 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>5. Quality Governance, Customer RCA & Action Tracking (Communique)</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Customer complaints and meeting decisions suffered from inconsistent ownership, lack of root-cause traceability, and lost action items.</li>
                  <li><strong>Solution:</strong> Implemented an integrated Complaint & RCA engine in Zoho Projects/Creator with lifecycle notifications, structured decision records, and automated PDF export ("Communique").</li>
                  <li><strong>Impact:</strong> Generated 7+ hours/month of administrative time savings while establishing closed-loop accountability for client issue resolution.</li>
                  <li><strong>Tools:</strong> Zoho Projects, Zoho Creator, Deluge, PDF Automation, Workflows.</li>
                </ul>
              </div>

              {/* Project 6 */}
              <div>
                <div className="flex justify-between font-bold text-slate-950">
                  <span>6. People & Performance Systems (HRMS Optimization)</span>
                  <span className="text-slate-600 font-normal">Implemented</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li><strong>Problem:</strong> Workforce evaluation and incentives were loosely coupled with operational output and utilization metrics.</li>
                  <li><strong>Solution:</strong> Upgraded Zoho People/Recruit/Payroll workflows to track real-time resource utilization and introduced metric-linked incentive calculation frameworks.</li>
                  <li><strong>Impact:</strong> Enhanced evaluation objectivity and aligned employee performance directly with delivery and profitability targets.</li>
                  <li><strong>Tools:</strong> Zoho People, Zoho Creator, Zoho Recruit, Zoho Payroll, Zoho Analytics.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience & Methodology */}
          <section className="mt-6">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              PROFESSIONAL EXPERIENCE & OPERATING METHODOLOGY
            </h2>

            <div className="mt-3 text-xs text-slate-800">
              <div className="font-bold text-slate-950">Strategy & Operations Leader | Business Transformation Specialist</div>
              <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                <li>Lead cross-functional transformation initiatives across RevOps, Finance, Delivery, HR, and Executive Governance.</li>
                <li>Standardize operating procedures, design custom data models, and build automated workflow solutions that align strategic goals with daily operational execution.</li>
                <li>Implement data-driven decision frameworks for executive leadership, replacing manual reporting with real-time analytics.</li>
              </ul>
            </div>

            <div className="mt-3 text-xs text-slate-800">
              <strong className="text-slate-950">Four-Step Transformation Framework:</strong>
              <ol className="mt-1 list-decimal pl-4 space-y-1 text-slate-700">
                <li><strong>Frame the Decision:</strong> Clarify the business problem, operating constraint, owner, and metric of success.</li>
                <li><strong>Design the Operating Model:</strong> Map the workflow, control points, data requirements, and cross-functional hand-offs.</li>
                <li><strong>Implement with the Team:</strong> Build practical tools, automated workflows, and governance rules.</li>
                <li><strong>Make Performance Visible:</strong> Deploy executive dashboards, operational reviews, and continuous optimization.</li>
              </ol>
            </div>
          </section>

          {/* Education & Credentials */}
          <section className="mt-6 pb-4">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1">
              EDUCATION & TECHNICAL CREDENTIALS
            </h2>
            <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-slate-800">
              <li><strong>Academic Focus:</strong> Business, Systems & Technology Operations Management</li>
              <li><strong>Technical Competencies:</strong> Enterprise Low-Code Architecture, Zoho One Ecosystem, Deluge Scripting, REST API Integration, Process Re-engineering, Data Analytics.</li>
            </ul>
          </section>
        </div>

        {/* Footer info bar (Screen only) */}
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
