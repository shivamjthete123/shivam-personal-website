import { useEffect, useState } from "react";

export default function AtsResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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
Strategic Development Executive | Systems & Process Automation Leader
Email: shivamjthete123@gmail.com | Phone: +91-8263045370 | LinkedIn: https://www.linkedin.com/in/shivamjthete/ | Website: https://shivam-personal-website.vercel.app/ | Location: Pune, India

EXECUTIVE SUMMARY
Disciplined, system-minded Strategic Operations Executive with a Mechanical Engineering foundation and 3+ years of enterprise experience building digital process automations across finance, sales, project delivery, and HR. Guided by a pragmatic problem-solving mindset that treats operational friction as a system challenge — transforming manual, spreadsheet-heavy workflows into automated, auditable processes and transparent executive dashboards. My goal is to lead high-impact business transformations that align executive vision with frontline execution to build accountable, data-backed operating environments.

CORE COMPETENCIES & KEYWORDS
- Process Automation & Operations: Business Process Automation, Revenue Operations (RevOps), Commercial Workflows, Financial Controls, Cash Flow Forecasting, Shared Cost Allocation.
- Zoho Ecosystem & Technical: Zoho CRM, Creator, Books, Projects, People, Analytics, Deluge Scripting, REST APIs, Webhooks, Low-Code Architecture, Power BI, SAP SD (Certified).
- Governance & Analytics: Project Delivery Governance, Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Customer Complaint Tracking, Executive Dashboards.

PROFESSIONAL EXPERIENCE

Strategic Development Executive | SqurrEnergy (Jul 2023 – Present)
- Designed and deployed digital process automations across finance, HR, sales, project delivery, and operations using the Zoho One ecosystem.
- Built Project Pulse, a real-time project profitability and budget burn-rate dashboard (BV Pulse architecture) saving an estimated 191.25 hours monthly across 45 users.
- Automated commercial pipeline in Zoho CRM from lead qualification to SOW generation and invoice sync, saving ~15 hours per month across 6 core users.
- Engineered Creator cash flow planning application with payment outflow scheduling, date-change audit tracking, and multi-entity balance consolidation.
- Automated monthly shared corporate expense allocation using active headcount ratios and Zoho Books API integration, cutting month-end processing by 6 hours monthly.
- Built customer complaint and Root Cause Analysis (RCA) quality engine featuring 5-Why investigation templates, corrective action tracking, and automated PDF export (~7 hrs/month saved).
- Developed resource capacity planning and weekly timesheet approval workflows linking engineer task plans directly into Zoho Projects time logs.
- Integrated Zoho People and Creator to track billable vs available resource utilization and automate quarterly appraisal workflows.

Zoho One Consultant | Samsoft IT Solutions LLC (Dec 2022 – Jun 2023)
- Consulted global clients on solution architecture, custom Deluge scripting, and API integrations across Zoho CRM, Creator, Books, People, and Projects.
- Gathered client business requirements, authored detailed Statements of Work (SOW), and configured custom low-code applications for diverse industry verticals.
- Resolved complex technical escalation issues and delivered client user training to ensure smooth system adoption.

Functional Consultant | Target Integration (Jun 2022 – Nov 2022)
- Implemented Zoho One modules (CRM, Desk, Recruit, Books) for SMB and enterprise clients.
- Led requirement gathering workshops, system mapping, data migration, and end-user training sessions.

Personal Goal Pursuit — Career Break | UPSC IES Prep, GATE & AFCAT (Jun 2018 – Dec 2021)
- Prepared for UPSC Indian Engineering Services (IES) examination, developing deep foundations in engineering fundamentals.
- Qualified GATE 2021 (AIR 6057, Score: 549) & GATE 2020 (AIR 8003, Score: 555) in Mechanical Engineering.
- Qualified AFCAT SSB Interview (2020) for Indian Air Force officer selection.

Business Development Trainee | Byju's — The Learning App (Aug 2021 – Oct 2021)
- Handled direct sales and customer onboarding during early career transition into business operations.

