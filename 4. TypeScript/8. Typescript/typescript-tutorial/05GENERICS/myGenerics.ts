//

const myUser = <T>(user: T) => {
  return `My ${user}`;
};

const user = myUser<string>("Nishant");
console.log(user);

export {};
