import { aboutRationaleContent, conferenceScope, pioneeringFields } from '../../data/conferenceData';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';

export default function AboutRationaleSection() {
    return (
        <SectionContainer background="white" className="relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative z-10">
                {/* Left Column: Text Content */}
                <div className="order-1 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#D4A244] animate-pulse"></span>
                        <span className="text-xs font-extrabold text-[#5B1824] uppercase tracking-widest">Introduction</span>
                    </div>

                    <SectionHeader
                        title="Background & Rationale"
                        centered={false}
                        className="!mb-8"
                    />

                    <div className="prose prose text-slate-700 space-y-6">
                        <p className="text-lg md:text-xl text-slate-900 font-semibold leading-snug">
                            {aboutRationaleContent.mainIntro}
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed text-slate-600">
                            {aboutRationaleContent.aboutConference}
                        </p>
                    </div>
                </div>

                {/* Right Column: Scope Card */}
                <div className="order-2 lg:order-2 lg:sticky lg:top-24">
                    <div className="relative rounded-3xl bg-[#FAF8F5] border border-amber-500/20 shadow-xl overflow-hidden">
                        {/* Header Accent */}
                        <div className="h-2 w-full bg-gradient-to-r from-[#5B1824] via-[#722332] to-[#D4A244]"></div>

                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-[#5B1824] rounded-2xl flex items-center justify-center text-amber-300 shadow-lg border border-[#D4A244]">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#5B1824] tracking-tight leading-none uppercase">
                                        Conference
                                    </h3>
                                    <div className="text-[#8A2E3D] font-bold text-base tracking-wider">SCOPE & VISION</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-700 text-base leading-relaxed font-medium">
                                    {conferenceScope}
                                </p>

                                <div className="pt-8 border-t border-amber-500/20">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Pioneering Fields</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {pioneeringFields.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs font-bold text-[#5B1824] uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative corner element */}
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-2xl"></div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
