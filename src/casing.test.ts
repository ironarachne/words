import { describe, expect, it } from "vitest";
import {
  camelCase,
  capitalize,
  kebabCase,
  snakeCase,
  swapCase,
  title,
  uncapitalize,
} from "./casing.js";

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

describe("camelCase", () => {
  it("converts spaces", () =>
    expect(camelCase("hello world")).toBe("helloWorld"));
  it("converts hyphens", () =>
    expect(camelCase("hello-world")).toBe("helloWorld"));
  it("converts underscores", () =>
    expect(camelCase("hello_world")).toBe("helloWorld"));
  it("handles multiple separators", () =>
    expect(camelCase("hello_ world-test")).toBe("helloWorldTest"));
  it("handles empty string", () => expect(camelCase("")).toBe(""));
});

describe("snakeCase", () => {
  it("converts spaces", () =>
    expect(snakeCase("hello world")).toBe("hello_world"));
  it("converts hyphens", () =>
    expect(snakeCase("hello-world")).toBe("hello_world"));
  it("converts mixed", () =>
    expect(snakeCase("hello world-test")).toBe("hello_world_test"));
});

describe("kebabCase", () => {
  it("converts spaces", () =>
    expect(kebabCase("hello world")).toBe("hello-world"));
  it("converts underscores", () =>
    expect(kebabCase("hello_world")).toBe("hello-world"));
  it("converts mixed", () =>
    expect(kebabCase("hello world_test")).toBe("hello-world-test"));
});

describe("swapCase", () => {
  it("swaps cases", () => {
    expect(swapCase("Hello World")).toBe("hELLO wORLD");
    expect(swapCase("aBcD")).toBe("AbCd");
    expect(swapCase("123")).toBe("123");
  });
});
