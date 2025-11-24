function foo(a, a) {
  console.log(a);
}
foo(1, 2); // ?

// Due to the duplicate parameter names, only the last declared parameter will be used within the function.
// While it's technically possible to have duplicate parameter names in JavaScript function definitions, it's generally considered bad practice. It can lead to confusion and unexpected behavior. It's always recommended to use unique parameter names for better code readability and maintainability.
