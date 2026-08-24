import { Link } from 'react-router-dom';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { awardsContestData } from '../../data/homeData';
import { awardsContestLabels } from '../../data/homeData';

export default function AwardsContestSection() {
    const { title, subtitle, items } = awardsContestData;

    return (
        <SectionContainer id="awards-contests">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, idx) => (
                    <div
                        key={item.id}
                        className={`bg-white rounded-2xl p-6 border border-[#C59B27]/40 shadow-sm hover:shadow-xl hover:border-[#C59B27] transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 ${
                            idx === items.length - 1 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                        }`}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl bg-[#722332]/10 border border-[#C59B27]/30 text-[#722332] flex items-center justify-center flex-shrink-0 group-hover:bg-[#722332] group-hover:text-[#F0CB6F] transition-all duration-300 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-extrabold !text-[#722332] bg-[#FAF5EB] px-3 py-1 rounded-full border border-[#C59B27]/30 uppercase tracking-wider shadow-xs">
                                    {item.badge}
                                </span>
                            </div>

                            <h4 className="text-base font-extrabold text-[#4A121A] group-hover:text-[#722332] leading-snug transition-colors">
                                {item.title}
                            </h4>
                        </div>

                        <div className="pt-4 mt-4 border-t border-neutral-100">
                            <Link
                                to={item.path}
                                className="inline-flex items-center justify-between w-full text-xs font-bold !text-[#722332] hover:!text-[#4A121A] transition-colors"
                            >
                                <span>{awardsContestLabels.forDetailsClickHere}</span>
                                <svg className="w-4 h-4 text-[#722332] transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>
    );
}
