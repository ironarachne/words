import { describe, expect, it } from "vitest";
import {
  comparative,
  detectPlural,
  pluralize,
  singularize,
  superlative,
} from "./inflection.js";

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

  it("preserves ALL CAPS casing", () => {
    expect(pluralize("CHURCH")).toBe("CHURCHES");
    expect(pluralize("GOOSE")).toBe("GEESE");
    expect(pluralize("BUS")).toBe("BUSES");
  });

  it("handles disambiguation entries", () => {
    expect(pluralize("quiz")).toBe("quizzes");
    expect(pluralize("house")).toBe("houses");
    expect(pluralize("tie")).toBe("ties");
    expect(pluralize("movie")).toBe("movies");
    expect(pluralize("gas")).toBe("gases");
  });

  it("treats uncountables as their own plural", () => {
    expect(pluralize("news")).toBe("news");
    expect(pluralize("mathematics")).toBe("mathematics");
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

  it("does not over-strip words ending in 'uses'", () => {
    expect(singularize("houses")).toBe("house");
    expect(singularize("causes")).toBe("cause");
    expect(singularize("uses")).toBe("use");
    expect(singularize("spouses")).toBe("spouse");
    expect(singularize("excuses")).toBe("excuse");
  });

  it("handles ie-stem plurals correctly", () => {
    expect(singularize("ties")).toBe("tie");
    expect(singularize("dies")).toBe("die");
    expect(singularize("movies")).toBe("movie");
    expect(singularize("zombies")).toBe("zombie");
    expect(singularize("calories")).toBe("calorie");
  });

  it("un-doubles quizzes", () => {
    expect(singularize("quizzes")).toBe("quiz");
  });

  it("handles uncountables", () => {
    expect(singularize("news")).toBe("news");
    expect(singularize("physics")).toBe("physics");
  });

  it("preserves ALL CAPS casing", () => {
    expect(singularize("GEESE")).toBe("GOOSE");
    expect(singularize("CHURCHES")).toBe("CHURCH");
  });
});

describe("detectPlural", () => {
  it("returns true for plurals", () => {
    expect(detectPlural("cats")).toBe(true);
    expect(detectPlural("boxes")).toBe(true);
    expect(detectPlural("parties")).toBe(true);
    expect(detectPlural("geese")).toBe(true);
    expect(detectPlural("children")).toBe(true);
    expect(detectPlural("houses")).toBe(true);
    expect(detectPlural("movies")).toBe(true);
    expect(detectPlural("ties")).toBe(true);
  });

  it("returns false for singulars", () => {
    expect(detectPlural("cat")).toBe(false);
    expect(detectPlural("box")).toBe(false);
    expect(detectPlural("party")).toBe(false);
    expect(detectPlural("goose")).toBe(false);
    expect(detectPlural("child")).toBe(false);
    expect(detectPlural("bus")).toBe(false);
    expect(detectPlural("cactus")).toBe(false);
    expect(detectPlural("house")).toBe(false);
    expect(detectPlural("news")).toBe(false);
    expect(detectPlural("sheep")).toBe(false);
    expect(detectPlural("series")).toBe(false);
  });
});

describe("round-trip singularize(pluralize(w))", () => {
  const words = [
    "cat",
    "dog",
    "bus",
    "box",
    "church",
    "dish",
    "party",
    "city",
    "key",
    "boy",
    "goose",
    "man",
    "child",
    "tooth",
    "mouse",
    "person",
    "radius",
    "matrix",
    "quiz",
    "house",
    "cause",
    "use",
    "tie",
    "movie",
    "gas",
    "lens",
    "news",
    "sheep",
    "CHURCH",
    "Goose",
  ];
  for (const w of words) {
    it(`${w} -> ${pluralize(w)} -> ${w}`, () => {
      expect(singularize(pluralize(w))).toBe(w);
    });
  }
});

