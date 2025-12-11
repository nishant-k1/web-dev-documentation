# ✅ Redux Toolkit (RTK) – Interview-Focused Cheat Sheet

## ✅ Why Redux Toolkit?

Redux Toolkit (RTK) is the **Official, recommended way to write Redux logic**.

### ❌ Problems with Classic Redux

- Too much boilerplate (actions, action creators, reducers)
- Difficult to scale and maintain
- Harder to write async logic
- Verbose store setup

### ✅ RTK Solves These With

- `createSlice` for reducers + actions
- `configureStore` for setting up store with good defaults
- `createAsyncThunk` for handling async logic
- Built-in dev tools, middleware, immutability

---

## 🧠 Core APIs You Must Know

### 1. `configureStore()`

```ts
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { counter: counterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
```

- Automatically sets up:
  - `redux-thunk`
  - `redux-devtools-extension`
  - Middleware defaults (e.g., immutability checks)

---

### 2. `createSlice()`

```ts
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value++;
    }, // allowed: uses immer
    decrement: (state) => {
      state.value--;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

✅ Combines action creators and reducers  
✅ You can mutate state directly — **thanks to immer under the hood**

---

### 3. `createAsyncThunk()`

```ts
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    const res = await fetch(`/api/user/${userId}`);
    return await res.json();
  }
);
```

Creates 3 action types for you:

- `user/fetchUser/pending`
- `user/fetchUser/fulfilled`
- `user/fetchUser/rejected`

Handle them in slice:

```ts
extraReducers: (builder) => {
  builder
    .addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
    })
    .addCase(fetchUser.rejected, (state) => {
      state.status = "failed";
    });
};
```

---

### 4. `createEntityAdapter()` (Bonus)

- Helps manage normalized data like lists

```ts
const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
```

---

### 5. `createSelector` from Reselect (Still useful)

```ts
import { createSelector } from "@reduxjs/toolkit";

const selectUser = (state) => state.user;

const selectUserName = createSelector([selectUser], (user) => user.name);
```

✅ Improves performance via memoization

---

## 🧩 Hooks (with React-Redux v7.1+)

Use these instead of `connect()`:

```ts
import { useSelector, useDispatch } from "react-redux";

const value = useSelector((state) => state.counter.value);
const dispatch = useDispatch();

dispatch(increment());
```

---

## 💡 Best Practices

| Practice                       | Description                                 |
| ------------------------------ | ------------------------------------------- |
| Slice per feature/module       | Maintain separation of concerns             |
| Keep async logic in thunks     | Use `createAsyncThunk` or RTK Query         |
| Avoid direct mutation          | Except inside `createSlice` thanks to Immer |
| Use selectors for derived data | Avoid computing inside components           |
| Use `configureStore()`         | Don’t manually use `createStore`            |

---

## 🛠 RTK Query (Advanced)

```ts
// optional advanced tool for data fetching and caching
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({ query: () => "posts" }),
  }),
});

export const { useGetPostsQuery } = api;
```

✅ Auto generates hooks like `useGetPostsQuery`  
✅ Handles caching, invalidation, loading, error state

---

## ⚖️ Redux vs Redux Toolkit

| Feature      | Classic Redux       | Redux Toolkit      |
| ------------ | ------------------- | ------------------ |
| Boilerplate  | High                | Low                |
| Immutability | Manual (spread ops) | Auto (via Immer)   |
| DevTools     | Manual setup        | Built-in           |
| Async        | Manually via thunk  | `createAsyncThunk` |
| Setup        | Verbose             | One-liner setup    |

---

## 📚 Interview Traps / Must Know

- **You still use Redux under the hood** — RTK is just a layer over classic Redux
- RTK uses **Immer** — understand its impact (e.g., can “mutate” state)
- `createAsyncThunk` is preferred over custom thunks
- You can still manually write reducers, but `createSlice` is idiomatic
- `extraReducers` is used to handle actions **not defined in the same slice**
- Know when to use **RTK Query vs `createAsyncThunk`**

---

## ✅ Summary

- Use `configureStore` instead of `createStore`
- Use `createSlice` for reducers + actions
- Use `createAsyncThunk` for async ops
- Prefer hooks: `useSelector`, `useDispatch`
- Know how RTK differs from classic Redux
