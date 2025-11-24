# Closures Examples

## Using Closures to run a function only once

```javascript
let view = 0;
function initialize() {
  let called = 0;

  return function () {
    if (called > 0) return;
    view = "$$$";
    called++;
    console.log("view has been set");
  };
}
const startOnce = initialize();
startOnce();
console.log(view);
```

## Most asked interview question in closure

```javascript
const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log("I am at index" + i);
  }, 3000);
}

const array = [1, 2, 3, 4];
for (let i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log("I am at index" + i);
  }, 3000);
}

const array = [1, 2, 3, 4];
for (var i = 0; i < array.length; i++) {
  (function (closureI) {
    setTimeout(function () {
      console.log("I am at index " + array[closureI]);
    }, 3000);
  })(i);
}
```
