import { conferenceInfo } from '../../data/conferenceData';
import { contactPerson } from '../../data/committeeData';
import { navigationTree, footerQuickLinks } from '../../data/navigationData';
import { Link } from 'react-router-dom';

export default function Footer() {
    // We now use footerQuickLinks instead of flattening navigationTree

    return (
        <footer className="relative bg-gradient-to-b from-[#2D0A10] to-[#1F070B] text-white overflow-hidden font-sans border-t-[3px] border-[#D4A244]">
            {/* Background Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4A244] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>

            {/* Main footer content */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">

                    {/* Column 1: Branding */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-base lg:text-xl font-bold font-extrabold !text-white tracking-tight drop-shadow-md">
                                {conferenceInfo.shortTitle}
                            </h3>
                            <div className="h-1 w-12 bg-[#D4A244] rounded-full mx-auto md:mx-0 opacity-80"></div>
                        </div>
                        <p className="!text-amber-100/90 text-sm leading-relaxed max-w-xs font-medium text-shadow-sm">
                            {conferenceInfo.fullTitle}
                        </p>
                        <div className="bg-white/5 rounded-xl p-4 border border-amber-500/20 w-full backdrop-blur-sm shadow-inner group hover:bg-white/10 transition-colors duration-300">
                            <p className="!text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">Organized By</p>
                            <p className="!text-white font-semibold text-sm leading-snug">
                                {conferenceInfo.organizedBy}
                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col items-center md:items-start space-y-4 w-full">
                        <h4 className="text-lg font-bold tracking-wide uppercase !text-amber-300 drop-shadow-sm border-b-2 border-[#D4A244]/40 pb-1 mb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm text-center md:text-left">
                            {footerQuickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.path} className="!text-amber-100/90 hover:!text-amber-300 transition-colors flex items-center gap-2 justify-center md:justify-start group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A244] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <h4 className="text-lg font-bold tracking-wide uppercase !text-amber-300 drop-shadow-sm border-b-2 border-[#D4A244]/40 pb-1 mb-2">
                            Contact Info
                        </h4>

                        <div className="space-y-4 w-full">
                            {/* Venue */}
                            <div className="flex flex-col items-center md:items-start gap-1">
                                <div className="flex items-center gap-2 text-[#D4A244]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span className="text-xs font-bold uppercase tracking-wider">Venue</span>
                                </div>
                                <p className="!text-amber-100/90 text-sm leading-snug text-center md:text-left">
                                    {conferenceInfo.venue.address}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col items-center md:items-start gap-1">
                                <div className="flex items-center gap-2 text-[#D4A244]">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="text-xs font-bold uppercase tracking-wider">Email</span>
                                </div>
                                <p className="!text-amber-100/90 text-sm font-medium">
                                    <a href={`mailto:${contactPerson.email}`} className="!text-amber-100 hover:!text-amber-300 transition-colors border-b border-amber-500/30 pb-0.5">{contactPerson.email}</a>
                                </p>
                            </div>

                            {/* Phone */}
                            {contactPerson.phones[0] !== 'TBD' && (
                                <div className="flex flex-col items-center md:items-start gap-1">
                                    <div className="flex items-center gap-2 text-[#D4A244]">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        <span className="text-xs font-bold uppercase tracking-wider">Phone</span>
                                    </div>
                                    <p className="!text-amber-100/90 text-sm font-mono tracking-tight">
                                        {contactPerson.phones.join(' | ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Separator Line */}
                <div className="mt-6 mb-3 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Dates Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-center md:text-left !text-white pb-2">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4A244] animate-pulse"></span>
                        <span className="font-medium tracking-wide">Dates: <span className="!text-white">{conferenceInfo.dates}</span></span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#19050A] border-t border-amber-500/20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-3">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs tracking-wide !text-amber-100/80 font-medium">
                        <p className="hover:text-amber-200 transition-colors">
                            © 2026 {conferenceInfo.shortTitle}. All Rights Reserved.
                        </p>
                        <a
                            href="https://iiitm.ac.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="!text-amber-100 hover:!text-amber-300 transition-colors flex items-center gap-2"
                        >
                            <span className="w-px h-2.5 bg-amber-500/40 block"></span>
                            {conferenceInfo.venue.shortName}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
