import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { registrationPageData } from '../../data/registrationData';
import { registrationLabels } from '../../data/registrationData';

export default function RegistrationSection() {
    const {
        title,
        subtitle,
        overview,
        feeTableStatus,
        guidelines,
        indianDelegatesSection,
        internationalDelegatesSection,
    } = registrationPageData;

    return (
        <SectionContainer id="registration-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Overview & Fee Table Placeholder Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                        {registrationLabels.onlineRegistration}
                    </span>
                    <p className="text-xs md:text-sm text-neutral-800 font-bold leading-relaxed">
                        {overview}
                    </p>
                </div>

                {/* Fee Table Status Callout */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/50 text-center space-y-2">
                    <h4 className="text-sm font-black uppercase tracking-widest text-[#722332]">
                        {registrationLabels.registrationCategoryFeeStructure}
                    </h4>
                    <span className="text-xl md:text-2xl font-black text-[#4A121A] bg-white px-6 py-2 rounded-full border border-[#C59B27]/40 inline-block shadow-xs">
                        {feeTableStatus}
                    </span>
                </div>
            </div>

            {/* 2. General Registration Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {registrationLabels.registrationGuidelinesInclusions}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guidelines.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Section 1: Registration for Indian & Nepal Delegates */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-lg md:text-xl font-black text-[#4A121A] border-b border-[#C59B27]/30 pb-4 leading-snug">
                    {indianDelegatesSection.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {indianDelegatesSection.instruction}
                </p>

                {/* Bank Accounts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {indianDelegatesSection.accounts.map((acc, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center">
                            <span className="text-xs font-black uppercase tracking-wider text-[#722332] block mb-1">
                                {acc.label}
                            </span>
                            <span className="text-sm font-black text-[#4A121A] bg-white px-4 py-1 rounded-full border border-[#C59B27]/30 inline-block shadow-2xs">
                                {acc.detail}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Link CTA */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                    <p className="text-xs md:text-sm font-bold text-[#4A121A]">
                        {indianDelegatesSection.googleFormText}
                    </p>
                    <a
                        href={indianDelegatesSection.formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all"
                    >
                        <span>{indianDelegatesSection.buttonLabel}</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* 4. Section 2: Registration for International Delegates (Explara + Stripe) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-lg md:text-xl font-black text-[#4A121A] border-b border-[#C59B27]/30 pb-4 leading-snug">
                    {internationalDelegatesSection.title}
                </h3>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {internationalDelegatesSection.instruction}
                </p>

                {/* Explara CTA Button */}
                <div>
                    <a
                        href={internationalDelegatesSection.explaraUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>{internationalDelegatesSection.buttonLabel}</span>
                        <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* Step-by-step Explara Walkthrough */}
                <div className="space-y-6 pt-4 border-t border-[#C59B27]/30">
                    <h4 className="text-base font-black text-[#722332] uppercase tracking-wider">
                        {internationalDelegatesSection.stepsTitle}
                    </h4>

                    <div className="space-y-6">
                        {internationalDelegatesSection.steps.map((st) => (
                            <div key={st.step} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-2xl border border-[#C59B27]/40 space-y-4">
                                <h5 className="text-sm font-black text-[#4A121A]">
                                    {st.title}
                                </h5>

                                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed whitespace-pre-line">
                                    {st.text}
                                </p>

                                {/* Single Image if present */}
                                {st.image && (
                                    <div className="overflow-hidden rounded-xl border border-[#C59B27]/40 bg-white p-2 shadow-sm max-w-2xl mx-auto">
                                        <img
                                            src={st.image}
                                            alt={st.title}
                                            className="w-full h-auto max-h-[450px] object-contain rounded-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                )}

                                {/* Multiple Images if present */}
                                {st.images && st.images.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        {st.images.map((imgUrl, imgIdx) => (
                                            <div key={imgIdx} className="overflow-hidden rounded-xl border border-[#C59B27]/40 bg-white p-2 shadow-sm">
                                                <img
                                                    src={imgUrl}
                                                    alt={`${st.title} ${imgIdx + 1}`}
                                                    className="w-full h-auto max-h-[400px] object-contain rounded-lg"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
