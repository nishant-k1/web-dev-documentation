# Redux Basics

## TL;DR
- Predictable state container for JavaScript apps
- Single source of truth (one store)
- State is read-only (dispatch actions to change)
- Changes made with pure functions (reducers)
- Time-travel debugging with Redux DevTools

## Core Concepts

### 1. Store
Single source of truth containing entire app state.

```js
import { createStore } from 'redux';

const store = createStore(reducer);
```

### 2. Actions
Plain objects describing what happened.

```js
// Action type
const INCREMENT = 'INCREMENT';

// Action creator
function increment() {
  return { type: INCREMENT };
}

// Action with payload
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: { id: Date.now(), text, completed: false }
  };
}
```

### 3. Reducers
Pure functions that specify how state changes.

```js
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}
```

### 4. Dispatch
Send actions to the store.

```js
store.dispatch(increment());
store.dispatch({ type: 'DECREMENT' });
```

## Complete Example: Counter

```js
// 1. Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 2. Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// 3. Reducer
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// 4. Create Store
const store = createStore(counterReducer);

// 5. Subscribe to changes
store.subscribe(() => {
  console.log('State:', store.getState());
});

// 6. Dispatch actions
store.dispatch(increment()); // State: { count: 1 }
store.dispatch(increment()); // State: { count: 2 }
store.dispatch(decrement()); // State: { count: 1 }
```

## React Integration

### Setup with Provider

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

### Connect with Hooks

```jsx
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  // Get state
  const count = useSelector(state => state.count);
  
  // Get dispatch
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

## Real-World Example: Todo List

```js
// actions.js
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

// reducer.js
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from './actions';

const initialState = {
  todos: []
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    default:
      return state;
  }
}

// Component
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './actions';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };
  
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Redux Toolkit (Modern Redux)

```js
// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1; // Can "mutate" with Immer
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// Component
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: Why use Redux?

**Answer:**
- Predictable state management
- Easy debugging (time-travel)
- Centralized state
- Great DevTools
- Middleware support

### Q2: Redux vs Context API?

**Answer:**
- **Redux**: Complex state, frequent updates, middleware, devtools
- **Context**: Simple state, infrequent updates, built-in

### Q3: What are Redux middleware?

**Answer:** Functions that intercept actions before they reach reducers. Common use cases:
- Logging
- Async operations (redux-thunk)
- API calls

```js
const logger = store => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};
```

### Q4: Can reducers have side effects?

**Answer:** No! Reducers must be pure functions. Use middleware for side effects.

### Q5: How to handle async actions?

**Answer:** Use middleware like Redux Thunk or Redux Saga:

```js
// Thunk
const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: 'FETCH_START' });
  try {
    const user = await api.getUser(id);
    dispatch({ type: 'FETCH_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
};
```

## Best Practices

1. **Use Redux Toolkit** - modern, less boilerplate
2. **Keep reducers pure** - no side effects
3. **Normalize state** - avoid nested data
4. **Use selectors** - encapsulate state shape
5. **Don't put everything in Redux** - local state is fine

## When to Use Redux

✅ **Use when:**
- Complex state logic
- State shared across many components
- Need time-travel debugging
- Large app with many developers

❌ **Don't use when:**
- Simple app
- Learning React (start with Context)
- State is mostly local
- Overkill for your needs

## Related Concepts

- **Redux Toolkit**: Modern Redux
- **Context API**: Simpler alternative
- **useReducer**: Local Redux-like pattern
- **Redux DevTools**: Debugging tool



