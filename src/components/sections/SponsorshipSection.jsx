import SectionContainer, { SectionHeader } from '../ui/SectionContainer';
import { sponsorshipData } from '../../data/sponsorshipData';
import { sponsorshipLabels } from '../../data/sponsorshipData';

export default function SponsorshipSection() {
    const {
        title,
        subtitle,
        introText,
        documents,
        contactEmails,
        committee,
        queriesIntro,
    } = sponsorshipData;

    return (
        <SectionContainer dataSource="sponsorshipData" id="sponsorship-section">
            <SectionHeader title={title} subtitle={subtitle} centered={true} />

            {/* 1. Overview & Sponsorship Documents (Flyer & Brochure) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <div className="border-b border-[#C59B27]/30 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#FAF5EB] bg-[#722332] px-3.5 py-1 rounded-full shadow-xs inline-block mb-2">
                        {sponsorshipLabels.partnershipOpportunities}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase">
                        {sponsorshipLabels.sponsorshipFlyerBrochure}
                    </h3>
                </div>

                <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-4 md:p-5 rounded-xl border border-[#C59B27]/40">
                    {introText}
                </p>

                {/* PDF Download Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {documents.map((doc, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/40 shadow-sm flex flex-col justify-between space-y-4"
                        >
                            <div className="space-y-2">
                                <div className="w-10 h-10 rounded-xl bg-[#722332]/10 text-[#722332] flex items-center justify-center font-bold text-xl border border-[#C59B27]/30">
                                    📄
                                </div>
                                <h4 className="text-base md:text-lg font-black text-[#4A121A]">
                                    {doc.title}
                                </h4>
                                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                                    {doc.description}
                                </p>
                            </div>

                            <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#722332] !text-[#FAF5EB] hover:bg-[#5B1824] px-5 py-3 rounded-xl text-xs md:text-sm font-black uppercase tracking-wider border border-[#C59B27] shadow-sm transition-all"
                            >
                                <span>{sponsorshipLabels.downloadDocumentPdf}</span>
                                <svg className="w-4 h-4 !text-[#FAF5EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Sponsorship Queries Contact Box */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm mb-10 space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {sponsorshipLabels.sponsorshipPartnershipQueries}
                </h3>

                <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-5 md:p-6 rounded-xl border border-[#C59B27]/40 space-y-4">
                    <p className="text-xs md:text-sm text-neutral-800 font-semibold leading-relaxed">
                        {queriesIntro}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                        {contactEmails.map((email, idx) => (
                            <a
                                key={idx}
                                href={`mailto:${email}`}
                                className="inline-flex items-center gap-2 bg-white text-[#722332] hover:bg-[#FAF5EB] px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold border border-[#C59B27]/40 shadow-2xs transition-all"
                            >
                                <svg className="w-4 h-4 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{email}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Committee Chairs Contact Cards */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C59B27]/40 shadow-sm space-y-6">
                <h3 className="text-xl md:text-2xl font-black text-[#4A121A] font-heading tracking-wide uppercase border-b border-[#C59B27]/30 pb-4 flex items-center gap-3">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#722332]" />
                    {sponsorshipLabels.sponsorshipChairsContacts}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {committee.map((c, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EBDC] p-6 rounded-2xl border-2 border-[#C59B27]/40 shadow-sm space-y-3"
                        >
                            <span className="text-xs font-black uppercase text-[#722332] block">
                                {c.role}
                            </span>
                            <div>
                                <h4 className="text-lg font-black text-[#4A121A]">{c.name}</h4>
                                <p className="text-xs text-neutral-600 font-semibold">{c.affiliation}</p>
                            </div>

                            <div className="pt-2 flex flex-col gap-1.5 text-xs text-neutral-800 font-semibold">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#722332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>Phone: {c.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}
