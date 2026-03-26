import { capitalize } from "./casing.js";

/**
 * This function takes an array of words and returns a phrase connected by commas and a conjunction.
 *
 * @param {string[]} words - The array of words to convert to a phrase.
 * @param {string} [conjunction="and"] - The conjunction to use.
 * @returns {string} The phrase.
 */
export function arrayToPhrase(words: string[], conjunction = "and"): string {
  if (words.length === 0) return "";
  if (words.length === 1) {
    return words[0];
  }

  if (words.length === 2) {
    return `${words[0]} ${conjunction} ${words[1]}`;
  }

  let phrase = "";

  for (let i = 0; i < words.length; i++) {
    if (i === words.length - 1) {
      if (words.length > 2) {
        phrase += ",";
      }
      phrase += ` ${conjunction} ${words[i]}`;
    } else if (i === 0) {
      phrase = words[i];
    } else {
      phrase += `, ${words[i]}`;
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
 * @param {number} maxWords - The maximum number of words.
 * @param {string} [suffix="..."] - The suffix to append if truncated.
 * @returns {string} The truncated text.
 */
export function truncateWords(
  text: string,
  maxWords: number,
  suffix = "...",
): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + suffix;
}

/**
 * This function removes all punctuation from a phrase.
 *
 * @param {string} text - The text to process.
 * @returns {string} The text without punctuation.
 */
export function stripPunctuation(text: string): string {
  return text.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, "").replace(/\s{2,}/g, " ");
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
 *
 * @param {string} text - The text to process.
 * @returns {number} The word count.
 */
export function wordCount(text: string): number {
  const plainText = stripPunctuation(squish(text));
  return plainText ? plainText.split(" ").length : 0;
}

/**
 * This function calculates the estimated reading time in minutes for a block of text.
 *
 * @param {string} text - The text to process.
 * @param {number} [wordsPerMinute=200] - The expected reading speed in words per minute.
 * @returns {number} The estimated reading time in minutes.
 */
export function readingTime(text: string, wordsPerMinute = 200): number {
  const count = wordCount(text);
  return Math.ceil(count / wordsPerMinute);
}

/**
 * Fixes common punctuation errors like duplicate spaces, duplicate punctuation,
 * space before punctuation, and trailing spacing.
 * @param {string} text - The text to fix.
 * @returns {string} The text with fixed punctuation.
 */
export function fixPunctuation(text: string): string {
  if (!text) return "";
  return text
    .replace(/\s+([.,;:!?])/g, "$1") // no space before punctuation
    .replace(/([.,;:!?])\1+/g, "$1") // no duplicate punctuation
    .replace(/\s+/g, " ") // collapse spaces
    .trim();
}

/**
 * Combines an array of string parts into a sentence, fixing punctuation,
 * capitalizing the first letter, and ensuring it ends in terminal punctuation.
 * @param {string[]} parts - Parts of the sentence.
 * @returns {string} The formatted sentence.
 */
export function buildSentence(parts: string[]): string {
  if (!parts || parts.length === 0) return "";
  let sentence = fixPunctuation(parts.filter(Boolean).join(" "));
  if (!sentence) return "";

  sentence = capitalize(sentence);

  if (!/[.!?]$/.test(sentence)) {
    sentence += ".";
  }

  return sentence;
}
