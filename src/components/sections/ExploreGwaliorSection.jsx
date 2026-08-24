import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { attractions, exploreIntro, exploreClosingTitle, exploreClosingNote } from '../../data/travelData';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export default function ExploreGwaliorSection() {
    return (
        <>


            <SectionContainer dataSource="travelData" background="white">
                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Intro */}
                    <div className="prose prose max-w-none text-slate-600 text-center">
                        <p className="text-base leading-relaxed max-w-3xl mx-auto">
                            <ReactMarkdown
                                components={{
                                    p: React.Fragment,
                                    strong: ({ children }) => <strong className="text-[#5B1824] font-bold">{children}</strong>,
                                }}
                            >
                                {exploreIntro}
                            </ReactMarkdown>
                        </p>
                    </div>

                    {/* Attractions Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {attractions.map((attraction, index) => (
                            <div
                                key={index}
                                className="group bg-[#FAF8F5] rounded-2xl border border-amber-500/20 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                {/* Attraction Image */}
                                <div className="h-52 overflow-hidden">
                                    <img
                                        src={attraction.image}
                                        alt={attraction.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <div>
                                        <h3 className="text-xl font-black text-[#5B1824] mb-1">{attraction.name}</h3>
                                        <p className="text-[#8A2E3D] text-sm font-semibold italic">{attraction.tagline}</p>
                                    </div>
                                    <p className="text-slate-700 text-sm leading-relaxed">{attraction.description}</p>
                                    <div className="pt-2">
                                        <span className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-[#5B1824]">
                                            {attraction.highlight}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Travel Tip */}
                    <div className="bg-[#FAF8F5] rounded-2xl p-8 border border-amber-500/30 text-center shadow-sm">
                        <h3 className="text-[#5B1824] text-xl font-extrabold mb-2">{exploreClosingTitle}</h3>
                        <p className="text-neutral-700 text-sm max-w-2xl mx-auto leading-relaxed">
                            {exploreClosingNote}
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </>
    );
}
