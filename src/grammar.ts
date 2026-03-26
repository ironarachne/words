import { pluralize } from "./inflection.js";
import { numberToWords } from "./numbers.js";

/**
 * This function returns the correct article for a given word.
 *
 * @param {string} word - The word to get the article for.
 * @param {boolean} appendWord - Whether or not to append the word to the article.
 * @returns {string} The article for the given word.
 */
export function article(word: string, appendWord = false): string {
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
export function pronoun(gender: string, wordCase: string): string {
  let pronoun = "";

  if (gender === "female") {
    if (wordCase === "subjective") {
      pronoun = "she";
    } else if (wordCase === "possessive") {
      pronoun = "her";
    } else if (wordCase === "objective") {
      pronoun = "her";
    }
  } else {
    if (wordCase === "subjective") {
      pronoun = "he";
    } else if (wordCase === "possessive") {
      pronoun = "his";
    } else if (wordCase === "objective") {
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
export function quantify(
  count: number,
  singular: string,
  plural?: string,
  asWords = false,
): string {
  const numStr = asWords ? numberToWords(count) : count.toString();
  const wordStr = count === 1 ? singular : (plural ?? pluralize(singular));
  return `${numStr} ${wordStr}`;
}

/**
 * Returns "is" for count 1, "are" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "is" or "are".
 */
export function isAre(count: number): string {
  return count === 1 ? "is" : "are";
}

/**
 * Returns "has" for count 1, "have" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "has" or "have".
 */
export function hasHave(count: number): string {
  return count === 1 ? "has" : "have";
}

/**
 * Returns "was" for count 1, "were" otherwise.
 * @param {number} count - The number of items.
 * @returns {string} "was" or "were".
 */
export function wasWere(count: number): string {
  return count === 1 ? "was" : "were";
}

/**
 * Returns the possessive form of a noun.
 * @param {string} noun - The noun to make possessive.
 * @returns {string} The possessive form.
 */
export function possessive(noun: string): string {
  if (!noun) return "";
  if (noun.endsWith("s") || noun.endsWith("S")) {
    return `${noun}'`;
  }
  return `${noun}'s`;
}
