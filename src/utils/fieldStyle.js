import { fieldStyles } from '../data/fieldStyles';

/**
 * Turns a stored field style into class names.
 *
 * The classes are written out as literals rather than assembled from the
 * stored value (`text-${size}`). Tailwind finds classes by scanning source
 * text, so a constructed name is one it never sees and never generates — the
 * class would reach the page and do nothing.
 *
 * Sizes are deliberately relative to the element's own size rather than
 * absolute: a heading set to 'lg' should still be larger than body text set to
 * 'lg'. Each step scales the inherited size instead of replacing it.
 */
const SIZE_CLASSES = {
    sm: 'text-[0.85em]',
    base: '',
    lg: 'text-[1.15em]',
    xl: 'text-[1.35em]',
    '2xl': 'text-[1.6em]',
};

const ALIGN_CLASSES = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
};

export const FIELD_STYLE_SIZES = Object.keys(SIZE_CLASSES);
export const FIELD_STYLE_ALIGNMENTS = Object.keys(ALIGN_CLASSES);

/**
 * @param {string} fieldId  e.g. 'heroData.title'
 * @returns {string} class names, or '' when the field has no style set.
 *
 * Unknown sizes and alignments are dropped rather than passed through. A bad
 * value should leave the text looking as the designer intended, not emit a
 * class nobody defined.
 */
export function fieldStyleClass(fieldId) {
    if (!fieldId) return '';
    const style = fieldStyles[fieldId];
    if (!style) return '';

    return [SIZE_CLASSES[style.size], ALIGN_CLASSES[style.align]]
        .filter(Boolean)
        .join(' ');
}
