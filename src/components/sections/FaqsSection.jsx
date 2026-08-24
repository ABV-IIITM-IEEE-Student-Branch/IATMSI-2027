import { useState } from 'react';
import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { faqsData } from '../../data/faqsData';
import { faqsLabels } from '../../data/faqsData';

export default function FaqsSection() {
    const { title, subtitle, categories, faqs } = faqsData;

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState(1); // Default open first question

    const toggleFaq = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    // Filter FAQs by category & search query
    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <SectionContainer id="faqs-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-8">
                
                {/* Search Bar & Category Filters */}
                <div className="space-y-4">
                    {/* Search Input */}
                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search questions or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#FFFDF9] text-neutral-800 pl-11 pr-4 py-3 rounded-xl border border-[#C59B27]/40 focus:border-[#722332] focus:ring-2 focus:ring-[#722332]/20 focus:outline-none text-xs md:text-sm font-medium transition-all shadow-2xs"
                        />
                        <svg className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                                    activeCategory === cat.id
                                        ? 'bg-[#722332] !text-[#FAF5EB] border-[#C59B27] shadow-sm'
                                        : 'bg-[#FAF5EB] text-neutral-700 hover:bg-[#F5EBDC] border-[#C59B27]/30'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Interactive Accordion List */}
                <div className="space-y-4 max-w-4xl mx-auto">
                    {filteredFaqs.length === 0 ? (
                        <div className="bg-[#FAF5EB] p-8 rounded-xl border border-[#C59B27]/30 text-center text-xs md:text-sm font-bold text-neutral-600">
                            {faqsLabels.noMatchingQuestionsFoundTryAdjusting}
                        </div>
                    ) : (
                        filteredFaqs.map((faq) => {
                            const isOpen = expandedId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                        isOpen
                                            ? 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] border-2 border-[#C59B27] shadow-md'
                                            : 'bg-white border-[#C59B27]/30 hover:border-[#C59B27]/60 shadow-2xs'
                                    }`}
                                >
                                    {/* Question Header (Click to Toggle) */}
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="w-6 h-6 rounded-full bg-[#722332]/10 text-[#722332] text-xs font-black flex items-center justify-center mt-0.5 flex-shrink-0">
                                                Q
                                            </span>
                                            <h4 className="text-sm md:text-base font-black text-[#4A121A] leading-snug">
                                                {faq.question}
                                            </h4>
                                        </div>

                                        {/* Toggle Icon */}
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'bg-[#722332] text-white rotate-180' : 'bg-[#FAF5EB] text-[#722332] border border-[#C59B27]/40'
                                        }`}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M20 12H4" : "M12 4v16m8-8H4"} />
                                            </svg>
                                        </span>
                                    </button>

                                    {/* Answer Body (Collapsible) */}
                                    {isOpen && (
                                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed border-t border-[#C59B27]/20">
                                            <div className="flex items-start gap-3">
                                                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    A
                                                </span>
                                                <div className="space-y-2 font-semibold">
                                                    {faq.answer.split('\n').map((line, lIdx) => (
                                                        <p key={lIdx}>
                                                            {line.includes('http') ? (
                                                                <>
                                                                    {line.split(/(https?:\/\/[^\s]+)/g).map((part, pIdx) =>
                                                                        part.match(/^https?:\/\//) ? (
                                                                            <a
                                                                                key={pIdx}
                                                                                href={part}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-[#722332] underline hover:text-[#5B1824] break-all font-bold"
                                                                            >
                                                                                {part}
                                                                            </a>
                                                                        ) : (
                                                                            part
                                                                        )
                                                                    )}
                                                                </>
                                                            ) : (
                                                                line
                                                            )}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </SectionContainer>
    );
}
