# Testing

## What is testing

- Software testing is the process of findng errors before it is launched
- Validate functiong and features of the software.

## Types of Testing

### Types of testing in case of Tester

- `Manual Testing`
- `Automatic Testing`

### Types of testing in case of Developers

- `Unit Testing`: Testing individual units or components. Mostly developers do unit testing. Almost in 80% of cases.
- `Integrated Testing`: Testing between two units or components. In 20% of cases developers do integrated testing.
- `E2E Testing`: Testing from start to end i.e. complete project. Rarely developers do E2E testing.

## Why developers need testing

- in case if a develper makes any changes to the component it is easy for them to write the test also
- it makes sure the feature added is working properly

---

## What is React Testing

- Components
- Functions
- APIs (using mock testing)
- `In many cases developers don't test the UI part but definitely dot the testing of the business logic`
- As a react developer we need to focus on
  - unit testing
  - integrated testing

## React Testing Tools

- Jest Framework
- React Testing Library

## Test Case run options

- How to run specific test files
  `jest path/to/your/testFile.test.js`
- How to run the failed test case
  `jest --only-failures`
- How to run all test cases
  `jest`
- How to filter test files for run
  `jest --testPathPattern=path/to/tests/`
- How to filter test case
  `jest --testNamePattern="specificTestName"`

## What is watch mode?

Jest typically runs in watch mode by default. This means that when you run your tests with jest, it will watch for changes in your files and automatically re-run the associated tests whenever you make modifications.

## How to quit watch mode

To exit watch mode and stop Jest, you can usually press Ctrl + C in the terminal where you started the testing process.

## Important points for testing

It's not necessary to test each and everything. Sometimes it also depends on the client, what we should test and what we shouldn't

1. What we should test definitely

   1. Testing component rendering
   2. UI elements that we write
   3. Functions which we write
   4. API testing (depends on the client)
   5. Event testing
   6. Props and states
   7. UI condition testing / UI state testing

1. What things we should not test

   1. External UI library code
   1. No need to test default functions of Javascript and react.
   1. Sometimes we should mock functions rather than testing it in details.

1. Important points
