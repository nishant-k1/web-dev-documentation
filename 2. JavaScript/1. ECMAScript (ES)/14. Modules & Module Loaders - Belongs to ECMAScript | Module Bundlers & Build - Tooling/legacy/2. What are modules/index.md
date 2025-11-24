# What are modules

- Modules give us a better way to organized these variables and fuctions so that we can group these variables and fuctions that make sense together
- in terms of organizing things in javascript we had the idea of

  1. global scope
  2. functional scope
  3. block Scope

- But ideally, in an idea world, we have another scope, which is the "module scope "that is actually a little bit higher up than the function scope

  1. global scope
  2. module scope
  3. functional scope
  4. block Scope

- So we can combine multiple functions together under this module scope but still not pollute our global namespace.
- this module scope can be used to share thse variables between different functions as well so that we can share things without having to go through the global scope.
- In this way, with a module scope, we can be explicit which of the variables, classes or functions in the modules should be available.

- JavaScript has a thing call ES modules that is a module system native to javaScript now. This happend quite recently.
- Before ES moduls we had Module pattern.
-
