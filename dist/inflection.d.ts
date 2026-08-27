/**
 * This function returns the plural form of a given word (basic English rules
 * and some irregulars).
 *
 * @param {string} word - The word to pluralize.
 * @returns {string} The pluralized word.
 */
export declare function pluralize(word: string): string;
/**
 * This function detects if a word is likely plural.
 *
 * @param {string} word - The word to check.
 * @returns {boolean} True if likely plural, false otherwise.
 */
export declare function detectPlural(word: string): boolean;
/**
 * This function returns the singular form of a given word (basic English
 * rules and some irregulars).
 *
 * @param {string} word - The word to singularize.
 * @returns {string} The singularized word.
 */
export declare function singularize(word: string): string;
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
export declare function comparative(word: string): string;
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
export declare function superlative(word: string): string;
