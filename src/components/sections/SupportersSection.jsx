import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { supportersData } from '../../data/homeData';

function SupporterCard({ item }) {
    return (
        <div
            className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#C59B27]/40 shadow-md hover:shadow-2xl hover:border-[#C59B27] transition-all transform hover:-translate-y-1.5 flex flex-col items-center justify-between group min-h-[200px] sm:min-h-[220px] w-full"
        >
            <div className="flex-1 flex items-center justify-center min-h-[95px] sm:min-h-[115px] w-full py-2">
                <img
                    src={item.logo}
                    alt={item.name}
                    className="max-h-20 sm:max-h-24 w-auto max-w-[160px] sm:max-w-[200px] object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="w-full pt-3.5 mt-2 border-t border-[#C59B27]/30 text-center">
                <span className="text-sm sm:text-base font-black text-[#4A121A] tracking-wider uppercase font-heading block">
                    {item.name}
                </span>
            </div>
        </div>
    );
}

export default function SupportersSection() {
    const { title, logos } = supportersData;
    const firstRow = logos ? logos.slice(0, 3) : [];
    const secondRow = logos ? logos.slice(3, 5) : [];

    return (
        <SectionContainer dataSource="homeData" id="supporters">
            <SectionHeader title={title} centered={true} />

            <div className="max-w-5xl mx-auto py-4 space-y-6 sm:space-y-8">
                {/* Row 1: 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    {firstRow.map((item) => (
                        <SupporterCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Row 2: 2 cards centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl sm:max-w-3xl mx-auto">
                    {secondRow.map((item) => (
                        <SupporterCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
