/**
 * This function returns the plural form of a given word (basic English rules and some irregulars).
 *
 * @param {string} word - The word to pluralize.
 * @returns {string} The pluralized word.
 */
export declare function pluralize(word: string): string;
/**
 * This function detects if a word is likely plural.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} True if likely plural, false otherwise.
 */
export declare function detectPlural(word: string): boolean;
/**
 * This function returns the singular form of a given word (basic English rules and some irregulars).
 *
 * @param {string} word - The word to singularize.
 * @returns {string} The singularized word.
 */
export declare function singularize(word: string): string;
