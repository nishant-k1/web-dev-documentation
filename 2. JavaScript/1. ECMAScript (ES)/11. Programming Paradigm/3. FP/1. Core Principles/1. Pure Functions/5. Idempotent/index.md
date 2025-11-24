# Idempotence

- The idea of idempotence is a function that always returns or does what we expect it to do.

- It's little different from pure functions as it can still modify anything outside of itself.
- It is valuable in case of parallel and distributed computation because it makes our code predictable.

```javascript
// Eg1:
function notGood(num) {
  return Math.random();
}

// Eg2: Below functin is not pure but idempotent
function notGood2(num) {
  console.log(num);
}
```
