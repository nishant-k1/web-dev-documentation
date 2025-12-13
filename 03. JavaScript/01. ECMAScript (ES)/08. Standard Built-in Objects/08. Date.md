# ✅ JavaScript `Date` Object

_(Interview Perspective)_

---

## 🔷 Overview

The **`Date` object** is used to work with dates and times in JavaScript.

```js
const now = new Date(); // current date and time
const date = new Date("2025-06-09"); // from string
const timestamp = Date.now(); // milliseconds since Jan 1, 1970
```

---

## 🔹 Date Creation

| Method / Syntax                       | Description                     |
| ------------------------------------- | ------------------------------- |
| `new Date()`                          | Current date and time           |
| `new Date(value)`                     | From timestamp (ms since 1970)  |
| `new Date(dateString)`                | From string                     |
| `new Date(year, month, day?, h?, m?)` | From parts (month is 0-indexed) |
| `Date.now()`                          | Current timestamp (ms)          |
| `Date.parse(str)`                     | Parses string to timestamp      |
| `Date.UTC(...)`                       | UTC timestamp from components   |

```js
new Date(2025, 0, 1); // Jan 1, 2025
```

---

## 🔹 Date Getters

| Method                | Description                    | Local / UTC |
| --------------------- | ------------------------------ | ----------- |
| `getFullYear()`       | Year (e.g. 2025)               | ✅ Local    |
| `getMonth()`          | Month (0-11)                   | ✅ Local    |
| `getDate()`           | Day of month (1-31)            | ✅ Local    |
| `getDay()`            | Weekday (0–6, Sunday=0)        | ✅ Local    |
| `getHours()`          | Hours (0–23)                   | ✅ Local    |
| `getMinutes()`        | Minutes (0–59)                 | ✅ Local    |
| `getSeconds()`        | Seconds (0–59)                 | ✅ Local    |
| `getMilliseconds()`   | Milliseconds (0–999)           | ✅ Local    |
| `getTime()`           | Milliseconds since 1970        | —           |
| `getTimezoneOffset()` | Minutes behind UTC (e.g. -330) | —           |
| `getUTCFullYear()`    | UTC year                       | ✅ UTC      |
| `getUTCMonth()`       | UTC month                      | ✅ UTC      |
| `getUTCDate()`        | UTC day                        | ✅ UTC      |
| `getUTCDay()`         | UTC weekday                    | ✅ UTC      |

```js
const d = new Date();
d.getFullYear(); // 2025
d.getDay(); // e.g. 1 for Monday
```

---

## 🔹 Date Setters

| Method                | Description                    |
| --------------------- | ------------------------------ |
| `setFullYear(year)`   | Sets year                      |
| `setMonth(month)`     | Sets month (0–11)              |
| `setDate(day)`        | Sets day of month (1–31)       |
| `setHours(h)`         | Sets hours (0–23)              |
| `setMinutes(m)`       | Sets minutes                   |
| `setSeconds(s)`       | Sets seconds                   |
| `setMilliseconds(ms)` | Sets milliseconds              |
| `setTime(ms)`         | Sets timestamp (ms since 1970) |

```js
d.setFullYear(2030);
```

---

## 🔹 Date Formatting & Conversion

| Method                 | Description                             |
| ---------------------- | --------------------------------------- |
| `toString()`           | Full string representation              |
| `toDateString()`       | Date only (e.g. "Mon Jun 09 2025")      |
| `toTimeString()`       | Time only                               |
| `toISOString()`        | ISO format (`YYYY-MM-DDTHH:mm:ss.sssZ`) |
| `toUTCString()`        | UTC string                              |
| `toLocaleDateString()` | Date in local format                    |
| `toLocaleTimeString()` | Time in local format                    |
| `toJSON()`             | Same as `toISOString()`                 |

```js
d.toISOString(); // 2025-06-09T14:20:30.000Z
```

---

## 🔹 Comparing & Calculating with Dates

- Dates can be **compared** using relational operators.
- Subtracting two dates gives difference in milliseconds.

```js
const start = new Date("2025-01-01");
const end = new Date("2025-06-09");

const diffMs = end - start; // in milliseconds
const diffDays = diffMs / (1000 * 60 * 60 * 24);
```

---

## 🧠 Interview Patterns Using Dates

- Get difference between two dates (in days, hours, etc.)
- Format a date in readable or ISO format
- Convert between time zones (via `toLocaleString`)
- Sort an array of dates
- Schedule tasks with `setTimeout` using `Date.now()`

---

## ✅ Quick Reference Cheat Sheet

```js
// Get parts
d.getFullYear(), d.getMonth(), d.getDate(), d.getDay();
d.getHours(), d.getMinutes(), d.getSeconds();

// Set parts
d.setFullYear(), d.setMonth(), d.setDate();

// Conversion
d.toISOString(), d.toLocaleDateString(), d.toTimeString();

// Utilities
Date.now(), Date.parse(), Date.UTC();
```

---

💡 **Tips:**

- Always remember that months are 0-indexed (0 = Jan, 11 = Dec).
- `Date` stores time internally in milliseconds.
- Avoid direct date manipulation — prefer libraries like `date-fns` or `luxon` for heavy operations.
