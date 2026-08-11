import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { cameraReadyData } from '../../data/cameraReadyData';

export default function CameraReadySection() {
    const {
        title,
        subtitle,
        importantDates,
        submissionOverview,
        copyrightClearance,
        pdfExpressInstructions,
    } = cameraReadyData;

    return (
        <SectionContainer id="camera-ready-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Important Dates Grid */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase mb-6 flex items-center gap-3 border-b border-[#C59B27]/30 pb-4">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Camera-Ready & Registration Deadlines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {importantDates.map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-4 rounded-xl border-l-4 ${
                                item.isDeadline
                                    ? 'border-[#722332] bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC]'
                                    : 'border-[#C59B27] bg-[#FFFDF9]'
                            } border-y border-r border-[#C59B27]/30 shadow-xs flex flex-col justify-between`}
                        >
                            <span className="text-xs font-black uppercase text-neutral-600 tracking-wider">
                                {item.activity}
                            </span>
                            <span className={`text-base font-black mt-1 ${item.isDeadline ? 'text-[#722332]' : 'text-[#4A121A]'}`}>
                                {item.date}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Camera-Ready Paper Preparation Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Preparation Guidelines & Author Policy
                </h3>

                <p className="text-sm md:text-base text-neutral-700 font-semibold leading-relaxed">
                    {submissionOverview.intro}
                </p>

                {/* Grid of Key Rules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Page Limit & Reviewers */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-[#FAF5EB] bg-[#722332] px-2.5 py-0.5 rounded-full">
                                Page Limit
                            </span>
                            <span className="text-xs font-black text-[#722332]">Strict 6-Page Limit</span>
                        </div>
                        <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed mt-2">
                            The manuscript page limit is strictly <strong>six (06) pages</strong>. Incorporate all reviewers’ comments and prepare the final version by <strong>{submissionOverview.deadline}</strong>.
                        </p>
                    </div>

                    {/* Plagiarism Threshold Alert */}
                    <div className="bg-amber-50/80 p-5 rounded-xl border-l-4 border-amber-600 border-y border-r border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-200 px-2.5 py-0.5 rounded-full">
                                Plagiarism Policy
                            </span>
                            <span className="text-xs font-black text-amber-900">Below 25% Similarity Required</span>
                        </div>
                        <p className="text-xs md:text-sm text-amber-950 font-medium leading-relaxed mt-2">
                            Ensure the similarity index of your manuscript is <strong>below 25%</strong> using standard checking tools (e.g., Turnitin) before final upload. Manuscripts exceeding 25% similarity will NOT be submitted to IEEE Xplore.
                        </p>
                    </div>
                </div>

                {/* Registration Requirement & Indian/Nepal Form Link */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-xl border border-[#C59B27]/40 space-y-4">
                    <h4 className="text-base font-black text-[#4A121A] uppercase tracking-wider">
                        Author Registration & Payment Verification
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                        {submissionOverview.registrationPolicy}
                    </p>
                    <div className="pt-2">
                        <a
                            href={submissionOverview.paymentFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#722332] text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all"
                        >
                            <span>Submit Registration Details via Google Form</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* IEEE Template Link Button */}
                <div className="pt-2 flex flex-wrap gap-4">
                    <a
                        href={submissionOverview.ieeeTemplateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white text-[#722332] hover:bg-[#FAF5EB] px-5 py-2.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-sm transition-all"
                    >
                        <span>Download Official IEEE Manuscript Templates</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 3. Copyright Clearance Code Instructions */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {copyrightClearance.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {copyrightClearance.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {copyrightClearance.notices.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40">
                            <span className="text-xs font-bold text-[#722332] block mb-2">
                                {item.category}
                            </span>
                            <code className="text-xs font-mono bg-white text-[#4A121A] p-2.5 rounded-lg border border-[#C59B27]/30 block select-all font-black">
                                {item.code}
                            </code>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. IEEE PDF eXpress Walkthrough */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-4">
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                        IEEE PDF eXpress Instructions
                    </h3>
                    <div className="flex items-center gap-2 bg-[#722332] text-[#FAF5EB] px-4 py-1.5 rounded-full border border-[#C59B27] self-start md:self-auto">
                        <span className="text-xs font-bold uppercase tracking-wider">Conference ID:</span>
                        <span className="text-sm font-black font-mono text-[#F0CB6F]">{pdfExpressInstructions.conferenceId}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <a
                        href={pdfExpressInstructions.loginUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 hover:border-[#C59B27] transition-all flex items-center justify-between group"
                    >
                        <div>
                            <span className="text-xs font-black uppercase text-[#722332] block">Step 1</span>
                            <span className="text-sm font-black text-[#4A121A] group-hover:text-[#722332]">PDF eXpress Portal</span>
                        </div>
                        <svg className="w-5 h-5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <a
                        href={pdfExpressInstructions.signupUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 hover:border-[#C59B27] transition-all flex items-center justify-between group"
                    >
                        <div>
                            <span className="text-xs font-black uppercase text-[#722332] block">New Users</span>
                            <span className="text-sm font-black text-[#4A121A] group-hover:text-[#722332]">Create Account</span>
                        </div>
                        <svg className="w-5 h-5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </a>

                    <div className="bg-[#722332]/5 p-4 rounded-xl border border-[#C59B27]/30 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] flex items-center justify-center font-black text-xs flex-shrink-0">
                            ID
                        </div>
                        <div>
                            <span className="text-xs font-bold text-neutral-600 block">Conference ID</span>
                            <span className="text-sm font-mono font-black text-[#722332]">{pdfExpressInstructions.conferenceId}</span>
                        </div>
                    </div>
                </div>

                {/* Step-by-Step Timeline List */}
                <div className="space-y-4">
                    {pdfExpressInstructions.steps.map((item) => (
                        <div
                            key={item.step}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border-l-4 border-[#C59B27] border-y border-r border-[#C59B27]/30 shadow-xs flex flex-col md:flex-row md:items-start gap-4"
                        >
                            <div className="w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs">
                                {item.step}
                            </div>
                            <div>
                                <h4 className="text-sm md:text-base font-black text-[#4A121A] mb-1">
                                    {item.title}
                                </h4>
                                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                    {item.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
