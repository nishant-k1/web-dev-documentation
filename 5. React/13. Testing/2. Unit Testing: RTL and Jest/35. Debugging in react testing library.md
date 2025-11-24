# Debugging in React Testing Library

Lets assume we're writing a test case in react using RTL but the test case is failing. To resolve the issues the process we follow is called debugging.

## Automatic Debugging

Whenever the test case fails and then error message is shown in the console. This is called automatic debugging.

## pretty DOM

When we want to print the html content of the UI in the console

```Javascript

const {container} = render(<App />)

console.log(container) // this will show an object which is hard to understand
console.log(prettyDOM(container)) // this will show the html

```

## Debug

When we want to print the html content of the UI in the console

```Javascript

const {debug} = render(<App />)

debug() // this will show the html

```

## DEBUG_PRINT_LIMIT = 1000 npm test

When the there is large codebase maybe 10000 line we can't print all the code in the console. In order see that we need to increase the limit and we can do that using below command in the terminal
`DEBUG_PRINT_LIMIT = 1000 npm test`

## logRoles

it helps identifying different elements by creating different lines

```Javascript

const {container} = render(<App />)

console.log(logRoles(container))

```
