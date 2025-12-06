function makeHandlers() {
  const data: { value: number } = { value: 1 };
  const handlers: Array<() => void> = [];

  for (let i = 0; i < 3; i++) {
    handlers.push(() => console.log(data.value + i));
  }

  data.value = 10;

  return handlers;
}

const h = makeHandlers();

console.log(h[0]());
console.log(h[1]());
console.log(h[2]());
