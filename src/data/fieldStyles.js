// Per-field text styling - IATMSI-2027
//
// Written by Weavr when someone changes a text size or alignment in the
// visual editor. Hand edits are fine too; the shape is just a map.
//
// Keyed by field id — the data file, the export, and the path within it, which
// is how Weavr names a string. That is why this lives in its own file rather
// than beside the content: a size is not content, and mixing the two would put
// presentation into files the conference edits for wording.
//
// Both values are optional. A field with neither has no entry at all, which is
// why this is usually short even on a large site.
//
//   size:  'sm' | 'base' | 'lg' | 'xl' | '2xl'
//   align: 'left' | 'center' | 'right' | 'justify'
//
// Anything not in those lists is ignored rather than passed through to the
// page — see src/utils/fieldStyle.js. A value that arrived from a bad edit
// should do nothing, not emit an unknown class.

export const fieldStyles = {};
