import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { patronChairsData } from '../../data/homeData';

function PersonCard({ person }) {
    return (
        <div className="bg-[#FAF5EB] rounded-2xl p-6 border-2 border-[#C59B27]/40 shadow-lg text-center flex flex-col items-center hover:border-[#C59B27] transition-all transform hover:-translate-y-1 group w-full">
            {/* Profile Image Container */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#C59B27] shadow-xl mb-4 bg-[#4A121A] flex items-center justify-center text-2xl md:text-3xl font-extrabold text-[#F0CB6F] flex-shrink-0">
                {person.image ? (
                    <img
                        src={person.image}
                        alt={person.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span>{person.name.split(' ').filter(n => !n.startsWith('Dr.') && !n.startsWith('Prof.')).map(n => n[0]).join('') || person.name.slice(0, 2)}</span>
                )}
            </div>

            {/* Name */}
            <h4 className="text-base md:text-lg font-black text-[#4A121A] leading-snug">
                {person.name}
            </h4>

            {/* Role Badge */}
            <span className="text-[11px] md:text-xs font-extrabold text-[#722332] bg-white px-3 py-1 rounded-full border border-[#C59B27]/30 my-2 uppercase tracking-wider">
                ({person.role})
            </span>

            {/* Designation if any */}
            {person.designation && (
                <p className="text-xs font-bold text-[#722332] italic mb-1">
                    {person.designation}
                </p>
            )}

            {/* Affiliation */}
            <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-semibold">
                {person.affiliation}
            </p>
        </div>
    );
}

export default function PatronChairsSection() {
    const { title, patronGroupTitle, generalChairGroupTitle, confChairGroupTitle, patrons, generalChairs, conferenceChairs } = patronChairsData;

    return (
        <SectionContainer dataSource="homeData" id="patron-chairs">
            <SectionHeader title={title} centered={true} />

            <div className="space-y-12 max-w-6xl mx-auto">
                {/* Row 1: Conference Patrons (3) */}
                <div>
                    <h3 className="text-center text-lg md:text-xl font-black text-[#722332] uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                        {patronGroupTitle}
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {patrons.map((patron) => (
                            <PersonCard key={patron.id} person={patron} />
                        ))}
                    </div>
                </div>

                {/* Row 2: General Chairs (3) */}
                <div>
                    <h3 className="text-center text-lg md:text-xl font-black text-[#722332] uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                        {generalChairGroupTitle}
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {generalChairs.map((chair) => (
                            <PersonCard key={chair.id} person={chair} />
                        ))}
                    </div>
                </div>

                {/* Row 3: Conference Chair (1) */}
                <div>
                    <h3 className="text-center text-lg md:text-xl font-black text-[#722332] uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                        {confChairGroupTitle}
                        <span className="w-8 h-[2px] bg-[#C59B27]" />
                    </h3>
                    <div className="flex justify-center max-w-sm mx-auto">
                        {conferenceChairs.map((chair) => (
                            <PersonCard key={chair.id} person={chair} />
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
