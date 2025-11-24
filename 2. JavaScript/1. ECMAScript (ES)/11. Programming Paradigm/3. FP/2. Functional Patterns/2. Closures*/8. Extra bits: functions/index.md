# Extra bits: functions

- Be careful while initialising functions inside loops because it will keep initialising functions again and again.

- Be careful while returning param from functions.

```javascript
function a() {
  return param;
}
a(); // returns error
```

- As in ES6 we can provide default parameters with a value

```javascript
function a(param = 6) {
  return param;
}
a(); // returns 6
```
