// in tuple, type, order and the number of the elements in the array matters

const user: string[] = ["nk"];

const userT: [string, number] = ["nk", 333];

let rgb: [number, number, number] = [255, 123, 112];

type User = [number, string];

let newUser: User = [22, "dsfds"];

// issues
newUser = [22, "dsfds"];

// but (number of elements matters for tuples but in case of push methods it shows contradiction)
newUser.push(99);
newUser.push("dsds");
newUser[1] = "dsfds";
