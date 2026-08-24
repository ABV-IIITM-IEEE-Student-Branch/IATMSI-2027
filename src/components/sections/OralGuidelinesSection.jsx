import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { oralGuidelinesData } from '../../data/oralGuidelinesData';

export default function OralGuidelinesSection() {
    const {
        title,
        subtitle,
        downloadTemplateUrl,
        timeAllotment,
        paragraphs,
        structureElements,
        goldenRuleNote,
    } = oralGuidelinesData;

    return (
        <SectionContainer id="oral-guidelines-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* Template Download CTA & Time Allotment Grid */}
            <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-[#C59B27]/40 shadow-sm mb-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#C59B27]/30 pb-3">
                    <div>
                        <h3 className="text-base md:text-lg font-black text-[#4A121A] font-heading tracking-wide uppercase flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332]" />
                            Official Presentation Template
                        </h3>
                        <p className="text-xs text-neutral-600 font-semibold mt-0.5">
                            {timeAllotment.note}
                        </p>
                    </div>

                    <a
                        href={downloadTemplateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>Download Presentation Format (.pptx)</span>
                        <svg className="w-3.5 h-3.5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                {/* Time Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            Total Allotted Time
                        </span>
                        <span className="text-base md:text-lg font-black text-[#722332] mt-0.5 block">
                            {timeAllotment.totalTime}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            Presentation Speech
                        </span>
                        <span className="text-base md:text-lg font-black text-[#4A121A] mt-0.5 block">
                            {timeAllotment.presentationTime}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            Live Q&A Discussion
                        </span>
                        <span className="text-base md:text-lg font-black text-[#722332] mt-0.5 block">
                            {timeAllotment.qaTime}
                        </span>
                    </div>
                </div>
            </div>

            {/* Strict Time Limit & Schedule Adherence Warning */}
            <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border-l-4 border-amber-600 border-y border-r border-amber-200 shadow-sm mb-10 space-y-4 text-amber-950">
                <h4 className="text-lg md:text-xl font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Strict Time Management & Schedule Adherence
                </h4>
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                    {paragraphs[0]}
                </p>
            </div>

            {/* Live Presentation Mode & IEEE Xplore Requirement */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-4">
                <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wider flex items-center gap-3 border-b border-[#C59B27]/30 pb-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    Live Presentation & IEEE Xplore Policy
                </h3>
                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {paragraphs[1]}
                </p>
            </div>

            {/* Recommended Presentation Structure & Slide Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Structure Elements */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                    <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                        Recommended Slide Structure
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                        {paragraphs[2]}
                    </p>
                    <ul className="space-y-2 pt-2">
                        {structureElements.map((elem, idx) => (
                            <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-[#4A121A] bg-gradient-to-r from-[#FAF5EB] to-white p-2.5 rounded-lg border border-[#C59B27]/30">
                                <span className="w-2 h-2 rounded-full bg-[#722332]" />
                                {elem}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Slide Preparation Guidelines */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                            Slide Design & Pace Guidelines
                        </h3>
                        <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed mt-4">
                            {paragraphs[3]}
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40">
                        <span className="text-xs font-black uppercase tracking-wider text-[#722332] block mb-1">
                            Golden Rule of Thumb
                        </span>
                        <p className="text-xs text-neutral-700 font-semibold">
                            {goldenRuleNote}
                        </p>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
