import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * A dialog over the page.
 *
 * Deliberately not `window.open`: browsers block popups that are not a direct
 * response to a click, and on phones a separate window behaves unpredictably —
 * a share of visitors would click and see nothing happen at all.
 *
 * Rendered into `document.body` rather than where it is written. A z-index only
 * ranks an element among its siblings inside the nearest stacking context, and
 * the section this is used from sits inside `relative z-10` wrappers. Left in
 * place, the whole dialog was ranked at z-10 against the rest of the page
 * however high its own z-index went — so the header at z-50 painted straight
 * over it, and the surrounding `overflow: hidden` cropped what was left.
 *
 * At the top of the body it competes with the header (z-50) and the mobile
 * drawer (z-[80]) directly, which is what z-[100] below is for.
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

    return createPortal(
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
        </div>,
        document.body,
    );
}
