import { describe, expect, it } from "vitest";
import { detectPlural, pluralize, singularize } from "./inflection.js";

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
    expect(pluralize("child")).toBe("children");
    expect(pluralize("tooth")).toBe("teeth");
    expect(pluralize("mouse")).toBe("mice");
    expect(pluralize("person")).toBe("people");
    expect(pluralize("radius")).toBe("radii");
    expect(pluralize("matrix")).toBe("matrices");
  });
});

describe("singularize", () => {
  it("handles standard s endings", () => {
    expect(singularize("cats")).toBe("cat");
    expect(singularize("dogs")).toBe("dog");
  });

  it("handles es endings", () => {
    expect(singularize("boxes")).toBe("box");
    expect(singularize("churches")).toBe("church");
    expect(singularize("buses")).toBe("bus");
    expect(singularize("matches")).toBe("match");
  });

  it("handles ies endings", () => {
    expect(singularize("parties")).toBe("party");
    expect(singularize("cities")).toBe("city");
  });

  it("handles irregular nouns", () => {
    expect(singularize("geese")).toBe("goose");
    expect(singularize("Geese")).toBe("Goose");
    expect(singularize("men")).toBe("man");
    expect(singularize("children")).toBe("child");
    expect(singularize("teeth")).toBe("tooth");
    expect(singularize("mice")).toBe("mouse");
    expect(singularize("people")).toBe("person");
    expect(singularize("matrices")).toBe("matrix");
  });

  it("returns original if already singular", () => {
    expect(singularize("cat")).toBe("cat");
    expect(singularize("bus")).toBe("bus");
    expect(singularize("goose")).toBe("goose");
  });
});

describe("detectPlural", () => {
  it("returns true for plurals", () => {
    expect(detectPlural("cats")).toBe(true);
    expect(detectPlural("boxes")).toBe(true);
    expect(detectPlural("parties")).toBe(true);
    expect(detectPlural("geese")).toBe(true);
    expect(detectPlural("children")).toBe(true);
  });

  it("returns false for singulars", () => {
    expect(detectPlural("cat")).toBe(false);
    expect(detectPlural("box")).toBe(false);
    expect(detectPlural("party")).toBe(false);
    expect(detectPlural("goose")).toBe(false);
    expect(detectPlural("child")).toBe(false);
    expect(detectPlural("bus")).toBe(false);
    expect(detectPlural("cactus")).toBe(false);
  });
});
