import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { simulationAwardData } from '../../data/simulationAwardData';
import { simulationAwardLabels } from '../../data/simulationAwardData';

export default function SimulationAwardSection() {
    const {
        title,
        subtitle,
        flyerPdfUrl,
        registrationFormUrl,
        presentationTemplateUrl,
        overviewText,
        objectiveText,
        eligibility,
        whyParticipate,
        submissionGuidelines,
        nominationFeeText,
        registrationWindow,
        awardsSummary,
        importantDates,
        coordinators,
    } = simulationAwardData;

    return (
        <SectionContainer dataSource="simulationAwardData" id="simulation-award-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Award Overview, Objective & Flyer Download */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            {simulationAwardLabels.computationalModelingExcellence}
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {simulationAwardLabels.honoringExceptionalSimulationResearch}
                        </h3>
                    </div>

                    <a
                        href={flyerPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>{simulationAwardLabels.downloadAwardFlyerPdf}</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        {overviewText}
                    </p>
                    <p className="p-2 text-neutral-700 font-medium">{objectiveText}</p>
                </div>

                {/* Cash Prize & Certificate Callout Badge */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-center gap-3 text-xs md:text-sm font-black text-[#722332]">
                    <div className="w-8 h-8 rounded-full bg-[#722332]/10 flex items-center justify-center border border-[#C59B27]/30 flex-shrink-0">
                        <svg className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <span>{awardsSummary}</span>
                </div>
            </div>

            {/* 2. Why Participate? (8 Benefits) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {simulationAwardLabels.whyParticipate}
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

            {/* 3. Who Can Participate (Eligibility Rules) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {simulationAwardLabels.whoCanParticipateEligibilityRules}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* 4. Submission & Registration Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {simulationAwardLabels.submissionGuidelinesRequiredContents}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {submissionGuidelines.map((g, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {g}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Presentation Template Download */}
                <div className="pt-2">
                    <a
                        href={presentationTemplateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all"
                    >
                        <span>{simulationAwardLabels.downloadSimulationAwardPresentationTemplatePptx}</span>
                        <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 5. Zero Nomination Fee & Submission Form CTA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {simulationAwardLabels.nominationChargesRegistrationLink}
                </h3>

                {/* Zero Nomination Fee Card */}
                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-600 border-y border-r border-emerald-200 text-emerald-950 space-y-1">
                    <h4 className="text-sm font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {simulationAwardLabels.zeroNominationFee}
                    </h4>
                    <p className="text-xs md:text-sm font-semibold leading-relaxed">
                        {nominationFeeText}
                    </p>
                </div>

                <div className="text-xs md:text-sm font-bold text-[#722332]">
                    Registration Window: {registrationWindow}
                </div>

                {/* Form Link CTA Button */}
                <div className="pt-2">
                    <a
                        href={registrationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>{simulationAwardLabels.submitSimulationAwardNominationGoogleForm}</span>
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
                        {simulationAwardLabels.awardTimeline}
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
                        {simulationAwardLabels.awardCoordinators}
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
