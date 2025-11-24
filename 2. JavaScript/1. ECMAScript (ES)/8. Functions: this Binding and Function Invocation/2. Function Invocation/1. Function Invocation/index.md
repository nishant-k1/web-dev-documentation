# Function Invocation

- When a function is invoked a new execution context is created on top of the global execution context.

## Function Expression

```javascript
var canada = function () {
  console.log("cold");
};
```

## Function Declaration

```javascript
function india() {
  console.log("warm");
}
```

## Function Invocation/call/Execution

```javascript
canada();
india();
```

As soon as the javascript engine sees the small brackets after the function name it invokes the function with the variable name and creates an execution context.
