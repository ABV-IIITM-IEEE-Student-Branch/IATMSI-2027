import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { callForPapersData } from '../../data/homeData';

export default function CallForPapersSection() {
    const { title, description, cmtDisclaimer, submitRoute, registrationRoute, detailsRoute } = callForPapersData;

    return (
        <SectionContainer id="call-for-papers">
            <SectionHeader title={title} centered={true} />

            <div className="space-y-6 text-neutral-800 text-sm md:text-base leading-relaxed">
                {/* Main Call for Papers Description */}
                <p className="font-medium text-justify">
                    {description}
                </p>

                {/* Microsoft CMT Service Disclaimer Box */}
                <div className="bg-[#FAF5EB] rounded-2xl p-6 md:p-8 border border-[#C59B27]/40 shadow-sm relative overflow-hidden my-6">
                    <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-[#722332] text-[#F0CB6F] flex items-center justify-center font-bold text-lg flex-shrink-0 mt-0.5">
                            💻
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm md:text-base font-extrabold text-[#722332] uppercase tracking-wide">
                                Microsoft CMT Peer-Review Service
                            </h4>
                            <p className="text-xs md:text-sm text-neutral-700 leading-relaxed font-medium">
                                {cmtDisclaimer}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to={detailsRoute}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#4A121A] hover:bg-[#611822] text-[#FAF5EB] font-bold text-xs md:text-sm rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:scale-105 uppercase tracking-wider text-center"
                    >
                        For Details Click Here &rarr;
                    </Link>

                    <Link
                        to={submitRoute}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-[#722332] hover:bg-[#8A2E3D] text-[#FAF5EB] font-extrabold text-xs md:text-sm rounded-xl border border-[#C59B27] shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider text-center"
                    >
                        Submit Now
                    </Link>

                    <Link
                        to={registrationRoute}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-[#F0CB6F] hover:bg-[#E5C158] text-[#4A121A] font-extrabold text-xs md:text-sm rounded-xl border border-[#C59B27] shadow-lg transition-all transform hover:scale-105 uppercase tracking-wider text-center"
                    >
                        Registration
                    </Link>
                </div>
            </div>
        </SectionContainer>
    );
}
