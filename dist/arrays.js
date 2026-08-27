"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeEntry = removeEntry;
/**
 * This function removes all occurrences of a word from an array of words.
 *
 * @param {string} word - The word to remove.
 * @param {string[]} words - The array of words to remove the word from.
 * @returns {string[]} The array of words with all occurrences of the word removed.
 */
function removeEntry(word, words) {
    return words.filter((entry) => entry !== word);
}
