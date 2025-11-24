# call, apply, bind

These methods allow you to control the this context of a function — i.e., which object a function operates on. This is especially important in:

1. Method borrowing
2. Function currying
3. Event handlers
4. setTimeout, callbacks
5. React class components (historically)

## call, apply, bind and arrow function

Yes, technically arrow functions have call, apply and bind methods — because every function in JavaScript (including arrow functions) inherits from Function.prototype.

But we do not use .call(), .apply(), or .bind() with arrow functions — because they don’t have their own this, and those methods are meant to control this.
