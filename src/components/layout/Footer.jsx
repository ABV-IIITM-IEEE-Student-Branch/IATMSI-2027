import { conferenceInfo } from '../../data/conferenceData';
import { contactPerson } from '../../data/committeeData';
import { footerQuickLinks } from '../../data/navigationData';
import { siteConfig } from '../../data/siteConfig';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#2B080C] text-[#FAF5EB] font-sans border-t-2 border-[#C59B27] relative z-20">
            {/* Main Footer Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 items-start">

                    {/* Column 1: Conference Info & Organizer */}
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h3 className="text-2xl font-black !text-[#F0CB6F] tracking-wide uppercase">
                                {conferenceInfo.shortTitle}
                            </h3>
                            <div className="h-[2px] w-12 bg-[#C59B27] mt-2 rounded-full" />
                        </div>

                        <p className="text-xs sm:text-sm !text-[#FAF5EB]/85 leading-relaxed font-medium">
                            {conferenceInfo.fullTitle}
                        </p>

                        <div className="bg-[#3C0C16]/80 rounded-xl p-4 border border-[#C59B27]/40 shadow-md space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest !text-[#F0CB6F]">
                                Organized By
                            </span>
                            <p className="text-xs font-semibold !text-[#FAF5EB] leading-snug">
                                {conferenceInfo.organizedBy}
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 pt-1">
                            <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider !text-[#F0CB6F]">
                                Dates: <span className="!text-[#FAF5EB]">{conferenceInfo.dates}</span>
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col space-y-4 md:pl-6">
                        <div>
                            <h4 className="text-sm font-extrabold uppercase tracking-widest !text-[#F0CB6F]">
                                Quick Links
                            </h4>
                            <div className="h-[2px] w-10 bg-[#C59B27] mt-2 rounded-full" />
                        </div>

                        <ul className="space-y-3 text-xs sm:text-sm font-medium">
                            {footerQuickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        to={link.path}
                                        className="!text-[#FAF5EB]/85 hover:!text-[#F0CB6F] transition-all duration-200 inline-flex items-center gap-2 group"
                                    >
                                        <span className="text-[#C59B27] text-[10px] group-hover:translate-x-1 transition-transform">▸</span>
                                        <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h4 className="text-sm font-extrabold uppercase tracking-widest !text-[#F0CB6F]">
                                Contact Info
                            </h4>
                            <div className="h-[2px] w-10 bg-[#C59B27] mt-2 rounded-full" />
                        </div>

                        <div className="space-y-4 text-xs sm:text-sm !text-[#FAF5EB]/85">
                            {/* Venue */}
                            <div className="flex items-start gap-3">
                                <span className="text-[#C59B27] text-base leading-none">📍</span>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">Venue</span>
                                    <p className="leading-snug !text-[#FAF5EB]/90">{conferenceInfo.venue.address}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <span className="text-[#C59B27] text-base leading-none">✉️</span>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">Email</span>
                                    <a
                                        href={`mailto:${contactPerson.email}`}
                                        className="!text-[#FAF5EB] hover:!text-[#F0CB6F] transition-colors underline decoration-[#C59B27]/40 underline-offset-2 font-medium"
                                    >
                                        {contactPerson.email}
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            {contactPerson.phones && contactPerson.phones[0] !== 'TBD' && (
                                <div className="flex items-start gap-3">
                                    <span className="text-[#C59B27] text-base leading-none">📞</span>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">Phone</span>
                                        <p className="font-mono !text-[#FAF5EB]/90">{contactPerson.phones.join(' | ')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom Separator Line */}
                <div className="mt-12 mb-6 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />

                {/* Copyright Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs !text-[#FAF5EB]/70 font-medium">
                    <p>© 2027 {conferenceInfo.shortTitle}. All Rights Reserved.</p>
                    <a
                        href={siteConfig.branding.instituteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-[#FAF5EB]/80 hover:!text-[#F0CB6F] transition-colors font-semibold"
                    >
                        {siteConfig.branding.instituteName}
                    </a>
                </div>
            </div>
        </footer>
    );
}
