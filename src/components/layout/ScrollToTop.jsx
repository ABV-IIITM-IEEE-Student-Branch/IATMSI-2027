import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Small timeout to ensure DOM is ready on route transitions
            const timeout = setTimeout(() => {
                const el = document.getElementById(hash.replace('#', ''));
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [pathname, hash]);

    return null;
}
