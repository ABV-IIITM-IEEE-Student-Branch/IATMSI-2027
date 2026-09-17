/**
 * How a section is presented, as opposed to what it says.
 *
 * Set from the visual editor and stored in the section's own entry in
 * pageRegistry, under a reserved `appearance` key in its props:
 *
 *   { sectionId: 'faqsSection', props: { appearance: { background: 'dark' } } }
 *
 * Keeping it there rather than in a file alongside means it travels with the
 * section when the page is reordered — the whole entry moves as one.
 *
 * The classes are written out as literals rather than assembled from the
 * stored value (`bg-${background}`). Tailwind finds classes by scanning source
 * text, so a constructed name is one it never sees and never generates: the
 * class would reach the page and do nothing.
 */

const BACKGROUND_CLASSES = {
    // Nothing at all, so the section keeps whatever it was designed with.
    default: '',
    light: 'bg-[#FAF5EB]',
    dark: 'bg-[#4A121A] text-white',
    accent: 'bg-[#C59B27]/10',
};

const SPACING_CLASSES = {
    normal: '',
    tight: 'py-2 md:py-4',
    loose: 'py-12 md:py-20',
};

const ALIGN_CLASSES = {
    left: '',
    center: 'text-center',
};

export const APPEARANCE_BACKGROUNDS = Object.keys(BACKGROUND_CLASSES);
export const APPEARANCE_SPACINGS = Object.keys(SPACING_CLASSES);
export const APPEARANCE_ALIGNMENTS = Object.keys(ALIGN_CLASSES);

/**
 * @param {{background?: string, spacing?: string, align?: string}} [appearance]
 * @returns {string} class names, or '' when nothing is set.
 *
 * Unknown values are dropped rather than passed through. A value that arrived
 * from a bad edit should leave the section looking as it was designed, not
 * emit a class nobody defined.
 */
export function appearanceClass(appearance) {
    if (!appearance) return '';
    return [
        BACKGROUND_CLASSES[appearance.background],
        SPACING_CLASSES[appearance.spacing],
        ALIGN_CLASSES[appearance.align],
    ]
        .filter(Boolean)
        .join(' ');
}

/**
 * The same settings as data attributes, so a visual editor can read back what
 * a section is currently set to rather than keeping its own copy — which a
 * reload would make stale.
 */
export function appearanceAttributes(appearance) {
    if (!appearance) return {};
    const attributes = {};
    if (appearance.background) attributes['data-weavr-appearance-background'] = appearance.background;
    if (appearance.spacing) attributes['data-weavr-appearance-spacing'] = appearance.spacing;
    if (appearance.align) attributes['data-weavr-appearance-align'] = appearance.align;
    return attributes;
}
