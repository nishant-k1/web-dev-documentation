interface Admin {
  name: string;
  role: "admin" | "learner" | "ta";
  email: string;
}

const admin: Admin = {
  name: "Nishant",
  role: "learner", // role can have only 3 values (admin, leaerner, ta) as specified for the role type in the Admin interface
  email: "fdlfjds@lfjsd.com",
};
