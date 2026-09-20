import { useEffect, useState } from "react";

export default function CoverLetterModal({ isOpen, onClose }) {
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

  const rawTextCoverLetter = `SHIVAM J. THETE
Strategic Development Executive | Systems & Process Automation Leader
Email: shivamjthete123@gmail.com | Phone: +91-8263045370 | LinkedIn: https://www.linkedin.com/in/shivamjthete/ | Website: https://shivam-personal-website.vercel.app/ | Location: Pune, India

Date: September 21, 2026
To: Hiring Manager & Executive Leadership Team
Subject: Application for Strategic Operations, Process Automation & Business Transformation Leadership Roles

Dear Hiring Manager,

I am writing to express my strong interest in senior leadership opportunities across Strategic Operations, Business Process Automation, and Digital Transformation. Holding a Bachelor of Engineering in Mechanical Engineering (First Class Distinction, GATE 2021 AIR 6057 | Score: 549, GATE 2020 AIR 8003 | Score: 555) and 4+ years of enterprise experience in strategic operations and digital process engineering, I specialize in bridging executive vision with frontline operational execution. My focus is taking complex, spreadsheet-heavy workflows across finance, sales, project delivery, and HR and engineering practical, automated digital systems that enforce execution discipline and save team time.

In my current and recent enterprise roles, I engineered end-to-end operational automations utilizing the Zoho One ecosystem (Creator, CRM, Books, Projects, People, Analytics). Key highlights include building a real-time project profitability and budget burn-rate dashboard saving an estimated 191.25 hours monthly across 45 users; automating the commercial CRM pipeline from lead intake to SOW generation and invoice sync (~15 hrs/month saved); creating a Creator cash flow planning application with outflow payment calendars and date-change audit trails; and automating monthly corporate expense allocations based on headcount ratios (~6 hrs/month saved).

My engineering background equips me with a root-cause problem-solving mindset: I treat operational friction not as chaotic noise, but as a system challenge ready to be simplified and governed. Whether configuring stage-gated CRM blueprints, setting up 5-Why Root Cause Analysis (RCA) quality engines, or linking timesheet planning directly to delivery logs, my goal is always to build transparent, accountable, and scalable operating environments.

I would welcome the opportunity to discuss how my background in process engineering, Zoho ecosystem architecture, and operational leadership can bring clarity, speed, and execution discipline to your organization. Thank you for your time and consideration.

Sincerely,

Shivam J. Thete
Email: shivamjthete123@gmail.com | Phone: +91-8263045370`;

  // Native Vector PDF Generator Engine for Cover Letter
  const generateNativeVectorPdf = () => {
    if (!window.jspdf) return false;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const marginX = 36;
    const maxW = 523;
    let y = 36;

    // Subtle headshot photo in PDF top-right corner
    try {
      const headshotImg = document.getElementById("cover-letter-headshot-img");
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

    // Email
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

    // LinkedIn
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

    // Website
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
    y += 20;

    // Metadata Block
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("Date: September 21, 2026", marginX, y);
    y += 13;
    doc.text("To: Hiring Manager & Executive Leadership Team", marginX, y);
    y += 13;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("Subject: Application for Strategic Operations, Process Automation & Transformation Roles", marginX, y);
    y += 18;

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(marginX, y, marginX + maxW, y);
    y += 18;

    // Salutation
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Dear Hiring Manager,", marginX, y);
    y += 16;

    // Body Paragraphs
    const renderParagraph = (text) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      const lines = doc.splitTextToSize(text, maxW);
      doc.text(lines, marginX, y);
      y += lines.length * 12.5 + 10;
    };

    renderParagraph("I am writing to express my strong interest in senior leadership opportunities across Strategic Operations, Business Process Automation, and Digital Transformation. Holding a Bachelor of Engineering in Mechanical Engineering (First Class Distinction, GATE 2021 AIR 6057 | Score: 549, GATE 2020 AIR 8003 | Score: 555) and 4+ years of enterprise experience in strategic operations and process engineering, I specialize in bridging executive vision with frontline operational execution. My focus is taking complex, spreadsheet-heavy workflows across finance, sales, project delivery, and HR and engineering practical, automated digital systems that enforce execution discipline and save team time.");

    renderParagraph("In my current and recent enterprise roles, I engineered end-to-end operational automations utilizing the Zoho One ecosystem (Creator, CRM, Books, Projects, People, Analytics). Key highlights include building a real-time project profitability and budget burn-rate dashboard saving an estimated 191.25 hours monthly across 45 users; automating the commercial CRM pipeline from lead intake to SOW generation and invoice sync (~15 hrs/month saved); creating a Creator cash flow planning application with outflow payment calendars and date-change audit trails; and automating monthly corporate expense allocations based on headcount ratios (~6 hrs/month saved).");

    renderParagraph("My engineering background equips me with a root-cause problem-solving mindset: I treat operational friction not as chaotic noise, but as a system challenge ready to be simplified and governed. Whether configuring stage-gated CRM blueprints, setting up 5-Why Root Cause Analysis (RCA) quality engines, or linking timesheet planning directly to delivery logs, my goal is always to build transparent, accountable, and scalable operating environments.");

    renderParagraph("I would welcome the opportunity to discuss how my background in process engineering, Zoho ecosystem architecture, and operational leadership can bring clarity, speed, and execution discipline to your organization. Thank you for your time and consideration.");

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("Sincerely,", marginX, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("Shivam J. Thete", marginX, y);

    doc.save("SHIVAM_THETE_COVER_LETTER.pdf");
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
    navigator.clipboard.writeText(rawTextCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([rawTextCoverLetter], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "SHIVAM_THETE_COVER_LETTER.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6" role="presentation">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm no-print" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cover-letter-title"
        className="relative flex h-full max-h-[100dvh] sm:max-h-[92vh] w-full max-w-4xl flex-col rounded-none sm:rounded-2xl bg-white shadow-2xl border-0 sm:border border-slate-200 overflow-hidden z-10"
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 bg-slate-950 px-4 py-3 sm:px-6 sm:py-4 text-white no-print">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-amber-400 border border-amber-500/30">
              Interactive Vector PDF (Selectable Text & Links)
            </span>
            <h2 id="cover-letter-title" className="mt-0.5 text-base sm:text-xl font-bold tracking-tight text-white">
              Shivam J. Thete — Executive Cover Letter
            </h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white transition hover:bg-amber-500 shadow-sm disabled:opacity-50"
              title="Download clean native vector PDF cover letter with 100% selectable text & clickable links"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{isGeneratingPdf ? "Generating..." : "Download PDF"}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700"
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
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-2 text-xs font-bold text-slate-300 transition hover:bg-slate-700"
              title="Download Markdown cover letter"
            >
              .md
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 sm:p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cover Letter Content Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 text-slate-900 bg-white" id="cover-letter-print-area">
          <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row items-center justify-between gap-4">
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
              id="cover-letter-headshot-img"
              src="/shivam-headshot.jpg"
              alt="Shivam J. Thete"
              className="h-16 w-13 rounded-lg object-cover object-top border border-slate-300 shadow-sm shrink-0"
            />
          </div>

          <div className="mt-6 space-y-1 text-xs text-slate-600">
            <p><strong>Date:</strong> September 21, 2026</p>
            <p><strong>To:</strong> Hiring Manager & Executive Leadership Team</p>
            <p className="text-slate-950 font-bold"><strong>Subject:</strong> Application for Strategic Operations, Process Automation & Business Transformation Roles</p>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6 space-y-4 text-xs md:text-sm leading-relaxed text-slate-800">
            <p className="font-bold text-slate-950">Dear Hiring Manager,</p>

            <p>
              I am writing to express my strong interest in senior leadership opportunities across Strategic Operations, Business Process Automation, and Digital Transformation. Holding a Bachelor of Engineering in Mechanical Engineering (First Class Distinction, GATE 2021 AIR 6057 | Score: 549, GATE 2020 AIR 8003 | Score: 555) and 4+ years of enterprise experience in strategic operations and digital process engineering, I specialize in bridging executive vision with frontline operational execution. My focus is taking complex, spreadsheet-heavy workflows across finance, sales, project delivery, and HR and engineering practical, automated digital systems that enforce execution discipline and save team time.
            </p>

            <p>
              In my current and recent enterprise roles, I engineered end-to-end operational automations utilizing the Zoho One ecosystem (Creator, CRM, Books, Projects, People, Analytics). Key highlights include building a real-time project profitability and budget burn-rate dashboard saving an estimated 191.25 hours monthly across 45 users; automating the commercial CRM pipeline from lead intake to SOW generation and invoice sync (~15 hrs/month saved); creating a Creator cash flow planning application with outflow payment calendars and date-change audit trails; and automating monthly corporate expense allocations based on headcount ratios (~6 hrs/month saved).
            </p>

            <p>
              My engineering background equips me with a root-cause problem-solving mindset: I treat operational friction not as chaotic noise, but as a system challenge ready to be simplified and governed. Whether configuring stage-gated CRM blueprints, setting up 5-Why Root Cause Analysis (RCA) quality engines, or linking timesheet planning directly to delivery logs, my goal is always to build transparent, accountable, and scalable operating environments.
            </p>

            <p>
              I would welcome the opportunity to discuss how my background in process engineering, Zoho ecosystem architecture, and operational leadership can bring clarity, speed, and execution discipline to your organization. Thank you for your time and consideration.
            </p>

            <div className="pt-4">
              <p className="text-slate-600">Sincerely,</p>
              <p className="mt-2 text-base font-bold text-slate-950">Shivam J. Thete</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500 flex justify-between items-center no-print">
          <span>Tip: Click "Download Cover Letter PDF" to save a clean 100% vector PDF file.</span>
          <button type="button" onClick={onClose} className="font-semibold text-slate-700 hover:text-slate-900">
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