describe("comparative", () => {
  it("returns empty string for empty input", () => {
    expect(comparative("")).toBe("");
  });

  it("handles irregular forms", () => {
    expect(comparative("good")).toBe("better");
    expect(comparative("bad")).toBe("worse");
    expect(comparative("far")).toBe("farther");
    expect(comparative("little")).toBe("less");
    expect(comparative("much")).toBe("more");
    expect(comparative("many")).toBe("more");
    expect(comparative("well")).toBe("better");
  });

  it("adds -er for 1-syllable words", () => {
    expect(comparative("fast")).toBe("faster");
    expect(comparative("tall")).toBe("taller");
    expect(comparative("cold")).toBe("colder");
    expect(comparative("warm")).toBe("warmer");
  });

  it("adds -r for 1-syllable words ending in -e", () => {
    expect(comparative("large")).toBe("larger");
    expect(comparative("nice")).toBe("nicer");
    expect(comparative("safe")).toBe("safer");
  });

  it("doubles final consonant for CVC pattern", () => {
    expect(comparative("big")).toBe("bigger");
    expect(comparative("hot")).toBe("hotter");
    expect(comparative("fat")).toBe("fatter");
    expect(comparative("thin")).toBe("thinner");
    expect(comparative("sad")).toBe("sadder");
  });

  it("changes y to -ier for 2-syllable words", () => {
    expect(comparative("happy")).toBe("happier");
    expect(comparative("easy")).toBe("easier");
    expect(comparative("busy")).toBe("busier");
    expect(comparative("lazy")).toBe("lazier");
  });

  it("adds -r for 2-syllable words ending in -le", () => {
    expect(comparative("simple")).toBe("simpler");
    expect(comparative("gentle")).toBe("gentler");
    expect(comparative("noble")).toBe("nobler");
  });

  it("adds -er for 2-syllable words ending in -ow", () => {
    expect(comparative("narrow")).toBe("narrower");
    expect(comparative("shallow")).toBe("shallower");
  });

  it("uses 'more' for 3+ syllable words", () => {
    expect(comparative("beautiful")).toBe("more beautiful");
    expect(comparative("intelligent")).toBe("more intelligent");
    expect(comparative("interesting")).toBe("more interesting");
  });

  it("preserves casing", () => {
    expect(comparative("Good")).toBe("Better");
    expect(comparative("GOOD")).toBe("BETTER");
    expect(comparative("Big")).toBe("Bigger");
    expect(comparative("BIG")).toBe("BIGGER");
  });
});

describe("superlative", () => {
  it("returns empty string for empty input", () => {
    expect(superlative("")).toBe("");
  });

  it("handles irregular forms", () => {
    expect(superlative("good")).toBe("best");
    expect(superlative("bad")).toBe("worst");
    expect(superlative("far")).toBe("farthest");
    expect(superlative("little")).toBe("least");
    expect(superlative("much")).toBe("most");
    expect(superlative("many")).toBe("most");
    expect(superlative("well")).toBe("best");
  });

  it("adds -est for 1-syllable words", () => {
    expect(superlative("fast")).toBe("fastest");
    expect(superlative("tall")).toBe("tallest");
    expect(superlative("cold")).toBe("coldest");
    expect(superlative("warm")).toBe("warmest");
  });

  it("adds -st for 1-syllable words ending in -e", () => {
    expect(superlative("large")).toBe("largest");
    expect(superlative("nice")).toBe("nicest");
    expect(superlative("safe")).toBe("safest");
  });

  it("doubles final consonant for CVC pattern", () => {
    expect(superlative("big")).toBe("biggest");
    expect(superlative("hot")).toBe("hottest");
    expect(superlative("fat")).toBe("fattest");
    expect(superlative("thin")).toBe("thinnest");
    expect(superlative("sad")).toBe("saddest");
  });

  it("changes y to -iest for 2-syllable words", () => {
    expect(superlative("happy")).toBe("happiest");
    expect(superlative("easy")).toBe("easiest");
    expect(superlative("busy")).toBe("busiest");
    expect(superlative("lazy")).toBe("laziest");
  });

  it("adds -st for 2-syllable words ending in -le", () => {
    expect(superlative("simple")).toBe("simplest");
    expect(superlative("gentle")).toBe("gentlest");
    expect(superlative("noble")).toBe("noblest");
  });

  it("adds -est for 2-syllable words ending in -ow", () => {
    expect(superlative("narrow")).toBe("narrowest");
    expect(superlative("shallow")).toBe("shallowest");
  });

  it("uses 'most' for 3+ syllable words", () => {
    expect(superlative("beautiful")).toBe("most beautiful");
    expect(superlative("intelligent")).toBe("most intelligent");
    expect(superlative("interesting")).toBe("most interesting");
  });

  it("preserves casing", () => {
    expect(superlative("Good")).toBe("Best");
    expect(superlative("GOOD")).toBe("BEST");
    expect(superlative("Big")).toBe("Biggest");
    expect(superlative("BIG")).toBe("BIGGEST");
  });
});
