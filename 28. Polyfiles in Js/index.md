# Polyfill in Js

- In JavaScript, a polyfill is essentially a piece of code that provides modern functionality on older browsers that do not support it natively.
- It basically "fills in" the gap for missing features. For example, if a new JavaScript method isn't supported in an older browser, a polyfill would implement that method so that the code works as intended.
- A polyfill is a custom implementation of a JavaScript feature that already exists in modern JS, written so that older environments can use it.

So when a browser doesn’t support a method, we write our own version of that method.

✔️ Same name
✔️ Same behavior (as close as possible)
✔️ Added only if it doesn’t already exist

If Browser ❌ doesn't have Array.includes
⬇
We write Array.includes ourselves
⬇
Now our code works everywhere

## If you remember only these, you’re good:

Array.prototype.map

```js
if (!Array.prototype.map) {
  Array.prototype.map = function (callback) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }

    return result;
  };
}
```

Array.prototype.filter

Array.prototype.reduce

Array.prototype.forEach

```js
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };
}
```

Array.prototype.includes

Function.prototype.bind

Object.assign

Object.entries

Promise

fetch (conceptual)

String.prototype.includes

## Why do we check first?

```js
if (!Array.prototype.map) {
  // define it
}
```

To avoid overriding the native implementation if it already exists.
