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
/**
 * This function returns the correct article for a given word.
 *
 * @param {string} word - The word to get the article for.
 * @param {boolean} appendWord - Whether or not to append the word to the article.
 * @returns {string} The article for the given word.
 */
function article(word, appendWord = false) {
    const exceptions = ["honor", "honest", "herb"];
    if (exceptions.includes(word)) {
        if (appendWord) {
            return `an ${word}`;
        }
        return "an";
    }
    const vowels = ["a", "e", "i", "o", "u"];
    if (vowels.includes(word.substring(0, 1))) {
        if (appendWord) {
            return `an ${word}`;
        }
        return "an";
    }
    if (appendWord) {
        return `a ${word}`;
    }
    return "a";
}
/**
 * This function returns the pronoun for a given gender and word case.
 *
 * @param {string} gender - The gender to get the pronoun for.
 * @param {string} wordCase - The word case to get the pronoun for.
 * @returns {string} The pronoun.
 */
function pronoun(gender, wordCase) {
    let pronoun = "";
    if (gender === "female") {
        if (wordCase === "subjective") {
            pronoun = "she";
        }
        else if (wordCase === "possessive") {
            pronoun = "her";
        }
        else if (wordCase === "objective") {
            pronoun = "her";
        }
    }
    else {
        if (wordCase === "subjective") {
            pronoun = "he";
        }
        else if (wordCase === "possessive") {
            pronoun = "his";
        }
        else if (wordCase === "objective") {
            pronoun = "him";
        }
    }
    return pronoun;
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
