import { describe, it, expect } from "vitest";

// src/index.test.ts
import {
    article,
    arrayToPhrase,
    capitalize,
    uncapitalize,
    title,
    getOrdinal,
    pronoun,
    removeEntry,
    romanize,
    pluralize,
} from "./index";

describe("article", () => {
    it("returns 'an' for words starting with a vowel", () => {
        expect(article("apple")).toBe("an");
        expect(article("orange", true)).toBe("an orange");
    });

    it("returns 'a' for words starting with a consonant", () => {
        expect(article("banana")).toBe("a");
        expect(article("banana", true)).toBe("a banana");
    });

    it("handles exceptions correctly", () => {
        expect(article("honor")).toBe("an");
        expect(article("honest", true)).toBe("an honest");
        expect(article("herb")).toBe("an");
    });

    it("returns 'a' for empty string", () => {
        expect(article("")).toBe("a");
    });
});

describe("arrayToPhrase", () => {
    it("returns the word itself for single element", () => {
        expect(arrayToPhrase(["apple"])).toBe("apple");
    });

    it("joins two words with 'and'", () => {
        expect(arrayToPhrase(["apple", "banana"])).toBe("apple and banana");
    });

    it("joins three or more words with commas and 'and'", () => {
        expect(arrayToPhrase(["apple", "banana", "cherry"])).toBe("apple, banana, and cherry");
        expect(arrayToPhrase(["a", "b", "c", "d"])).toBe("a, b, c, and d");
    });
});

describe("capitalize", () => {
    it("capitalizes the first letter", () => {
        expect(capitalize("apple")).toBe("Apple");
        expect(capitalize("Banana")).toBe("Banana");
    });
});

describe("uncapitalize", () => {
    it("uncapitalizes the first letter", () => {
        expect(uncapitalize("Apple")).toBe("apple");
        expect(uncapitalize("banana")).toBe("banana");
    });
});

describe("title", () => {
    it("capitalizes each word except 'of', 'the', 'a' (not first word)", () => {
        expect(title("the lord of the rings")).toBe("The Lord of the Rings");
        expect(title("a tale of two cities")).toBe("A Tale of Two Cities");
        expect(title("apple banana")).toBe("Apple Banana");
    });
});

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

    it("returns correct suffix for numbers ending in 1, 2, 3 (except 11, 12, 13)", () => {
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

describe("pronoun", () => {
    it("returns correct pronoun for female", () => {
        expect(pronoun("female", "subjective")).toBe("she");
        expect(pronoun("female", "possessive")).toBe("her");
        expect(pronoun("female", "objective")).toBe("her");
    });

    it("returns correct pronoun for male", () => {
        expect(pronoun("male", "subjective")).toBe("he");
        expect(pronoun("male", "possessive")).toBe("his");
        expect(pronoun("male", "objective")).toBe("him");
    });

    it("defaults to male pronouns for unknown gender", () => {
        expect(pronoun("other", "subjective")).toBe("he");
    });
});

describe("removeEntry", () => {
    it("removes the specified word from the array", () => {
        expect(removeEntry("apple", ["apple", "banana", "cherry"])).toEqual(["banana", "cherry"]);
        expect(removeEntry("banana", ["apple", "banana", "banana"])).toEqual(["apple"]);
    });

    it("returns the same array if word not found", () => {
        expect(removeEntry("pear", ["apple", "banana"])).toEqual(["apple", "banana"]);
    });

    it("returns empty array if all elements removed", () => {
        expect(removeEntry("a", ["a", "a"])).toEqual([]);
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
        expect(romanize(NaN)).toBeNaN();
    });
});

describe("pluralize", () => {
    it("returns empty string for empty input", () => {
        expect(pluralize("")).toBe("");
    });

    it("adds 's' for regular words", () => {
        expect(pluralize("cat")).toBe("cats");
        expect(pluralize("dog")).toBe("dogs");
    });

    it("changes 'y' to 'ies' for consonant + y", () => {
        expect(pluralize("party")).toBe("parties");
        expect(pluralize("city")).toBe("cities");
    });

    it("adds 's' for vowel + y", () => {
        expect(pluralize("key")).toBe("keys");
        expect(pluralize("boy")).toBe("boys");
    });

    it("adds 'es' for words ending in s, x, z, ch, sh", () => {
        expect(pluralize("bus")).toBe("buses");
        expect(pluralize("box")).toBe("boxes");
        expect(pluralize("buzz")).toBe("buzzes");
        expect(pluralize("church")).toBe("churches");
        expect(pluralize("dish")).toBe("dishes");
    });

    it("is case-insensitive for regular rules", () => {
        expect(pluralize("Bus")).toBe("Buses");
        expect(pluralize("CHURCH")).toBe("CHURCHes");
    });

    it("handles irregular plurals", () => {
        expect(pluralize("goose")).toBe("geese");
        expect(pluralize("Goose")).toBe("Geese");
        expect(pluralize("man")).toBe("men");
        expect(pluralize("woman")).toBe("women");
        expect(pluralize("child")).toBe("children");
        expect(pluralize("tooth")).toBe("teeth");
        expect(pluralize("foot")).toBe("feet");
        expect(pluralize("mouse")).toBe("mice");
        expect(pluralize("person")).toBe("people");
        expect(pluralize("cactus")).toBe("cacti");
        expect(pluralize("focus")).toBe("foci");
        expect(pluralize("fungus")).toBe("fungi");
        expect(pluralize("nucleus")).toBe("nuclei");
        expect(pluralize("syllabus")).toBe("syllabi");
        expect(pluralize("analysis")).toBe("analyses");
        expect(pluralize("diagnosis")).toBe("diagnoses");
        expect(pluralize("oasis")).toBe("oases");
        expect(pluralize("thesis")).toBe("theses");
        expect(pluralize("crisis")).toBe("crises");
        expect(pluralize("phenomenon")).toBe("phenomena");
        expect(pluralize("criterion")).toBe("criteria");
        expect(pluralize("datum")).toBe("data");
    });
});