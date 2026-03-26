"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralize = pluralize;
exports.detectPlural = detectPlural;
exports.singularize = singularize;
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
};
const singularIrregulars = Object.fromEntries(Object.entries(irregulars).map(([singular, plural]) => [plural, singular]));
/**
 * This function returns the plural form of a given word (basic English rules and some irregulars).
 *
 * @param {string} word - The word to pluralize.
 * @returns {string} The pluralized word.
 */
function pluralize(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (irregulars[lower]) {
        // Preserve case of first letter
        return word[0] === word[0].toUpperCase()
            ? irregulars[lower][0].toUpperCase() + irregulars[lower].slice(1)
            : irregulars[lower];
    }
    if (lower.endsWith("y") && !/[aeiou]y$/.test(lower)) {
        return `${word.slice(0, -1)}ies`;
    }
    if (lower.endsWith("s") ||
        lower.endsWith("x") ||
        lower.endsWith("z") ||
        lower.endsWith("ch") ||
        lower.endsWith("sh")) {
        return `${word}es`;
    }
    return `${word}s`;
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
    if (singularIrregulars[lower]) {
        return true;
    }
    if (irregulars[lower]) {
        return false; // It's strictly one of our known singulars
    }
    // Basic heuristics for plural rules
    if (lower.endsWith("ies") && lower.length > 3)
        return true;
    if (lower.endsWith("es") &&
        (lower.endsWith("ches") ||
            lower.endsWith("shes") ||
            lower.endsWith("xes") ||
            lower.endsWith("zes") ||
            lower.endsWith("sses") ||
            lower.endsWith("uses")))
        return true;
    if (lower.endsWith("s") &&
        !lower.endsWith("ss") &&
        !lower.endsWith("us") &&
        !lower.endsWith("is"))
        return true;
    return false;
}
/**
 * This function returns the singular form of a given word (basic English rules and some irregulars).
 *
 * @param {string} word - The word to singularize.
 * @returns {string} The singularized word.
 */
function singularize(word) {
    if (!word)
        return "";
    const lower = word.toLowerCase();
    if (singularIrregulars[lower]) {
        return word[0] === word[0].toUpperCase()
            ? singularIrregulars[lower][0].toUpperCase() +
                singularIrregulars[lower].slice(1)
            : singularIrregulars[lower];
    }
    // Already singular heuristic skip
    if (!detectPlural(word)) {
        return word;
    }
    if (lower.endsWith("ies") &&
        !lower.endsWith("eies") &&
        !lower.endsWith("aies")) {
        return `${word.slice(0, -3)}y`;
    }
    if (lower.endsWith("es") &&
        (lower.endsWith("ches") ||
            lower.endsWith("shes") ||
            lower.endsWith("xes") ||
            lower.endsWith("zes") ||
            lower.endsWith("sses") ||
            lower.endsWith("uses"))) {
        return word.slice(0, -2);
    }
    if (lower.endsWith("s") && !lower.endsWith("ss")) {
        return word.slice(0, -1);
    }
    return word;
}
// Just replacing the bottom part
