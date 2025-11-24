# Memoization ~~~ Caching

- Caching is a way to store values so you can use them later on.
- It is just a way to speed up programs and hold some piece of data in an easily accessible box.
- Memoization is a specific form of caching that involves caching the return value.
- It is simply a way to remember a solution to a problem so you don't have to calculate it again.

```javascript
// Eg1: Without Memoization
function addTo80(n) {
  console.log("long time");
  return n + 80;
}
// everytime we call addTo80 function it's always going to take a long time.
addTo80(5);
addTo80(5);
addTo80(5);
```

```javascript
// Eg2: With Memoization
let cache = {
  5: 85,
};
function memoizedAddTo80(n) {
  if (n in cache) {
    return cache[n];
  } else {
    cache[n] = n + 80;
    return cache[n];
  }
}

memoizedAddTo80(5);
memoizedAddTo80(5); // returns cached value
memoizedAddTo80(5);
```

```javascript
// Eg3: In Memoization, ideally we don't want to fill the cache in what we call teh global scope. Ideally it is good to have the state live inside the function. We can achieve this using closure.

function memoizedAddTo80() {
  let cache = {};
  return function (n) {
    if (n in cache) {
      return cache[n];
    } else {
      cache[n] = n + 80;
      return cache[n];
    }
  };
}

const memoized = memoizedAddTo80();
console.log("1", memoized(5)); // returns memoized 85
console.log("2", memoized(5); // returns memoized 85
```
