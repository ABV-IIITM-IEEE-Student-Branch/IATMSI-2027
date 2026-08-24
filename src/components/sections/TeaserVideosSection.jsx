import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { teaserVideosData } from '../../data/homeData';

export default function TeaserVideosSection() {
    const { title, videos } = teaserVideosData;

    return (
        <SectionContainer dataSource="homeData" id="teaser-videos">
            <SectionHeader title={title} centered={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] text-[#4A121A] rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 shadow-md hover:shadow-xl hover:border-[#C59B27] transition-all flex flex-col group transform hover:-translate-y-1"
                    >
                        {/* Video Player or Thumbnail */}
                        <div className="relative aspect-video bg-black/50 overflow-hidden flex items-center justify-center">
                            <iframe
                                className="w-full h-full"
                                src={video.embedUrl}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Title Bar */}
                        <div className="p-4 md:p-5 text-center bg-[#FAF5EB]/90 border-t border-[#C59B27]/30">
                            <h4 className="text-sm md:text-base font-black text-[#4A121A] tracking-wide uppercase font-heading">
                                {video.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
