/**
 * This function removes a word from an array of words.
 *
 * @param {string} word - The word to remove.
 * @param {string[]} words - The array of words to remove the word from.
 * @returns {string[]} The array of words with the word removed.
 */
export function removeEntry(word: string, words: string[]): string[] {
  const newWords = [];

  for (let i = 0; i < words.length; i++) {
    if (words[i] !== word) {
      newWords.push(words[i]);
    }
  }

  return newWords;
}
