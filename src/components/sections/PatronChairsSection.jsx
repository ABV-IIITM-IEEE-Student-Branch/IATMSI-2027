import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { patronChairsData } from '../../data/homeData';

export default function PatronChairsSection() {
    const { title, chairs } = patronChairsData;

    return (
        <SectionContainer id="patron-chairs">
            <SectionHeader title={title} centered={true} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {chairs.map((chair) => (
                    <div
                        key={chair.id}
                        className="bg-[#FAF5EB] rounded-2xl p-6 border-2 border-[#C59B27]/40 shadow-lg text-center flex flex-col items-center hover:border-[#C59B27] transition-all transform hover:-translate-y-1 group"
                    >
                        {/* Profile Image Container */}
                        <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#C59B27] shadow-xl mb-5 bg-[#4A121A] flex items-center justify-center text-3xl font-extrabold text-[#F0CB6F] flex-shrink-0">
                            {chair.image ? (
                                <img
                                    src={chair.image}
                                    alt={chair.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <span>{chair.name.split(' ').map(n => n[0]).join('')}</span>
                            )}
                        </div>

                        {/* Name & Role */}
                        <h4 className="text-base md:text-lg font-black text-[#4A121A] leading-snug">
                            {chair.name}
                        </h4>

                        <span className="text-xs font-extrabold text-[#722332] bg-white px-3 py-1 rounded-full border border-[#C59B27]/30 my-2 uppercase tracking-wider">
                            ({chair.role})
                        </span>

                        <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-semibold">
                            {chair.affiliation}
                        </p>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
