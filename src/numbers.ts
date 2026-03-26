/**
 * This function returns the ordinal suffix for a given number.
 *
 * @param {number} number - The number to get the ordinal suffix for.
 * @returns {string} The ordinal suffix for the given number.
 */
export function getOrdinal(number: number): string {
  if (number > 3 && number < 21) {
    return "th";
  }

  const lastDigitOfNumber = number % 10;

  switch (lastDigitOfNumber) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

/**
 * This function converts a number to a roman numeral.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The roman numeral.
 */
export function romanize(num: number): string {
  if (Number.isNaN(num)) return Number.NaN.toString();
  const digits = String(+num).split("");
  const key = [
    "",
    "C",
    "CC",
    "CCC",
    "CD",
    "D",
    "DC",
    "DCC",
    "DCCC",
    "CM",
    "",
    "X",
    "XX",
    "XXX",
    "XL",
    "L",
    "LX",
    "LXX",
    "LXXX",
    "XC",
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
  ];
  let roman = "";
  let i = 3;
  while (i--) {
    if (digits.length > 0) {
      const digit = digits.pop();
      if (typeof digit === "string") {
        roman = (key[+digit + i * 10] || "") + roman;
      }
    }
  }
  return Array(+digits.join("") + 1).join("M") + roman;
}

const ONES = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const TEENS = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const SCALES = ["", "thousand", "million", "billion", "trillion"];

/**
 * Converts a number up to 999 into its English word equivalent.
 * @param {number} num - The number to convert (0-999).
 * @returns {string} The English word representation.
 */
function convertHundreds(num: number): string {
  if (num === 0) return "";
  let result = "";
  if (num > 99) {
    result += `${ONES[Math.floor(num / 100)]} hundred`;
    num %= 100;
    if (num > 0) result += " and ";
  }

  if (num > 9 && num < 20) {
    result += TEENS[num - 10];
  } else {
    if (num >= 20) {
      result += TENS[Math.floor(num / 10)];
      num %= 10;
      if (num > 0) result += "-";
    }
    if (num > 0 && num < 10) {
      result += ONES[num];
    }
  }
  return result;
}

/**
 * This function converts an integer to its English word equivalent.
 *
 * @param {number} number - The number to convert to words.
 * @returns {string} The text equivalent of the number.
 */
export function numberToWords(number: number): string {
  if (number === 0) return "zero";
  if (!Number.isInteger(number)) return number.toString();

  let isNegative = false;
  if (number < 0) {
    isNegative = true;
    number = Math.abs(number);
  }

  const parts: string[] = [];
  let scaleIndex = 0;

  while (number > 0) {
    const chunk = number % 1000;
    if (chunk > 0) {
      let chunkText = convertHundreds(chunk);
      if (SCALES[scaleIndex]) {
        chunkText += ` ${SCALES[scaleIndex]}`;
      }
      parts.unshift(chunkText);
    }
    number = Math.floor(number / 1000);
    scaleIndex++;
  }

  const result = parts.join(" ");
  return isNegative ? `negative ${result}` : result;
}

/**
 * This function converts an integer to its ordinal word equivalent (e.g. 1 -> "first").
 *
 * @param {number} number - The number to convert to an ordinal word.
 * @returns {string} The ordinal word equivalent.
 */
export function ordinalWord(number: number): string {
  if (!Number.isInteger(number)) return number.toString();
  if (number === 0) return "zeroth";

  const words = numberToWords(number);

  const ordinals: Record<string, string> = {
    one: "first",
    two: "second",
    three: "third",
    five: "fifth",
    eight: "eighth",
    nine: "ninth",
    twelve: "twelfth",
  };

  const tokens = words.split(/([-\s])/);
  const lastWord = tokens[tokens.length - 1];

  if (ordinals[lastWord]) {
    tokens[tokens.length - 1] = ordinals[lastWord];
  } else if (lastWord.endsWith("y")) {
    tokens[tokens.length - 1] = `${lastWord.slice(0, -1)}ieth`;
  } else {
    tokens[tokens.length - 1] = `${lastWord}th`;
  }

  return tokens.join("");
}
