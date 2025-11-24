const addTwo = (num: number) => {
  // return num + 2;
  return "hello";
};

addTwo(5);

const getUpper = (val: string) => {
  return val.toUpperCase();
};

getUpper("Nishant");

const signUp = (name: string, email: string, isPaid: boolean = false) => {};

signUp("Nishan", "n.com", true);

const loginUser = (name: string, email: string, isPaid: boolean) => {};

loginUser("Nishant", "sl@com", false);

const getVal = (val: number): boolean | string => {
  if (val > 5) return true;
  else return "200 OK";
};

const geHello = (s: string): string => {
  return s;
};
geHello("Hello");

const heros = ["spider man", "Thor", "IronMan"];
heros.map((hero): string => {
  return `hero is ${hero}`;
});

// void
const consoleErr = (errMsg: string): void => {
  console.log(errMsg);
};
consoleErr("500");

// never
const handleErr = (errMsg: string): never => {
  throw new Error(errMsg);
};

// never vs void
handleErr("500");

export {};
