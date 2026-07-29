import { reviewerInfo } from '../../data/reviewerData';
import { siteConfig } from '../../data/siteConfig';

export default function CallForReviewersSection() {
    return (
        <div className="bg-neutral-50 pb-16 min-h-screen">
            <section className="py-12 md:py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
                        <div className="bg-[#5B1824] px-6 py-8 text-center border-b-2 border-[#D4A244]">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Call for Reviewers</h2>
                            <p className="text-amber-100 text-base">({reviewerInfo.intro})</p>
                        </div>
                        
                        <div className="px-6 py-8 sm:p-10 bg-[#FAF8F5]">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5B1824] mb-1">Who can apply?</h3>
                                        <p className="text-neutral-700 text-base leading-relaxed">
                                            {reviewerInfo.whoCanApply.join(' ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#5B1824] mb-1">How to apply?</h3>
                                        <p className="text-neutral-700 text-base leading-relaxed">
                                            Interested researchers and experts can submit their application through our official Google Form.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="my-8 border-neutral-200" />
                            
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl font-bold text-[#5B1824] mb-4 flex items-center justify-center gap-2">
                                   <span className="text-base">👉</span> Apply via {siteConfig.externalLinks.reviewerForm.name}
                                </h3>
                                <a 
                                    href={siteConfig.externalLinks.reviewerForm.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-8 py-3.5 border-b-2 border-[#D4A244] rounded-xl shadow-md text-base font-bold !text-white bg-[#5B1824] hover:bg-[#722332] transition-all transform hover:scale-105 w-full sm:w-auto text-center"
                                >
                                    Submit Application Here
                                </a>
                                <p className="mt-4 text-sm text-neutral-500 font-medium break-all">
                                    {siteConfig.externalLinks.reviewerForm.url}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
