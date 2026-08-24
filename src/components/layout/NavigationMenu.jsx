import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { navigationTree } from '../../data/navigationData';

export default function NavigationMenu() {
    const location = useLocation();

    const isDropdownActive = (item) => {
        return item.items?.some(subItem => location.pathname === subItem.path);
    };

    return (
        <div data-weavr-source="navigationData pageRegistry" className="bg-[#4A121A] shadow-lg border-b-2 border-[#C59B27] z-40 relative">
            <nav className="hidden lg:flex flex-1 flex-wrap justify-center items-center gap-x-3 xl:gap-x-5 gap-y-2 px-3 xl:px-6 py-2.5">
                {navigationTree.map((item) => (
                    item.type === 'link' ? (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-[11px] xl:text-[12px] font-bold tracking-wider uppercase transition-all duration-200 py-1 px-1.5 relative ${
                                    isActive
                                        ? '!text-[#F0CB6F]'
                                        : '!text-[#FAF5EB] hover:!text-[#F0CB6F]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <span>{item.label.toUpperCase()}</span>
                                    {isActive && (
                                        <span className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#C59B27] rounded-full shadow-sm" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ) : (
                        <div key={item.id} className="relative group flex items-center">
                            <button className={`flex items-center text-[11px] xl:text-[12px] font-bold tracking-wider uppercase transition-all duration-200 py-1 px-1.5 relative ${
                                isDropdownActive(item)
                                    ? '!text-[#F0CB6F]'
                                    : '!text-[#FAF5EB] hover:!text-[#F0CB6F]'
                            }`}>
                                <span>{item.label.toUpperCase()}</span>
                                <svg className="w-3 h-3 ml-1 text-[#C59B27] transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                                {isDropdownActive(item) && (
                                    <span className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-6 h-[2.5px] bg-[#C59B27] rounded-full shadow-sm" />
                                )}
                            </button>
                            {/* Transparent bridge */}
                            <div className="absolute top-full left-0 w-full h-3 bg-transparent"></div>
                            
                            {/* Dropdown Container */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-[#4A121A] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-[#C59B27]/40 rounded-lg overflow-hidden">
                                <div className="py-2 flex flex-col">
                                    {item.items.map((subItem) => (
                                        <Link
                                            key={subItem.id}
                                            to={subItem.path}
                                            className="block px-4 py-2.5 text-xs font-semibold tracking-wider !text-[#FAF5EB] hover:bg-[#C59B27]/20 hover:!text-[#F0CB6F] transition-colors"
                                        >
                                            {subItem.label.toUpperCase()}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </nav>
        </div>
    );
}
