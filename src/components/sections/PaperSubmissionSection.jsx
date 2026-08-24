import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { paperSubmissionData } from '../../data/submissionData';
import { paperSubmissionLabels } from '../../data/submissionData';

export default function PaperSubmissionSection() {
    const {
        title,
        subtitle,
        cmtUrl,
        cfpPdfUrl,
        ieeeTemplatesUrl,
        docLatexUrl,
        submissionDeadline,
        formattingText,
        cmtPortalText,
        latexPreferenceText,
        cmtDisclaimerAndReviewProcess,
        copyrightRequirement,
        ieeePolicies,
    } = paperSubmissionData;

    return (
        <SectionContainer dataSource="submissionData" id="paper-submission-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Manuscript Formatting & Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {paperSubmissionLabels.manuscriptGuidelinesPageLimit}
                </h3>

                <div className="space-y-4 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        {formattingText[0]}
                    </p>

                    {/* Quick Link Buttons for Templates & DocLatex */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                            href={ieeeTemplatesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-[#C59B27] transition-all shadow-sm"
                        >
                            <span>{paperSubmissionLabels.ieeeConferenceTemplates}</span>
                            <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>

                        <a
                            href={docLatexUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#C59B27] transition-all shadow-xs"
                        >
                            <span>{paperSubmissionLabels.automatedDoclatexConverter}</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <p>{formattingText[1]}</p>
                    <p>{formattingText[2]}</p>
                </div>
            </div>

            {/* 2. Microsoft CMT Portal & Primary Actions */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-4">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            {paperSubmissionLabels.submissionPortal}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {paperSubmissionLabels.microsoftCmtSubmission}
                        </h3>
                    </div>

                    <div className="bg-amber-50 px-4 py-2 rounded-xl border border-amber-300 self-start md:self-auto">
                        <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider block">
                            {paperSubmissionLabels.submissionDeadline}
                        </span>
                        <span className="text-sm font-black text-[#722332]">
                            {submissionDeadline}
                        </span>
                    </div>
                </div>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {cmtPortalText}
                </p>

                {/* Submit & Downloads Action Cards */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border border-[#C59B27]/40 space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <a
                            href={cmtUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                        >
                            <span>{paperSubmissionLabels.submitAPaperMicrosoftCmt}</span>
                            <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>

                        <a
                            href={cfpPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-5 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] transition-all shadow-xs"
                        >
                            <span>{paperSubmissionLabels.downloadCallForPapersPdf}</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>

                    <div className="pt-2 border-t border-[#C59B27]/30 flex flex-wrap items-center gap-3 text-xs font-bold text-neutral-800">
                        <span>{paperSubmissionLabels.ieeeManuscriptFormats}</span>
                        <a href={ieeeTemplatesUrl} target="_blank" rel="noopener noreferrer" className="text-[#722332] underline hover:text-[#5B1824]">
                            {paperSubmissionLabels.ieeeTemplatesWebpage}
                        </a>
                        <span>|</span>
                        <a href={ieeeTemplatesUrl} target="_blank" rel="noopener noreferrer" className="text-[#722332] underline hover:text-[#5B1824]">
                            {paperSubmissionLabels.latexTemplate}
                        </a>
                        <span>|</span>
                        <a href={ieeeTemplatesUrl} target="_blank" rel="noopener noreferrer" className="text-[#722332] underline hover:text-[#5B1824]">
                            {paperSubmissionLabels.msWordDocTemplate}
                        </a>
                    </div>
                </div>
            </div>

            {/* 3. Reviewing Process & Microsoft CMT Acknowledgment */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {paperSubmissionLabels.reviewingProcessPeerReviewSystem}
                </h3>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm font-bold text-[#722332]">
                    {latexPreferenceText}
                </div>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {cmtDisclaimerAndReviewProcess}
                </p>

                <div className="bg-white p-4 rounded-xl border-l-4 border-[#722332] border-y border-r border-[#C59B27]/40 text-xs md:text-sm font-semibold text-[#4A121A]">
                    {copyrightRequirement}
                </div>
            </div>

            {/* 4. IEEE Policies */}
            <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border-l-4 border-amber-600 border-y border-r border-amber-200 shadow-sm space-y-4 text-amber-950">
                <h4 className="text-lg md:text-xl font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {ieeePolicies.title}
                </h4>
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                    {ieeePolicies.description}
                </p>
            </div>
        </SectionContainer>
    );
}
