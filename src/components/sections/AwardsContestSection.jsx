import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { awardsContestData } from '../../data/homeData';

export default function AwardsContestSection() {
    const { title, subtitle, items } = awardsContestData;

    return (
        <SectionContainer id="awards-contests">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#FAF5EB] rounded-2xl p-5 border border-[#C59B27]/40 shadow-sm hover:shadow-md hover:border-[#C59B27] transition-all flex flex-col justify-between group"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-xl">🏆</span>
                                <span className="text-[10px] font-extrabold text-[#722332] bg-white px-2.5 py-1 rounded-full border border-[#C59B27]/30 uppercase tracking-wider">
                                    {item.badge}
                                </span>
                            </div>

                            <h4 className="text-sm md:text-base font-extrabold text-[#4A121A] leading-snug">
                                {item.title}
                            </h4>
                        </div>

                        <div className="pt-4 mt-3 border-t border-[#C59B27]/20">
                            <Link
                                to={item.path}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#722332] hover:text-[#4A121A] transition-colors"
                            >
                                <span>For Details: Click here</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
