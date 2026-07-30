import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { supportersData } from '../../data/homeData';

export default function SupportersSection() {
    const { title, categories } = supportersData;

    return (
        <SectionContainer id="supporters">
            <SectionHeader title={title} centered={true} />

            <div className="max-w-5xl mx-auto">
                <div className="bg-[#4A121A] text-[#FAF5EB] rounded-2xl p-8 md:p-10 border-2 border-[#C59B27] shadow-xl text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#C59B27]/30">
                        {categories.map((category) => (
                            <div key={category.id} className="space-y-4 pt-4 md:pt-0 md:px-4">
                                <h4 className="text-xs md:text-sm font-extrabold text-[#F0CB6F] uppercase tracking-widest border-b border-[#C59B27]/30 pb-3">
                                    {category.tier}
                                </h4>

                                {category.sponsors && category.sponsors.length > 0 ? (
                                    <div className="flex flex-col items-center gap-3 pt-2">
                                        {category.sponsors.map((sponsor, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-[#C59B27]/40 text-xs font-bold text-[#FAF5EB]"
                                            >
                                                {sponsor.name}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="min-h-[40px]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
