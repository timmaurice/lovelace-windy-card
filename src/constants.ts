// Shared element names. The card and the editor both need the editor's tag name — the card to
// create it from getConfigElement(), the editor to register it — so it lives in exactly one place.
export const ELEMENT_NAME = 'windy-card';
export const EDITOR_ELEMENT_NAME = `${ELEMENT_NAME}-editor` as const;
