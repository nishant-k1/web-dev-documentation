const User = {
  name: "Nishant Kumar",
  phone: 9999999,
};

const createFun = ({ name: string, phone: number }) => {};

createFun({
  name: "Nishant Kumar",
  phone: 9999999,
});

export {};

const createCourse = (): { name: string; price: number } => {
  return { name: "Javascript", price: 7878 };
};

createCourse();

// type aliases

type User = {
  name: string;
  phone: number;
  email: string;
  isActive: boolean;
};

const newUser = ({ name, phone, email, isActive }: User): User => {
  console.log(name);
  return { name, phone, email, isActive };
};

newUser({
  name: "",
  phone: 90909989,
  email: "jdslfj2glaj.com",
  isActive: true,
});

export {};

// readonly and ? (optional)

type Myuser = {
  readonly _id: string;
  name: string;
  phone: number;
  email: string;
  isActive: boolean;
  card?: number;
};

const myUser: Myuser = {
  _id: "dsdsaf",
  name: "Nishant Kumar",
  phone: 90909989,
  email: "jdslfj2glaj.com",
  isActive: true,
  card: 1121332323,
};

console.log(myUser);

myUser._id = "sfofuosifuwo";
