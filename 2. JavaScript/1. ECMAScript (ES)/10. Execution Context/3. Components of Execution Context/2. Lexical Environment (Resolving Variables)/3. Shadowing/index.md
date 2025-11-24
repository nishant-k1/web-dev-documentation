# Shadowing

- Shadowing in JavaScript occurs when a variable declared in an inner scope has the same name as a variable declared in an outer scope.

- When you have nested scopes (like functions within functions), and you declare a variable with the same name in both the inner and outer scopes, the variable in the inner scope "shadows" the variable in the outer scope.

- Within the inner scope, the interpreter will use the value of the inner variable, effectively "hiding" the value of the outer variable.
  ![alt text](image.png)

- Shadowing allows you to use the same variable name in different scopes, but it can lead to confusion if not used thoughtfully.
