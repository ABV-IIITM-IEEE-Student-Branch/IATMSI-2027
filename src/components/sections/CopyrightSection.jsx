import { useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { copyrightData } from '../../data/copyrightData';

function SampleImageCard({ img }) {
    const [imageError, setImageError] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    const displayTitle = img.id === 11 
        ? "Sample Image 11: (Enter Your Name same as mentioned in the paper)" 
        : img.title;

    return (
        <div className="my-6 p-4 md:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] border-2 border-[#C59B27]/40 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C59B27]/30 pb-3">
                <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#722332] text-white flex items-center justify-center text-xs font-black">
                        {img.id}
                    </span>
                    <h4 className="text-sm md:text-base font-black text-[#4A121A]">
                        {displayTitle}
                    </h4>
                </div>
                <a
                    href={img.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722332] hover:underline self-start sm:self-auto bg-white px-3 py-1 rounded-lg border border-[#C59B27]/40"
                >
                    <span>Open in Drive</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            <p className="text-xs md:text-sm text-neutral-700 font-medium">
                {img.description}
            </p>

            {/* Image Preview Container */}
            <div className="relative group overflow-hidden rounded-xl border border-[#C59B27]/30 bg-white p-2 flex justify-center">
                {!imageError ? (
                    <img
                        src={img.imageUrl}
                        alt={img.title}
                        onError={() => setImageError(true)}
                        onClick={() => setIsZoomed(true)}
                        className="max-h-[500px] w-auto object-contain rounded-lg cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                    />
                ) : (
                    <div className="p-8 text-center space-y-3">
                        <p className="text-xs text-neutral-600 font-semibold">
                            Image preview requires Google Drive permission or direct access.
                        </p>
                        <a
                            href={img.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider"
                        >
                            <span>Click Here to View {img.title} on Google Drive</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {isZoomed && !imageError && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
                    onClick={() => setIsZoomed(false)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] bg-white p-4 rounded-2xl shadow-2xl overflow-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200">
                            <span className="text-sm font-black text-[#4A121A]">{displayTitle}</span>
                            <button
                                onClick={() => setIsZoomed(false)}
                                className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-800 font-bold flex items-center justify-center hover:bg-neutral-200"
                            >
                                ✕
                            </button>
                        </div>
                        <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CopyrightSection() {
    const { title, subtitle, paragraphs, sampleImages } = copyrightData;

    return (
        <SectionContainer id="copyright-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    IEEE e-Copyright Submission Procedure
                </h3>

                {/* Step 1 Paragraph & Image 1 */}
                <div className="space-y-6 text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 font-semibold text-[#4A121A]">
                        {paragraphs[0]}
                    </p>

                    {/* Sample Image 1 */}
                    {sampleImages[0] && <SampleImageCard img={sampleImages[0]} />}

                    {/* Step 2 Paragraph */}
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 font-semibold text-[#4A121A]">
                        {paragraphs[1]}
                    </p>

                    {/* Sample Images 2 through 12 */}
                    <div className="space-y-6 pt-2">
                        {sampleImages.slice(1).map((img) => (
                            <SampleImageCard key={img.id} img={img} />
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
