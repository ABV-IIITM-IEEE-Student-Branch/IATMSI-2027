import { useEffect, useRef } from 'react';

/**
 * A dialog over the page.
 *
 * Deliberately not `window.open`: browsers block popups that are not a direct
 * response to a click, and on phones a separate window behaves unpredictably —
 * a share of visitors would click and see nothing happen at all.
 *
 * Above the site's own layers: the header sits at z-50 and the mobile drawer at
 * z-[80], so this has to clear both or the navigation shows through it.
 */
export default function Modal({ open, onClose, titleId, children, className = '' }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);

        // Stop the page behind from scrolling while the dialog is up, and put
        // the width back afterwards so the layout does not jump.
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // Move focus in, so keyboard and screen-reader users are placed inside
        // the dialog rather than left at the top of the page behind it.
        panelRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div
                className="fixed inset-0 bg-[#2F0B11]/70 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden="true"
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`relative w-full max-w-3xl my-auto bg-[#FCF9F2] rounded-2xl border-2 border-[#C59B27] shadow-2xl outline-none ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
