import { Link } from 'react-router-dom';
import { homeIntroContent, conferenceInfo } from '../../data/conferenceData';
import { ROUTES } from '../../constants/routes';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import Button from '../ui/Button';

export default function IntroSection() {
    return (
        <SectionContainer background="white" className="relative overflow-hidden">

            {/* Intro Content & Poster Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-20 max-w-7xl mx-auto relative z-10">
                {/* Left: Text Content */}
                <div className="lg:col-span-7 xl:col-span-8 text-left space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-base md:text-2xl md:text-3xl font-bold text-neutral-900">
                            {`Welcome to ${conferenceInfo.shortTitle}`}
                        </h2>
                        <p className="text-sm md:text-base text-neutral-600">
                            {conferenceInfo.fullTitle}
                        </p>
                        <div className="w-16 h-1 bg-primary-600 rounded-full mt-4" />
                    </div>

                    <div className="prose text-neutral-600 text-justify max-w-none space-y-4">
                        {homeIntroContent.paragraphs?.map((p, i) => (
                            <p key={i} className="leading-relaxed text-sm sm:text-base text-slate-700">
                                {p}
                            </p>
                        ))}

                        {homeIntroContent.tracks && homeIntroContent.tracks.length > 0 && (
                            <div className="py-4">
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pl-0 list-none m-0">
                                    {homeIntroContent.tracks.map((track, i) => (
                                        <li key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 border-t-2 border-t-amber-500/80 shadow-sm hover:shadow-md hover:border-amber-500 transition-all group">
                                            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-amber-600 font-bold text-xs group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                                {i + 1}
                                            </div>
                                            <span className="text-sm font-semibold text-slate-800 leading-snug">{track}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {homeIntroContent.closingParagraph && (
                            <p className="leading-relaxed text-sm sm:text-base text-slate-700 bg-amber-500/5 p-4 rounded-xl border-l-4 border-amber-500">
                                {homeIntroContent.closingParagraph}
                            </p>
                        )}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4 justify-start">
                        <Button to={ROUTES.TRACKS} variant="primary" size="md" className="bg-[#002855] hover:bg-[#001a3a] text-white border-b-2 border-amber-500 shadow-md hover:shadow-lg transition-all">
                            Call for Papers →
                        </Button>
                        <Button to={ROUTES.ABOUT} variant="outline" size="md" className="border-amber-500/40 text-slate-800 hover:bg-amber-500/10">
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Right: Conference Info Card */}
                <div className="lg:col-span-5 xl:col-span-4 relative flex justify-center lg:justify-end">
                    <div className="relative max-w-[360px] w-full">
                        {/* Decorative background */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-primary-900/10 to-transparent rounded-[2.5rem] opacity-70 blur-lg" />
                        <div className="relative rounded-2xl shadow-2xl border border-amber-500/30 bg-slate-900 overflow-hidden text-white">
                            <div className="bg-[#002855] p-6 border-b border-amber-500/30 relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold tracking-wider uppercase mb-2">
                                    5th Edition IEEE
                                </span>
                                <h3 className="text-xl font-extrabold !text-white mb-1.5">{conferenceInfo.shortTitle}</h3>
                                <p className="text-xs !text-slate-300 leading-relaxed font-medium">{conferenceInfo.fullTitle}</p>
                            </div>
                            <div className="p-6 space-y-5 bg-[#0B1120]">
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold">Conference Dates</p>
                                        <p className="text-sm font-bold text-white">{conferenceInfo.dates}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold">Venue & Host</p>
                                        <p className="text-sm font-bold text-white">{conferenceInfo.venue.shortName}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-bold">Mode</p>
                                        <p className="text-sm font-bold text-white">{conferenceInfo.mode} Event</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
