import SectionContainer from '../ui/SectionContainer';
import Button from '../ui/Button';
import { ROUTES } from '../../constants/routes';
import { 
    submissionGuidelines, 
    submissionPortalInfo, 
    templateInfo, 
    cameraReadyChecklist, 
    reviewProcess 
} from '../../data/submissionData';
import { siteConfig } from '../../data/siteConfig';
import ReactMarkdown from 'react-markdown';
import React from 'react';

export default function PaperSubmissionSection() {
    return (
        <div className="pt-16 pb-16">
            
            <SectionContainer background="white">
                <div className="max-w-4xl mx-auto px-4 prose prose-slate prose-blue lg:prose mt-8">
                    <h3 className="px-4 py-2 bg-slate-100 rounded-lg inline-block text-xl font-bold font-bold text-slate-900 mb-4">Submission Guidelines</h3>
                    <ul className="text-slate-700 list-disc pl-6">
                        {submissionGuidelines.map((guideline, index) => (
                            <li key={index}>
                                <ReactMarkdown components={{ p: React.Fragment }}>{guideline}</ReactMarkdown>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-8 border-slate-200" />

                    <div className="whitespace-pre-wrap">
                        {submissionPortalInfo.description}
                    </div>

                    <div className="bg-[#FAF8F5] border-l-4 border-[#5B1824] p-6 rounded-r-lg my-8 border border-amber-500/20">
                        <h3 className="text-xl font-black text-[#5B1824] mt-0 mb-4">Submission Portal</h3>
                        <div className="flex items-center gap-4 flex-wrap">
                            <Button href={siteConfig.externalLinks.submissionPortal.url} variant="primary" external>
                                Submit a Paper
                            </Button>
                            <Button to={ROUTES.TRACKS} variant="outline">
                                View Call for Papers
                            </Button>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 my-8">
                        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold font-bold text-slate-900 mt-0 mb-2">IEEE Templates</h3>
                            <p className="text-slate-600 text-sm mb-4">
                                {templateInfo.description}
                            </p>
                            <div className="flex gap-3">
                                <a href={siteConfig.externalLinks.paperTemplate.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#5B1824] hover:text-[#722332] underline decoration-2 underline-offset-4">
                                    Template
                                </a>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold font-bold text-slate-900 mt-0 mb-2">Important Deadlines</h3>
                            <ul className="text-slate-600 text-sm space-y-2 m-0 p-0 list-none">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    <span>Paper Submission: <strong className="text-slate-900">July 31, 2026</strong></span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span>Acceptance Notification: <strong className="text-slate-900">July 31, 2026</strong></span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="px-4 py-2 bg-slate-100 rounded-lg inline-block text-xl font-bold font-bold text-slate-900 mt-8 mb-4">Camera-Ready (After Acceptance)</h3>
                    <div className="not-prose grid gap-4 my-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h4 className="text-lg font-bold font-bold text-slate-900 m-0">Camera-ready checklist</h4>
                            <ul className="mt-3 space-y-2 text-slate-700 list-disc pl-6">
                                {cameraReadyChecklist.map((item, index) => (
                                    <li key={index}>
                                        <ReactMarkdown components={{ p: React.Fragment }}>{item}</ReactMarkdown>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <h4 className="text-lg font-bold font-bold text-slate-900 m-0">PDF eXpress & copyright</h4>
                            <ul className="mt-3 space-y-2 text-slate-700 list-disc pl-6">
                                <li>Validate the final PDF using <a href={siteConfig.externalLinks.pdfExpress.url} target="_blank" rel="noopener noreferrer">IEEE PDF eXpress</a> if required for this conference.</li>
                                <li>Complete the conference electronic copyright form (ECF) via the link provided in CMT after uploading the camera-ready PDF.</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="px-4 py-2 bg-slate-100 rounded-lg inline-block text-xl font-bold font-bold text-slate-900 mt-8 mb-4">Review Process</h3>
                    <div className="whitespace-pre-wrap">
                        {reviewProcess.description}
                    </div>

                    <h3 className="px-4 py-2 bg-slate-100 rounded-lg inline-block text-xl font-bold font-bold text-slate-900 mt-8 mb-4 inline-block">Conference Committee Policies</h3>
                    {reviewProcess.policies.map((policy, index) => (
                        <p key={index}>
                            <ReactMarkdown components={{ p: React.Fragment }}>{policy}</ReactMarkdown>
                        </p>
                    ))}

                    <div className="mt-12 text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-slate-600 mb-4">
                            For any clarifications regarding the paper submission, please contact us.
                        </p>
                        <Button to={ROUTES.CONTACT} variant="outline">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
}
