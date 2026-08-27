/**
 * This function takes an array of words and returns a phrase connected by
 * commas and a conjunction. Falsy entries are filtered out.
 *
 * @param {string[]} words - The array of words to convert to a phrase.
 * @param {string} [conjunction="and"] - The conjunction to use.
 * @returns {string} The phrase.
 */
export declare function arrayToPhrase(words: string[], conjunction?: string): string;
/**
 * This function converts a phrase into a URL-friendly slug.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The URL-friendly slug.
 */
export declare function slugify(phrase: string): string;
/**
 * This function truncates a string to a specific number of words.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxWords - The maximum number of words (must be non-negative).
 * @param {string} [suffix="..."] - The suffix to append if truncated.
 * @returns {string} The truncated text.
 * @throws {RangeError} If maxWords is negative.
 */
export declare function truncateWords(text: string, maxWords: number, suffix?: string): string;
/**
 * This function removes all punctuation from a phrase, including Unicode
 * punctuation and symbol characters (quotes, brackets, em-dashes, etc.).
 *
 * @param {string} text - The text to process.
 * @returns {string} The text without punctuation.
 */
export declare function stripPunctuation(text: string): string;
/**
 * This function collapses multiple spaces into a single space and trims ends.
 *
 * @param {string} text - The text to process.
 * @returns {string} The squished text.
 */
export declare function squish(text: string): string;
/**
 * This function accurately counts the words in a text block.
 * Hyphenated words count as a single word.
 *
 * @param {string} text - The text to process.
 * @returns {number} The word count.
 */
export declare function wordCount(text: string): number;
/**
 * This function calculates the estimated reading time in minutes for a block
 * of text.
 *
 * @param {string} text - The text to process.
 * @param {number} [wordsPerMinute=200] - The expected reading speed in words
 *   per minute (must be positive).
 * @returns {number} The estimated reading time in minutes.
 * @throws {RangeError} If wordsPerMinute is not positive.
 */
export declare function readingTime(text: string, wordsPerMinute?: number): number;
/**
 * Fixes common punctuation errors like duplicate spaces, duplicate
 * punctuation, space before punctuation, and trailing spacing.
 * Preserves ellipses ("...") from being collapsed into single periods.
 *
 * @param {string} text - The text to fix.
 * @returns {string} The text with fixed punctuation.
 */
export declare function fixPunctuation(text: string): string;
/**
 * Combines an array of string parts into a sentence, fixing punctuation,
 * capitalizing the first letter, and ensuring it ends in terminal punctuation.
 * Terminal punctuation is placed inside any trailing quotation marks or
 * brackets (American style).
 *
 * @param {string[]} parts - Parts of the sentence.
 * @returns {string} The formatted sentence.
 */
export declare function buildSentence(parts: string[]): string;
