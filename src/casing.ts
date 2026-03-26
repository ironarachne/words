/**
 * This function capitalizes the first letter of a word.
 *
 * @param {string} word - The word to capitalize.
 * @returns {string} The capitalized word.
 */
export function capitalize(word: string): string {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1);
}

/**
 * This function uncapitalizes the first letter of a word.
 *
 * @param {string} word - The word to uncapitalize.
 * @returns {string} The uncapitalized word.
 */
export function uncapitalize(word: string): string {
  if (!word) return word;
  return word[0].toLowerCase() + word.slice(1);
}

/**
 * This function capitalizes the first letter of each word in a phrase.
 *
 * @param {string} phrase - The phrase to capitalize.
 * @returns {string} The capitalized phrase.
 */
export function title(phrase: string): string {
  if (!phrase) return phrase;
  const elements = phrase.split(" ");
  let result = "";

  for (let i = 0; i < elements.length; i++) {
    if (i !== 0 && ["of", "the", "a"].includes(elements[i])) {
      result += `${elements[i].toLowerCase()} `;
    } else {
      result += `${capitalize(elements[i])} `;
    }
  }

  result = result.trimEnd();

  return result;
}

/**
 * Helper function to split a phrase into words, handling various separators.
 * @param {string} phrase - The phrase to split.
 * @returns {string[]} An array of words.
 */
function splitWords(phrase: string): string[] {
  return phrase.split(/[-_/\s]+/).filter(Boolean);
}

/**
 * This function converts a phrase into camelCase.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The camelCase phrase.
 */
export function camelCase(phrase: string): string {
  if (!phrase) return phrase;
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
export function snakeCase(phrase: string): string {
  if (!phrase) return phrase;
  const words = splitWords(phrase);
  return words.map((word) => word.toLowerCase()).join("_");
}

/**
 * This function converts a phrase into kebab-case.
 *
 * @param {string} phrase - The phrase to convert.
 * @returns {string} The kebab-case phrase.
 */
export function kebabCase(phrase: string): string {
  if (!phrase) return phrase;
  const words = splitWords(phrase);
  return words.map((word) => word.toLowerCase()).join("-");
}

/**
 * This function swaps the casing of each letter in a word.
 *
 * @param {string} word - The word to convert.
 * @returns {string} The converted word.
 */
export function swapCase(word: string): string {
  if (!word) return word;
  let result = "";
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (char === char.toUpperCase()) {
      result += char.toLowerCase();
    } else {
      result += char.toUpperCase();
    }
  }
  return result;
}
