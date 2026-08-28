import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { fellowshipsData } from '../../data/fellowshipsData';
import { fellowshipsLabels } from '../../data/fellowshipsData';

export default function FellowshipsSection() {
    const {
        title,
        subtitle,
        applicationFormUrl,
        overviewText,
        eligibilityNotice,
        types,
        guidelines,
        importantDates,
        coordinators,
        applicationNotes,
    } = fellowshipsData;

    return (
        <SectionContainer dataSource="fellowshipsData" id="fellowships-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Overview & 3 Fellowship Types Grid */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                        {fellowshipsLabels.financialSupportMechanism}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                        {fellowshipsLabels.supportingStudentsFaculty}
                    </h3>
                </div>

                <div className="space-y-3 text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        {overviewText}
                    </p>
                    <p className="p-2 text-neutral-700 font-medium">{eligibilityNotice}</p>
                </div>

                {/* 3 Fellowship Types Cards */}
                <h4 className="text-sm font-black text-[#4A121A] uppercase tracking-wider pt-2">
                    {fellowshipsLabels.availableFellowshipCategories}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {types.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/50 shadow-sm space-y-2 flex flex-col justify-between"
                        >
                            <div>
                                <span className="text-xs font-black uppercase tracking-wider text-[#FAF5EB] bg-[#722332] px-3 py-1 rounded-full inline-block mb-2">
                                    {t.code}
                                </span>
                                <h5 className="text-base font-black text-[#4A121A]">{t.title}</h5>
                                <p className="text-xs md:text-sm font-bold text-[#722332] mt-1">
                                    {t.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Fellowship Guidelines & Rules */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {fellowshipsLabels.fellowshipGuidelinesRules}
                </h3>

                <div className="space-y-3">
                    {guidelines.map((g, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                                {g}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Online Application Process & Form CTA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {fellowshipsLabels.onlineApplicationProcess}
                </h3>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm text-neutral-800 font-semibold space-y-2">
                    {applicationNotes.map((note, idx) => (
                        <p key={idx}>• {note}</p>
                    ))}
                </div>

                {/* Form Link CTA Button */}
                <div className="pt-2">
                    <a
                        href={applicationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>{fellowshipsLabels.clickHereToApplyForFellowship}</span>
                        <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 4. Important Dates & Coordinators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Important Dates */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                        {fellowshipsLabels.fellowshipProgramTimeline}
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
                        {fellowshipsLabels.fellowshipCoordinators}
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
