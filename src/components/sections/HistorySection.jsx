import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { historyOverviewData } from '../../data/historyData';
import { historyLabels } from '../../data/historyData';

export default function HistorySection() {
    const { title, subtitle, ieeeNotice, editions } = historyOverviewData;

    return (
        <div data-weavr-source="historyData" className="space-y-12">
            {/* IEEE Xplore Indexing Banner */}
            <SectionContainer id="history-ieee-notice">
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] rounded-2xl md:rounded-[2rem] p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-md">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722332]/10 border border-[#C59B27]/30 rounded-full">
                                <svg className="w-4 h-4 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs font-black text-[#722332] uppercase tracking-wider">
                                    {historyLabels.indexedInIeeeXploreScopus}
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                                {historyLabels.ieeeXplorePublicationsProceedings}
                            </h3>
                            <p className="text-xs md:text-sm text-neutral-700 font-semibold leading-relaxed max-w-4xl">
                                {ieeeNotice}
                            </p>
                        </div>
                    </div>

                    {/* Quick Link Buttons Row */}
                    <div className="mt-6 pt-6 border-t border-[#C59B27]/30 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {editions.map((ed) => (
                            <a
                                key={ed.year}
                                href={ed.xploreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF5EB] text-[#722332] font-black text-xs rounded-xl border border-[#C59B27]/40 shadow-xs hover:shadow-md transition-all group"
                            >
                                <svg className="w-3.5 h-3.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>IATMSI-{ed.year} Proceedings</span>
                                <svg className="w-3 h-3 text-[#722332] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Individual Edition Detail Sections */}
            {editions.map((ed) => (
                <SectionContainer key={ed.year} id={`history-${ed.year}`}>
                    <div className="space-y-6">
                        {/* Header Row */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#C59B27]/30">
                            <div>
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3 py-1 rounded-full shadow-xs">
                                        {ed.year}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wider text-[#722332] bg-[#722332]/10 px-3 py-1 rounded-full border border-[#C59B27]/30">
                                        {ed.edition}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                                    {ed.title}
                                </h3>
                                <p className="text-xs md:text-sm font-semibold text-neutral-600 mt-1">
                                    {ed.dates} • {ed.location} | <span className="text-[#722332] font-bold">{ed.organizers}</span>
                                </p>
                            </div>

                            {/* Action Buttons: Proceedings (Left) & Photo Gallery (Right) */}
                            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap sm:flex-nowrap md:self-center">
                                <a
                                    href={ed.xploreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#722332] hover:bg-[#5B1824] !text-[#FAF5EB] font-bold text-xs rounded-xl shadow-md border border-[#C59B27]/40 transition-all flex-shrink-0"
                                >
                                    <span>{historyLabels.ieeeXploreProceedings}</span>
                                    <svg className="w-3.5 h-3.5 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>

                                {ed.galleryUrl && (
                                    <a
                                        href={ed.galleryUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#FAF5EB] !text-[#722332] font-bold text-xs rounded-xl shadow-xs border border-[#C59B27]/40 transition-all flex-shrink-0"
                                    >
                                        <svg className="w-3.5 h-3.5 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{historyLabels.photoGallery}</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Stat Chips Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {ed.stats.map((s, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-3.5 rounded-xl border border-[#C59B27]/30 text-center flex flex-col justify-center">
                                    <span className="text-xl md:text-2xl font-black text-[#722332] font-mono block">
                                        {s.value}
                                    </span>
                                    <span className="text-[11px] font-black text-[#4A121A] uppercase tracking-wider block mt-0.5 leading-tight">
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Paragraphs */}
                        <div className="space-y-4 text-neutral-800 text-sm md:text-base leading-relaxed">
                            {ed.description.map((para, i) => (
                                <p key={i} className="font-medium text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Tracks */}
                        <div className="bg-[#FAF5EB] rounded-2xl p-5 md:p-6 border border-[#C59B27]/30">
                            <h4 className="text-xs md:text-sm font-black text-[#722332] uppercase tracking-wider mb-4">
                                Conference Tracks ({ed.year})
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {ed.tracks.map((tr, tIdx) => (
                                    <div key={tIdx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#C59B27]/20 text-xs md:text-sm font-bold text-neutral-800">
                                        <span className="w-6 h-6 rounded-lg bg-[#722332] text-[#FAF5EB] flex items-center justify-center flex-shrink-0 text-xs font-black">
                                            {tIdx + 1}
                                        </span>
                                        <span>{tr}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SectionContainer>
            ))}
        </div>
    );
}
