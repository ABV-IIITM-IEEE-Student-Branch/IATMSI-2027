
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/routes';

export default function NavLinks({
    className = "",
    itemClassName = "",
    activeColor = "#5B1824",
    inactiveColor = "#525252",
    onItemClick,
    enableAnimation = false,
    layout = "desktop", // "desktop" | "mobile"
    items = NAV_ITEMS
}) {
    const navigate = useNavigate();
    const location = useLocation();



    const handleSmoothScrollNav = (e, path) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            navigate(path);
            if (onItemClick) onItemClick();
        }, 300);
    };

    // --- MOBILE LAYOUT (Slider, Flat List) ---
    if (layout === "mobile") {
        return (
            <div className={`flex items-center gap-6 overflow-x-auto hide-scrollbar whitespace-nowrap py-2 w-full ${className}`}>
                {items.map((item, index) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={(e) => handleSmoothScrollNav(e, item.path)}
                        className={({ isActive }) =>
                            `text-xs font-medium tracking-wide uppercase transition-all duration-200 flex-shrink-0 ${itemClassName} ${enableAnimation ? 'animate-float-down' : ''}`
                        }
                        style={({ isActive }) => ({
                            color: isActive ? activeColor : inactiveColor,
                            fontWeight: isActive ? '700' : '500',
                            borderBottom: isActive ? `2px solid ${activeColor}` : '2px solid transparent',
                            paddingBottom: '2px',
                            animationDelay: enableAnimation ? `${index * 100}ms` : '0ms'
                        })}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        );
    }

    // --- DRAWER LAYOUT (Vertical List) ---
    if (layout === "drawer") {
        return (
            <div className={`flex flex-col gap-1 w-full ${className}`}>
                {items.map((item, index) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={(e) => handleSmoothScrollNav(e, item.path)}
                        className={({ isActive }) =>
                            `block px-4 py-3 text-sm font-medium transition-all duration-200 ${itemClassName} ${enableAnimation ? 'animate-slide-in-right' : ''}`
                        }
                        style={({ isActive }) => ({
                            color: isActive ? activeColor : inactiveColor,
                            fontWeight: isActive ? '700' : '500',
                            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                            borderLeft: isActive ? `4px solid ${activeColor}` : '4px solid transparent',
                            animationDelay: enableAnimation ? `${index * 50}ms` : '0ms'
                        })}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        );
    }

    // --- DESKTOP LAYOUT (Standard List - No Dropdown) ---
    return (
        <div className={`flex items-center gap-4 xl:gap-6 whitespace-nowrap overflow-visible ${className}`}>
            {items.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={(e) => handleSmoothScrollNav(e, item.path)}
                    className={({ isActive }) =>
                        `text-[10px] xl:text-xs font-medium tracking-wide uppercase transition-all duration-200 ${itemClassName}`
                    }
                    style={({ isActive }) => ({
                        color: isActive ? activeColor : inactiveColor,
                        fontWeight: isActive ? '700' : '500',
                        borderBottom: isActive ? `2px solid ${activeColor}` : '2px solid transparent',
                        paddingBottom: '2px'
                    })}
                >
                    {item.label}
                </NavLink>
            ))}
        </div>
    );
}
