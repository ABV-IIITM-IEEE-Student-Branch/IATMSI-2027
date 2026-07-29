import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { themesData } from '../../data/homeData';

export default function ThemeTracksSection() {
    const { title, mainTheme, tracks } = themesData;

    return (
        <SectionContainer id="themes">
            <SectionHeader title={title} centered={true} />

            {/* Main Theme Banner */}
            <div className="bg-[#4A121A] text-[#FAF5EB] rounded-2xl p-6 md:p-8 text-center border-2 border-[#C59B27] shadow-xl mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F0CB6F]">
                    Conference Main Theme
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#FAF5EB] mt-2 tracking-wide">
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
                                <span className="text-3xl">{track.icon}</span>
                                <span className="text-xs font-extrabold text-[#722332] bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#C59B27]/30">
                                    Track {track.id}
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
                            <span>Explore Details</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
