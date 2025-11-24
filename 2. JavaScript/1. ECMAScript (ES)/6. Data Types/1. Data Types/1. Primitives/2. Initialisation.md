# Initialization

- `Initialization`: When we assign a value to a variable

  1. type gets dynamically assigned to the variable (based on the data type of value during runtime).
  2. memory gets allocated in the javascript engine for that value (stack for primitives and heap for non-primitives) and the variable points to the value stored at this memory location.

## Weired JS

```javascript
function weired() {
  height = 50;
  return height;
}
weired(); // it returns 50. Here, we're assigning value to height without declaring height variable in this execution context. In this case the global execution context declares the height variable implicitly. To avoid this unpredicatable behaviour we can use 'use strict'
```

```javascript
"use strict";
function weired() {
  height = 50;
  return height;
}

weired(); // it returns height is not defined error
```

```javascript
var heyhey = function doodle() {
  return "heyhey";
};

heyhey(); // it returns height is not defined error
doodle(); //it reurns error because we can't access it in the global scope we can access it only in the local scope of doodle function
```
