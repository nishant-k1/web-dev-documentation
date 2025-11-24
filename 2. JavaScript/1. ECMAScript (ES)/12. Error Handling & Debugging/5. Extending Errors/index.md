# Extending errors

- Error constructor is an object that we can extend from.
- So we can create different instances of the Error and inherit the properties of the error.

```javascript
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.favouriteSnack = "grapes";
  }
}
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
    this.favouriteSnack = "mango";
  }
}

class PermisssionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermisssionError";
    this.favouriteSnack = "guava";
  }
}
const a = new authenticationError("oopsie");
a.favouriteSnack;
```

- while running a node server we don't want to reveal too much information about your system because hackers might use that information to compromise your system. So you don't necessarily want to just throw any error to the user so that they can see. For example in a node server you never want to return a response with a full error, with a stack trace of the error where it happend and all that information.
- Now we can create instances of each inherited error

```javascript
const b = new DatabaseError("oopsie");
const c = new PermisssionError("oopsie");
```
