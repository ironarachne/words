'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.romanize = exports.removeEntry = exports.pronoun = exports.getOrdinal = exports.title = exports.uncapitalize = exports.capitalize = exports.arrayToPhrase = exports.article = void 0;
function article(word, appendWord = false) {
    /**
     * This function returns the correct article for a given word.
     *
     * @param {string} word - The word to get the article for.
     * @param {boolean} appendWord - Whether or not to append the word to the article.
     * @returns {string} The article for the given word.
     */
    const exceptions = ['honor', 'honest', 'herb'];
    if (exceptions.includes(word)) {
        if (appendWord) {
            return `an ${word}`;
        }
        return 'an';
    }
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    if (vowels.includes(word.substring(0, 1))) {
        if (appendWord) {
            return `an ${word}`;
        }
        return 'an';
    }
    else {
        if (appendWord) {
            return `a ${word}`;
        }
        return 'a';
    }
}
exports.article = article;
function arrayToPhrase(words) {
    /**
     * This function takes an array of words and returns a phrase connected by commas and the word 'and'.
     *
     * @param {string[]} words - The array of words to convert to a phrase.
     * @returns {string} The phrase.
     */
    if (words.length === 1) {
        return words[0];
    }
    else if (words.length === 2) {
        return words[0] + ' and ' + words[1];
    }
    let phrase = '';
    for (let i = 0; i < words.length; i++) {
        if (i === words.length - 1) {
            if (words.length > 2) {
                phrase += ',';
            }
            phrase += ' and ' + words[i];
        }
        else if (i === 0) {
            phrase = words[i];
        }
        else {
            phrase += ', ' + words[i];
        }
    }
    return phrase;
}
exports.arrayToPhrase = arrayToPhrase;
function capitalize(word) {
    /**
     * This function capitalizes the first letter of a word.
     *
     * @param {string} word - The word to capitalize.
     * @returns {string} The capitalized word.
     */
    return word[0].toUpperCase() + word.slice(1);
}
exports.capitalize = capitalize;
function uncapitalize(word) {
    /**
     * This function uncapitalizes the first letter of a word.
     *
     * @param {string} word - The word to uncapitalize.
     * @returns {string} The uncapitalized word.
     */
    return word[0].toLowerCase() + word.slice(1);
}
exports.uncapitalize = uncapitalize;
function title(phrase) {
    /**
     * This function capitalizes the first letter of each word in a phrase.
     *
     * @param {string} phrase - The phrase to capitalize.
     * @returns {string} The capitalized phrase.
     */
    let elements = phrase.split(' ');
    let result = '';
    for (let i = 0; i < elements.length; i++) {
        if (i != 0 && ['of', 'the', 'a'].includes(elements[i])) {
            result += elements[i].toLowerCase() + ' ';
        }
        else {
            result += capitalize(elements[i]) + ' ';
        }
    }
    result = result.trimEnd();
    return result;
}
exports.title = title;
function getOrdinal(number) {
    /**
     * This function returns the ordinal suffix for a given number.
     *
     * @param {number} number - The number to get the ordinal suffix for.
     * @returns {string} The ordinal suffix for the given number.
     */
    if (number > 3 && number < 21) {
        return 'th';
    }
    const lastDigitOfNumber = number % 10;
    switch (lastDigitOfNumber) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}
exports.getOrdinal = getOrdinal;
function pronoun(gender, wordCase) {
    /**
     * This function returns the pronoun for a given gender and word case.
     *
     * @param {string} gender - The gender to get the pronoun for.
     * @param {string} wordCase - The word case to get the pronoun for.
     * @returns {string} The pronoun.
     */
    let pronoun = '';
    if (gender === 'female') {
        if (wordCase === 'subjective') {
            pronoun = 'she';
        }
        else if (wordCase === 'possessive') {
            pronoun = 'her';
        }
        else if (wordCase === 'objective') {
            pronoun = 'her';
        }
    }
    else {
        if (wordCase === 'subjective') {
            pronoun = 'he';
        }
        else if (wordCase === 'possessive') {
            pronoun = 'his';
        }
        else if (wordCase === 'objective') {
            pronoun = 'him';
        }
    }
    return pronoun;
}
exports.pronoun = pronoun;
function removeEntry(word, words) {
    /**
     * This function removes a word from an array of words.
     *
     * @param {string} word - The word to remove.
     * @param {string[]} words - The array of words to remove the word from.
     * @returns {string[]} The array of words with the word removed.
     */
    const newWords = [];
    for (let i = 0; i < words.length; i++) {
        if (words[i] != word) {
            newWords.push(words[i]);
        }
    }
    return newWords;
}
exports.removeEntry = removeEntry;
function romanize(num) {
    /**
     * This function converts a number to a roman numeral.
     *
     * @param {number} num - The number to convert.
     * @returns {string} The roman numeral.
     */
    if (isNaN(num))
        return NaN;
    const digits = String(+num).split('');
    const key = [
        '',
        'C',
        'CC',
        'CCC',
        'CD',
        'D',
        'DC',
        'DCC',
        'DCCC',
        'CM',
        '',
        'X',
        'XX',
        'XXX',
        'XL',
        'L',
        'LX',
        'LXX',
        'LXXX',
        'XC',
        '',
        'I',
        'II',
        'III',
        'IV',
        'V',
        'VI',
        'VII',
        'VIII',
        'IX',
    ];
    let roman = '';
    let i = 3;
    while (i--) {
        if (digits.length > 0) {
            const digit = digits.pop();
            if (typeof digit == 'string') {
                roman = (key[+digit + i * 10] || '') + roman;
            }
        }
    }
    return Array(+digits.join('') + 1).join('M') + roman;
}
exports.romanize = romanize;
