# RTL Query: getByRole

## What is the Role in getByRole

- There are many UI elements whose semantic role is already defined.
- getByRole is subtype of getBy
- used to find single element

## What is semantic elements

- Semantic elements are those elements whose role becomes obvious to both browser and the developer/user by its tag name/syntax. Button, heading tags and table are semantic element
- it is more accessible to the users, search engines.
- Semantic HTML elements describe the purpose or role of the content they contain, rather than just specifying its appearance or behaviour.

## Non Semantic elements

- role isn't obvious to either developer or browser
- less accessible to the users, search engines.
- Div and span are not semantic elements
- Non semantic HTML elements does not describe the purpose or role of the content they contain, rather than just specifying its appearance or behaviour.

## Test textbox with getByRole

- text box present or not
- text box value
- text box disabled or not

## Test button with getByRole

## render

- render is a feature in RTL which helps to render the React component while testing
- It renders the react component into a virtual DOM, allowing you to make assertions about its content or behavior in the subsequent test

## screen

- It is a feature in RTL which helps to find out any specific React UI elements white testing
