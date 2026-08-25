import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { themesData } from '../../data/homeData';
import { themeTracksLabels } from '../../data/homeData';

export default function ThemeTracksSection() {
    const { title, mainTheme, tracks } = themesData;

    return (
        <SectionContainer dataSource="homeData" id="themes">
            <SectionHeader title={title} centered={true} />

            {/* Main Theme Banner */}
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl p-6 md:p-8 text-center border-2 border-[#C59B27]/40 shadow-md mb-10 relative overflow-hidden">
                {/* Subtle background ornament glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C59B27]/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#722332]/5 rounded-full blur-xl pointer-events-none" />

                <span className="text-xs font-extrabold uppercase tracking-widest text-[#722332] bg-[#722332]/10 px-4 py-1.5 rounded-full border border-[#C59B27]/30 shadow-xs inline-block mb-3">
                    {themeTracksLabels.conferenceMainTheme}
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#4A121A] tracking-wide font-heading">
                    “{mainTheme}”
                </h3>
            </div>

            {/* 5 Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="bg-white rounded-2xl border border-[#C59B27]/40 shadow-md hover:shadow-xl hover:border-[#C59B27] transition-all p-6 flex flex-col justify-between group transform hover:-translate-y-1"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-[#722332]/10 border border-[#C59B27]/30 text-[#722332] flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={track.icon} />
                                    </svg>
                                </div>
                                <span className="text-xs font-extrabold text-[#722332] bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#C59B27]/30">
                                    <span>{themeTracksLabels.trackBadgePrefix}</span> {track.id}
                                </span>
                            </div>

                            <h4 className="text-base font-extrabold text-[#4A121A] leading-snug group-hover:text-[#722332] transition-colors">
                                {track.title}
                            </h4>

                            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
                                {track.description}
                            </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#722332]">
                            <span>{themeTracksLabels.exploreDetails}</span>
                            <svg className="w-4 h-4 text-[#722332] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
