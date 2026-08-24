import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { aboutPageData } from '../../data/conferenceData';
import { aboutFullLabels } from '../../data/conferenceData';

function renderFormattedText(text) {
    if (!text) return null;
    // Highlight key statistics and important terms
    const highlights = aboutPageData.highlightTerms;

    let formatted = text;
    highlights.forEach(term => {
        if (formatted.includes(term)) {
            formatted = formatted.replaceAll(term, `__STRONG__${term}__STRONG__`);
        }
    });

    const parts = formatted.split(/(__STRONG__.*?__STRONG__)/g);
    return parts.map((part, index) => {
        if (part.startsWith('__STRONG__') && part.endsWith('__STRONG__')) {
            return (
                <strong key={index} className="font-black text-[#4A121A]">
                    {part.slice(10, -10)}
                </strong>
            );
        }
        return part;
    });
}

export default function AboutFullSection() {
    const { stats, iatmsi, aboutIEEE, mpSection, nepalSection } = aboutPageData;

    return (
        <div className="space-y-12">
            {/* 1. Detailed IATMSI-2027 Conference Section */}
            <SectionContainer id="about-iatmsi">
                <SectionHeader title={iatmsi.title} centered={true} />

                {/* Integrated 4 Stat Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-6 rounded-2xl border-2 border-[#C59B27]/40 shadow-sm text-center transform hover:-translate-y-1 transition-all"
                        >
                            <span className="text-2xl md:text-4xl font-black text-[#722332] font-mono block">
                                {stat.value}
                            </span>
                            <span className="text-xs font-black text-[#4A121A] uppercase tracking-wider block mt-1">
                                {stat.label}
                            </span>
                            <span className="text-[11px] font-semibold text-neutral-600 block mt-1 leading-snug">
                                {stat.description}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="space-y-6 text-neutral-800 text-sm md:text-base leading-relaxed">
                    {/* Paragraph 1 */}
                    <p className="font-medium text-justify">
                        {renderFormattedText(iatmsi.paragraphs[0])}
                    </p>

                    {/* Paragraph 2 */}
                    <p className="font-medium text-justify">
                        {renderFormattedText(iatmsi.paragraphs[1])}
                    </p>

                    {/* Paragraph 3 (Statistics & Success Callout Box) */}
                    <div className="bg-[#FAF5EB] rounded-2xl p-6 md:p-8 border-l-4 border-[#722332] border-y border-r border-[#C59B27]/40 shadow-sm my-6">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-black uppercase tracking-widest text-[#722332] bg-[#722332]/10 px-3 py-1 rounded-full border border-[#C59B27]/30">
                                {aboutFullLabels.conferenceHeritageImpact}
                            </span>
                        </div>
                        <p className="font-medium text-justify text-neutral-900 leading-relaxed">
                            {renderFormattedText(iatmsi.paragraphs[2])}
                        </p>
                    </div>

                    {/* Paragraph 4 */}
                    <p className="font-medium text-justify">
                        {renderFormattedText(iatmsi.paragraphs[3])}
                    </p>

                    {/* Broad Thematic Tracks Box */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-md my-8">
                        <h4 className="text-base md:text-lg font-black text-[#4A121A] uppercase tracking-wide mb-6 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#722332]" />
                            {iatmsi.tracksTitle}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {iatmsi.thematicTracks.map((track, index) => (
                                <li key={index} className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-[#C59B27]/30 shadow-xs hover:border-[#C59B27] transition-all">
                                    <span className="w-7 h-7 rounded-lg bg-[#722332] text-[#FAF5EB] flex items-center justify-center flex-shrink-0 text-xs font-black mt-0.5 shadow-xs">
                                        {index + 1}
                                    </span>
                                    <span className="text-xs md:text-sm font-bold text-neutral-800 leading-snug">
                                        {track}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Paragraph 5 (Theme & Venue Highlight) */}
                    <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#C59B27]/40 shadow-sm leading-relaxed text-justify">
                        <p className="font-medium">
                            {renderFormattedText(iatmsi.closingParagraph)}
                        </p>
                    </div>
                </div>
            </SectionContainer>

            {/* 3. About IEEE Section */}
            <SectionContainer id="about-ieee">
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl md:rounded-[2rem] p-6 md:p-10 border-2 border-[#C59B27]/40 shadow-md relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#C59B27]/30">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-[#722332] bg-[#722332]/10 px-3.5 py-1 rounded-full border border-[#C59B27]/30 inline-block mb-2">
                                {aboutFullLabels.globalTechnicalCommunity}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                                {aboutIEEE.title}
                            </h3>
                            <p className="text-sm font-bold text-[#722332] italic mt-0.5">
                                "{aboutIEEE.tagline}"
                            </p>
                        </div>
                        <a
                            href={aboutIEEE.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#722332] hover:bg-[#5B1824] !text-[#FAF5EB] font-bold text-xs md:text-sm rounded-xl shadow-md border border-[#C59B27]/40 transition-all self-start md:self-auto"
                        >
                            <span>{aboutIEEE.linkLabel}</span>
                            <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    <div className="space-y-4 text-neutral-800 text-sm md:text-base leading-relaxed">
                        {aboutIEEE.paragraphs.map((para, idx) => (
                            <p key={idx} className="font-medium text-justify">
                                {renderFormattedText(para)}
                            </p>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* 4. Co-Organizing Sections: IEEE MP Section & IEEE Nepal Section */}
            <SectionContainer id="about-sections">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* IEEE Madhya Pradesh Section */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide font-heading">
                                    {mpSection.title}
                                </h3>
                            </div>

                            {/* Stats Chips */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {mpSection.stats.map((s, i) => (
                                    <div key={i} className="bg-[#FAF5EB] px-3.5 py-1.5 rounded-xl border border-[#C59B27]/30 text-xs font-extrabold text-[#722332]">
                                        <span className="text-sm font-black mr-1.5">{s.value}</span>
                                        <span className="text-neutral-700">{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-neutral-700 text-xs md:text-sm leading-relaxed mb-6">
                                {mpSection.paragraphs.map((p, i) => (
                                    <p key={i} className="font-medium text-justify">
                                        {renderFormattedText(p)}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-100">
                            <a
                                href={mpSection.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-black text-[#722332] hover:text-[#4A121A] transition-colors uppercase tracking-wider"
                            >
                                <span>{mpSection.linkLabel}</span>
                                <svg className="w-4 h-4 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* IEEE Nepal Section */}
                    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-2 mb-4">
                                <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wide font-heading">
                                    {nepalSection.title}
                                </h3>
                                <span className="text-[11px] font-black uppercase tracking-wider text-[#722332] bg-[#722332]/10 px-2.5 py-1 rounded-full border border-[#C59B27]/30 flex-shrink-0">
                                    {nepalSection.badge}
                                </span>
                            </div>

                            {/* Timeline Chips */}
                            <div className="space-y-2 mb-6">
                                {nepalSection.timeline.map((t, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-[#FAF5EB] p-2.5 rounded-xl border border-[#C59B27]/30 text-xs">
                                        <span className="font-black text-[#722332] bg-white px-2 py-0.5 rounded border border-[#C59B27]/20">
                                            {t.year}
                                        </span>
                                        <span className="font-bold text-neutral-800">{t.event}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 text-neutral-700 text-xs md:text-sm leading-relaxed mb-6">
                                {nepalSection.paragraphs.map((p, i) => (
                                    <p key={i} className="font-medium text-justify">
                                        {renderFormattedText(p)}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
}
