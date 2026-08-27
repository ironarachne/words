import { capitalize } from "./casing.js";

/**
 * This function takes an array of words and returns a phrase connected by
 * commas and a conjunction. Falsy entries are filtered out.
 *
 * @param {string[]} words - The array of words to convert to a phrase.
 * @param {string} [conjunction="and"] - The conjunction to use.
 * @returns {string} The phrase.
 */
export function arrayToPhrase(words: string[], conjunction = "and"): string {
  const filtered = words.filter(Boolean);
  if (filtered.length === 0) return "";
  if (filtered.length === 1) {
    return filtered[0];
  }

  if (filtered.length === 2) {
    return `${filtered[0]} ${conjunction} ${filtered[1]}`;
  }

  let phrase = "";

  for (let i = 0; i < filtered.length; i++) {
    if (i === filtered.length - 1) {
      phrase += `, ${conjunction} ${filtered[i]}`;
    } else if (i === 0) {
      phrase = filtered[i];
    } else {
      phrase += `, ${filtered[i]}`;
    }
  }

  return phrase;
}

/**
 * This function converts a phrase into a URL-friendly slug.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The URL-friendly slug.
 */
export function slugify(phrase: string): string {
  return phrase
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_/]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * This function truncates a string to a specific number of words.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxWords - The maximum number of words (must be non-negative).
 * @param {string} [suffix="..."] - The suffix to append if truncated.
 * @returns {string} The truncated text.
 * @throws {RangeError} If maxWords is negative.
 */
export function truncateWords(
  text: string,
  maxWords: number,
  suffix = "...",
): string {
  if (maxWords < 0) {
    throw new RangeError("maxWords must be non-negative");
  }
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + suffix;
}

/**
 * This function removes all punctuation from a phrase, including Unicode
 * punctuation and symbol characters (quotes, brackets, em-dashes, etc.).
 *
 * @param {string} text - The text to process.
 * @returns {string} The text without punctuation.
 */
export function stripPunctuation(text: string): string {
  return text.replace(/[\p{P}\p{S}]/gu, "").replace(/\s{2,}/g, " ");
}

/**
 * This function collapses multiple spaces into a single space and trims ends.
 *
 * @param {string} text - The text to process.
 * @returns {string} The squished text.
 */
export function squish(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/**
 * This function accurately counts the words in a text block.
 * Hyphenated words count as a single word.
 *
 * @param {string} text - The text to process.
 * @returns {number} The word count.
 */
export function wordCount(text: string): number {
  const plainText = stripPunctuation(squish(text));
  return plainText ? plainText.split(" ").length : 0;
}

/**
 * This function calculates the estimated reading time in minutes for a block
 * of text.
 *
 * @param {string} text - The text to process.
 * @param {number} [wordsPerMinute=200] - The expected reading speed in words
 *   per minute (must be positive).
 * @returns {number} The estimated reading time in minutes.
 * @throws {RangeError} If wordsPerMinute is not positive.
 */
export function readingTime(text: string, wordsPerMinute = 200): number {
  if (wordsPerMinute <= 0) {
    throw new RangeError("wordsPerMinute must be positive");
  }
  const count = wordCount(text);
  return Math.ceil(count / wordsPerMinute);
}

/**
 * Fixes common punctuation errors like duplicate spaces, duplicate
 * punctuation, space before punctuation, and trailing spacing.
 * Preserves ellipses ("...") from being collapsed into single periods.
 *
 * @param {string} text - The text to fix.
 * @returns {string} The text with fixed punctuation.
 */
export function fixPunctuation(text: string): string {
  if (!text) return "";
  return text
    .replace(/\.{3,}/g, "\u2026")
    .replace(/\s+([.,;:!?…])/g, "$1")
    .replace(/([.,;:!?])\1+/g, "$1")
    .replace(/\u2026/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Combines an array of string parts into a sentence, fixing punctuation,
 * capitalizing the first letter, and ensuring it ends in terminal punctuation.
 * Terminal punctuation is placed inside any trailing quotation marks or
 * brackets (American style).
 *
 * @param {string[]} parts - Parts of the sentence.
 * @returns {string} The formatted sentence.
 */
export function buildSentence(parts: string[]): string {
  if (!parts || parts.length === 0) return "";
  let sentence = fixPunctuation(parts.filter(Boolean).join(" "));
  if (!sentence) return "";

  sentence = capitalize(sentence);

  const closingMatch = sentence.match(/(["')\]]+)$/);
  if (closingMatch) {
    const core = sentence.slice(0, -closingMatch[1].length);
    if (!/[.!?]$/.test(core)) {
      sentence = `${core}.${closingMatch[1]}`;
    }
  } else if (!/[.!?]$/.test(sentence)) {
    sentence += ".";
  }

  return sentence;
}
