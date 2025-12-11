// is almost same as type
interface User {
  readonly dbID: number;
  email: string | number;
  userId: number;
  googleId?: string;
  startTrial?: () => string;
  startTrialOptional?: () => string;
  // alternate syntax for method type
  startTrialAlternate(): string;
  startTrialAlternateOptional?(): string;
  getCoupon(couponname: string, value?: number): number;
}

const nishantUser: User = {
  dbID: 23432443,
  email: 2323,
  userId: 899898,
  // startTrial: () => "fdsf",
  startTrialAlternate: () => "fdfd",
  getCoupon: (ddfdf, fdlfj) => 48394,
};

// nishant.getCoupon(899);
nishantUser.getCoupon("3439", 222);
nishantUser.getCoupon("322");

// This type declaration for User mirrors the structure of the interface you provided, including optional properties and methods. In TypeScript, type and interface are often interchangeable, but type can be more flexible, allowing for unions and intersections with other types.
// Incorrect: This will result in an error in TypeScript
interface StringOrNumberIncorrect = string | number;
// Incorrect: This will result in an error in TypeScript
type StringOrNumberCorrect = string | number;

// The use of union types in TypeScript interfaces is limited to the properties of the interface. You can't declare an entire interface as a union of other types, but you can certainly use union types for the properties within the interface.

interface StringOrNumberIn {
  id: number | string
}

type StringOrNumberTy  = {
  id: number | string
}