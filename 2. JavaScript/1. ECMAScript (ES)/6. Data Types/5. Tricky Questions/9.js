function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // ? log: 1
console.log(counter2()); // ? log: 2

// counter1: the inner function is forming a closure, thus it has access to its outer varialbe so, ++count logs 1
// counter2: when calling counter2 the count variable in the outer function again gets reintialised with the zeoro value so, ++ count logs 1 again
