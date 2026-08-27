/**
 * This function capitalizes the first letter of a word.
 * Handles multi-byte code points (e.g. emoji) correctly.
 *
 * @param {string} word - The word to capitalize.
 * @returns {string} The capitalized word.
 */
export declare function capitalize(word: string): string;
/**
 * This function uncapitalizes the first letter of a word.
 *
 * @param {string} word - The word to uncapitalize.
 * @returns {string} The uncapitalized word.
 */
export declare function uncapitalize(word: string): string;
/**
 * This function capitalizes the first letter of each word in a phrase,
 * lowercasing small words (articles, conjunctions, short prepositions)
 * when they are not the first word.
 *
 * @param {string} phrase - The phrase to title-case.
 * @returns {string} The title-cased phrase.
 */
export declare function title(phrase: string): string;
/**
 * This function converts a phrase into camelCase.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The camelCase phrase.
 */
export declare function camelCase(phrase: string): string;
/**
 * This function converts a phrase into snake_case.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The snake_case phrase.
 */
export declare function snakeCase(phrase: string): string;
/**
 * This function converts a phrase into kebab-case.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The kebab-case phrase.
 */
export declare function kebabCase(phrase: string): string;
/**
 * This function swaps the casing of each letter in a word.
 * Iterates by code point so multi-byte characters (e.g. emoji) are preserved.
 *
 * @param {string} word - The word to convert.
 * @returns {string} The converted word.
 */
export declare function swapCase(word: string): string;
