import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { supportersData } from '../../data/homeData';

export default function SupportersSection() {
    const { title, categories } = supportersData;

    return (
        <SectionContainer id="supporters">
            <SectionHeader title={title} centered={true} />

            <div className="max-w-5xl mx-auto py-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
                    {categories.map((category) => (
                        <div key={category.id} className="space-y-4 px-4">
                            <h4 className="text-xs md:text-sm font-extrabold text-[#722332] uppercase tracking-widest border-b border-[#C59B27]/40 pb-3">
                                {category.tier}
                            </h4>

                            {category.sponsors && category.sponsors.length > 0 ? (
                                <div className="flex flex-col items-center gap-3 pt-2">
                                    {category.sponsors.map((sponsor, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white px-5 py-2.5 rounded-xl border border-[#C59B27]/40 text-xs font-bold text-[#4A121A] shadow-sm"
                                        >
                                            {sponsor.name}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="min-h-[30px]" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
