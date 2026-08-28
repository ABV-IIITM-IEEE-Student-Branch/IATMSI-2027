import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { posterGuidelinesData } from '../../data/posterGuidelinesData';
import { posterGuidelinesLabels } from '../../data/posterGuidelinesData';

export default function PosterGuidelinesSection() {
    const {
        title,
        subtitle,
        downloadTemplateUrl,
        dimensions,
        paragraphs,
        designRules,
        authorTips,
    } = posterGuidelinesData;

    return (
        <SectionContainer dataSource="posterGuidelinesData" id="poster-guidelines-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* Poster Template Download & Board Dimensions */}
            <div className="bg-white rounded-2xl p-4 md:p-5 border-2 border-[#C59B27]/40 shadow-sm mb-8 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#C59B27]/30 pb-3">
                    <div>
                        <h3 className="text-base md:text-lg font-black text-[#4A121A] font-heading tracking-wide uppercase">
                            {posterGuidelinesLabels.officialPosterTemplateDimensions}
                        </h3>
                        <p className="text-xs text-neutral-600 font-semibold mt-0.5">
                            {dimensions.note}
                        </p>
                    </div>

                    <a
                        href={downloadTemplateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-3.5 py-2 rounded-lg text-xs font-black uppercase tracking-wider border border-[#C59B27] shadow-xs transition-all self-start md:self-auto flex-shrink-0"
                    >
                        <span>{posterGuidelinesLabels.downloadPosterTemplatePptx}</span>
                        <svg className="w-3.5 h-3.5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>

                {/* Dimensions Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {posterGuidelinesLabels.maximumWidth}
                        </span>
                        <span className="text-base md:text-lg font-black text-[#722332] mt-0.5 block">
                            {dimensions.width}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {posterGuidelinesLabels.maximumHeight}
                        </span>
                        <span className="text-base md:text-lg font-black text-[#4A121A] mt-0.5 block">
                            {dimensions.height}
                        </span>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-2.5 md:p-3 rounded-lg border border-[#C59B27]/40 text-center">
                        <span className="text-[10px] md:text-xs font-black uppercase text-neutral-600 tracking-wider block">
                            {posterGuidelinesLabels.boardFormat}
                        </span>
                        <span className="text-base md:text-lg font-black text-[#722332] mt-0.5 block">
                            {dimensions.format}
                        </span>
                    </div>
                </div>
            </div>

            {/* Standby Requirement & Defense Policy Box */}
            <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border-l-4 border-amber-600 border-y border-r border-amber-200 shadow-sm mb-10 space-y-4 text-amber-950">
                <h4 className="text-lg md:text-xl font-black text-amber-900 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {posterGuidelinesLabels.posterDefenseStandbyRequirement}
                </h4>
                <div className="space-y-3 text-xs md:text-sm font-medium leading-relaxed">
                    <p>{paragraphs[0]}</p>
                    <p>{paragraphs[1]}</p>
                    <p className="font-bold text-amber-900">{paragraphs[2]}</p>
                    <p className="italic">{paragraphs[3]}</p>
                </div>
            </div>

            {/* Design & Legibility Guidelines */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {posterGuidelinesLabels.designLegibilitySpecifications}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {designRules.map((rule, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40">
                            <span className="text-xs font-black uppercase tracking-wider text-[#722332] bg-white px-2.5 py-0.5 rounded-full border border-[#C59B27]/30 inline-block mb-2">
                                {rule.title}
                            </span>
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {rule.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Author Preparation & Networking Tips */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4">
                    {posterGuidelinesLabels.preparationNetworkingRecommendations}
                </h3>

                <div className="space-y-3">
                    {authorTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-[#FAF5EB] to-white p-4 rounded-xl border border-[#C59B27]/30">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                                {tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
