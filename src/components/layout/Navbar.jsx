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

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    const toggleDropdown = (id) => {
        setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <>
            <header data-weavr-source="siteConfig navigationData.navigationTree" className="relative z-50 w-full pt-4 px-4 sm:px-6 lg:px-8 bg-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto bg-[#FCF9F2]/65 backdrop-blur-xl border border-[#C59B27]/30 shadow-xl rounded-2xl w-full pointer-events-auto transition-all duration-300">
                    {/* Unified Row: IATMSI Logo, Partner Logos, Submit */}
                    <div className="relative flex items-center justify-between py-1.5 px-3 lg:px-4 lg:py-1.5 gap-x-2 lg:gap-x-4">
                        
                        {/* Conference Logo (Left) */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to={ROUTES.HOME} className="flex items-center hover:opacity-80 transition-opacity">
                                <img
                                    src={siteConfig.branding.conferenceLogo}
                                    alt="IATMSI 2027 Logo"
                                    className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                                />
                            </Link>
                        </div>

                        {/* Partner Logos (Center/Right) */}
                        <div className="flex flex-1 items-center justify-end lg:justify-center gap-2 sm:gap-4 px-2 sm:px-4">
                            {siteConfig.branding.partnerLogos.map((logo, index) => (
                                <div key={logo.id} className="flex items-center gap-2 sm:gap-4">
                                    <img 
                                        src={logo.url} 
                                        alt={logo.alt} 
                                        className="h-6 sm:h-8 md:h-9 lg:h-10 w-auto object-contain" 
                                    />
                                    {index < siteConfig.branding.partnerLogos.length - 1 && (
                                        <div className="hidden sm:block w-px h-5 sm:h-6 bg-[#C59B27]/30"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Right Actions: Submit Button & Mobile Menu */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            {/* Submit Button (Desktop Only) */}
                            <div className="hidden lg:block">
                                <a
                                    href={siteConfig.externalLinks.submissionPortal.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4.5 py-1.5 border border-[#C59B27]/50 rounded-md shadow-sm text-[12.5px] font-bold !text-[#FAF5EB] bg-[#4A121A] hover:bg-[#611822] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A121A] transition-all transform hover:scale-105"
                                >
                                    {navLabels.submitPaper}
                                </a>
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-1.5 text-gray-500 focus:outline-none"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </header>

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

                        <div className="px-6 py-4 border-t border-white/10">
                            <a
                                href={siteConfig.externalLinks.submissionPortal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-bold text-[#5B1824] bg-white hover:bg-gray-100 transition-all"
                            >
                                {navLabels.submitPaper}
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
