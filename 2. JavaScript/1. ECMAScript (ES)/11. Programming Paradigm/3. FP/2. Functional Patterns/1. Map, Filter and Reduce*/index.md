# Map, Filter, Reduce, ReduceRight

👉 Yes, map, filter, reduce are supposed to be used with pure functions.
👉 But it's your responsibility to keep them pure — JavaScript won’t stop you from misusing them.

## Can you use map() to filter?

Yes, but not recommended

> Yes, but not directly — here’s how:

```js
const arr = [1, 2, 3, 4];

// Step 1: Use map to tag/filter (mark unwanted items)
const marked = arr.map((n) => (n % 2 === 0 ? n : null)); // [null, 2, null, 4]

// Step 2: Clean up the nulls
const result = marked.filter(Boolean); // [2, 4]
```

> Pure map() filter (hacky)

```js
const arr = [1, 2, 3, 4];
const result = [];

arr.map((n) => {
  if (n % 2 === 0) result.push(n); // Filter behavior inside map
});
console.log(result); // [2, 4]
```

## Can you use filter() to map?

Yes, but not recommended

✅ Kind of — if you're okay with mutating (⚠️ bad practice)

```js
const arr = [1, 2, 3, 4];

const result = arr.filter((n, i, a) => {
  a[i] = n * 2; // Modify original array
  return true; // Keep all elements
});

console.log(result); // [2, 4, 6, 8]
```

## Can you use reduce() to map/filter?

While map() and filter() have different intended purposes — mapping and filtering — they can be used to mimic each other's behavior in a roundabout way.
But for clean, readable code, it’s always best to use them as intended.
If I need to do both filter and map together, I’d rather use reduce().

## map callback

- Takes an element (and optionally index, array).
- Returns the transformed element.
- Result: a new array with each element replaced by whatever the callback returns.

```js
const arr = [1, 2, 3];
const doubled = arr.map((el) => el * 2);
// doubled = [2, 4, 6]
```

## filter callback

- Takes an element (and optionally index, array).
- Returns a boolean (true or false).
- Result: a new array including only elements where callback returns true.

```js
const arr = [1, 2, 3, 4];
const evens = arr.filter((el) => el % 2 === 0);
// evens = [2, 4]
```

## reduce callback

- Takes accumulator and current element. The initial value of the accumulator is the 2nd argument of the reducer method, if not provided in that case the first array element becomes the initial value of the accumulator.
- Returns the updated accumulator.
- Result: single value, accumulated from all elements.

```js
const arr = [1, 2, 3];
const sum = arr.reduce((acc, el) => acc + el, 0);
// sum = 6
```

## reduce ( for left-to-right.)

> Syntax

```js
reduce(callbackFn);
reduce(callbackFn, initialValue);
```

## initialValue

- A value to which accumulator is initialized the first time the callback is called.
- If initialValue is specified, callbackFn starts executing with the first value in the array as currentValue.
- If initialValue is not specified, accumulator is initialized to the first value in the array, and callbackFn starts executing with the second value in the array as currentValue.
- In this case, if the array is empty (so that there's no first value to return as accumulator), an error is thrown.

## reduceRight (right to left)

It is very similar to `reduce()`, but it processes the array from right to left, instead of left to right.
