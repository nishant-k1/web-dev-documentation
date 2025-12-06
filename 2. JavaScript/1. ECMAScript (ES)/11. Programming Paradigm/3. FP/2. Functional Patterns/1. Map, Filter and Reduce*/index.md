# Map, Filter, Reduce, ReduceRight

map, filter, and reduce are not pure functions themselves — they are pure higher-order methods only if the callback you pass to them is pure.
👉 map, filter, reduce are supposed to be used with pure functions, ie. no mutation should take place inside the callback function of those.
👉 But it's your responsibility to keep them pure — JavaScript won’t stop you from misusing them.

1. map syntax: `map(callbackFn, thisArg)`
2. filter syntax: `filter(callbackFn, thisArg)`
3. reduce syntax: `reduce(callbackFn, initialValue)`

map, filter, and reduce are pure in behavior because they do not mutate the original array, but the overall operation is pure only if the callback function you provide is pure.
The methods themselves are not inherently pure — purity depends on your callback.

## return type of map, filter and reduce

map and filter always return a new array and never mutate the original.
while reduce returns whatever your reducer returns (number, string, object, array, anything). reduce is different — it returns whatever you accumulate, and you decide the return type.

## map, filter reduce and purity

1. Array.prototype.map()

- Pure? ✔️ If callback is pure
- map() does not mutate the original array
- It creates a new array

But if your callback mutates something, the purity breaks.

```js
const arr = [1, 2, 3];
arr.map((x) => x * 2); // pure
arr.map((x) => externalVar++); // not pure
```

## 2. Array.prototype.filter()

- Pure? ✔️ If callback is pure
- filter() also returns a new array
- No mutation of original array

```js
arr.filter((x) => x > 2); // pure
arr.filter((x) => console.log(x)); // not pure (side effect)
```

### 3. Array.prototype.reduce()

- Pure? ✔️ If reducer is pure
- But reduce() is the most commonly impure
  because developers often mutate:
- external state
- accumulator object
- original array (if not careful)

```js
// pure
arr.reduce((sum, x) => sum + x, 0);

// not pure
arr.reduce((acc, x) => {
  acc.push(x * 2);
  return acc;
}, externalArray);
```

## Can you use map() to filter?

“No, map() should not be used for filtering.
map() always returns an array of the same length because it is meant only for transforming elements.
If we want to remove elements, the correct method is filter(), which returns a shorter array based on a condition.”

map() transforms each element and returns a new array of equal length.

If you try to "filter" using map(), you’ll end up with:

undefined
null
false
empty strings
or some placeholder values

…for elements you meant to remove.
This is wasteful and confusing.

```js
const arr = [1, 2, 3, 4];
const marked = arr.map((n) => (n % 2 === 0 ? n : null)); // [null, 2, null, 4]
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

No. filter() cannot be used to map.
filter() is only for selecting items, not transforming them.

Why filter() cannot act like map()

- filter() callback must return:
  - true → keep the element
  - false → remove the element
- It does not use the returned value as the transformed output.

if you're okay with mutating (⚠️ bad practice)

```js
const arr = [1, 2, 3, 4];

const result = arr.filter((n, i, a) => {
  a[i] = n * 2; // Modify original array
  return true; // Keep all elements
});

console.log(result); // [2, 4, 6, 8]
```

## Can you use reduce() to map/filter?

**Yes, reduce() can be used to implement both map() and filter() because it gives full control over how you accumulate values. But in real projects, we use map() for transformation and filter() for selection because they are more readable and intent-specific.**

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

- Takes accumulator and current element. `**The initial value of the accumulator is the 2nd argument of the reducer method, if not provided in that case the first array element becomes the initial value of the accumulator**`.
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
reduce((accumulator, currentValue) => { ... }, initialValue);

```

## initialValue

A value to which the accumulator is initialized before the first callback execution.

**Case 1: initialValue IS provided**

- accumulator = initialValue
- currentValue = array[0] (first element)
- Callback starts from index 0

**Case 2: initialValue is NOT provided**

- accumulator = array[0] (first element)
- currentValue = array[1] (second element)
- Callback starts from index 1
- If the array is empty → TypeError
- If the array has only one element → it returns that element without calling the callback

```js
[5].reduce((a, b) => a + b);
// → returns 5
// callback never runs
```

## reduceRight (right to left)

It is very similar to `reduce()`, but it processes the array from right to left, instead of left to right.