Project Intern | Sharda Motor Industries Ltd. (Jun 2016 – Jul 2016)
- Executed industrial workstation ergonomics analysis on assembly floor, delivering layout optimization recommendations.

KEY PROJECT AUTOMATION HIGHLIGHTS
- Delivery Intelligence (Project Pulse): Saved 191.25 hours/month across 45 team members by building automated dataset sync, budget burn-rate tracking, and margin deviation alerts.
- Commercial & CRM Automation: Standardized deal qualification, SOW approval, and automated invoice creation, saving 15 hours/month across BD and finance.
- Cash Visibility & Outflow Planning: Replaced offline spreadsheets with Creator payment planning calendar and real-time cash position dashboards.
- Automated Expense Allocation: Reduced month-end accounting allocation time by 6 hours/month using automated headcount-ratio journal posting.
- Quality RCA & Action Tracking (Communiqué): Created closed-loop complaint investigation and MoM action tracking with automated PDF report generation.

EXTRACURRICULAR LEADERSHIP & COMMUNITY ENGAGEMENT
- Team Vector & Skylark Drone Competition (2016–2018): Mechanical Engineer on drone design & engineering team; building custom quadcopters.
- Prayas Youth Forum (2015–2018): Volunteer for social awareness, rural computer literacy drives, and environmental conservation.
- Swapnapurti Foundation & Sanwardhan NGO (2014–2018): Active volunteer for youth mentorship and environmental conservation.

