import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { teaserVideosData } from '../../data/homeData';

export default function TeaserVideosSection() {
    const { title, videos } = teaserVideosData;

    return (
        <SectionContainer id="teaser-videos">
            <SectionHeader title={title} centered={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="bg-[#4A121A] text-[#FAF5EB] rounded-2xl overflow-hidden border-2 border-[#C59B27] shadow-xl flex flex-col group"
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
                        <div className="p-4 md:p-5 text-center bg-[#360C14]">
                            <h4 className="text-sm md:text-base font-extrabold text-[#F0CB6F] tracking-wide uppercase">
                                {video.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
