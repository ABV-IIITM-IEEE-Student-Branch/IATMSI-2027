import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { supportersData } from '../../data/homeData';

export default function SupportersSection() {
    const { title, categories } = supportersData;

    return (
        <SectionContainer id="supporters">
            <SectionHeader title={title} centered={true} />

            <div className="max-w-4xl mx-auto">
                {categories && categories.length > 0 ? (
                    <div className="space-y-8">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-[#4A121A] text-[#FAF5EB] rounded-2xl p-6 md:p-8 border-2 border-[#C59B27] shadow-xl text-center space-y-4"
                            >
                                <h4 className="text-sm md:text-base font-black text-[#F0CB6F] uppercase tracking-widest border-b border-[#C59B27]/40 pb-2">
                                    {category.tier}
                                </h4>

                                <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                                    {category.sponsors.map((sponsor, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm font-extrabold text-[#FAF5EB] tracking-wide hover:bg-white/20 transition-all"
                                        >
                                            {sponsor.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-[#C59B27]/30 shadow-sm text-center space-y-3">
                        <div className="w-12 h-12 rounded-xl bg-[#722332]/10 border border-[#C59B27]/30 text-[#722332] flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                            </svg>
                        </div>
                        <h4 className="text-base md:text-lg font-extrabold text-[#4A121A]">
                            Sponsorship & Partnership Details
                        </h4>
                        <p className="text-xs md:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed font-medium">
                            Information regarding conference supporters, partners, and sponsorship packages will be announced soon.
                        </p>
                    </div>
                )}
            </div>
        </SectionContainer>
    );
}
