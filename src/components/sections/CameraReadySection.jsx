import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { cameraReadyData } from '../../data/cameraReadyData';
import { siteConfig } from '../../data/siteConfig';
import { cameraReadyLabels } from '../../data/cameraReadyData';

function SampleImageCard({ title, imageUrl }) {
    if (!imageUrl) return null;

    return (
        <div data-weavr-source="cameraReadyData siteConfig" className="my-6 p-4 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] border border-[#C59B27]/50 shadow-sm text-center flex flex-col items-center justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#722332] bg-white px-3.5 py-1 rounded-full border border-[#C59B27]/40 shadow-2xs mb-3">
                {title}
            </span>
            <div className="overflow-hidden rounded-xl border border-[#C59B27]/30 shadow-md bg-white p-2 w-full max-w-3xl">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-contain rounded-lg max-h-[550px] mx-auto"
                    loading="lazy"
                />
            </div>
        </div>
    );
}

export default function CameraReadySection() {
    const {
        title,
        subtitle,
        importantDates,
        howToSubmitText,
        copyrightSection,
        pdfExpressSection,
        sampleImages,
        registrationFormUrl,
        conferenceIdCmt,
    } = cameraReadyData;

    return (
        <SectionContainer id="camera-ready-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Important Dates Simple Table */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 overflow-hidden">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase mb-6 flex items-center gap-3 border-b border-[#C59B27]/30 pb-4">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {cameraReadyLabels.importantDates}
                </h3>

                <div className="overflow-x-auto rounded-xl border border-[#C59B27]/40">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#FAF5EB] via-[#F5EBDC] to-[#FAF5EB] text-[#722332] border-b-2 border-[#C59B27]">
                                <th className="p-4 text-xs md:text-sm font-black uppercase tracking-wider border-r border-[#C59B27]/30 text-[#722332] bg-[#FAF5EB]">
                                    {cameraReadyLabels.activityEvent}
                                </th>
                                <th className="p-4 text-xs md:text-sm font-black uppercase tracking-wider text-[#722332] bg-[#FAF5EB]">
                                    {cameraReadyLabels.date}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#C59B27]/20 text-xs md:text-sm text-neutral-800 font-medium">
                            {importantDates.map((item, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-[#FFFDF9]' : 'bg-[#FAF5EB]/60 hover:bg-[#FAF5EB]'}>
                                    <td className="p-4 font-bold text-[#4A121A] border-r border-[#C59B27]/20">
                                        {item.activity}
                                    </td>
                                    <td className="p-4 font-black text-[#722332]">
                                        {item.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 2. How to Submit the camera-ready paper? */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {cameraReadyLabels.howToSubmitTheCameraReady}
                </h3>

                <div className="space-y-4 text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
                    <p>{howToSubmitText[0]}</p>
                    <p>{howToSubmitText[1]}</p>
                    
                    {/* Google Form Link Card */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        <p className="mb-3">{howToSubmitText[2]}</p>
                        <a
                            href={registrationFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-4 py-2 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] transition-all shadow-sm"
                        >
                            <span className="!text-[#FAF5EB]">{cameraReadyLabels.registrationDetailsGoogleForm}</span>
                            <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>

                    {/* Plagiarism Warning Box */}
                    <div className="bg-amber-50 p-4 md:p-5 rounded-xl border-l-4 border-amber-600 border-y border-r border-amber-200 text-amber-950">
                        <p className="font-semibold">{howToSubmitText[3]}</p>
                    </div>

                    {/* IEEE Template Link */}
                    <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        <p className="mb-3">{howToSubmitText[4]}</p>
                        <a
                            href={siteConfig.externalLinks.paperTemplate.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white !text-[#722332] hover:bg-[#FAF5EB] px-4 py-2 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] transition-all"
                        >
                            <span className="!text-[#722332]">{cameraReadyLabels.ieeeConferenceTemplates}</span>
                            <svg className="w-4 h-4 !text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </a>
                    </div>

                    <p>{howToSubmitText[5]}</p>
                </div>

                {/* Sample Image 1 */}
                <SampleImageCard title="Sample Image 1" imageUrl={sampleImages.sample1} />
            </div>

            {/* 3. Instructions for Authors to Create Final PDF for IATMSI-2027 Submission */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {copyrightSection.heading}
                </h3>

                <h4 className="text-base font-black text-[#722332] uppercase tracking-wider">
                    {copyrightSection.subheading}
                </h4>

                <div className="space-y-3 text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
                    {copyrightSection.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                    ))}
                </div>

                {/* Copyright Clearance Codes List */}
                <div className="space-y-4 pt-2">
                    <h5 className="text-sm font-black text-[#4A121A] uppercase tracking-wider">
                        {cameraReadyLabels.copyrightClearanceCodeNotices}
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {copyrightSection.notices.map((notice, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40">
                                <span className="text-xs font-bold text-[#722332] block mb-2">
                                    {notice.label}
                                </span>
                                <code className="text-xs font-mono bg-white text-[#4A121A] p-2.5 rounded-lg border border-[#C59B27]/30 block select-all font-black">
                                    {notice.code}
                                </code>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sample Image 2 */}
                <SampleImageCard title="Sample Image 2" imageUrl={sampleImages.sample2} />
            </div>

            {/* 4. IEEE PDF eXpress Detailed Steps */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {cameraReadyLabels.ieeePdfExpressInstructions}
                </h3>

                <p className="text-sm md:text-base text-neutral-700 font-medium leading-relaxed">
                    {pdfExpressSection.intro}
                </p>

                {/* Account Creation Block */}
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                    <h4 className="text-base font-black text-[#722332] uppercase tracking-wider">
                        {pdfExpressSection.accountCreationTitle}
                    </h4>
                    <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                        1. {pdfExpressSection.accountCreationSteps[0]}
                    </p>

                    {/* Sample Image 3 */}
                    <SampleImageCard title="Sample Image 3" imageUrl={sampleImages.sample3} />

                    <div className="bg-white p-4 rounded-xl border border-[#C59B27]/30 space-y-2 text-xs md:text-sm text-neutral-800">
                        <p className="font-bold text-[#4A121A]">{cameraReadyLabels.enterTheFollowing}</p>
                        <ul className="list-disc list-inside space-y-1 text-neutral-700">
                            <li><strong className="text-[#722332]">{conferenceIdCmt}</strong> for the Conference ID (Conference ID for IEEE IATMSI)</li>
                            <li>{cameraReadyLabels.yourEmailAddress}</li>
                            <li>{cameraReadyLabels.aPassword}</li>
                        </ul>
                    </div>

                    <p className="text-xs md:text-sm text-neutral-700 font-medium">
                        2. {pdfExpressSection.accountCreationSteps[2]}
                    </p>
                    <p className="text-xs md:text-sm text-neutral-700 font-medium">
                        3. {pdfExpressSection.accountCreationSteps[3]}
                    </p>

                    <p className="text-xs md:text-sm font-semibold text-[#4A121A] pt-2">
                        {pdfExpressSection.afterVerificationText}
                    </p>
                </div>

                {/* Next Step Section */}
                <div className="space-y-4 pt-4">
                    <h4 className="text-base font-black text-[#722332] uppercase tracking-wider border-b border-[#C59B27]/30 pb-2">
                        {pdfExpressSection.nextStepTitle}
                    </h4>

                    {/* Sequential Steps with Real Sample Images */}
                    <div className="space-y-6">
                        {/* Step 1 & 2 */}
                        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[0]}</p>
                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[1]}</p>
                            <SampleImageCard title="Sample Image 4" imageUrl={sampleImages.sample4} />
                            <p className="text-xs md:text-sm font-medium text-neutral-700">{pdfExpressSection.nextSteps[2]}</p>
                            <p className="text-xs md:text-sm font-medium text-neutral-700">{pdfExpressSection.nextSteps[3]}</p>
                            <SampleImageCard title="Sample Image 5" imageUrl={sampleImages.sample5} />
                        </div>

                        {/* Step 5 - 8 */}
                        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 space-y-3">
                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[4]}</p>
                            <SampleImageCard title="Sample Image 6" imageUrl={sampleImages.sample6} />
                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[5]}</p>
                            <SampleImageCard title="Sample Image 7" imageUrl={sampleImages.sample7} />
                            <p className="text-xs md:text-sm font-medium text-neutral-700">{pdfExpressSection.nextSteps[6]}</p>
                            <SampleImageCard title="Sample Image 8" imageUrl={sampleImages.sample8} />
                            <p className="text-xs md:text-sm font-medium text-neutral-700">{pdfExpressSection.nextSteps[7]}</p>
                            <SampleImageCard title="Sample Image 9" imageUrl={sampleImages.sample9} />
                        </div>

                        {/* Step 9 - 14 with Sample Image 10, 11, 12, 13 */}
                        <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40 space-y-4">
                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[8]}</p>
                            <SampleImageCard title="Sample Image 10" imageUrl={sampleImages.sample10} />

                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[9]}</p>
                            <SampleImageCard title="Sample Image 11" imageUrl={sampleImages.sample11} />

                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[10]}</p>
                            <SampleImageCard title="Sample Image 12" imageUrl={sampleImages.sample12} />

                            <p className="text-xs md:text-sm font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[11]}</p>
                            <SampleImageCard title="Sample Image 13" imageUrl={sampleImages.sample13} />

                            <div className="bg-white p-4 rounded-xl border border-[#C59B27]/30 space-y-2 text-xs md:text-sm font-medium text-neutral-800">
                                <p className="font-black text-[#722332] text-sm uppercase">{pdfExpressSection.nextSteps[12]}</p>
                                <p className="text-neutral-700">{pdfExpressSection.nextSteps[13]}</p>
                                <p className="font-bold text-[#4A121A]">{pdfExpressSection.nextSteps[14]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}
