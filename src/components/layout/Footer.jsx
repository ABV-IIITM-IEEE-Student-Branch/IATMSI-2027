import { conferenceInfo } from '../../data/conferenceData';
import { contactPerson } from '../../data/committeeData';
import { footerQuickLinks } from '../../data/navigationData';
import { siteConfig } from '../../data/siteConfig';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative bg-[#1A0508] text-[#FAF5EB] overflow-hidden font-sans border-t-2 border-[#C59B27]">
            {/* Ambient Gold Radial Glow Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#C59B27] opacity-[0.06] blur-[140px] rounded-full pointer-events-none" />

            {/* Top Ornamental Divider Bar */}
            <div className="bg-[#2B080C] py-3 border-b border-[#C59B27]/30 relative z-10">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-bold tracking-widest uppercase text-[#F0CB6F]/90">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
                        <span>IEEE Conference Record #73195</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[#C59B27]">
                        <span>✧</span>
                        <div className="w-16 h-[1px] bg-[#C59B27]/50" />
                        <span>◆</span>
                        <div className="w-16 h-[1px] bg-[#C59B27]/50" />
                        <span>✧</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Hybrid Event</span>
                        <span className="text-[#C59B27]">|</span>
                        <span>May 20-22, 2027</span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start">

                    {/* Column 1: Conference Branding & Organizers */}
                    <div className="flex flex-col space-y-4">
                        <div>
                            <span className="text-2xl lg:text-3xl font-black text-[#F0CB6F] tracking-tight drop-shadow-md">
                                {conferenceInfo.shortTitle}
                            </span>
                            <div className="h-[2px] w-14 bg-[#C59B27] mt-2 rounded-full" />
                        </div>
                        <p className="text-xs lg:text-sm text-[#FAF5EB]/80 leading-relaxed font-medium">
                            {conferenceInfo.fullTitle}
                        </p>
                        <div className="bg-[#2B080C]/80 rounded-xl p-4 border border-[#C59B27]/30 backdrop-blur-md shadow-lg space-y-1">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#F0CB6F]">
                                Organized By
                            </p>
                            <p className="text-xs font-semibold text-[#FAF5EB] leading-snug">
                                {conferenceInfo.organizedBy}
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#F0CB6F] border-b border-[#C59B27]/30 pb-2">
                            Quick Navigation
                        </h4>
                        <ul className="space-y-2.5 text-xs font-medium">
                            {footerQuickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        to={link.path}
                                        className="text-[#FAF5EB]/80 hover:text-[#F0CB6F] transition-all flex items-center gap-2 group"
                                    >
                                        <span className="text-[#C59B27] opacity-60 group-hover:opacity-100 transition-opacity">◆</span>
                                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/committee"
                                    className="text-[#FAF5EB]/80 hover:text-[#F0CB6F] transition-all flex items-center gap-2 group"
                                >
                                    <span className="text-[#C59B27] opacity-60 group-hover:opacity-100 transition-opacity">◆</span>
                                    <span className="group-hover:translate-x-1 transition-transform">Committees</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/call-for-papers/tracks"
                                    className="text-[#FAF5EB]/80 hover:text-[#F0CB6F] transition-all flex items-center gap-2 group"
                                >
                                    <span className="text-[#C59B27] opacity-60 group-hover:opacity-100 transition-opacity">◆</span>
                                    <span className="group-hover:translate-x-1 transition-transform">Conference Tracks</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact & Venue */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#F0CB6F] border-b border-[#C59B27]/30 pb-2">
                            Contact & Venue
                        </h4>
                        <div className="space-y-3.5 text-xs text-[#FAF5EB]/80">
                            {/* Venue */}
                            <div className="flex items-start gap-3">
                                <span className="text-[#C59B27] text-sm mt-0.5">📍</span>
                                <div>
                                    <p className="font-bold text-[#FAF5EB] uppercase text-[10px] tracking-wider text-[#F0CB6F]/90">Venue Address</p>
                                    <p className="leading-snug mt-0.5">{conferenceInfo.venue.address}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <span className="text-[#C59B27] text-sm mt-0.5">✉️</span>
                                <div>
                                    <p className="font-bold uppercase text-[10px] tracking-wider text-[#F0CB6F]/90">Email Support</p>
                                    <a
                                        href={`mailto:${contactPerson.email}`}
                                        className="text-[#FAF5EB] hover:text-[#F0CB6F] transition-colors underline decoration-[#C59B27]/40 underline-offset-2"
                                    >
                                        {contactPerson.email}
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            {contactPerson.phones[0] !== 'TBD' && (
                                <div className="flex items-start gap-3">
                                    <span className="text-[#C59B27] text-sm mt-0.5">📞</span>
                                    <div>
                                        <p className="font-bold uppercase text-[10px] tracking-wider text-[#F0CB6F]/90">Phone Numbers</p>
                                        <p className="font-mono text-[#FAF5EB] mt-0.5">{contactPerson.phones.join(' | ')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Column 4: Key Portals & Links */}
                    <div className="flex flex-col space-y-4">
                        <h4 className="text-sm font-extrabold uppercase tracking-widest text-[#F0CB6F] border-b border-[#C59B27]/30 pb-2">
                            IEEE Portals
                        </h4>
                        <div className="space-y-2.5">
                            <a
                                href={siteConfig.externalLinks.submissionPortal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2.5 px-4 bg-[#2B080C] hover:bg-[#3C0C16] border border-[#C59B27]/50 rounded-lg text-center text-xs font-bold text-[#F0CB6F] transition-all transform hover:-translate-y-0.5 shadow-md"
                            >
                                Microsoft CMT Submission
                            </a>
                            <a
                                href={siteConfig.externalLinks.paperTemplate.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-[#C59B27]/30 rounded-lg text-center text-xs font-medium text-[#FAF5EB] transition-colors"
                            >
                                IEEE Manuscript Template
                            </a>
                            <Link
                                to="/call-for-reviewers"
                                className="block w-full py-2 px-4 bg-white/5 hover:bg-white/10 border border-[#C59B27]/30 rounded-lg text-center text-xs font-medium text-[#FAF5EB] transition-colors"
                            >
                                Call for Reviewers
                            </Link>
                        </div>
                    </div>

                </div>

                {/* Bottom Separator Line */}
                <div className="mt-12 mb-6 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />

                {/* Copyright & Host Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#FAF5EB]/70 font-medium">
                    <p>© 2027 {conferenceInfo.shortTitle}. All Rights Reserved.</p>
                    <div className="flex items-center gap-2 text-[#F0CB6F]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                        <a
                            href={siteConfig.branding.instituteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline hover:text-[#FAF5EB] transition-colors font-semibold"
                        >
                            {siteConfig.branding.instituteName}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
