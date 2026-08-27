import { describe, expect, it } from "vitest";
import {
  arrayToPhrase,
  buildSentence,
  fixPunctuation,
  readingTime,
  slugify,
  squish,
  stripPunctuation,
  truncateWords,
  wordCount,
} from "./text.js";

describe("arrayToPhrase", () => {
  it("returns the word itself for single element", () => {
    expect(arrayToPhrase(["apple"])).toBe("apple");
  });

  it("joins two words with 'and'", () => {
    expect(arrayToPhrase(["apple", "banana"])).toBe("apple and banana");
  });

  it("joins three or more words with commas and 'and'", () => {
    expect(arrayToPhrase(["apple", "banana", "cherry"])).toBe(
      "apple, banana, and cherry",
    );
    expect(arrayToPhrase(["a", "b", "c", "d"])).toBe("a, b, c, and d");
  });

  it("allows custom conjunctions", () => {
    expect(arrayToPhrase(["apple", "banana"], "or")).toBe("apple or banana");
    expect(arrayToPhrase(["x", "y", "z"], "nor")).toBe("x, y, nor z");
  });

  it("filters out empty strings", () => {
    expect(arrayToPhrase(["a", "", "c"])).toBe("a and c");
    expect(arrayToPhrase(["", ""])).toBe("");
  });
});

describe("slugify", () => {
  it("creates a slug from text", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
    expect(slugify("This is a Test")).toBe("this-is-a-test");
    expect(slugify("Some   spaces  and _ underscores")).toBe(
      "some-spaces-and-underscores",
    );
  });
});

describe("truncateWords", () => {
  it("truncates at word boundaries", () => {
    expect(
      truncateWords("This is a long sentence that should be shorter", 4),
    ).toBe("This is a long...");
    expect(truncateWords("Short", 5)).toBe("Short");
    expect(truncateWords("1 2 3", 3, "")).toBe("1 2 3");
  });

  it("throws on negative maxWords", () => {
    expect(() => truncateWords("one two", -1)).toThrow(RangeError);
  });
});

describe("stripPunctuation", () => {
  it("removes punctuation", () => {
    expect(stripPunctuation("Hello, World!")).toBe("Hello World");
    expect(stripPunctuation("wait... what?")).toBe("wait what");
  });

  it("removes quotes and brackets", () => {
    expect(stripPunctuation('He said "hi"')).toBe("He said hi");
    expect(stripPunctuation("[x]")).toBe("x");
  });
});

describe("squish", () => {
  it("collapses whitespace", () => {
    expect(squish("  too   many     spaces  ")).toBe("too many spaces");
    expect(squish("\n\nNewlines\t\tand\ttabs\n")).toBe("Newlines and tabs");
  });
});

describe("wordCount", () => {
  it("counts words accurately", () => {
    expect(wordCount("This is a test.")).toBe(4);
    expect(wordCount("One, two, three - four!")).toBe(4);
    expect(wordCount("")).toBe(0);
    expect(wordCount("    ")).toBe(0);
  });
});

describe("readingTime", () => {
  it("estimates based on word count", () => {
    expect(readingTime("Word ".repeat(200))).toBe(1);
    expect(readingTime("Word ".repeat(450))).toBe(3);
    expect(readingTime("Word ".repeat(50))).toBe(1);
  });

  it("throws on non-positive wordsPerMinute", () => {
    expect(() => readingTime("hello", 0)).toThrow(RangeError);
    expect(() => readingTime("hello", -1)).toThrow(RangeError);
  });
});

describe("fixPunctuation", () => {
  it("removes space before punctuation", () => {
    expect(fixPunctuation("hello , world")).toBe("hello, world");
    expect(fixPunctuation("wait !")).toBe("wait!");
  });

  it("fixes duplicate punctuation", () => {
    expect(fixPunctuation("hello.. world")).toBe("hello. world");
    expect(fixPunctuation("wait??")).toBe("wait?");
  });

  it("collapses multiple spaces", () => {
    expect(fixPunctuation("hello     world")).toBe("hello world");
  });

  it("preserves ellipses", () => {
    expect(fixPunctuation("Wait... what?!")).toBe("Wait... what?!");
    expect(fixPunctuation("hmm....")).toBe("hmm...");
  });
});

describe("buildSentence", () => {
  it("builds a sentence from parts", () => {
    const parts = [
      "the",
      "quick",
      "brown",
      "fox",
      "jumps",
      "over",
      "the",
      "lazy",
      "dog",
    ];
    expect(buildSentence(parts)).toBe(
      "The quick brown fox jumps over the lazy dog.",
    );
  });

  it("adds terminal punctuation if missing", () => {
    expect(buildSentence(["hello", "world"])).toBe("Hello world.");
  });

  it("leaves existing terminal punctuation alone", () => {
    expect(buildSentence(["hello", "world!"])).toBe("Hello world!");
  });

  it("capitalizes the first letter", () => {
    expect(buildSentence(["this is", "a test"])).toBe("This is a test.");
  });

  it("cleans up bad spacing", () => {
    expect(buildSentence(["  start", " , middle  ", "end .  "])).toBe(
      "Start, middle end.",
    );
  });

  it("places terminal punctuation inside closing quotes", () => {
    expect(buildSentence(['He said "hi"'])).toBe('He said "hi."');
    expect(buildSentence(['He said "hi!"'])).toBe('He said "hi!"');
  });
});
