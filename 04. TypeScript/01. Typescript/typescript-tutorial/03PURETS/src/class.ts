class User {
  email: string;
  name: string;
  city: string = "";
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

const nishant = new User("fdsf", "dslfjdsfj");

nishant.city;
