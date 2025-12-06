function makeHandlers() {
  const data = { value: 1 };
  const handlers = [];

  for (let i = 0; i < 3; i++) {
    handlers.push(() => console.log(data.value + i));
  }

  data.value = 10;

  return handlers;
}

const h = makeHandlers();

h[0]();
h[1]();
h[2]();
