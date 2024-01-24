/**
 * This function returns the correct article for a given word.
 *
 * @param {string} word - The word to get the article for.
 * @param {boolean} appendWord - Whether or not to append the word to the article.
 * @returns {string} The article for the given word.
 */
export declare function article(word: string, appendWord?: boolean): string;
/**
 * This function takes an array of words and returns a phrase connected by commas and the word 'and'.
 *
 * @param {string[]} words - The array of words to convert to a phrase.
 * @returns {string} The phrase.
 */
export declare function arrayToPhrase(words: string[]): string;
/**
 * This function capitalizes the first letter of a word.
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
 * This function capitalizes the first letter of each word in a phrase.
 *
 * @param {string} phrase - The phrase to capitalize.
 * @returns {string} The capitalized phrase.
 */
export declare function title(phrase: string): string;
/**
 * This function returns the ordinal suffix for a given number.
 *
 * @param {number} number - The number to get the ordinal suffix for.
 * @returns {string} The ordinal suffix for the given number.
 */
export declare function getOrdinal(number: number): string;
/**
 * This function returns the pronoun for a given gender and word case.
 *
 * @param {string} gender - The gender to get the pronoun for.
 * @param {string} wordCase - The word case to get the pronoun for.
 * @returns {string} The pronoun.
 */
export declare function pronoun(gender: string, wordCase: string): string;
/**
 * This function removes a word from an array of words.
 *
 * @param {string} word - The word to remove.
 * @param {string[]} words - The array of words to remove the word from.
 * @returns {string[]} The array of words with the word removed.
 */
export declare function removeEntry(word: string, words: string[]): string[];
/**
 * This function converts a number to a roman numeral.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The roman numeral.
 */
export declare function romanize(num: number): string | number;
