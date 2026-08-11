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
                            <span className="w-12 h-12 rounded-xl bg-[#722332] text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                                🏆
                            </span>
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
                    {rewards.map((reward, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center flex flex-col items-center justify-center">
                            <span className="w-10 h-10 rounded-full bg-[#722332]/10 text-[#722332] flex items-center justify-center font-bold text-lg mb-2">
                                🏅
                            </span>
                            <span className="text-xs md:text-sm font-black text-[#4A121A]">
                                {reward}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 text-center text-xs md:text-sm font-black text-[#722332] uppercase tracking-wider">
                    🎉 {ceremonyInfo}
                </div>
            </div>
        </SectionContainer>
    );
}
