# @ironarachne/words

A comprehensive TypeScript/JavaScript library for procedural natural language generation, string manipulation, and grammatical inflection. Originally built to provide utility functions for producing natural-sounding English from component parts, it's perfect for text generators, game development, and formatting data seamlessly.

Full documentation is available at [ironarachne.github.io/words](https://ironarachne.github.io/words).

## Installation

```bash
npm install @ironarachne/words
```

## Features

The library is organized into specialized domains for all your procedural text needs:

### 🔤 Casing
Easily change string formats for code, IDs, or display.
*   `capitalize`, `uncapitalize`, `title` (Title Case)
*   `camelCase`, `snakeCase`, `kebabCase`, `swapCase`

### 📚 Grammar 
Helpers for assembling dynamic sentences to keep your procedural text grammatically correct.
*   **Articles & Pronouns**: Generate the correct article (`a`/`an`) or pronoun based on gender and context.
*   **Quantification**: `quantify(2, "apple")` -> `"2 apples"`
*   **Verbs & Copulas**: `isAre(count)`, `hasHave(count)`, `wasWere(count)` to match plurals automatically.
*   **Possessives**: Properly format nouns (e.g., `possessive("James")` -> `"James'"`, `possessive("dog")` -> `"dog's"`).

### 🔄 Inflection
Robust rules and an expansive irregular dictionary (e.g., *radius/radii*, *goose/geese*, *deer*).
*   `pluralize(word: string)`
*   `singularize(word: string)`
*   `detectPlural(word: string)`
*   `comparative(word: string)` -> `"big"` becomes `"bigger"`, `"beautiful"` becomes `"more beautiful"`
*   `superlative(word: string)` -> `"big"` becomes `"biggest"`, `"beautiful"` becomes `"most beautiful"`

### 🔢 Numbers
Format numbers as text or traditional numeric formats.
*   `getOrdinal(1)` -> `"1st"`
*   `ordinalWord(1)` -> `"first"`
*   `numberToWords(21)` -> `"twenty-one"`
*   `romanize(4)` -> `"IV"`

### 📝 Text Utilities
Create clean paragraphs, phrases, and text elements.
*   **Sentence Building**: `buildSentence(parts)` automatically capitalizes and fixes terminal punctuation.
*   **Lists**: `arrayToPhrase(["apple", "banana"], "or")` -> `"apple or banana"`
*   **Punctuation**: `fixPunctuation(text)` fixes double-spaces, space-before-comma, and duplicate punctuation.
*   **Formatting**: `slugify`, `truncateWords`, `squish`, `stripPunctuation`
*   **Metrics**: `wordCount`, `readingTime`

## Example Usage

Building grammatically accurate procedural sentences is simple:

```typescript
import { quantify, isAre, arrayToPhrase, buildSentence } from "@ironarachne/words";

const enemyCount = 3;
const enemyType = "goblin";
const loot = ["gold coin", "rusty dagger"];

// "3 goblins"
const enemies = quantify(enemyCount, enemyType); 

// "are"
const copula = isAre(enemyCount); 

// "gold coin and rusty dagger"
const lootPhrase = arrayToPhrase(loot); 

const parts = [
  "there", copula, enemies, "guarding the", lootPhrase
];

// Returns: "There are 3 goblins guarding the gold coin and rusty dagger."
const text = buildSentence(parts); 
console.log(text);
```

## Contributing and Setup

This project uses TypeScript, Vitest for testing, and Biome for formatting.

```bash
# Install dependencies
npm install

# Run the test suite
npm run test

# Build the project
npm run build

# Re-generate the TypeDoc documentation
npm run docs
```

## License
MIT License.
