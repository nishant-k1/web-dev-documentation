var a = 1;
let b = 2;

function test() {
  console.log(a); // What will this log? | undefined
  console.log(b); // What will this log? |  reference error

  var a = 3;
  let b = 4;
}

test();

// CASE a:
// Shadowing: outer a is not accesible inside test funciton because the local var a shadows the global a.
// Hoisting: The local a is hoisted and initialized to undefined before its assignment to 3.
// log is undefined

// CASE b:
// Shadowing: outer b is no longer accesible inside test function  becuase the b  has been redeclared inside the function and the local variable shawods the outer variable
// Hoisting: b declaration inside the test scope gets hoisted and sind during hoisting only declaration is hoisted not the initialisation so, the default value assigned to var declared with let is, nothing becasuse of the TDZ
// log is reference error
