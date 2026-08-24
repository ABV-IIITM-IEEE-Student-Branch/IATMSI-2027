import { useState, useEffect } from 'react';
import { latestUpdates, latestUpdatesLabels } from '../../data/latestUpdates';

export default function LatestUpdates() {
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        setUpdates(latestUpdates);
    }, []);

    if (!updates || updates.length === 0) return null;

    return (
        <div data-weavr-source="latestUpdates" className="w-full bg-[#722332] border-y border-amber-500/30 relative z-20 flex h-10 sm:h-12 overflow-hidden group">
            {/* Flat Dark Label Block */}
            <div className="bg-[#4A121A] px-4 sm:px-6 flex items-center justify-center z-30 shrink-0 border-r border-amber-500/30">
                <span className="font-extrabold tracking-wider uppercase flex items-center gap-2.5 text-xs sm:text-sm text-amber-300">
                    <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                    <span className="hidden sm:inline">{latestUpdatesLabels.tickerPrefix}</span> {latestUpdatesLabels.tickerTitle}
                </span>
            </div>

            {/* Scrolling Content */}
            <div className="flex-1 flex items-center bg-[#722332] text-white">
                <div className="animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap flex items-center gap-8 pl-6">
                    {/* Duplicate list for seamless loop */}
                    {[...updates, ...updates, ...updates].map((update, index) => (
                        <div key={index} className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                            {update.important && (
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase">
                                    {latestUpdatesLabels.newBadge}
                                </span>
                            )}
                            
                            <span className="font-medium tracking-wide text-amber-50">{update.text}</span>
                            
                            {update.link && (
                                <a
                                    href={update.link}
                                    className="!text-amber-300 hover:!text-amber-100 transition-colors font-bold ml-2 inline-flex items-center gap-1 underline underline-offset-2 decoration-amber-400/50"
                                    target={update.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={update.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    Read more &rarr;
                                </a>
                            )}
                            
                            {/* Simple Separator */}
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 ml-6 sm:ml-8"></span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add styled-jsx or plain CSS for marquee if tailwind config doesn't have it
// Assuming we need to add the animation in index.css if not present
