/**
 * Renders the inline emphasis used in the content files.
 *
 * Content lives in `src/data/*.js` as plain strings, so emphasis has to travel
 * inside the string rather than as markup:
 *
 *   **bold**   *italic*   __underline__
 *
 * Keeping it in the text means a visual editor can add emphasis by writing a
 * string, with no component changes and nothing to keep in sync.
 */

const PATTERN = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*)/g;

/**
 * An emphasis pair with nothing inside it, which is what clicking Bold with
 * nothing selected leaves behind in the editor.
 *
 * Dropping it matters for more than tidiness. PATTERN needs at least one
 * character between the markers, so a stray pair falls through and renders as
 * literal asterisks — and then the rendered text no longer equals the stored
 * text with its markers stripped, which is exactly how the visual editor finds
 * the field to make it editable. One stray pair and the paragraph could only be
 * fixed by hand. Removing it here means the page always renders what the editor
 * is looking for.
 */
const EMPTY_EMPHASIS = /\*{4,}|_{4,}/g;

export function renderRichText(text, { strongClassName = 'font-bold' } = {}) {
    if (typeof text !== 'string' || !text) return text;
    // Nothing to do for the overwhelming majority of strings.
    if (!/[*_]/.test(text)) return text;

    return text.replace(EMPTY_EMPHASIS, '').split(PATTERN).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return <strong key={index} className={strongClassName}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('__') && part.endsWith('__') && part.length > 4) {
            return <u key={index}>{part.slice(2, -2)}</u>;
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
            return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return part;
    });
}

/**
 * Drop-in wrapper for a string that may carry emphasis.
 *
 *   <RichText>{someData.paragraph}</RichText>
 */
export default function RichText({ children }) {
    return <>{renderRichText(children)}</>;
}
