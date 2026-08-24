import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { reviewerData } from '../../data/reviewerData';
import { reviewerLabels } from '../../data/reviewerData';

export default function CallForReviewersSection() {
    const {
        title,
        subtitle,
        paragraphs,
        responsibilities,
        rewardCertificate,
        formUrl,
        buttonLabel,
        nominationNote,
        closingMessage,
    } = reviewerData;

    return (
        <SectionContainer id="call-for-reviewers-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Conference Invitation & Role Overview */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-4">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {reviewerLabels.invitationToJoinTheReviewCommittee}
                </h3>

                <div className="space-y-4 text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    <p className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                        {paragraphs[0]}
                    </p>
                    <p>{paragraphs[1]}</p>
                </div>
            </div>

            {/* 2. Reviewer Responsibilities */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {reviewerLabels.reviewerResponsibilities}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {responsibilities.map((resp, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 flex items-start gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#722332] mt-1.5 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                {resp}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. E-Certificate Reward & Application Form CTA */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 rounded-xl border border-[#C59B27]/40 flex items-center gap-3 text-xs md:text-sm font-black text-[#722332]">
                    <svg className="w-6 h-6 text-[#722332] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span>{rewardCertificate}</span>
                </div>

                <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-black text-[#4A121A] uppercase tracking-wider">
                        {reviewerLabels.submitYourApplication}
                    </h4>
                    <div>
                        <a
                            href={formUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-6 py-3.5 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border-2 border-[#C59B27] shadow-md transition-all scale-100 hover:scale-105"
                        >
                            <span>{buttonLabel}</span>
                            <svg className="w-5 h-5 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* 4. Nominations, Diversity & Closing Message */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-4">
                <h3 className="text-lg md:text-xl font-black text-[#4A121A] uppercase tracking-wider border-b border-[#C59B27]/30 pb-3">
                    {reviewerLabels.reviewerNominationsDiversityCommitment}
                </h3>

                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                    {nominationNote}
                </p>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 rounded-xl border border-[#C59B27]/40 text-xs md:text-sm font-bold text-[#722332] italic">
                    “{closingMessage}”
                </div>
            </div>
        </SectionContainer>
    );
}
