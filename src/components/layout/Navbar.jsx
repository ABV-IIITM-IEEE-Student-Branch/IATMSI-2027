import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { navigationTree } from '../../data/navigationData';
import { siteConfig, navLabels } from '../../data/siteConfig';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    // Registration is unlisted while the payment gateway is in test mode. The
    // route still works; it just is not offered anywhere. Driven from
    // siteConfig.unlistedPaths so opening it is one edit.
    const registrationListed = !(siteConfig.unlistedPaths || []).includes(ROUTES.REGISTRATION);

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    const toggleDropdown = (id) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const allLogos = [
        { id: 'conf-logo', url: siteConfig.branding.conferenceLogo, alt: 'IATMSI 2027 Logo', isHomeLink: true },
        ...siteConfig.branding.partnerLogos.map(logo => ({ ...logo, isHomeLink: false }))
    ];

    return (
        <>
            <header data-weavr-source="siteConfig navigationData.navigationTree" className="relative z-50 w-full pt-4 px-4 sm:px-6 lg:px-8 bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto bg-white border border-[#C59B27]/40 shadow-xl rounded-2xl w-full pointer-events-auto transition-all duration-300">
                    {/* Unified Row: Equidistant Logos & Right CTA Actions */}
                    <div className="relative flex items-center justify-between py-2 pl-3 pr-12 sm:px-4 lg:px-6 gap-x-3 lg:gap-x-6">
                        
                        {/* 4 Logos evenly spread throughout the bar */}
                        <div className="flex-1 min-w-0 flex flex-wrap items-center justify-center lg:flex-nowrap lg:justify-evenly gap-x-3 gap-y-1 sm:gap-4 lg:gap-8 px-1 sm:px-3 lg:px-6 py-0.5">
                            {allLogos.map((logo, index) => (
                                <div key={logo.id} className="flex items-center justify-center lg:flex-1 relative min-w-0">
                                    {logo.isHomeLink ? (
                                        <Link to={ROUTES.HOME} className="flex items-center justify-center hover:opacity-80 transition-opacity">
                                            <img
                                                src={logo.url}
                                                alt={logo.alt}
                                                className="h-7 sm:h-9 md:h-10 lg:h-12 w-auto max-w-[84px] sm:max-w-[115px] md:max-w-[135px] lg:max-w-[155px] object-contain"
                                            />
                                        </Link>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <img 
                                                src={logo.url} 
                                                alt={logo.alt} 
                                                className="h-7 sm:h-9 md:h-10 lg:h-12 w-auto max-w-[84px] sm:max-w-[115px] md:max-w-[135px] lg:max-w-[155px] object-contain" 
                                            />
                                        </div>
                                    )}
                                    {index < allLogos.length - 1 && (
                                        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-5 sm:h-6 md:h-7 bg-[#C59B27]/30"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Right Actions: Submit Paper, Registration & Mobile Menu */}
                        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
                            {/* CTA Action Buttons (Desktop Only) */}
                            <div className="hidden lg:flex items-center gap-3">
                                <a
                                    href={siteConfig.externalLinks.submissionPortal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4.5 py-2 border border-[#C59B27]/60 rounded-lg shadow-md text-[13.5px] font-extrabold tracking-wide !text-[#FAF5EB] bg-[#4A121A] hover:bg-[#611822] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A121A] transition-all transform hover:scale-105"
                                >
                                    {navLabels.submitPaper}
                                </a>
                                {registrationListed && (
                                    <Link
                                        to={ROUTES.REGISTRATION}
                                        className="inline-flex items-center justify-center px-4.5 py-2 border border-[#C59B27] rounded-lg shadow-md text-[13.5px] font-extrabold tracking-wide !text-[#2F0B11] bg-[#C59B27] hover:bg-[#D4A936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C59B27] transition-all transform hover:scale-105"
                                    >
                                        {navLabels.registration}
                                    </Link>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </header>

            {/*
                Menu as its own button on small screens, so the bar above holds
                nothing but logos and they get the full width. Fixed rather than
                in the flow: it stays reachable once the header scrolls away,
                which on a long page is most of the time.

                Hidden while the drawer is open — the drawer carries its own
                close button, and this would otherwise sit on top of it as a
                second cross.
            */}
            {!isMenuOpen && (
                <button
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open navigation menu"
                    className="lg:hidden fixed top-3 right-3 z-[80] w-11 h-11 rounded-full bg-white border border-[#C59B27]/50 shadow-lg flex items-center justify-center text-[#4A121A] active:scale-95 transition-transform"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className="fixed top-0 right-0 z-[70] w-[280px] h-screen bg-primary-950 shadow-2xl flex flex-col lg:hidden">
                        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                            <span className="font-bold text-base tracking-wide text-white">{siteConfig.seo.title.split(' |')[0]}</span>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1 text-white hover:text-gray-300 transition-colors focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 flex flex-col items-center">
                            {navigationTree.map((item) => (
                                item.type === 'link' ? (
                                    <NavLink
                                        key={item.id}
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{ color: 'white' }}
                                        className={({ isActive }) => `py-3 text-base font-medium uppercase transition-colors !text-white ${isActive ? "font-bold" : ""}`}
                                    >
                                        {item.label}
                                    </NavLink>
                                ) : (
                                    <div key={item.id} className="w-full flex flex-col items-center">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            style={{ color: 'white' }}
                                            className="flex items-center justify-center gap-2 py-3 text-base font-medium uppercase !text-white transition-colors w-full"
                                        >
                                            {item.label}
                                            <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[item.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {openDropdowns[item.id] && (
                                            <div className="flex flex-col items-center gap-0 pb-1 w-full bg-white/5">
                                                {item.items.map((subItem) => (
                                                    <NavLink
                                                        key={subItem.id}
                                                        to={subItem.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                                        className={({ isActive }) => `py-2 text-sm transition-colors !text-white/80 ${isActive ? '!text-white font-bold' : 'hover:!text-white'}`}
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="px-6 py-4 border-t border-white/10 flex flex-col gap-2.5">
                            <a
                                href={siteConfig.externalLinks.submissionPortal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-bold text-white bg-[#4A121A] border border-[#C59B27]/50 hover:bg-[#611822] transition-all"
                            >
                                {navLabels.submitPaper}
                            </a>
                            {registrationListed && (
                                <Link
                                    to={ROUTES.REGISTRATION}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-bold text-[#350C13] bg-[#C59B27] hover:bg-[#D4A936] transition-all"
                                >
                                    {navLabels.registration}
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
