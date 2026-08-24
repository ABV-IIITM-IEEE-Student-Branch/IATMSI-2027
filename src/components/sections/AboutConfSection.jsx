import { useState, useEffect } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { aboutConferenceData } from '../../data/homeData';
import { conferenceInfo } from '../../data/conferenceData';

function renderFormattedText(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index} className="font-extrabold text-[#4A121A]">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return part;
    });
}

export default function AboutConfSection() {
    const { title, paragraphs, thematicTracks, closingParagraph, targetDate } = aboutConferenceData;

    // Countdown Timer State
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const destination = new Date(targetDate).getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = destination - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <SectionContainer id="about-conference">
            <SectionHeader title={title} centered={true} />

            {/* Everything in here is aboutConferenceData (homeData); naming it
                explicitly keeps an editor from confusing this copy with the
                near-identical wording kept in conferenceData. */}
            <div data-weavr-source="homeData" className="space-y-6 text-neutral-800 text-sm md:text-base leading-relaxed">
                {/* Paragraph 1 */}
                <p className="font-medium text-justify">
                    {renderFormattedText(paragraphs[0])}
                </p>

                {/* Paragraph 2 */}
                <p className="font-medium text-justify">
                    {renderFormattedText(paragraphs[1])}
                </p>

                {/* Thematic Tracks Bullet List */}
                <div className="bg-[#FAF5EB] rounded-2xl p-6 md:p-8 border border-[#C59B27]/40 shadow-sm my-6">
                    <h4 className="text-base md:text-lg font-extrabold text-[#722332] uppercase tracking-wide mb-4 flex items-center gap-2">
                        <span className="text-[#C59B27]">◆</span> Broad Thematic Tracks
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {thematicTracks.map((track, index) => (
                            <li key={index} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#C59B27]/30 shadow-sm hover:border-[#C59B27] transition-all">
                                <span className="w-6 h-6 rounded-lg bg-[#722332] text-[#FAF5EB] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                                    {index + 1}
                                </span>
                                <span className="text-xs md:text-sm font-semibold text-neutral-800 leading-snug">
                                    {track}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Paragraph 3 */}
                <p className="font-medium text-justify">
                    {renderFormattedText(closingParagraph)}
                </p>
            </div>

            {/* Live Countdown Timer Section */}
            <div className="mt-12 pt-8 border-t border-[#C59B27]/30">
                <div className="text-center mb-8">
                    <span className="text-xs font-extrabold text-[#722332] uppercase tracking-widest bg-[#722332]/10 px-4 py-1.5 rounded-full border border-[#C59B27]/30 shadow-xs">
                        Countdown to Conference
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] mt-3 uppercase tracking-wide font-heading">
                        {conferenceInfo.dates} • {conferenceInfo.venue.city}
                    </h3>
                </div>

                {/* Timer Display Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
                    {/* Days */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.days}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            Days
                        </span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.hours.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            Hours
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.minutes.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            Minutes
                        </span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.seconds.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            Seconds
                        </span>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
