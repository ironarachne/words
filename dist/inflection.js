"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = pluralize;
exports.detectPlural = detectPlural;
exports.singularize = singularize;
exports.comparative = comparative;
exports.superlative = superlative;
const irregulars = {
    goose: "geese",
    man: "men",
    woman: "women",
    child: "children",
    tooth: "teeth",
    foot: "feet",
    mouse: "mice",
    person: "people",
    cactus: "cacti",
    focus: "foci",
    fungus: "fungi",
    nucleus: "nuclei",
    syllabus: "syllabi",
    analysis: "analyses",
    diagnosis: "diagnoses",
    oasis: "oases",
    thesis: "theses",
    crisis: "crises",
    phenomenon: "phenomena",
    criterion: "criteria",
    datum: "data",
    index: "indices",
    appendix: "appendices",
    matrix: "matrices",
    radius: "radii",
    sheep: "sheep",
    deer: "deer",
    moose: "moose",
    series: "series",
    species: "species",
    // The following are regular words whose plurals would otherwise be
    // mis-singularized by the suffix rules below (e.g. "houses" -> "hous",
    // "ties" -> "ty", "quizzes" -> "quizz"). They are listed here purely
    // to disambiguate those rules.
    house: "houses",
    cause: "causes",
    use: "uses",
    spouse: "spouses",
    excuse: "excuses",
    gas: "gases",
    quiz: "quizzes",
    tie: "ties",
    die: "dies",
    pie: "pies",
    lie: "lies",
    movie: "movies",
    zombie: "zombies",
    genie: "genies",
    calorie: "calories",
};
const singularIrregulars = Object.fromEntries(Object.entries(irregulars).map(([singular, plural]) => [plural, singular]));
const uncountables = new Set([
    "news",
    "mathematics",
    "physics",
    "economics",
    "politics",
    "statistics",
    "measles",
    "mumps",
]);
/**
 * Returns true if `word` ends in a sibilant that triggers the "-es" plural
 * suffix (s, x, z, ch, sh).
 */
function takesEsSuffix(word) {
    return (word.endsWith("s") ||
        word.endsWith("x") ||
        word.endsWith("z") ||
        word.endsWith("ch") ||
        word.endsWith("sh"));
}
/**
 * Applies the casing of `source` to `inflected`. If source is all uppercase
 * (and contains at least one letter), the result is uppercased. Otherwise
 * only the first letter's case is preserved.
 */
function matchCase(source, inflected) {
    const first = source[0];
    const hasLetters = source.toLowerCase() !== source.toUpperCase();
    if (hasLetters && source === source.toUpperCase()) {
        return inflected.toUpperCase();
    }
    if (first !== first.toLowerCase()) {
        return inflected[0].toUpperCase() + inflected.slice(1);
    }
    return inflected;
}
/**
 * This function returns the plural form of a given word (basic English rules
 * and some irregulars).
 *
 * @param {string} word - The word to pluralize.
 * @returns {string} The pluralized word.
 */
function pluralize(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (uncountables.has(lower))
        return word;
    const irregular = irregulars[lower];
    if (irregular)
        return matchCase(word, irregular);
    if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
        return matchCase(word, `${word.slice(0, -1)}ies`);
    }
    if (takesEsSuffix(lower)) {
        return matchCase(word, `${word}es`);
    }
    return matchCase(word, `${word}s`);
}
/**
 * This function detects if a word is likely plural.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} True if likely plural, false otherwise.
 */
function detectPlural(word) {
    if (!word)
        return false;
    const lower = word.toLowerCase();
    if (uncountables.has(lower))
        return false;
    if (irregulars[lower])
        return false;
    if (singularIrregulars[lower])
        return true;
    if (lower.endsWith("ies") && lower.length > 3)
        return true;
    if (lower.endsWith("es") && takesEsSuffix(lower.slice(0, -2)))
        return true;
    if (lower.endsWith("s") &&
        !lower.endsWith("ss") &&
        !lower.endsWith("us") &&
        !lower.endsWith("is"))
        return true;
    return false;
}
/**
 * This function returns the singular form of a given word (basic English
 * rules and some irregulars).
 *
 * @param {string} word - The word to singularize.
 * @returns {string} The singularized word.
 */
function singularize(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (uncountables.has(lower))
        return word;
    const singular = singularIrregulars[lower];
    if (singular)
        return matchCase(word, singular);
    if (!detectPlural(word))
        return word;
    if (lower.endsWith("ies") && lower.length > 3) {
        return matchCase(word, `${word.slice(0, -3)}y`);
    }
    if (lower.endsWith("es") && takesEsSuffix(lower.slice(0, -2))) {
        return matchCase(word, word.slice(0, -2));
    }
    if (lower.endsWith("s") && !lower.endsWith("ss")) {
        return matchCase(word, word.slice(0, -1));
    }
    return word;
}
const comparativeIrregulars = {
    good: "better",
    bad: "worse",
    far: "farther",
    little: "less",
    much: "more",
    many: "more",
    well: "better",
};
const superlativeIrregulars = {
    good: "best",
    bad: "worst",
    far: "farthest",
    little: "least",
    much: "most",
    many: "most",
    well: "best",
};
/**
 * Estimates the number of syllables in a word using vowel-group counting
 * with silent-e adjustment.
 */
