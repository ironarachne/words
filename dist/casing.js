"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.uncapitalize = uncapitalize;
exports.title = title;
exports.camelCase = camelCase;
exports.snakeCase = snakeCase;
exports.kebabCase = kebabCase;
exports.swapCase = swapCase;
const SMALL_WORDS = [
    "a",
    "an",
    "and",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "nor",
    "of",
    "on",
    "or",
    "the",
    "to",
    "up",
    "via",
];
/**
 * This function capitalizes the first letter of a word.
 * Handles multi-byte code points (e.g. emoji) correctly.
 *
 * @param {string} word - The word to capitalize.
 * @returns {string} The capitalized word.
 */
function capitalize(word) {
    if (!word)
        return word;
    const first = [...word][0];
    return first.toUpperCase() + word.slice(first.length);
}
/**
 * This function uncapitalizes the first letter of a word.
 *
 * @param {string} word - The word to uncapitalize.
 * @returns {string} The uncapitalized word.
 */
function uncapitalize(word) {
    if (!word)
        return word;
    const first = [...word][0];
    return first.toLowerCase() + word.slice(first.length);
}
/**
 * This function capitalizes the first letter of each word in a phrase,
 * lowercasing small words (articles, conjunctions, short prepositions)
 * when they are not the first word.
 *
 * @param {string} phrase - The phrase to title-case.
 * @returns {string} The title-cased phrase.
 */
function title(phrase) {
    if (!phrase)
        return phrase;
    const words = phrase.split(/\s+/).filter(Boolean);
    return words
        .map((word, i) => {
        if (i !== 0 && SMALL_WORDS.includes(word.toLowerCase())) {
            return word.toLowerCase();
        }
        return capitalize(word);
    })
        .join(" ");
}
/**
 * Helper function to split a phrase into words, handling various separators
 * and camelCase boundaries.
 * @param {string} phrase - The phrase to split.
 * @returns {string[]} An array of words.
 */
function splitWords(phrase) {
    return phrase
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
        .split(/[-_/\s]+/)
        .filter(Boolean);
}
/**
 * This function converts a phrase into camelCase.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The camelCase phrase.
 */
function camelCase(phrase) {
    if (!phrase)
        return phrase;
    const words = splitWords(phrase);
    return words
        .map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return capitalize(word.toLowerCase());
    })
        .join("");
}
/**
 * This function converts a phrase into snake_case.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The snake_case phrase.
 */
function snakeCase(phrase) {
    if (!phrase)
        return phrase;
    const words = splitWords(phrase);
    return words.map((word) => word.toLowerCase()).join("_");
}
/**
 * This function converts a phrase into kebab-case.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The kebab-case phrase.
 */
function kebabCase(phrase) {
    if (!phrase)
        return phrase;
    const words = splitWords(phrase);
    return words.map((word) => word.toLowerCase()).join("-");
}
/**
 * This function swaps the casing of each letter in a word.
 * Iterates by code point so multi-byte characters (e.g. emoji) are preserved.
 *
 * @param {string} word - The word to convert.
 * @returns {string} The converted word.
 */
function swapCase(word) {
    if (!word)
        return word;
    let result = "";
    for (const char of word) {
        result +=
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
    }
    return result;
}
