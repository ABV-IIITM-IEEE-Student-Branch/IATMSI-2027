import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { programScheduleData } from '../../data/homeData';

export default function ProgramScheduleSection() {
    const { title, subtitle, description, linkText, linkRoute } = programScheduleData;

    return (
        <SectionContainer id="program-schedule">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#4A121A] to-[#360C14] text-[#FAF5EB] rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl border-2 border-[#C59B27] text-center relative overflow-hidden">
                {/* Background Gold Accent Ring */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#C59B27]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F0CB6F] bg-[#C59B27]/20 px-4 py-1.5 rounded-full border border-[#C59B27]/40 inline-block">
                        Conference Program Overview
                    </span>

                    <p className="text-sm md:text-base text-[#FAF5EB]/90 max-w-2xl mx-auto leading-relaxed font-medium">
                        {description}
                    </p>

                    <div className="pt-2">
                        <Link
                            to={linkRoute}
                            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#F0CB6F] hover:bg-[#E5C158] text-[#4A121A] font-extrabold text-xs md:text-sm rounded-lg md:rounded-xl shadow-md hover:shadow-lg border border-[#C59B27] transition-all transform hover:-translate-y-0.5 uppercase tracking-wider"
                        >
                            <svg className="w-4 h-4 text-[#4A121A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{linkText}</span>
                            <svg className="w-4 h-4 text-[#4A121A] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}

