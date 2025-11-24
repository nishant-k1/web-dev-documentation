// case 1
const myEmptyArr: [] = [];
myEmptyArr.push();

// alternate syntax
const myEmptyArrAlternate: Array<> = [];
myEmptyArrAlternate.push();

// case 1
const myArr: string[] = [];
myArr.push("ee");

// alternate syntax
const myArrAlternate: Array<string> = [];
myArrAlternate.push("ee");

// case 2
const yourArr: number[] = [];
yourArr.push(22);

// alternate syntax
const yourArrAlternate: Array<number> = [];
yourArrAlternate.push(22);

// case 3
const ourArr: (number | string)[] = [];
ourArr.push("ww", 55);
ourArr.push(55, "ww");

// alternate syntax
const ourArrAlternate: (number | string)[] = [];
ourArrAlternate.push("ww", 55);
ourArrAlternate.push(55, "ww");

// case 4
type user = {
  name: string;
  email: string;
  phone: number;
};
const userArr: Array<user> = [];
const newUser = {
  name: "Nishant Kumar",
  email: "fdlsfjdsf@dslfj.com",
  phone: 4320480248,
};
userArr.push(newUser);

// alternate syntax
const userArrAlternate: user[] = [];
const newUserAlternate = {
  name: "Nishant Kumar",
  email: "fdlsfjdsf@dslfj.com",
  phone: 4320480248,
};
userArr.push(newUserAlternate);

// case 5
const MLModels: number[][] = [];
const MLdata = [22, 33, 44, 55];
MLModels.push(MLdata);

// alternate syntax
const MLModelsAlternate: Array<Array<number>> = [];
const MLdataAlternate = [22, 33, 44, 55];
MLModelsAlternate.push(MLdata);

// case 6
const MLModelsNew: (number | string)[][] = [];
const MLdataNew = [22, 33, 44, 55, "eiuji"];
MLModelsNew.push(MLdataNew);

// alternate syntax
const MLModelsNewAlternate: Array<Array<number | string>> = [];
const MLdataNewAlternate = [22, 33, 44, 55];
const MLdataNewAlternateStr = ["fdsf", "flkdsjfls", "fdsjflk", "lkjfdsl"];
const MLdataNewAlternateStrNum = [
  22,
  33,
  44,
  55,
  "fdsf",
  "flkdsjfls",
  "fdsjflk",
  "lkjfdsl",
];

MLModelsNewAlternate.push(MLdataNewAlternateStrNum);