EDUCATION & GLOBAL CERTIFICATIONS
- Bachelor of Engineering (Mechanical Engineering) | K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | First Class With Distinction (66.18%)
- GATE 2021 Qualified | All India Rank (AIR) 6057 | GATE Score: 549
- GATE 2020 Qualified | All India Rank (AIR) 8003 | GATE Score: 555
- Business Intelligence Using Power BI | Skill Nation (Dec 2023)
- SAP Certified Application Associate — Sales and Distribution (SAP ERP 6.0 EhP7) | SAP (Mar 2022)`;

  // Native Vector PDF Generator Engine with Clickable Hyperlinks (Email, LinkedIn, Website)
  const generateNativeVectorPdf = () => {
    if (!window.jspdf) return false;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const marginX = 36;
    const maxW = 523;
    const pageH = 841.89;
    let y = 36;

    const checkPageBreak = (neededH) => {
      if (y + neededH > pageH - 36) {
        doc.addPage();
        y = 36;
        return true;
      }
      return false;
    };

    // Subtle headshot photo in PDF top-right corner
    try {
      const headshotImg = document.getElementById("ats-resume-headshot-img");
      if (headshotImg) {
        doc.addImage(headshotImg, "JPEG", marginX + maxW - 36, 26, 36, 44);
      }
    } catch (e) {
      console.log("Photo embed skipped:", e);
    }

    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(15, 23, 42);
    doc.text("SHIVAM J. THETE", 270, y, { align: "center" });
    y += 18;

    // Subtitle
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(194, 65, 12);
    doc.text("STRATEGIC DEVELOPMENT EXECUTIVE  |  SYSTEMS & PROCESS AUTOMATION LEADER", 270, y, { align: "center" });
    y += 14;

    // Contact Line with Clickable Hyperlinks
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    const c1 = "Email: ";
    const emailStr = "shivamjthete123@gmail.com";
    const c2 = "  |  LinkedIn: ";
    const linkedinStr = "linkedin.com/in/shivamjthete";
    const c3 = "  |  Website: ";
    const websiteStr = "shivam-personal-website.vercel.app";

    const wC1 = doc.getTextWidth(c1);
    const wEmail = doc.getTextWidth(emailStr);
    const wC2 = doc.getTextWidth(c2);
    const wLinkedin = doc.getTextWidth(linkedinStr);
    const wC3 = doc.getTextWidth(c3);
    const wWebsite = doc.getTextWidth(websiteStr);

    const totalContactW = wC1 + wEmail + wC2 + wLinkedin + wC3 + wWebsite;
    let curX = (540 - totalContactW) / 2;

    // Email label & link
    doc.setTextColor(71, 85, 105);
    doc.text(c1, curX, y);
    curX += wC1;

    doc.setTextColor(194, 65, 12);
    doc.textWithLink(emailStr, curX, y, { url: "mailto:shivamjthete123@gmail.com" });
    doc.setDrawColor(194, 65, 12);
    doc.setLineWidth(0.4);
    doc.line(curX, y + 1.5, curX + wEmail, y + 1.5);
    doc.link(curX, y - 7.5, wEmail, 10, { url: "mailto:shivamjthete123@gmail.com" });
    curX += wEmail;

    // LinkedIn label & link
    doc.setTextColor(71, 85, 105);
    doc.text(c2, curX, y);
    curX += wC2;

    doc.setTextColor(194, 65, 12);
    doc.textWithLink(linkedinStr, curX, y, { url: "https://www.linkedin.com/in/shivamjthete/" });
    doc.setDrawColor(194, 65, 12);
    doc.setLineWidth(0.4);
    doc.line(curX, y + 1.5, curX + wLinkedin, y + 1.5);
    doc.link(curX, y - 7.5, wLinkedin, 10, { url: "https://www.linkedin.com/in/shivamjthete/" });
    curX += wLinkedin;

    // Website label & link
    doc.setTextColor(71, 85, 105);
    doc.text(c3, curX, y);
    curX += wC3;

    doc.setTextColor(194, 65, 12);
    doc.textWithLink(websiteStr, curX, y, { url: "https://shivam-personal-website.vercel.app/" });
    doc.setDrawColor(194, 65, 12);
    doc.setLineWidth(0.4);
    doc.line(curX, y + 1.5, curX + wWebsite, y + 1.5);
    doc.link(curX, y - 7.5, wWebsite, 10, { url: "https://shivam-personal-website.vercel.app/" });

    y += 12;

    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.75);
    doc.line(marginX, y, marginX + maxW, y);
    y += 14;

    const renderSectionHeader = (title) => {
      checkPageBreak(24);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(title.toUpperCase(), marginX, y);
      y += 4;
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(0.75);
      doc.line(marginX, y, marginX + maxW, y);
      y += 10;
    };

    const renderParagraph = (text) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      const lines = doc.splitTextToSize(text, maxW);
      checkPageBreak(lines.length * 11.5);
      doc.text(lines, marginX, y);
      y += lines.length * 11.5 + 6;
    };

    const renderBullets = (bullets) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      bullets.forEach((b) => {
        const lines = doc.splitTextToSize(b, maxW - 14);
        checkPageBreak(lines.length * 11);
        doc.setFillColor(15, 23, 42);
        doc.circle(marginX + 4, y - 3, 1.2, "F");
        doc.text(lines, marginX + 12, y);
        y += lines.length * 11 + 3;
      });
      y += 4;
    };

    const renderJob = (companyRole, dates, bullets) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      checkPageBreak(14);
      doc.text(companyRole, marginX, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(dates, marginX + maxW, y, { align: "right" });
      y += 11;
      renderBullets(bullets);
    };

    // 1. Executive Summary
    renderSectionHeader("Executive Summary");
    renderParagraph("Disciplined, system-minded Strategic Operations Executive with a Mechanical Engineering foundation and 3+ years of enterprise experience building digital process automations across finance, sales, project delivery, and HR. Guided by a pragmatic problem-solving mindset that treats operational friction as a system challenge — transforming manual, spreadsheet-heavy workflows into automated, auditable processes and transparent executive dashboards. My goal is to lead high-impact business transformations that align executive vision with frontline execution to build accountable, data-backed operating environments.");

    // 2. Core Competencies
    renderSectionHeader("Core Competencies");
    renderBullets([
      "Process Automation & Operations: Business Process Automation, Revenue Operations (RevOps), Commercial Workflows, Financial Controls, Cash Flow Forecasting, Shared Cost Allocation.",
      "Zoho Ecosystem & Technical: Zoho CRM, Creator, Books, Projects, People, Analytics, Deluge Scripting, REST APIs, Webhooks, Low-Code Architecture, Power BI, SAP SD (Certified).",
      "Governance & Analytics: Project Delivery Governance, Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Customer Complaint Tracking, Executive Dashboards."
    ]);

    // 3. Professional Experience
    renderSectionHeader("Professional Experience");
    renderJob("SqurrEnergy | Strategic Development Executive", "Jul 2023 – Present (3+ yrs)", [
      "Designed and deployed digital process automations across finance, HR, sales, project delivery, and operations using the Zoho One ecosystem.",
      "Built Project Pulse, a real-time project profitability and budget burn-rate dashboard (BV Pulse architecture) saving an estimated 191.25 hours monthly across 45 users.",
      "Automated commercial pipeline in Zoho CRM from lead qualification to SOW generation and invoice sync, saving ~15 hours per month across 6 core users.",
      "Engineered Creator cash flow planning application with payment outflow scheduling, date-change audit tracking, and multi-entity balance consolidation.",
      "Automated monthly shared corporate expense allocation using active headcount ratios and Zoho Books API integration, cutting month-end processing by 6 hours monthly.",
      "Built customer complaint and Root Cause Analysis (RCA) quality engine featuring 5-Why investigation templates, corrective action tracking, and automated PDF export (~7 hrs/month saved)."
    ]);

    renderJob("Samsoft IT Solutions LLC | Zoho One Consultant", "Dec 2022 – Jun 2023", [
      "Consulted global clients on solution architecture, custom Deluge scripting, and API integrations across Zoho CRM, Creator, Books, People, and Projects.",
      "Gathered client business requirements, authored detailed Statements of Work (SOW), and configured custom low-code applications for diverse industry verticals."
    ]);

    renderJob("Target Integration | Functional Consultant", "Jun 2022 – Nov 2022", [
      "Implemented Zoho One modules (CRM, Desk, Recruit, Books) for SMB and enterprise clients.",
      "Led requirement gathering workshops, system mapping, data migration, and end-user training sessions."
    ]);

    renderJob("Personal Goal Pursuit — Career Break | UPSC IES Prep, GATE & AFCAT", "Jun 2018 – Dec 2021", [
      "Prepared for UPSC Indian Engineering Services (IES) exam; qualified GATE 2021 (AIR 6057, Score: 549) & GATE 2020 (AIR 8003, Score: 555); qualified AFCAT SSB Interview (2020)."
    ]);

    renderJob("Byju's — The Learning App | Business Development Trainee", "Aug 2021 – Oct 2021", [
      "Handled direct sales and customer onboarding during early career transition into business operations."
    ]);

    renderJob("Sharda Motor Industries Ltd. | Project Intern", "Jun 2016 – Jul 2016", [
      "Executed industrial ergonomics analysis on assembly floor, delivering workstation optimization recommendations."
    ]);

    // 4. Key Project Automation Highlights
    renderSectionHeader("Key Project Automation Highlights");
    renderBullets([
      "Delivery Intelligence (Project Pulse): Saved 191.25 hours/month across 45 team members by building automated dataset sync, budget burn-rate tracking, and margin deviation alerts.",
      "Commercial & CRM Automation: Standardized deal qualification, SOW approval, and automated invoice creation, saving 15 hours/month across BD and finance.",
      "Cash Visibility & Outflow Planning: Replaced offline spreadsheets with Creator payment planning calendar and real-time cash position dashboards.",
      "Automated Expense Allocation: Reduced month-end accounting allocation time by 6 hours/month using automated headcount-ratio journal posting.",
      "Quality RCA & Action Tracking (Communiqué): Created closed-loop complaint investigation and MoM action tracking with automated PDF report generation."
    ]);

    // 5. Extracurricular Leadership
    renderSectionHeader("Extracurricular Leadership & Community Engagement");
    renderBullets([
      "Team Vector & Skylark Drone Competition (2016–2018): Mechanical Engineer on drone design & engineering team; building custom quadcopters.",
      "Prayas Youth Forum (2015–2018): Volunteer for social awareness, rural computer literacy drives, and environmental conservation.",
      "Swapnapurti Foundation & Sanwardhan NGO (2014–2018): Active volunteer for youth mentorship and environmental conservation."
    ]);

    // 6. Education & Global Certifications
    renderSectionHeader("Education & Global Certifications");
    renderBullets([
      "Bachelor of Engineering (Mechanical Engineering) | K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | First Class With Distinction (66.18%)",
      "GATE 2021 Qualified: All India Rank (AIR) 6057 | GATE Score: 549 (Mechanical Engineering)",
      "GATE 2020 Qualified: All India Rank (AIR) 8003 | GATE Score: 555 (Mechanical Engineering)",
      "Business Intelligence Using Power BI: Skill Nation (Dec 2023)",
      "SAP Certified Application Associate: Sales and Distribution (SD) with SAP ERP 6.0 EhP7 (Global Certification, March 2022)"
    ]);

    doc.save("SHIVAM_THETE_ATS_RESUME.pdf");
    return true;
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPdf(true);

    const triggerNativePdf = () => {
      try {
        generateNativeVectorPdf();
        setIsGeneratingPdf(false);
      } catch (err) {
        console.error("Vector PDF generation error, falling back to print:", err);
        setIsGeneratingPdf(false);
        window.print();
      }
    };

    if (window.jspdf) {
      triggerNativePdf();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => {
        triggerNativePdf();
      };
      script.onerror = () => {
        setIsGeneratingPdf(false);
        window.print();
      };
      document.body.appendChild(script);
    }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6" role="presentation">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm no-print" onClick={onClose} />

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
              ATS & AI Parsable Format (Vector Text & Interactive Hyperlinks)
            </span>
            <h2 id="ats-resume-title" className="mt-1 text-xl font-bold tracking-tight text-white">
              Shivam J. Thete — Executive ATS Resume
            </h2>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-500 shadow-sm disabled:opacity-50"
              title="Download clean native vector PDF with 100% selectable text & clickable links"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isGeneratingPdf ? "Generating Vector PDF..." : "Download PDF File"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
              title="Open browser print dialog"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
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
                  Copy Text
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700"
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

        {/* Printable ATS Content Area - Strictly Isolated for Print & On-Screen Preview */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 text-slate-900 bg-white" id="ats-resume-print-area">
          <div className="border-b border-slate-300 pb-4 ats-header-block flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 uppercase md:text-3xl">SHIVAM J. THETE</h1>
              <p className="mt-1 text-xs md:text-sm font-semibold text-amber-800 uppercase tracking-wider">
                Strategic Development Executive | Systems & Process Automation Leader
              </p>
              <p className="mt-2 text-xs text-slate-600 flex flex-wrap justify-center md:justify-start gap-x-3 gap-y-1">
                <span><strong>Email:</strong> <a href="mailto:shivamjthete123@gmail.com" className="text-amber-800 underline font-semibold">shivamjthete123@gmail.com</a></span>
                <span>•</span>
                <span><strong>Phone:</strong> +91-8263045370</span>
                <span>•</span>
                <span><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/shivamjthete/" target="_blank" rel="noreferrer" className="text-amber-800 underline font-semibold">linkedin.com/in/shivamjthete</a></span>
                <span>•</span>
                <span><strong>Portfolio:</strong> <a href="https://shivam-personal-website.vercel.app/" target="_blank" rel="noreferrer" className="text-amber-800 underline font-semibold">shivam-personal-website.vercel.app</a></span>
              </p>
            </div>
            <img
              id="ats-resume-headshot-img"
              src="/shivam-headshot.jpg"
              alt="Shivam J. Thete"
              className="h-16 w-13 rounded-lg object-cover object-top border border-slate-300 shadow-sm shrink-0"
            />
          </div>

          <section className="mt-5 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              EXECUTIVE SUMMARY
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-800">
              Disciplined, system-minded Strategic Operations Executive with a Mechanical Engineering foundation and 3+ years of enterprise experience building digital process automations across finance, sales, project delivery, and HR. Guided by a pragmatic problem-solving mindset that treats operational friction as a system challenge — transforming manual, spreadsheet-heavy workflows into automated, auditable processes and transparent executive dashboards. My goal is to lead high-impact business transformations that align executive vision with frontline execution to build accountable, data-backed operating environments.
            </p>
          </section>

          <section className="mt-5 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              CORE COMPETENCIES
            </h2>
            <div className="mt-2.5 grid gap-2 text-xs text-slate-800">
              <div>
                <strong className="text-slate-950">Process Automation & Operations:</strong> Business Process Automation, Revenue Operations (RevOps), Commercial Workflows, Financial Controls, Cash Flow Forecasting, Shared Cost Allocation.
              </div>
              <div>
                <strong className="text-slate-950">Zoho Ecosystem & Technical:</strong> Zoho CRM, Creator, Books, Projects, People, Analytics, Deluge Scripting, REST APIs, Webhooks, Low-Code Architecture, Power BI, SAP SD (Certified).
              </div>
              <div>
                <strong className="text-slate-950">Governance & Analytics:</strong> Project Delivery Governance, Capacity Planning, Resource Utilization, Root Cause Analysis (RCA), Customer Complaint Tracking, Executive Dashboards.
              </div>
            </div>
          </section>

          <section className="mt-5 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              PROFESSIONAL EXPERIENCE
            </h2>

            <div className="mt-3.5 space-y-3.5 text-xs text-slate-800">
              <div className="ats-job-item">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>SqurrEnergy | Strategic Development Executive</span>
                  <span className="text-slate-600 font-normal">Jul 2023 – Present (3+ years)</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Designed and deployed digital process automations across finance, HR, sales, project delivery, and operations using the Zoho One ecosystem.</li>
                  <li>Built Project Pulse, a real-time project profitability and budget burn-rate dashboard (BV Pulse architecture) saving an estimated 191.25 hours monthly across 45 users.</li>
                  <li>Automated commercial pipeline in Zoho CRM from lead qualification to SOW generation and invoice sync, saving ~15 hours per month across 6 core users.</li>
                  <li>Engineered Creator cash flow planning application with payment outflow scheduling, date-change audit tracking, and multi-entity balance consolidation.</li>
                  <li>Automated monthly shared corporate expense allocation using active headcount ratios and Zoho Books API integration, cutting month-end processing by 6 hours monthly.</li>
                  <li>Built customer complaint and Root Cause Analysis (RCA) quality engine featuring 5-Why investigation templates, corrective action tracking, and automated PDF export (~7 hrs/month saved).</li>
                </ul>
              </div>

              <div className="ats-job-item">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Samsoft IT Solutions LLC | Zoho One Consultant</span>
                  <span className="text-slate-600 font-normal">Dec 2022 – Jun 2023</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Consulted global clients on solution architecture, custom Deluge scripting, and API integrations across Zoho CRM, Creator, Books, People, and Projects.</li>
                  <li>Gathered client business requirements, authored detailed Statements of Work (SOW), and configured custom low-code applications.</li>
                </ul>
              </div>

              <div className="ats-job-item">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Target Integration | Functional Consultant</span>
                  <span className="text-slate-600 font-normal">Jun 2022 – Nov 2022</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Implemented Zoho One modules (CRM, Desk, Recruit, Books) for SMB and enterprise clients.</li>
                  <li>Led requirement gathering workshops, system mapping, data migration, and end-user training sessions.</li>
                </ul>
              </div>

              <div className="ats-job-item">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Personal Goal Pursuit — Career Break | UPSC IES Prep, GATE & AFCAT</span>
                  <span className="text-slate-600 font-normal">Jun 2018 – Dec 2021</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Prepared for UPSC Indian Engineering Services (IES) exam; qualified GATE 2021 (AIR 6057, Score: 549) & GATE 2020 (AIR 8003, Score: 555); qualified AFCAT SSB Interview (2020).</li>
                </ul>
              </div>

              <div className="ats-job-item">
                <div className="flex justify-between font-bold text-slate-950">
                  <span>Byju's — The Learning App | Business Development Trainee</span>
                  <span className="text-slate-600 font-normal">Aug 2021 – Oct 2021</span>
                </div>
                <ul className="mt-1 list-disc pl-4 space-y-1 text-slate-700">
                  <li>Handled direct sales and customer onboarding during early career transition into business operations.</li>
                </ul>
              </div>

              <div className="ats-job-item">
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

          <section className="mt-5 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              KEY PROJECT AUTOMATION HIGHLIGHTS
            </h2>
            <ul className="mt-2.5 list-disc pl-4 space-y-1.5 text-xs text-slate-800">
              <li><strong>Delivery Intelligence (Project Pulse):</strong> Saved 191.25 hours/month across 45 team members by building automated dataset sync, budget burn-rate tracking, and margin deviation alerts.</li>
              <li><strong>Commercial & CRM Automation:</strong> Standardized deal qualification, SOW approval, and automated invoice creation, saving 15 hours/month across BD and finance.</li>
              <li><strong>Cash Visibility & Outflow Planning:</strong> Replaced offline spreadsheets with Creator payment planning calendar and real-time cash position dashboards.</li>
              <li><strong>Automated Expense Allocation:</strong> Reduced month-end accounting allocation time by 6 hours/month using automated headcount-ratio journal posting.</li>
              <li><strong>Quality RCA & Action Tracking (Communiqué):</strong> Created closed-loop complaint investigation and MoM action tracking with automated PDF report generation.</li>
            </ul>
          </section>

          <section className="mt-5 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              EXTRACURRICULAR LEADERSHIP & COMMUNITY ENGAGEMENT
            </h2>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-800">
              <div><strong>Team Vector & Skylark Drone Competition (2016–2018):</strong> Mechanical Engineer on drone design & engineering team; building custom quadcopters.</div>
              <div><strong>Prayas Youth Forum (2015–2018):</strong> Volunteer for social awareness, rural computer literacy drives, and environmental conservation.</div>
              <div><strong>Swapnapurti Foundation & Sanwardhan NGO (2014–2018):</strong> Active volunteer for youth mentorship and environmental conservation.</div>
            </div>
          </section>

          <section className="mt-5 pb-2 ats-section-block">
            <h2 className="border-b border-slate-900 text-xs font-bold uppercase tracking-widest text-slate-950 pb-1 ats-section-title">
              EDUCATION & GLOBAL CERTIFICATIONS
            </h2>
            <ul className="mt-2 list-disc pl-4 space-y-1 text-xs text-slate-800">
              <li><strong>B.E. in Mechanical Engineering:</strong> K. K. Wagh Institute of Engineering Education and Research, Nashik (2014 – 2018) | First Class With Distinction (66.18%)</li>
              <li><strong>GATE 2021 Qualified:</strong> All India Rank (AIR) 6057 | GATE Score: 549 (Mechanical Engineering)</li>
              <li><strong>GATE 2020 Qualified:</strong> All India Rank (AIR) 8003 | GATE Score: 555 (Mechanical Engineering)</li>
              <li><strong>Business Intelligence Using Power BI:</strong> Skill Nation (Dec 2023)</li>
              <li><strong>SAP Certified Application Associate:</strong> Sales and Distribution (SD) with SAP ERP 6.0 EhP7 (Global Certification, March 2022)</li>
            </ul>
          </section>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500 flex justify-between items-center no-print">
          <span>Tip: Click "Download PDF File" to get a 100% selectable vector PDF with interactive hyperlinks.</span>
          <button type="button" onClick={onClose} className="font-semibold text-slate-700 hover:text-slate-900">
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
