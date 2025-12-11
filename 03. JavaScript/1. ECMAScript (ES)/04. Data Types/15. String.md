# ✅ Must-Know `String` Methods & Concepts

## 1. Creation & Identification

| Concept / Method            | Description                             | Returns |
| --------------------------- | --------------------------------------- | ------- |
| String literal              | `"hello"` or `'hello'` or `` `hello` `` | String  |
| `String(value)`             | Convert to string                       | String  |
| `typeof value === "string"` | Check if value is a string              | Boolean |
| `value.length`              | Length of the string                    | Number  |

```js
typeof "abc"; // "string"
"hello".length; // 5
String(123); // "123"
```

## 2. Access & Extraction

| Method / Property          | Description                         | Returns         |
| -------------------------- | ----------------------------------- | --------------- |
| `charAt(index)`            | Character at index                  | String (1 char) |
| `charCodeAt(index)`        | Unicode code of character           | Number          |
| Bracket notation `[index]` | Character at index (ES5+)           | String (1 char) |
| `slice(start?, end?)`      | Extract substring                   | String          |
| `substring(start?, end?)`  | Extract substring (no negative idx) | String          |

```js
"hello".charAt(1); // "e"
"hello"[1]; // "e"
"hello".slice(1, 4); // "ell"
```

## 3. Searching & Checking

| Method                      | Description                            | Returns                  |
| --------------------------- | -------------------------------------- | ------------------------ |
| `indexOf(substring, from?)` | First occurrence index                 | Number (-1 if not found) |
| `lastIndexOf(substring)`    | Last occurrence index                  | Number                   |
| `includes(substring)`       | Checks if substring exists             | Boolean                  |
| `startsWith(substring)`     | Checks if string starts with substring | Boolean                  |
| `endsWith(substring)`       | Checks if string ends with substring   | Boolean                  |
| `match(regex)`              | Matches regex                          | Array/null               |
| `search(regex)`             | Index of first regex match             | Number (-1 if no match)  |

```js
"hello world".indexOf("world"); // 6
"hello".includes("ll"); // true
"hello".startsWith("he"); // true
"hello".endsWith("lo"); // true
```

## 4. Transformation

| Method                                  | Description                      | Mutates | Returns |
| --------------------------------------- | -------------------------------- | ------- | ------- |
| `toUpperCase()`                         | Convert to uppercase             | ❌ No   | String  |
| `toLowerCase()`                         | Convert to lowercase             | ❌ No   | String  |
| `trim()`                                | Remove whitespace from both ends | ❌ No   | String  |
| `trimStart()` / `trimEnd()`             | Remove whitespace from start/end | ❌ No   | String  |
| `replace(searchValue, replaceValue)`    | Replace substring / regex        | ❌ No   | String  |
| `replaceAll(searchValue, replaceValue)` | Replace all occurrences          | ❌ No   | String  |
| `repeat(count)`                         | Repeat string specified times    | ❌ No   | String  |

```js
" Hello ".trim(); // "Hello"
"abc".toUpperCase(); // "ABC"
"foo".repeat(3); // "foofoofoo"
```

## 5. Splitting & Joining

| Method                     | Description                          | Returns |
| -------------------------- | ------------------------------------ | ------- |
| `split(separator, limit?)` | Split string into array by separator | Array   |
| `join(separator)`          | Join array elements into string      | String  |

```js
"hello world".split(" "); // ["hello", "world"]
["a", "b", "c"].join("-"); // "a-b-c"
```

## 6. Template Literals & Interpolation

| Concept           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| Template literals | Backticks (`` ` ``) for multi-line and interpolation |
| `${expression}`   | Expression interpolation inside template literals    |

```js
const name = "Nishant";
const greeting = `Hello, ${name}!`; // "Hello, Nishant!"
```

## 7. Unicode & Encoding

| Method                           | Description                       |
| -------------------------------- | --------------------------------- |
| `charCodeAt(index)`              | UTF-16 code unit at index         |
| `codePointAt(index)`             | Unicode code point at index       |
| `String.fromCharCode(...codes)`  | Create string from UTF-16 codes   |
| `String.fromCodePoint(...codes)` | Create string from Unicode points |

## 8. Useful Concepts

- Strings are immutable: You cannot change a character directly
- Use + or .concat() to combine strings
- Beware of Unicode (emoji, surrogate pairs) which can affect length and indexing
