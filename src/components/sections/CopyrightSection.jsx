import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { copyrightData } from '../../data/copyrightData';

function SampleImagePlaceholder({ title, description }) {
    return (
        <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] border-2 border-dashed border-[#C59B27]/60 shadow-xs text-center flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#722332]/10 text-[#722332] flex items-center justify-center border border-[#C59B27]/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#722332] bg-white px-3.5 py-1 rounded-full border border-[#C59B27]/40 shadow-2xs">
                {title}
            </span>
            <p className="text-xs text-neutral-600 font-semibold max-w-md">
                {description}
            </p>
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

                {/* Step 1 Paragraph */}
                <div className="space-y-4 text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 font-semibold text-[#4A121A]">
                        {paragraphs[0]}
                    </p>

                    {/* Sample Image 1 */}
                    <SampleImagePlaceholder title={sampleImages[0].title} description={sampleImages[0].description} />

                    {/* Step 2 Paragraph */}
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 font-semibold text-[#4A121A]">
                        {paragraphs[1]}
                    </p>

                    {/* Sample Images 2 through 12 */}
                    <div className="space-y-4 pt-2">
                        {sampleImages.slice(1).map((img) => (
                            <SampleImagePlaceholder
                                key={img.id}
                                title={img.id === 11 ? "Sample Image 11: (Enter Your Name same as mentioned in the paper)" : img.title}
                                description={img.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
