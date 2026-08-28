import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { aboutConferenceData, aboutConfLabels, themeTracksLabels } from '../../data/homeData';
import { conferenceInfo } from '../../data/conferenceData';
import { renderRichText } from '../../utils/richText';

const renderFormattedText = (text) =>
    renderRichText(text, { strongClassName: 'font-extrabold text-[#4A121A]' });

export default function AboutConfSection() {
    const { title, mainTheme, paragraphs, thematicTracks, closingParagraph, targetDate } = aboutConferenceData;

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

            {/* Conference Main Theme Title Card */}
            <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl p-6 md:p-8 text-center border-2 border-[#C59B27]/40 shadow-md mb-8 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C59B27]/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#722332]/5 rounded-full blur-xl pointer-events-none" />

                <span className="text-xs font-extrabold uppercase tracking-widest text-[#722332] bg-[#722332]/10 px-4 py-1.5 rounded-full border border-[#C59B27]/30 shadow-xs inline-block mb-3">
                    {themeTracksLabels.conferenceMainTheme}
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-[#4A121A] tracking-wide font-heading">
                    “{mainTheme}”
                </h3>
            </div>

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

                {/* Thematic Tracks Cards Grid (without descriptions) */}
                <div className="my-8">
                    <h4 className="text-base md:text-lg font-extrabold text-[#722332] uppercase tracking-wide mb-6 flex items-center gap-2">
                        <span data-weavr-ignore className="text-[#C59B27]">◆</span> {aboutConfLabels.broadThematicTracks}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {thematicTracks.map((track) => (
                            <Link
                                key={track.id}
                                to="/call-for-papers/tracks"
                                className="bg-white rounded-2xl border border-[#C59B27]/40 shadow-md hover:shadow-xl hover:border-[#C59B27] transition-all p-5 flex flex-col justify-between group transform hover:-translate-y-1"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-10 rounded-xl bg-[#722332]/10 border border-[#C59B27]/30 text-[#722332] flex items-center justify-center flex-shrink-0 group-hover:bg-[#722332] group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={track.icon} />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-extrabold text-[#722332] bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#C59B27]/30">
                                            <span>{themeTracksLabels.trackBadgePrefix}</span> {track.id}
                                        </span>
                                    </div>

                                    <h4 className="text-sm md:text-base font-extrabold text-[#4A121A] leading-snug group-hover:text-[#722332] transition-colors">
                                        {track.title}
                                    </h4>
                                </div>

                                <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#722332]">
                                    <span>{themeTracksLabels.exploreDetails}</span>
                                    <svg className="w-4 h-4 text-[#722332] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
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
                        {aboutConfLabels.countdownToConference}
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
                            {aboutConfLabels.days}
                        </span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.hours.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            {aboutConfLabels.hours}
                        </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.minutes.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            {aboutConfLabels.minutes}
                        </span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-2xl shadow-md hover:shadow-xl border-2 border-[#C59B27]/40 transform hover:-translate-y-1 transition-all">
                        <span className="text-3xl md:text-5xl font-black text-[#722332] font-mono tracking-tight">
                            {timeLeft.seconds.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs font-extrabold tracking-widest uppercase text-[#4A121A] mt-2">
                            {aboutConfLabels.seconds}
                        </span>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
