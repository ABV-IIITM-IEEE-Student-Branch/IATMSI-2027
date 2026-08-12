import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { bestPaperAwardData } from '../../data/bestPaperAwardData';

export default function BestPaperAwardSection() {
    const {
        title,
        subtitle,
        categories,
        evaluationCriteria,
        eligibilityRules,
        rewards,
        ceremonyInfo,
    } = bestPaperAwardData;

    return (
        <SectionContainer id="best-paper-award-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Award Categories (Track Best Papers + Overall Best Paper) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Award Categories
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/50 shadow-sm flex items-start gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#722332] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                <svg className="w-6 h-6 text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-black text-[#4A121A]">
                                    {cat.title}
                                </h4>
                                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Physical Presentation Requirement Mandate Box */}
            <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border-l-4 border-amber-600 border-y border-r border-amber-200 text-amber-950 mb-10 space-y-3 shadow-2xs">
                <h3 className="text-base md:text-lg font-black text-amber-900 uppercase tracking-wider flex items-center gap-2.5">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Physical Presentation Eligibility Mandate
                </h3>

                <div className="space-y-2 text-xs md:text-sm font-semibold leading-relaxed">
                    {eligibilityRules.map((rule, idx) => (
                        <p key={idx}>• {rule}</p>
                    ))}
                </div>
            </div>

            {/* 3. Evaluation Criteria */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Evaluation Criteria
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

            {/* 4. Recipient Rewards & Ceremony Details */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Recipient Rewards & Award Ceremony
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {rewards.map((reward, idx) => {
                        const rewardIcons = [
                            // Certificate
                            <svg key="0" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>,
                            // Cash Prize
                            <svg key="1" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>,
                            // Memento
                            <svg key="2" className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        ];
                        return (
                            <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center flex flex-col items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-[#722332]/10 flex items-center justify-center border border-[#C59B27]/30 shadow-2xs mb-2">
                                    {rewardIcons[idx % rewardIcons.length]}
                                </div>
                                <span className="text-xs md:text-sm font-black text-[#4A121A]">
                                    {reward}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center text-xs md:text-sm font-black text-[#722332] uppercase tracking-wider flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{ceremonyInfo}</span>
                </div>
            </div>
        </SectionContainer>
    );
}
