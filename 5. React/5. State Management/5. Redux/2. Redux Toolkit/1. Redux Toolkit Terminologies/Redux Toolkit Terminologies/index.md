# Redux Toolkit Terminologies

## 1. UI

- The React components that **display the global state** or **dispatch actions** using Redux Toolkit.

---

## 2. Dispatch

- The `dispatch` function works the same:
  - It accepts **action objects** or **thunk functions**.
  - You use it via `useDispatch()` in React components.

```js
const dispatch = useDispatch();
dispatch(increment());
dispatch(fetchUser(123));
```

---

## 2. Slice

- A "slice" is a collection of **reducer logic and actions** for a single feature in your app.
- It is created using the `createSlice()` method.
- `createSlice` automatically generates action creators and action types.

### Syntax

```js
const headerSlice = createSlice({
  name: "header",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});
```

---

## 3. Action

- Still an object with `type`, `payload`, `meta`, and `error`, but Redux Toolkit **generates these automatically** via `createSlice`.
- You don't write action types or creators manually.

---

## 4. Action Creators

- Redux Toolkit automatically generates action creators from the `reducers` object in `createSlice`.

```js
// Example auto-generated action creators
headerSlice.actions.increment(); // returns { type: 'header/increment' }
headerSlice.actions.setCount(5); // returns { type: 'header/setCount', payload: 5 }
```

---

## 5. Reducer

- Reducers are defined as **object properties (functions)** in the `reducers` key of `createSlice`.
- Redux Toolkit uses **Immer under the hood** to let you write **mutating logic** safely. The actual state is not mutated.

```js
reducers: {
  increment: (state) => {
    state.count += 1; // not actually mutating, Immer takes care of immutability
  };
}
```

## 6. Store

- You create the store using `configureStore` instead of `createStore`.

```js
const store = configureStore({
  reducer: {
    header: headerSlice.reducer,
    auth: authSlice.reducer,
  },
});
```

- `configureStore` automatically includes Redux DevTools and applies middleware like `redux-thunk`.

---

## 7. Middleware

- Redux Toolkit includes `redux-thunk` by default.
- You can add your custom middleware too.

```js
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
```

---

## 8. Async Thunks

1. For async actions, use `createAsyncThunk(actionType, payloadCreatorFunCallback)` or `createAsyncThunk(actionType, async (arg, thunkAPI) => {})`

   - **actionType** is the type that we pass in the action object
   - **payloadCreatorFunCallback** function is the function which when invoked returns the payload, unlike the action creator function which returns the whole action object and can't be async and can't be impure, but here this `payloadCreatorFunCallback` function can be async and can perform side effect like the thunk function.

   ```js
   export const fetchUser = createAsyncThunk(
     "user/fetch", // 👈 action type string
     async (userId, thunkAPI) => {
       // 👈 payload creator function
       const response = await fetch(`/api/user/${userId}`);
       return await response.json();
     }
   );
   ```

   - This automatically generates 3 action types:

     - `user/fetch/pending`
     - `user/fetch/fulfilled`
     - `user/fetch/rejected`

   - Handle them using `extraReducers`.

   ```js
   extraReducers: (builder) => {
     builder
       .addCase(fetchUser.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchUser.fulfilled, (state, action) => {
         state.status = "succeeded";
         state.user = action.payload;
       })
       .addCase(fetchUser.rejected, (state, action) => {
         state.status = "failed";
         state.error = action.error.message;
       });
   };
   ```

2. **actionType**: This is the base string for the action type.

3. **payloadCreatorCallbackFn — `async (arg, thunkAPI) => {}`**:

   1. When invoked returns the payload, unlike the action creator function which returns the whole action object and can't be async and can't be impure, but here this `payloadCreatorFunCallback` function only returns the payload and can be async and can perform side effects like the thunk function.
   2. This is the function where your async logic (e.g. API calls) happens.
   3. It has two params which are

      1. `arg`:

         1. This is the argument passed when you dispatch the thunk.
         2. Example: dispatch(fetchUsers(5)) → arg = 5

      2. `thunkAPI` Object:

         1. This provides useful utilities:

         | Property          | Description                                                                     |
         | ----------------- | ------------------------------------------------------------------------------- |
         | `dispatch`        | You can dispatch additional actions from here                                   |
         | `getState`        | Access the Redux state                                                          |
         | `rejectWithValue` | Custom error payload to be handled in `rejected` case                           |
         | `signal`          | Used for aborting fetch requests (e.g. with `AbortController`)                  |
         | `extra`           | Any extra argument you configured via middleware                                |
         | `requestId`       | Unique ID for the request (used for deduplication or tracking concurrent calls) |

---

## 10. Selector

- Use `useSelector` to access values from the store.

```js
const count = useSelector((state) => state.header.count);
```

## 11. Toolkit Advantages

- **Less boilerplate**: No need to write action types or action creators manually.
- **Auto-generated actions**.
- **Immer integration** allows safe state mutation syntax.
- **Built-in thunk support** and DevTools.
- **Best practices by default**.

---

## Summary Table

| Concept        | Classic Redux                  | Redux Toolkit                          |
| -------------- | ------------------------------ | -------------------------------------- |
| Store          | createStore                    | configureStore                         |
| Reducer        | function with switch-case      | object with reducers using createSlice |
| Actions        | manually define type + payload | auto-generated by createSlice          |
| Action Creator | manually created               | auto-generated                         |
| Middleware     | manually applied               | redux-thunk included by default        |
| Immutability   | must return new state manually | Immer handles it internally            |
| Async Actions  | write thunk manually           | use createAsyncThunk                   |
