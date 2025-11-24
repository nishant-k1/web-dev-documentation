# Computed Property Names

In object literals, computed property names allow you to use expressions (like variables or function calls) as keys:

Computed property names allow you to dynamically determine the name of a property on an object using an expression.

```Javascript
const obj = {
  [expression]: value // Here, expression is an expression that evaluates to a string, which becomes the property name of the object. value is the value assigned to that property.
}

const key = "name";
const obj = {
  [key]: "Nishant"
};
console.log(obj); // { name: "Nishant" }
```

## Real-World Uses

Dynamically generate object keys (e.g. Redux actions, dynamic form states)
Define properties based on function parameters
Meta programming (dynamic method names, computed keys)
In class definitions, you can use computed property syntax to name methods dynamically:

```js
class Test {
  [dynamicMethodName]() {}
}
```

Key Points

- Computed property names provide flexibility in creating dynamic objects.
- The expression used for the property name must evaluate to a string.
- Computed property names can be used with both object literals and the Object.defineProperty method.
- **They are often used in conjunction with other ES6 features like destructuring and templates**.

So, What Changed?
Before ES6: You could not directly use a variable as a key inside an object literal. You had to define the object first and then assign the variable as a key.
After ES6: Using computed property names, you can directly use a variable (or any expression) as an object key inside the object literal itself.
Summary:
Prior to ES6, you couldn't dynamically assign object keys inside the object literal—you had to do it after the object was created.
From ES6 onwards, computed property names let you directly use variables and expressions as keys when defining an object.
Now, object keys can be dynamic just like values!
