import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { venueInfo } from '../../data/travelData';
import { conferenceInfo } from '../../data/conferenceData';
import ReactMarkdown from 'react-markdown';
import React from 'react';

// Common sub-component
function DirectionCard({ icon, title, distance, time, steps }) {
    return (
        <div className="bg-[#FAF8F5] rounded-2xl p-6 md:p-8 shadow-sm border border-amber-500/20 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors"></div>
            
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
                {/* Left side info */}
                <div className="md:w-1/3 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-[#5B1824]">
                            {icon}
                        </div>
                        <h3 className="text-xl font-extrabold text-[#5B1824] leading-tight">{title}</h3>
                    </div>
                    <div className="flex gap-4 text-sm font-medium">
                        <div className="flex items-center gap-1.5 text-slate-600">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            {distance}
                        </div>
                        <div className="flex items-center gap-1.5 text-[#5B1824] font-bold">
                            <svg className="w-4 h-4 text-[#D4A244]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {time}
                        </div>
                    </div>
                </div>

                {/* Vertical Divider (Desktop only) */}
                <div className="hidden md:block w-px bg-amber-500/20"></div>

                {/* Right side steps */}
                <div className="md:w-2/3">
                    <ul className="space-y-3">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-700 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A244] mt-2 shrink-0"></span>
                                <span className="leading-relaxed font-medium">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function VenueDirectionsSection() {
    return (
        <>
            

            <SectionContainer background="white">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Venue Card */}
                    <div className="rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden bg-[#5B1824] border-2 border-[#D4A244]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A244]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-[#D4A244]/40">
                                    <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Conference Venue</h2>
                                    <p className="text-amber-300 text-sm font-semibold">{conferenceInfo.shortTitle} • {conferenceInfo.dates}</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-1">
                                {venueInfo.description.split('\n').map((line, index) => (
                                    <p key={index} className={index === 0 ? "text-base font-bold text-white" : "text-amber-100/90 text-base"}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-500/20">
                        <iframe
                            src={conferenceInfo.venue.mapEmbedUrl}
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ABV-IIITM, Gwalior Location"
                        ></iframe>
                    </div>

                    {/* Directions */}
                    <SectionHeader title="How to Reach" subtitle="Directions from major transport hubs" />

                    {/* From Airport */}
                    <DirectionCard
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                            </svg>
                        }
                        title={`From ${venueInfo.directionsFromAirport.name}`}
                        distance={venueInfo.directionsFromAirport.distance}
                        time={venueInfo.directionsFromAirport.time}
                        steps={venueInfo.directionsFromAirport.steps}
                    />

                    {/* From Railway Station */}
                    <DirectionCard
                        icon={
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h8m-4 4v4m-6 0h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        }
                        title={`From ${venueInfo.directionsFromRailway.name}`}
                        distance={venueInfo.directionsFromRailway.distance}
                        time={venueInfo.directionsFromRailway.time}
                        steps={venueInfo.directionsFromRailway.steps}
                    />

                    {/* From Major Cities */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-[#5B1824] border-b-2 border-[#D4A244]">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-[#D4A244]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                From Major Cities
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="grid sm:grid-cols-3 gap-6">
                                {venueInfo.fromMajorCities.map((cityData, index) => (
                                    <div key={index} className="text-center p-4 bg-[#FAF8F5] rounded-xl border border-amber-500/20">
                                        <div className="font-extrabold text-[#5B1824] mb-1">{cityData.city}</div>
                                        <div className="text-sm text-slate-600 mb-2 font-medium">{cityData.distance} • {cityData.time}</div>
                                        <div className="text-xs font-bold text-[#5B1824] px-2 py-1 bg-amber-500/10 border border-amber-500/30 rounded inline-block">{cityData.mode}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Local Transport Tips */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-8 border border-amber-500/30 shadow-sm">
                        <h3 className="text-[#5B1824] text-xl font-extrabold mb-4 flex items-center gap-2">
                            <span className="text-base">🚕</span> Local Transport Tips
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {venueInfo.localTransportTips.map((tip, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                                    <span className="leading-relaxed">
                                        <ReactMarkdown components={{ p: React.Fragment }}>{tip}</ReactMarkdown>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionContainer>
        </>
    );
}
