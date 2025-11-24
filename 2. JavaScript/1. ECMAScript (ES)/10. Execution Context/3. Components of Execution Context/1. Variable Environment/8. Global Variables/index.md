# Global Variables

1. A global variable is one that is declared in the GEC and accessible everywhere.
   Both var, let, and const behave this way.

2. The difference lies in how the variable interacts with the global object:
   var attaches itself to the global object.

3. let and const do not attach themselves to the global object, making them safer and avoiding potential naming conflicts.

   Eg: When we declare a variable using var keyword in the `GEC` then the variable becomes property of the `window` object in BRE and `global` object in NRE

## Drawbacks of global variables

- Using too much global variables might cause memory leaks.
- We can get variable collison (overwritting my mistake)
