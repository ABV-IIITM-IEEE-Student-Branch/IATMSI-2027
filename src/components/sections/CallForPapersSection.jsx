import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { callForPapersData } from '../../data/homeData';

export default function CallForPapersSection() {
    const { title, description, cmtDisclaimer, submitRoute, registrationRoute, detailsRoute } = callForPapersData;

    return (
        <SectionContainer id="call-for-papers">
            <SectionHeader title={title} centered={true} />

            <div className="space-y-4 text-neutral-800 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
                {/* Main Call for Papers Description */}
                <p className="font-medium text-justify">
                    {description}
                </p>

                {/* Microsoft CMT Service Disclaimer as Plain Paragraph */}
                <p className="font-medium text-justify">
                    {cmtDisclaimer}
                </p>

                {/* Call To Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to={detailsRoute}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#4A121A] hover:bg-[#611822] !text-[#FAF5EB] font-bold text-xs md:text-sm rounded-lg md:rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:-translate-y-0.5 uppercase tracking-wider text-center"
                    >
                        <span>For Details Click Here</span>
                        <svg className="w-4 h-4 text-[#F0CB6F] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>

                    <Link
                        to={submitRoute}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#722332] hover:bg-[#8A2E3D] !text-[#FAF5EB] font-extrabold text-xs md:text-sm rounded-lg md:rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:-translate-y-0.5 uppercase tracking-wider text-center"
                    >
                        Submit Now
                    </Link>

                    <Link
                        to={registrationRoute}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#F0CB6F] hover:bg-[#E5C158] !text-[#4A121A] font-extrabold text-xs md:text-sm rounded-lg md:rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:-translate-y-0.5 uppercase tracking-wider text-center"
                    >
                        Registration
                    </Link>
                </div>
            </div>
        </SectionContainer>
    );
}
