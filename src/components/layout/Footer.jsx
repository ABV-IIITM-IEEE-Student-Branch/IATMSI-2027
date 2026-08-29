import { useState, useEffect } from 'react';
import { conferenceInfo } from '../../data/conferenceData';
import { contactPerson } from '../../data/committeeData';
import { footerQuickLinks } from '../../data/navigationData';
import { siteConfig, visitorCountData, footerLabels } from '../../data/siteConfig';
import { Link } from 'react-router-dom';

export default function Footer() {
    // Live figures from /api/visitors. Null until the first response, so the
    // section can stay hidden rather than flashing a zero on every page load.
    const [visitors, setVisitors] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/visitors')
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => {
                if (!cancelled && data) setVisitors(data);
            })
            .catch(() => {
                // A counter is decoration; losing it must not disturb the footer.
            });
        return () => {
            cancelled = true;
        };
    }, []);

    // Only countries someone has actually visited from, largest first. Names
    // and flags come from data where known, with a sensible fallback so a
    // country nobody listed still appears correctly.
    const namesByCode = Object.fromEntries(
        visitorCountData.countries.map((c) => [c.code, c.name]),
    );
    const seenCountries = Object.entries(visitors?.countries || {})
        .sort((a, b) => b[1] - a[1])
        .map(([code, count]) => ({
            id: code,
            code,
            name: namesByCode[code] || code.toUpperCase(),
            flagUrl: `https://flagcdn.com/w40/${code}.png`,
            count: count.toLocaleString(),
        }));

    return (
        <footer data-weavr-source="siteConfig conferenceData committeeData navigationData" className="bg-[#4A121A] text-[#FAF5EB] font-sans border-t-2 border-[#C59B27] relative z-20">
            {/* Main Footer Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 items-start">

                    {/* Column 1: Visitor's Count by Country */}
                    <div className="flex flex-col space-y-4">
                        <div>
                            <h4 className="text-sm font-extrabold uppercase tracking-widest !text-[#F0CB6F]">
                                {visitorCountData.title}
                            </h4>
                            <div className="h-[2px] w-12 bg-[#C59B27] mt-1.5 rounded-full" />
                        </div>

                        {/* Total Counter Box */}
                        <div className="bg-[#380D13]/90 rounded-xl p-3 border border-[#C59B27]/40 shadow-inner flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-wider !text-[#F0CB6F]">
                                    {visitorCountData.totalLabel}
                                </span>
                            </div>
                            <span className="font-mono text-sm sm:text-base font-black !text-white bg-[#26070B] px-3 py-1 rounded-lg border border-[#C59B27]/40 tracking-wider shadow-xs">
                                {(visitors?.total || 0).toLocaleString()}
                            </span>
                        </div>

                        {/* Before the first visits land there is nothing to list,
                            so say so rather than leaving an empty gap. */}
                        {visitors && seenCountries.length === 0 && (
                            <p className="text-[11px] !text-[#FAF5EB]/60 italic">
                                {visitorCountData.emptyLabel}
                            </p>
                        )}

                        {/* Country Flag & Counts Grid */}
                        <div className="grid grid-cols-2 gap-2">
                            {seenCountries.map((country) => (
                                <div
                                    key={country.id}
                                    className="flex items-center justify-between bg-[#380D13]/60 hover:bg-[#380D13] px-2.5 py-1.5 rounded-lg border border-[#C59B27]/25 text-xs transition-colors"
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <img
                                            src={country.flagUrl}
                                            alt={country.name}
                                            className="w-4.5 h-3 object-cover rounded-xs border border-white/20 shadow-2xs flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <span className="font-semibold !text-[#FAF5EB]/90 truncate text-[11px] sm:text-xs">
                                            {country.name}
                                        </span>
                                    </div>
                                    <span className="font-mono font-bold text-[11px] !text-[#F0CB6F] ml-1 flex-shrink-0">
                                        {country.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links (Equidistant Center Column) */}
                    <div className="flex flex-col space-y-4 md:mx-auto">
                        <div>
                            <h4 className="text-sm font-extrabold uppercase tracking-widest !text-[#F0CB6F]">
                                {footerLabels.quickLinks}
                            </h4>
                            <div className="h-[2px] w-10 bg-[#C59B27] mt-1.5 rounded-full" />
                        </div>

                        <ul data-weavr-source="navigationData.footerQuickLinks" className="space-y-2.5 text-xs sm:text-sm font-medium">
                            {footerQuickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        to={link.path}
                                        className="!text-[#FAF5EB]/85 hover:!text-[#F0CB6F] transition-all duration-200 inline-flex items-center gap-2 group py-0.5"
                                    >
                                        <span data-weavr-ignore className="text-[#C59B27] text-[10px] group-hover:translate-x-1 transition-transform">▸</span>
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
                                {footerLabels.contactInfo}
                            </h4>
                            <div className="h-[2px] w-10 bg-[#C59B27] mt-1.5 rounded-full" />
                        </div>

                        <div className="space-y-3.5 text-xs sm:text-sm !text-[#FAF5EB]/85">
                            {/* Venue */}
                            <div className="flex items-start gap-3">
                                <svg className="w-4 h-4 text-[#C59B27] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">{footerLabels.venue}</span>
                                    <p className="leading-snug !text-[#FAF5EB]/90 font-medium">{conferenceInfo.venue.address}</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <svg className="w-4 h-4 text-[#C59B27] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">{footerLabels.email}</span>
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
                                    <svg className="w-4 h-4 text-[#C59B27] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider !text-[#F0CB6F] block mb-0.5">{footerLabels.phone}</span>
                                        <p className="font-mono !text-[#FAF5EB]/90 font-medium">{contactPerson.phones.join(' | ')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom Separator Line */}
                <div className="mt-8 mb-4 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C59B27]/40 to-transparent" />

                {/* Copyright Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs !text-white font-medium">
                    <p>© {siteConfig.copyrightYear} {conferenceInfo.shortTitle}. <span>{siteConfig.copyrightNotice}</span></p>
                    <a
                        href={siteConfig.designerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        /* Underline forced: a global rule strips it from every
                           anchor, which would leave this looking like the plain
                           text it used to be. */
                        className="!text-[#F0CB6F] hover:!text-[#FAF5EB] font-bold tracking-wide !underline underline-offset-4 decoration-[#F0CB6F]/40 hover:decoration-[#FAF5EB] transition-colors"
                    >
                        {siteConfig.designerText}
                    </a>
                </div>
            </div>
        </footer>
    );
}
