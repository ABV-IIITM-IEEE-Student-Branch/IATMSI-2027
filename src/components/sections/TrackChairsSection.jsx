import { useState, useRef } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { trackChairsData } from '../../data/trackChairsData';

export default function TrackChairsSection() {
    const { title, subtitle, tracks } = trackChairsData;
    const [selectedTrack, setSelectedTrack] = useState('all');
    const scrollContainerRef = useRef(null);

    const scrollTabs = (direction) => {
        if (scrollContainerRef.current) {
            const amount = direction === 'left' ? -280 : 280;
            scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const filteredTracks = selectedTrack === 'all'
        ? tracks
        : tracks.filter(t => t.number === Number(selectedTrack));

    return (
        <SectionContainer id="track-chairs-section">
            <SectionHeader
                title={title}
                subtitle={subtitle}
                centered={true}
            />

            {/* Quick Track Selection Nav Bar with Flex Scroll Controls */}
            <div className="flex items-center gap-2 mb-8">
                <button
                    onClick={() => scrollTabs('left')}
                    aria-label="Scroll Tabs Left"
                    className="hidden sm:flex z-10 w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] items-center justify-center shadow-md border border-[#C59B27] hover:bg-[#5B1824] transition-all transform hover:scale-105 flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex-1 flex items-center gap-2 overflow-x-auto pb-3 custom-scrollbar scroll-smooth px-1"
                >
                    <button
                        onClick={() => setSelectedTrack('all')}
                        className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                            selectedTrack === 'all'
                                ? 'bg-[#722332] text-[#FAF5EB] border-[#C59B27] shadow-md'
                                : 'bg-white text-[#4A121A] border-[#C59B27]/40 hover:bg-[#FAF5EB]'
                        }`}
                    >
                        All Tracks ({tracks.length})
                    </button>
                    {tracks.map((tr) => (
                        <button
                            key={tr.number}
                            onClick={() => setSelectedTrack(String(tr.number))}
                            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                                selectedTrack === String(tr.number)
                                    ? 'bg-[#722332] text-[#FAF5EB] border-[#C59B27] shadow-md'
                                    : 'bg-white text-[#4A121A] border-[#C59B27]/40 hover:bg-[#FAF5EB]'
                            }`}
                        >
                            Track {tr.number} ({tr.members.length})
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => scrollTabs('right')}
                    aria-label="Scroll Tabs Right"
                    className="hidden sm:flex z-10 w-8 h-8 rounded-full bg-[#722332] text-[#FAF5EB] items-center justify-center shadow-md border border-[#C59B27] hover:bg-[#5B1824] transition-all transform hover:scale-105 flex-shrink-0"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Track Blocks Grid */}
            <div className="space-y-10">
                {filteredTracks.map((track) => (
                    <div key={track.number} className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#C59B27]/30">
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3 py-1 rounded-full shadow-xs inline-block mb-2">
                                    Track {track.number}
                                </span>
                                <h3 className="text-lg md:text-xl font-black text-[#4A121A] font-heading tracking-wide uppercase leading-snug">
                                    {track.title}
                                </h3>
                            </div>
                            <span className="text-xs font-black text-[#722332] bg-[#722332]/10 px-3.5 py-1 rounded-full border border-[#C59B27]/30 self-start md:self-auto flex-shrink-0">
                                {track.members.length} Members
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {track.members.map((member, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border-l-4 border-[#C59B27] border-y border-r border-[#C59B27]/30 shadow-xs hover:shadow-md hover:border-[#C59B27] transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <h4 className="text-sm md:text-base font-black text-[#4A121A] leading-snug group-hover:text-[#722332] transition-colors">
                                            {member.name}
                                        </h4>
                                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full inline-block my-1.5 uppercase tracking-wider ${
                                            member.role === 'Chair'
                                                ? 'bg-[#722332] text-[#FAF5EB] shadow-xs'
                                                : 'bg-white text-[#722332] border border-[#C59B27]/30'
                                        }`}>
                                            {member.role}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-700 font-semibold leading-relaxed mt-1">
                                        {member.affiliation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
