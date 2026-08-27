"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.article = article;
exports.pronoun = pronoun;
exports.quantify = quantify;
exports.isAre = isAre;
exports.hasHave = hasHave;
exports.wasWere = wasWere;
exports.possessive = possessive;
const inflection_js_1 = require("./inflection.js");
const numbers_js_1 = require("./numbers.js");
const ARTICLE_EXCEPTIONS = ["honor", "honest", "herb", "hour", "heir"];
const VOWEL_LETTERS = ["a", "e", "i", "o", "u"];
/**
 * Returns the correct article ("a" or "an") for a given word based on its
 * first letter.
 *
 * Note: the choice is based on spelling, so it can be wrong for words whose
 * pronunciation differs from their spelling (e.g. "a unicorn", "an MBA",
 * "a one").
 *
 * @param {string} word - The word to get the article for.
 * @param {boolean} appendWord - Whether or not to append the word to the article.
 * @returns {string} The article for the given word.
 */
function article(word, appendWord = false) {
    const lower = word.toLowerCase();
    const articleWord = ARTICLE_EXCEPTIONS.includes(lower) ||
        VOWEL_LETTERS.includes(lower.substring(0, 1))
        ? "an"
        : "a";
    return appendWord ? `${articleWord} ${word}` : articleWord;
}
const PRONOUNS = {
    female: { subjective: "she", possessive: "her", objective: "her" },
    male: { subjective: "he", possessive: "his", objective: "him" },
    neutral: { subjective: "they", possessive: "their", objective: "them" },
};
/**
 * Returns the pronoun for a given gender and word case.
 * Unknown genders default to singular they. Unknown word cases throw.
 *
 * @param {string} gender - The gender ("female", "male", or any other value).
 * @param {string} wordCase - One of "subjective", "possessive", or "objective".
 * @returns {string} The pronoun.
 * @throws {Error} If wordCase is not one of the three supported values.
 */
function pronoun(gender, wordCase) {
    var _a;
    const set = (_a = PRONOUNS[gender.toLowerCase()]) !== null && _a !== void 0 ? _a : PRONOUNS.neutral;
    const result = set[wordCase];
    if (!result) {
        throw new Error(`Unknown word case: "${wordCase}". Expected "subjective", "possessive", or "objective".`);
    }
    return result;
}
/**
 * Quantifies a word based on a count, optionally converting the number to words.
 * @param {number} count - The number of items.
 * @param {string} singular - The singular word.
 * @param {string} [plural] - Optional plural override.
 * @param {boolean} [asWords=false] - Whether to convert the number to text.
 * @returns {string} The quantified phrase.
 */
function quantify(count, singular, plural, asWords = false) {
    const numStr = asWords ? (0, numbers_js_1.numberToWords)(count) : count.toString();
    const wordStr = count === 1 ? singular : (plural !== null && plural !== void 0 ? plural : (0, inflection_js_1.pluralize)(singular));
    return `${numStr} ${wordStr}`;
}
/**
 * Returns "is" for count 1, "are" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "is" or "are".
 */
function isAre(count) {
    return count === 1 ? "is" : "are";
}
/**
 * Returns "has" for count 1, "have" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "has" or "have".
 */
function hasHave(count) {
    return count === 1 ? "has" : "have";
}
/**
 * Returns "was" for count 1, "were" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "was" or "were".
 */
function wasWere(count) {
    return count === 1 ? "was" : "were";
}
/**
 * Returns the possessive form of a noun.
 * @param {string} noun - The noun to make possessive.
 * @returns {string} The possessive form.
 */
function possessive(noun) {
    if (!noun)
        return "";
    if (noun.endsWith("s") || noun.endsWith("S")) {
        return `${noun}'`;
    }
    return `${noun}'s`;
}
