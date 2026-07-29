import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { programScheduleData } from '../../data/homeData';

export default function ProgramScheduleSection() {
    const { title, subtitle, description, linkText, linkRoute } = programScheduleData;

    return (
        <SectionContainer id="program-schedule">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#4A121A] to-[#360C14] text-[#FAF5EB] rounded-2xl md:rounded-[2rem] p-8 md:p-12 shadow-2xl border-2 border-[#C59B27] text-center relative overflow-hidden">
                {/* Background Gold Accent Ring */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C59B27]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F0CB6F] bg-[#C59B27]/20 px-4 py-1.5 rounded-full border border-[#C59B27]/40 inline-block">
                        Conference Program Overview
                    </span>

                    <p className="text-sm md:text-base text-[#FAF5EB]/90 max-w-2xl mx-auto leading-relaxed font-medium">
                        {description}
                    </p>

                    <div className="pt-2">
                        <Link
                            to={linkRoute}
                            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#F0CB6F] hover:bg-[#E5C158] text-[#4A121A] font-extrabold text-sm md:text-base rounded-xl shadow-lg border border-[#C59B27] transition-all transform hover:scale-105 uppercase tracking-wider"
                        >
                            <span>📅 {linkText}</span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
