import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { visaInfo } from '../../data/travelData';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export default function TravelVisaSection() {
    return (
        <>
            

            <SectionContainer background="white">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Welcome */}
                    <div className="prose prose max-w-none text-slate-600">
                        <p className="text-base leading-relaxed">
                            <ReactMarkdown components={{ p: React.Fragment }}>{visaInfo.intro}</ReactMarkdown>
                        </p>
                    </div>

                    {/* Visa Type */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-primary-900">
                            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                                1. Visa Type
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-slate-700 text-base leading-relaxed">
                                You will need to apply for a <strong>Conference Visa</strong> to attend IATMSI-2027. India offers two types of Conference Visas:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {visaInfo.types.map((type, index) => (
                                    <div key={index} className={index === 0 ? "bg-[#FAF8F5] rounded-xl p-6 border border-amber-500/30" : "bg-slate-50 rounded-xl p-6 border border-slate-200"}>
                                        <h3 className={`text-base font-extrabold mb-2 ${index === 0 ? "text-[#5B1824]" : "text-slate-900"}`}>{type.name}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {type.description}
                                        </p>
                                        <a
                                            href={type.eligibility}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#5B1824] hover:text-[#722332] transition-colors"
                                        >
                                            {index === 0 ? "Check Eligibility →" : "Embassy Portal →"}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Documents Required */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-[#5B1824] border-b-2 border-[#D4A244]">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-[#D4A244]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                2. Documents Required
                            </h2>
                        </div>
                        <div className="p-6">
                            <ul className="space-y-4">
                                {visaInfo.requiredDocuments.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-amber-500/20">
                                        <div className="w-8 h-8 bg-[#5B1824] text-amber-300 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 border border-[#D4A244]">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="text-slate-700 text-sm leading-relaxed mt-1 font-medium">
                                                <ReactMarkdown components={{ p: React.Fragment }}>{item}</ReactMarkdown>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Request Visa Letter */}
                    <div className="bg-[#FAF8F5] rounded-2xl shadow-sm border border-amber-500/30 p-8 text-center">
                        <svg className="w-12 h-12 text-[#5B1824] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3 className="text-xl font-extrabold text-[#5B1824] mb-2">Request Your Visa Invitation Letter</h3>
                        <p className="text-slate-700 mb-6 max-w-lg mx-auto leading-relaxed">
                            {visaInfo.invitationLetterInfo}
                        </p>
                        <a
                            href={`mailto:${visaInfo.contactEmail}?subject=Visa Invitation Letter Request - IATMSI-2027`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B1824] hover:bg-[#722332] !text-white font-bold rounded-xl border-b-2 border-[#D4A244] transition-all shadow-md"
                        >
                            <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {visaInfo.contactEmail}
                        </a>
                    </div>

                    {/* How to Apply */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="px-6 py-4 bg-[#5B1824] border-b-2 border-[#D4A244]">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
                                <svg className="w-6 h-6 text-[#D4A244]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                3. How to Apply
                            </h2>
                        </div>
                        <div className="p-6 space-y-8">
                            {/* e-Conference */}
                            <div>
                                <h3 className="font-extrabold text-[#5B1824] text-xl mb-4">For e-Conference Visa (if eligible)</h3>
                                <ol className="space-y-3">
                                    {visaInfo.applicationSteps.map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-7 h-7 bg-amber-500/10 text-[#5B1824] border border-amber-500/30 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                                            <span className="text-slate-700 text-base pt-0.5">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Traditional */}
                            <div>
                                <h3 className="font-bold text-slate-900 text-xl font-bold mb-4">For Traditional Conference Visa</h3>
                                <ol className="space-y-3">
                                    {visaInfo.applicationStepsTraditional.map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="w-7 h-7 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                                            <span className="text-slate-700 text-base pt-0.5">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Processing Times */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-amber-500/30 text-center">
                            <div className="text-base font-black text-[#5B1824] mb-1">{visaInfo.processingTime.split(',')[0].replace(' for e-Conference', '')}</div>
                            <p className="text-slate-600 text-sm font-medium">e-Conference Visa Processing</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                            <div className="text-base font-black text-slate-800 mb-1">{visaInfo.processingTime.split(',')[1].trim().replace(' for Traditional.', '')}</div>
                            <p className="text-slate-600 text-sm font-medium">Traditional Conference Visa Processing</p>
                        </div>
                    </div>

                    {/* Important Note */}
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl">
                        <h3 className="font-bold text-amber-900 text-xl font-bold mb-2">⚠️ Apply Early!</h3>
                        <p className="text-amber-800 text-base leading-relaxed">
                            <ReactMarkdown components={{ p: React.Fragment }}>{visaInfo.warningNote}</ReactMarkdown>
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </>
    );
}
