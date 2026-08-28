import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { doctoralAwardData } from '../../data/doctoralAwardData';
import { doctoralAwardLabels } from '../../data/doctoralAwardData';

export default function DoctoralAwardSection() {
    const {
        title,
        subtitle,
        flyerPdfUrl,
        abstractFormUrl,
        registrationFormUrl,
        oralTemplateUrl,
        posterTemplateUrl,
        overviewText,
        eligibility,
        tracks,
        whyParticipate,
        abstractGuidelines,
        selectionProcedure,
        feeWaiverPolicy,
        registrationDetails,
        awardsSummary,
        importantDates,
        coordinators,
    } = doctoralAwardData;

    return (
        <SectionContainer dataSource="doctoralAwardData" id="doctoral-award-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Award Overview, Best Thesis Badge & Flyer Button */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            {doctoralAwardLabels.phdResearchForum}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {doctoralAwardLabels.showcaseYourDoctoralResearch}
                        </h3>
                    </div>

                    <a
                        href={flyerPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>{doctoralAwardLabels.downloadAwardFlyerPdf}</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                    {overviewText}
                </p>

                {/* Best Thesis Award Callout Badge */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-center gap-3 text-xs md:text-sm font-black text-[#722332]">
                    <div className="w-8 h-8 rounded-full bg-[#722332]/10 flex items-center justify-center border border-[#C59B27]/30 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                    </div>
                    <span>{awardsSummary}</span>
                </div>
            </div>

            {/* 2. Why Participate? (8 Benefits) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {doctoralAwardLabels.whyParticipateInThePhdForum}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {whyParticipate.map((benefit, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <span className="text-xs md:text-sm text-neutral-800 font-semibold leading-snug">
                                {benefit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Eligibility Criteria & 6 Research Domains */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {doctoralAwardLabels.eligibilityResearchTracks}
                </h3>

                <div className="space-y-3 mb-6">
                    {eligibility.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <h4 className="text-sm font-black text-[#4A121A] uppercase tracking-wider">
                    {doctoralAwardLabels.eligibleConferenceResearchTracks}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {tracks.map((track, idx) => (
                        <div key={idx} className="bg-[#FFFDF9] p-3.5 rounded-xl border border-[#C59B27]/30 text-xs md:text-sm font-bold text-neutral-800 flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-[#722332] flex-shrink-0" />
                            <span>{track}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Abstract Submission Guidelines & Presentation Templates */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {doctoralAwardLabels.abstractSubmissionGuidelinesPresentationTemplates}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {abstractGuidelines.map((g, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {g}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm text-neutral-800 font-semibold">
                    <span className="font-black text-[#722332] uppercase block mb-1">{doctoralAwardLabels.selectionProcedure}</span>
                    {selectionProcedure}
                </div>

                {/* Abstract Form CTA & Presentation Templates Downloads */}
                <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={abstractFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                        >
                            <span>1. Submit PhD Extended Abstract (Google Form)</span>
                            <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                            href={oralTemplateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all"
                        >
                            <span>{doctoralAwardLabels.downloadOralPresentationFormatPptx}</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>

                        <a
                            href={posterTemplateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all"
                        >
                            <span>{doctoralAwardLabels.downloadPosterPresentationFormatPptx}</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* 5. Fee Waiver Policy, Registration Fees & Registration Form CTA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {doctoralAwardLabels.registrationFeesFeeWaiverPolicy}
                </h3>

                {/* Highlighted Fee Waiver Callout */}
                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-600 border-y border-r border-emerald-200 text-emerald-950 space-y-1">
                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {doctoralAwardLabels.specialFeeWaiverForAcceptedIatmsi}
                    </h4>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed">
                        {feeWaiverPolicy}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {doctoralAwardLabels.nominationChargesNonAuthors}
                        </span>
                        <span className="text-xl font-black text-[#722332] mt-1 block">
                            {registrationDetails.fee}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {doctoralAwardLabels.accountGatewayDetails}
                        </span>
                        <span className="text-lg font-black text-[#4A121A] bg-white px-4 py-1 rounded-full border border-[#C59B27]/30 inline-block mt-1 shadow-2xs">
                            {registrationDetails.accountDetailsStatus}
                        </span>
                    </div>
                </div>

                <div className="space-y-2 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    <p>• {registrationDetails.inclusions}</p>
                    <p>• {registrationDetails.refundPolicy}</p>
                </div>

                {/* Final Registration Form CTA */}
                <div className="pt-2">
                    <a
                        href={registrationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>2. Complete Award Registration (Google Form)</span>
                        <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 6. Important Dates & Coordinators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Important Dates */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                        {doctoralAwardLabels.awardTimeline}
                    </h3>
                    <div className="space-y-3">
                        {importantDates.map((item, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40">
                                <span className="text-xs font-black uppercase text-[#722332] block">
                                    {item.event}
                                </span>
                                <span className="text-xs md:text-sm font-bold text-[#4A121A]">
                                    {item.date}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coordinators Contact */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                        {doctoralAwardLabels.awardCoordinators}
                    </h3>
                    <div className="space-y-4">
                        {/* Student Coordinator */}
                        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 space-y-1">
                            <span className="text-xs font-black uppercase text-[#722332] block">
                                {coordinators.student.role}
                            </span>
                            <p className="text-sm font-black text-[#4A121A]">{coordinators.student.name}</p>
                            <p className="text-xs text-neutral-700 font-semibold">Email: {coordinators.student.email}</p>
                            <p className="text-xs text-neutral-700 font-semibold">Ph. No.: {coordinators.student.phone}</p>
                        </div>

                        {/* Faculty Coordinator */}
                        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 space-y-1">
                            <span className="text-xs font-black uppercase text-[#722332] block">
                                {coordinators.faculty.role}
                            </span>
                            <p className="text-sm font-black text-[#4A121A]">{coordinators.faculty.name}</p>
                            <p className="text-xs text-neutral-700 font-semibold">Email: {coordinators.faculty.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
