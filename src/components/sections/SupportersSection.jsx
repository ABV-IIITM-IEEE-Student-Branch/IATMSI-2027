import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { supportersData } from '../../data/homeData';

export default function SupportersSection() {
    const { title, categories } = supportersData;

    return (
        <SectionContainer id="supporters">
            <SectionHeader title={title} centered={true} />

            <div className="space-y-8 max-w-5xl mx-auto">
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
        </SectionContainer>
    );
}
