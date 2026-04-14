# Tricky Questions

## Question 1

```js
console.log(0.1 + 0.2 === 0.3); // false
```

## Question 2

```js
function foo() {
  return {
    bar: () => {
      return this;
    },
  };
}

const obj = foo();
console.log(obj.bar() === obj); // false
```

**Explanation:**
The arrow function `bar` in the `foo` function inherits `this` from the lexical scope, which is the global scope. Therefore, `obj.bar()` returns the global object, not `obj`. As a result, the comparison `obj.bar() === obj` is `false`.

This explanation helps clarify why the output is `false` and reinforces the concept of how arrow functions handle `this`.

## Question 3
