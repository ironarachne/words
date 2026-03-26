import { describe, expect, it } from "vitest";
import { getOrdinal, numberToWords, ordinalWord, romanize } from "./numbers.js";

describe("getOrdinal", () => {
  it("returns correct ordinal suffix for 1, 2, 3", () => {
    expect(getOrdinal(1)).toBe("st");
    expect(getOrdinal(2)).toBe("nd");
    expect(getOrdinal(3)).toBe("rd");
  });

  it("returns 'th' for 4-20", () => {
    expect(getOrdinal(4)).toBe("th");
    expect(getOrdinal(11)).toBe("th");
    expect(getOrdinal(20)).toBe("th");
  });

  it("returns correct suffix for numbers ending in 1, 2, 3", () => {
    expect(getOrdinal(21)).toBe("st");
    expect(getOrdinal(22)).toBe("nd");
    expect(getOrdinal(23)).toBe("rd");
    expect(getOrdinal(101)).toBe("st");
  });

  it("returns 'th' for other numbers", () => {
    expect(getOrdinal(0)).toBe("th");
    expect(getOrdinal(100)).toBe("th");
  });
});

describe("romanize", () => {
  it("returns correct roman numeral for 1-10", () => {
    expect(romanize(1)).toBe("I");
    expect(romanize(4)).toBe("IV");
    expect(romanize(9)).toBe("IX");
    expect(romanize(10)).toBe("X");
  });

  it("returns correct roman numeral for 40, 90, 400, 900", () => {
    expect(romanize(40)).toBe("XL");
    expect(romanize(90)).toBe("XC");
    expect(romanize(400)).toBe("CD");
    expect(romanize(900)).toBe("CM");
  });

  it("returns correct roman numeral for 1987", () => {
    expect(romanize(1987)).toBe("MCMLXXXVII");
  });

  it("returns NaN for NaN input", () => {
    expect(romanize(NaN)).toBe("NaN");
  });
});

describe("numberToWords", () => {
  it("converts basic numbers", () => {
    expect(numberToWords(0)).toBe("zero");
    expect(numberToWords(1)).toBe("one");
    expect(numberToWords(15)).toBe("fifteen");
    expect(numberToWords(42)).toBe("forty-two");
  });

  it("converts hundreds", () => {
    expect(numberToWords(100)).toBe("one hundred");
    expect(numberToWords(123)).toBe("one hundred and twenty-three");
  });

  it("converts large numbers", () => {
    expect(numberToWords(1000)).toBe("one thousand");
    expect(numberToWords(1042)).toBe("one thousand forty-two");
    expect(numberToWords(1000000)).toBe("one million");
    expect(numberToWords(1234567)).toBe(
      "one million two hundred and thirty-four thousand five hundred and sixty-seven",
    );
  });

  it("handles negatives", () => {
    expect(numberToWords(-42)).toBe("negative forty-two");
  });
});

describe("ordinalWord", () => {
  it("handles basic ordinals", () => {
    expect(ordinalWord(1)).toBe("first");
    expect(ordinalWord(2)).toBe("second");
    expect(ordinalWord(3)).toBe("third");
    expect(ordinalWord(4)).toBe("fourth");
    expect(ordinalWord(5)).toBe("fifth");
  });

  it("handles -y ending words", () => {
    expect(ordinalWord(20)).toBe("twentieth");
    expect(ordinalWord(30)).toBe("thirtieth");
  });

  it("handles compound words", () => {
    expect(ordinalWord(21)).toBe("twenty-first");
    expect(ordinalWord(42)).toBe("forty-second");
    expect(ordinalWord(100)).toBe("one hundredth");
  });
});
