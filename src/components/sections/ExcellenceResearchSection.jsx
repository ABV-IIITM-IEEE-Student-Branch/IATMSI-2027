import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { excellenceResearchData } from '../../data/excellenceResearchData';
import { excellenceResearchLabels } from '../../data/excellenceResearchData';

export default function ExcellenceResearchSection() {
    const {
        title,
        subtitle,
        flyerPdfUrl,
        submissionFormUrl,
        overviewText,
        eligibility,
        submissionRequirements,
        registrationDetails,
        awardBenefits,
        evaluationCriteria,
        importantDates,
        coordinators,
    } = excellenceResearchData;

    return (
        <SectionContainer dataSource="excellenceResearchData" id="excellence-research-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Award Overview, Benefits & Flyer Button */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            {excellenceResearchLabels.midCareerSeniorExcellenceAward}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {excellenceResearchLabels.honoringSustainedResearchContributions}
                        </h3>
                    </div>

                    <a
                        href={flyerPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>{excellenceResearchLabels.downloadAwardFlyerPdf}</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                    {overviewText}
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                    {awardBenefits.map((b, idx) => {
                        const icons = [
                            // 0: Certificate of Achievement
                            <svg key="0" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>,
                            // 1: Cash Prize and Memento
                            <svg key="1" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>,
                            // 2: Recognition by Academic & Industry Leaders
                            <svg key="2" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>,
                            // 3: Networking Opportunities
                            <svg key="3" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>,
                            // 4: Certificates & Media Coverage
                            <svg key="4" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c.41 0 .824-.149 1.154-.42l3.416-2.81c.712-.586 1.777-.078 1.777.844v14.772c0 .922-1.065 1.43-1.777.844l-3.416-2.81a1.996 1.996 0 01-1.154-.42H7a4.001 4.001 0 01-1.564-.317z" />
                            </svg>
                        ];

                        return (
                            <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-center flex flex-col items-center justify-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-[#722332]/10 flex items-center justify-center border border-[#C59B27]/30 shadow-2xs">
                                    {icons[idx % icons.length]}
                                </div>
                                <span className="text-xs md:text-sm font-black text-[#4A121A]">
                                    {b}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 2. Eligibility Criteria (Age 40-65) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {excellenceResearchLabels.eligibilityCriteria}
                </h3>

                <div className="space-y-3">
                    {eligibility.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Submission Requirements */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {excellenceResearchLabels.submissionRequirements}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {submissionRequirements.map((req, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-1">
                            <span className="text-xs font-black uppercase text-[#722332] block">
                                {idx + 1}. {req.title}
                            </span>
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {req.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Evaluation Criteria */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {excellenceResearchLabels.evaluationCriteria}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {evaluationCriteria.map((crit, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] flex-shrink-0" />
                            <span className="text-xs md:text-sm font-bold text-[#4A121A]">
                                {crit}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Nomination Fees, Bank Details & Form CTA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {excellenceResearchLabels.nominationChargesApplicationForm}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {excellenceResearchLabels.nominationCharges}
                        </span>
                        <span className="text-xl font-black text-[#722332] mt-1 block">
                            {registrationDetails.fee}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {excellenceResearchLabels.accountDetailsForPayment}
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

                {/* Form Link CTA Button */}
                <div className="pt-2">
                    <a
                        href={submissionFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>{excellenceResearchLabels.submitNominationFormGoogleForm}</span>
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
                        {excellenceResearchLabels.awardTimeline}
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
                        {excellenceResearchLabels.awardCoordinators}
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
