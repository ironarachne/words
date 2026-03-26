import { describe, expect, it } from "vitest";
import {
  article,
  hasHave,
  isAre,
  possessive,
  pronoun,
  quantify,
  wasWere,
} from "./grammar.js";

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

describe("quantify", () => {
  it("pluralizes appropriately based on count", () => {
    expect(quantify(1, "apple")).toBe("1 apple");
    expect(quantify(2, "apple")).toBe("2 apples");
    expect(quantify(0, "apple")).toBe("0 apples");
  });

  it("converts numbers to words if requested", () => {
    expect(quantify(1, "apple", undefined, true)).toBe("one apple");
    expect(quantify(21, "apple", undefined, true)).toBe("twenty-one apples");
  });

  it("uses custom plural if provided", () => {
    expect(quantify(2, "person", "persons")).toBe("2 persons");
  });
});

describe("copulas and verbs (isAre, hasHave, wasWere)", () => {
  it("returns singular forms for count 1", () => {
    expect(isAre(1)).toBe("is");
    expect(hasHave(1)).toBe("has");
    expect(wasWere(1)).toBe("was");
  });

  it("returns plural forms for count != 1", () => {
    expect(isAre(2)).toBe("are");
    expect(hasHave(0)).toBe("have");
    expect(wasWere(5)).toBe("were");
  });
});

describe("possessive", () => {
  it("returns correct normal possessive", () => {
    expect(possessive("John")).toBe("John's");
    expect(possessive("dog")).toBe("dog's");
  });

  it("returns correct trailing s possessive", () => {
    expect(possessive("James")).toBe("James'");
    expect(possessive("dogs")).toBe("dogs'");
    expect(possessive("JESUS")).toBe("JESUS'");
  });
});

describe("quantify", () => {
  it("pluralizes appropriately based on count", () => {
    expect(quantify(1, "apple")).toBe("1 apple");
    expect(quantify(2, "apple")).toBe("2 apples");
    expect(quantify(0, "apple")).toBe("0 apples");
  });

  it("converts numbers to words if requested", () => {
    expect(quantify(1, "apple", undefined, true)).toBe("one apple");
    expect(quantify(21, "apple", undefined, true)).toBe("twenty-one apples");
  });

  it("uses custom plural if provided", () => {
    expect(quantify(2, "person", "persons")).toBe("2 persons");
  });
});

describe("copulas and verbs (isAre, hasHave, wasWere)", () => {
  it("returns singular forms for count 1", () => {
    expect(isAre(1)).toBe("is");
    expect(hasHave(1)).toBe("has");
    expect(wasWere(1)).toBe("was");
  });

  it("returns plural forms for count != 1", () => {
    expect(isAre(2)).toBe("are");
    expect(hasHave(0)).toBe("have");
    expect(wasWere(5)).toBe("were");
  });
});

describe("possessive", () => {
  it("returns correct normal possessive", () => {
    expect(possessive("John")).toBe("John's");
    expect(possessive("dog")).toBe("dog's");
  });

  it("returns correct trailing s possessive", () => {
    expect(possessive("James")).toBe("James'");
    expect(possessive("dogs")).toBe("dogs'");
    expect(possessive("JESUS")).toBe("JESUS'");
  });
});

describe("quantify", () => {
  it("pluralizes appropriately based on count", () => {
    expect(quantify(1, "apple")).toBe("1 apple");
    expect(quantify(2, "apple")).toBe("2 apples");
    expect(quantify(0, "apple")).toBe("0 apples");
  });

  it("converts numbers to words if requested", () => {
    expect(quantify(1, "apple", undefined, true)).toBe("one apple");
    expect(quantify(21, "apple", undefined, true)).toBe("twenty-one apples");
  });

  it("uses custom plural if provided", () => {
    expect(quantify(2, "person", "persons")).toBe("2 persons");
  });
});

describe("copulas and verbs (isAre, hasHave, wasWere)", () => {
  it("returns singular forms for count 1", () => {
    expect(isAre(1)).toBe("is");
    expect(hasHave(1)).toBe("has");
    expect(wasWere(1)).toBe("was");
  });

  it("returns plural forms for count != 1", () => {
    expect(isAre(2)).toBe("are");
    expect(hasHave(0)).toBe("have");
    expect(wasWere(5)).toBe("were");
  });
});

describe("possessive", () => {
  it("returns correct normal possessive", () => {
    expect(possessive("John")).toBe("John's");
    expect(possessive("dog")).toBe("dog's");
  });

  it("returns correct trailing s possessive", () => {
    expect(possessive("James")).toBe("James'");
    expect(possessive("dogs")).toBe("dogs'");
    expect(possessive("JESUS")).toBe("JESUS'");
  });
});
