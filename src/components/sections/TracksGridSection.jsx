import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { tracks, cfpData } from '../../data/tracksData';

export default function TracksGridSection() {
    const { title, subtitle, downloadCfpUrl, theme, introText, xploreNote } = cfpData;

    return (
        <SectionContainer id="call-for-papers-tracks-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* CFP Download & Theme Banner */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#C59B27]/30 pb-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                            Conference Theme
                        </span>
                        <h3 className="text-lg md:text-xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            “{theme}”
                        </h3>
                    </div>

                    <a
                        href={downloadCfpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>Download Official CFP (.pdf)</span>
                        <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </a>
                </div>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {introText}
                </p>

                {/* IEEE Xplore Indexing Note */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm font-semibold text-[#4A121A]">
                    <span className="font-black text-[#722332] uppercase mr-2">IEEE Xplore Publication:</span>
                    {xploreNote}
                </div>
            </div>

            {/* 6 Technical Tracks Grid */}
            <div className="space-y-8">
                <div className="border-b border-[#C59B27]/30 pb-3">
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] uppercase tracking-wide flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                        Technical Tracks & Subtopics
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {tracks.map((track) => (
                        <div
                            key={track.id}
                            className="bg-white rounded-2xl p-6 md:p-7 border-2 border-[#C59B27]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="w-9 h-9 rounded-xl bg-[#722332] text-[#FAF5EB] flex items-center justify-center font-black text-sm flex-shrink-0 border border-[#C59B27]/40">
                                        T{track.number}
                                    </span>
                                    <div>
                                        <span className="text-[11px] font-black uppercase text-[#722332] tracking-wider block mb-0.5">
                                            Track {track.number}
                                        </span>
                                        <h4 className="text-base md:text-lg font-black text-[#4A121A] leading-snug">
                                            {track.title}
                                        </h4>
                                    </div>
                                </div>

                                <div className="border-t border-[#C59B27]/20 pt-4">
                                    <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-3">
                                        Topics of Interest:
                                    </h5>
                                    <ul className="space-y-2">
                                        {track.description.map((topic, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#722332] mt-2 flex-shrink-0" />
                                                <span>{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
