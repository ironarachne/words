import { describe, expect, it } from "vitest";
import { removeEntry } from "./arrays.js";

describe("removeEntry", () => {
  it("removes the specified word from the array", () => {
    expect(removeEntry("apple", ["apple", "banana", "cherry"])).toEqual([
      "banana",
      "cherry",
    ]);
    expect(removeEntry("banana", ["apple", "banana", "banana"])).toEqual([
      "apple",
    ]);
  });

  it("returns the same array if word not found", () => {
    expect(removeEntry("pear", ["apple", "banana"])).toEqual([
      "apple",
      "banana",
    ]);
  });

  it("returns empty array if all elements removed", () => {
    expect(removeEntry("a", ["a", "a"])).toEqual([]);
  });
});
