import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { hardnovateData } from '../../data/hardnovateData';

export default function HardnovateSection() {
    const {
        title,
        tagline,
        subtitle,
        flyerImageUrl,
        posterTemplateUrl,
        registrationFormUrl,
        introText,
        whatIsText,
        themes,
        eligibility,
        prototypeNote,
        registrationDetails,
        benefits,
        importantDates,
        coordinators,
    } = hardnovateData;

    return (
        <SectionContainer id="hardnovate-section">
            <SectionHeader title={title} subtitle={`${tagline} — ${subtitle}`} centered={true} />

            {/* 1. Contest Overview & Prize Pool Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            Hardware Innovation Stage
                        </span>
                        <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {tagline}
                        </h3>
                    </div>

                    <a
                        href={flyerImageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>Download Official Flyer (.png)</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 font-bold text-[#4A121A]">
                        {introText}
                    </p>
                    <p>{whatIsText}</p>
                </div>

                {/* Benefits / Why Participate Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {benefits.map((b, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-center flex flex-col items-center justify-center">
                            <span className="w-8 h-8 rounded-full bg-[#722332]/10 text-[#722332] flex items-center justify-center font-bold text-xs mb-2">
                                ★
                            </span>
                            <span className="text-xs md:text-sm font-black text-[#4A121A]">
                                {b}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Six Exciting Themes Grid */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Contest Themes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map((theme, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#722332] text-[#FAF5EB] font-black text-xs flex items-center justify-center flex-shrink-0">
                                {idx + 1}
                            </span>
                            <span className="text-xs md:text-sm font-bold text-[#4A121A]">
                                {theme}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Who Can Participate & Prototype Mandate */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Who Can Participate & Rules
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eligibility.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] flex-shrink-0" />
                            <span className="text-xs md:text-sm text-neutral-800 font-semibold">{item}</span>
                        </div>
                    ))}
                </div>

                {/* Working Prototype Mandate Box & Poster Template Button */}
                <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-600 border-y border-r border-amber-200 text-amber-950 space-y-3">
                    <h4 className="text-sm font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Mandatory Working Prototype Rule
                    </h4>
                    <p className="text-xs md:text-sm font-medium leading-relaxed">
                        {prototypeNote}
                    </p>

                    <div className="pt-2">
                        <a
                            href={posterTemplateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all"
                        >
                            <span>Download Hardnovate Poster Template (.pptx)</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* 4. Registration Fees & Payment Account Details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Registration & Logistics Fees
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            Resource & Logistics Support Charges
                        </span>
                        <span className="text-xl font-black text-[#722332] mt-1 block">
                            {registrationDetails.fee}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                        <span className="text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            Account Details
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
                        href={registrationFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>Register for Hardnovate (Google Form)</span>
                        <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 5. Important Dates & Coordinators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Important Dates */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                        Contest Timeline
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
                        Contest Coordinators
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
