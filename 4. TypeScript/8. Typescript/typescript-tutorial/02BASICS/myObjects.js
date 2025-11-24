"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = {
  name: "Nishant Kumar",
  phone: 9999999,
};
var createFun = function (_a) {
  var string = _a.name,
    number = _a.phone;
};
createFun({
  name: "Nishant Kumar",
  phone: 9999999,
});
var createCourse = function () {
  return { name: "Javascript", price: 7878 };
};
createCourse();
var newUser = function (_a) {
  var name = _a.name,
    number = _a.number,
    email = _a.email,
    isActive = _a.isActive;
  console.log(name);
  return { name: name, number: number, email: email, isActive: isActive };
};
newUser({
  name: "",
  number: 90909989,
  email: "jdslfj2glaj.com",
  isActive: true,
});

var myUser = {
  _id: "dsdsaf",
  name: "",
  number: 90909989,
  email: "jdslfj2glaj.com",
  isActive: true,
  card: 1121332323,
};
console.log(myUser);
