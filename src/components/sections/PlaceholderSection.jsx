import { Link } from 'react-router-dom';
import { placeholderLabels } from '../../data/siteConfig';
import { ROUTES } from '../../constants/routes';

export default function PlaceholderSection({ title }) {
    return (
        <section data-weavr-source="siteConfig" className="py-20 min-h-[45vh] flex items-center justify-center">
            <div className="max-w-xl mx-auto px-4 text-center">
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-8 md:p-10 rounded-3xl shadow-xl border-2 border-[#C59B27]/40 relative overflow-hidden">
                    {/* Soft Decorative Glow */}
                    <div className="w-24 h-24 bg-[#C59B27]/10 rounded-full blur-2xl absolute -top-4 -right-4 pointer-events-none" />
                    
                    {/* Luminous Icon Badge */}
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white border-2 border-[#C59B27]/40 shadow-md flex items-center justify-center text-[#722332]">
                        <svg className="w-8 h-8 text-[#C59B27]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>

                    {/* Soft Category Badge */}
                    <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest text-[#722332] bg-white px-3.5 py-1 rounded-full border border-[#C59B27]/30 shadow-2xs mb-3">
                        {placeholderLabels.badge}
                    </span>

                    {/* Heading */}
                    <h2 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase mb-2.5">
                        {title ? `${title} — ${placeholderLabels.contentComingSoon}` : placeholderLabels.contentComingSoon}
                    </h2>

                    {/* Short, Soft Message */}
                    <p className="text-neutral-700 font-medium text-sm md:text-base leading-relaxed max-w-md mx-auto mb-6">
                        {placeholderLabels.shortMessage}
                    </p>

                    {/* Clean Action Button */}
                    <Link
                        to={ROUTES.HOME}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#722332] hover:bg-[#5B1824] !text-[#FAF5EB] font-bold text-xs md:text-sm rounded-xl border border-[#C59B27] shadow-md transition-all transform hover:-translate-y-0.5 uppercase tracking-wider"
                    >
                        <span>{placeholderLabels.backToHome}</span>
                        <svg className="w-4 h-4 text-[#F0CB6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
