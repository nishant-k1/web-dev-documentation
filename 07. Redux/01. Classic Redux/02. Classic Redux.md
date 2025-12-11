# Flux and Redux Summary

## Flux

Flux is a new kind of architecture that complements React and follows the concept of Unidirectional Data Flow.

### Flux Architecture

```js
Action -> Dispatch -> Store -> View -> Action -> Dispatch -> ...
```

---

## Redux

Redux is a predictable state container for JavaScript apps based on the Flux design pattern. Redux can be used with React or any other view library. It is tiny (about 2kB) and has no dependencies.

### Core Principles of Redux

- **Single source of truth**: The state of your entire application is stored in an object tree within a single store.
- **State is read-only**: The only way to change the state is by emitting an action.
- **Changes are made with pure functions**: Reducers specify how the state tree is transformed by actions.

### Can I dispatch an action in reducer?

No, dispatching an action within a reducer is an anti-pattern. Reducers must be pure and side-effect free.

### How to access Redux store outside a component?

```js
const store = createStore(myReducer);
export default store;
```

---

## React Context vs React Redux

- **React Context** is good for passing data to deeply nested components.
- **Redux** provides more features and better management for complex state logic. React Redux uses context internally.

---

## Why are Redux functions called reducers?

Reducers return the accumulation of state, like `Array.prototype.reduce()`. They take previous state and an action, then return the next state.

---

## Should I keep all component state in Redux store?

No, keep data in Redux and UI-specific state in component-local state.

---

## Component vs Container in Redux

- **Component**: Presentational component (dumb).
- **Container**: Connected to Redux store, subscribes to state updates and dispatches actions.

---

## Redux Constants

Used to avoid typos and for easy refactoring.

```js
export const ADD_TODO = "ADD_TODO";
```

Used in both actions and reducers.

---

## Redux Directory Structure

- **Components**: Presentational components.
- **Containers**: Connected components.
- **Actions**: All action creators.
- **Reducers**: All reducers.
- **Store**: Store initialization.

---

## Redux-Saga

`redux-saga` is a middleware for managing side effects in Redux.

- Installed via: `npm install --save redux-saga`
- Works like a separate thread to handle side effects using generators.

---

## Redux-Thunk

`redux-thunk` allows writing action creators that return a function instead of an action.

```js
const fetchData = () => (dispatch, getState) => { ... }
```

---

## Redux-Saga vs Redux-Thunk

| Feature        | Redux-Thunk       | Redux-Saga            |
| -------------- | ----------------- | --------------------- |
| Simplicity     | Simple            | Complex but powerful  |
| Uses           | Promises          | Generators            |
| Learning Curve | Low               | Steep                 |
| Power          | Basic async logic | Advanced control flow |

---

## Redux DevTools

Redux DevTools offer live-editing, time-travel debugging, hot reloading, and more.

---

## Redux Selectors

Selectors are functions that extract specific parts of the state.

```js
const getUserData = (state) => state.user.data;
```

---

## Redux Form

Handles form state via Redux.

### Features

- State persistence
- Validation
- Field formatting and normalization

---

## Add Multiple Middlewares

```js
import { createStore, applyMiddleware } from "redux";
const store = createStore(reducer, applyMiddleware(thunk, logger));
```

---

## Set Initial State

```js
const store = createStore(rootReducer, initialState);
```

---

## Redux Action

Plain JavaScript objects with a `type` property.

```js
{
  type: ADD_TODO,
  text: 'Add todo item'
}
```

---

## Relay vs Redux

| Feature      | Relay             | Redux                |
| ------------ | ----------------- | -------------------- |
| Store usage  | Server-side state | Client-side state    |
| Access       | GraphQL           | Direct object access |
| Optimization | Built-in cache    | Manual               |

---

## Flux vs Redux

| Feature            | Flux                   | Redux                                 |
| ------------------ | ---------------------- | ------------------------------------- |
| State              | Mutable                | Immutable                             |
| Store Logic        | State + logic together | Separated                             |
| Number of Stores   | Multiple               | Single                                |
| Dispatcher         | Exists                 | Not required                          |
| Component Handling | Subscribes directly    | Uses `connect` with `mapStateToProps` |
