function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("data"), 1000);
  });
}

fetchData().then((data) => console.log(data));

// Rewrite above using async and await

async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve("data"), 1000);
  });
  console.log(data);
}
fetchData();