function countSyllables(word) {
    const lower = word.toLowerCase();
    const vowelGroups = lower.match(/[aeiouy]+/g);
    if (!vowelGroups)
        return 0;
    let count = vowelGroups.length;
    // Silent e at the end (but not words like "the", "be", "she")
    if (lower.endsWith("e") && count > 1 && lower.length > 3) {
        count--;
    }
    // Words ending in -le after a consonant (e.g., "simple", "table")
    if (lower.endsWith("le") && lower.length > 2) {
        const beforeLe = lower[lower.length - 3];
        if (beforeLe && !/[aeiou]/.test(beforeLe)) {
            count++;
        }
    }
    return Math.max(1, count);
}
/**
 * Returns true if the final consonant of a word should be doubled before
 * adding a vowel suffix (e.g., big -> bigger).
 */
function shouldDouble(word) {
    const lower = word.toLowerCase();
    if (lower.length < 2)
        return false;
    const last = lower[lower.length - 1];
    const secondLast = lower[lower.length - 2];
    // Must end in single consonant (not w, x, y)
    if (!/[bcdfghjklmnpqrstvz]/.test(last))
        return false;
    // Must have single vowel before the consonant
    if (!/[aeiou]/.test(secondLast))
        return false;
    // Must not have another vowel before that (to avoid doubling in words like "dream")
    if (lower.length >= 3 && /[aeiou]/.test(lower[lower.length - 3]))
        return false;
    return true;
}
/**
 * This function returns the comparative form of an adjective.
 *
 * Uses irregular forms for common words (good -> better) and heuristic rules
 * for regular adjectives:
 * - 1 syllable: add -er (fast -> faster)
 * - 1 syllable ending in CVC: double consonant (big -> bigger)
 * - 2 syllables ending in -y: change y to -ier (happy -> happier)
 * - 2 syllables ending in -e: add -r (large -> larger)
 * - 2 syllables ending in -le or -ow: add -er (simple -> simpler, narrow -> narrower)
 * - 3+ syllables: use "more" (beautiful -> more beautiful)
 *
 * @param {string} word - The adjective to make comparative.
 * @returns {string} The comparative form.
 */
function comparative(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (comparativeIrregulars[lower]) {
        return matchCase(word, comparativeIrregulars[lower]);
    }
    const syllables = countSyllables(lower);
    // 3+ syllables: use "more"
    if (syllables >= 3) {
        return matchCase(word, `more ${word}`);
    }
    // 2 syllables ending in -y: change y to -ier
    if (syllables === 2 && lower.endsWith("y")) {
        return matchCase(word, `${word.slice(0, -1)}ier`);
    }
    // 2 syllables ending in -le: add -r
    if (syllables === 2 && lower.endsWith("le")) {
        return matchCase(word, `${word}r`);
    }
    // 2 syllables ending in -ow: add -er
    if (syllables === 2 && lower.endsWith("ow")) {
        return matchCase(word, `${word}er`);
    }
    // 1 syllable ending in -e: add -r
    if (syllables === 1 && lower.endsWith("e")) {
        return matchCase(word, `${word}r`);
    }
    // 1 syllable with CVC pattern: double final consonant
    if (syllables === 1 && shouldDouble(lower)) {
        return matchCase(word, `${word}${word[word.length - 1]}er`);
    }
    // Default 1-2 syllables: add -er
    return matchCase(word, `${word}er`);
}
/**
 * This function returns the superlative form of an adjective.
 *
 * Uses irregular forms for common words (good -> best) and heuristic rules
 * for regular adjectives:
 * - 1 syllable: add -est (fast -> fastest)
 * - 1 syllable ending in CVC: double consonant (big -> biggest)
 * - 2 syllables ending in -y: change y to -iest (happy -> happiest)
 * - 2 syllables ending in -e: add -st (large -> largest)
 * - 2 syllables ending in -le or -ow: add -est (simple -> simplest, narrow -> narrowest)
 * - 3+ syllables: use "most" (beautiful -> most beautiful)
 *
 * @param {string} word - The adjective to make superlative.
 * @returns {string} The superlative form.
 */
function superlative(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (superlativeIrregulars[lower]) {
        return matchCase(word, superlativeIrregulars[lower]);
    }
    const syllables = countSyllables(lower);
    // 3+ syllables: use "most"
    if (syllables >= 3) {
        return matchCase(word, `most ${word}`);
    }
    // 2 syllables ending in -y: change y to -iest
    if (syllables === 2 && lower.endsWith("y")) {
        return matchCase(word, `${word.slice(0, -1)}iest`);
    }
    // 2 syllables ending in -le: add -st
    if (syllables === 2 && lower.endsWith("le")) {
        return matchCase(word, `${word}st`);
    }
    // 2 syllables ending in -ow: add -est
    if (syllables === 2 && lower.endsWith("ow")) {
        return matchCase(word, `${word}est`);
    }
    // 1 syllable ending in -e: add -st
    if (syllables === 1 && lower.endsWith("e")) {
        return matchCase(word, `${word}st`);
    }
    // 1 syllable with CVC pattern: double final consonant
    if (syllables === 1 && shouldDouble(lower)) {
        return matchCase(word, `${word}${word[word.length - 1]}est`);
    }
    // Default 1-2 syllables: add -est
    return matchCase(word, `${word}est`);
}
