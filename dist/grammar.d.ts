/**
 * This function returns the correct article for a given word.
 *
 * @param {string} word - The word to get the article for.
 * @param {boolean} appendWord - Whether or not to append the word to the article.
 * @returns {string} The article for the given word.
 */
export declare function article(word: string, appendWord?: boolean): string;
/**
 * This function returns the pronoun for a given gender and word case.
 *
 * @param {string} gender - The gender to get the pronoun for.
 * @param {string} wordCase - The word case to get the pronoun for.
 * @returns {string} The pronoun.
 */
export declare function pronoun(gender: string, wordCase: string): string;
/**
 * Quantifies a word based on a count, optionally converting the number to words.
 * @param {number} count - The number of items.
 * @param {string} singular - The singular word.
 * @param {string} [plural] - Optional plural override.
 * @param {boolean} [asWords=false] - Whether to convert the number to text.
 * @returns {string} The quantified phrase.
 */
export declare function quantify(count: number, singular: string, plural?: string, asWords?: boolean): string;
/**
 * Returns "is" for count 1, "are" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "is" or "are".
 */
export declare function isAre(count: number): string;
/**
 * Returns "has" for count 1, "have" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "has" or "have".
 */
export declare function hasHave(count: number): string;
/**
 * Returns "was" for count 1, "were" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "was" or "were".
 */
export declare function wasWere(count: number): string;
/**
 * Returns the possessive form of a noun.
 * @param {string} noun - The noun to make possessive.
 * @returns {string} The possessive form.
 */
export declare function possessive(noun: string): string;
