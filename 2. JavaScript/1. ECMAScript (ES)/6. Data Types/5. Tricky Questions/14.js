function foo(a, b = a + 2) {
  console.log(a, b);
}

foo(2); // ? 2, 4
foo(2, 5); // ? 2, 5
