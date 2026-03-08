# useSyncExternalStore Hook (React 18+)

## TL;DR
- **`useSyncExternalStore`** = Subscribe to external stores (outside React)
- Returns the **current snapshot** of the external store
- **Use case:** Integrate with non-React state management (Redux, Zustand, browser APIs)
- **Solves:** Tearing issues in Concurrent React
- **Syntax:** `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)`
- **React 18+** feature for concurrent-safe external subscriptions
- **Tearing** = Different parts of UI showing different versions of data

---

## 1. What is useSyncExternalStore?

**`useSyncExternalStore`** is a React 18+ hook that lets you subscribe to external data sources in a way that's **safe for Concurrent React**.

### The Problem: Tearing

Before React 18, subscribing to external stores could cause **"tearing"** - different parts of the UI showing different versions of the same data.

```jsx
// ❌ Problem: Potential tearing in Concurrent React
function Component() {
  const [data, setData] = useState(externalStore.getData());

  useEffect(() => {
    const unsubscribe = externalStore.subscribe(() => {
      setData(externalStore.getData()); // ⚠️ Can cause tearing!
    });
    return unsubscribe;
  }, []);

  return <div>{data}</div>;
}
```

**Tearing scenario:**
1. Store updates to value "B"
2. Component A starts rendering with "B"
3. Store updates to value "C" during render
4. Component B renders with "C"
5. **Result:** UI inconsistency (A shows "B", B shows "C")

---

### The Solution: useSyncExternalStore

```jsx
import { useSyncExternalStore } from 'react';

function Component() {
  const data = useSyncExternalStore(
    externalStore.subscribe,    // subscribe function
    externalStore.getData       // getSnapshot function
  );

  return <div>{data}</div>;
}
```

**React ensures** all components see the same snapshot during a render, preventing tearing.

---

## 2. Syntax

```jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

### Parameters

1. **`subscribe(callback)`**: Function that subscribes to the store
   - React calls this to set up subscription
   - Must return an unsubscribe function
   - Should call `callback` when store changes

2. **`getSnapshot()`**: Function that returns current snapshot of store
   - Must return immutable data
   - Called on every render
   - **Must be stable** - return same value if store hasn't changed

3. **`getServerSnapshot()`** (optional): Returns initial snapshot for SSR
   - Used during server-side rendering
   - If omitted, component can't be rendered on server

### Returns

- **`snapshot`**: Current snapshot of the store

---

## 3. Basic Example

### Simple Counter Store

```jsx
// externalStore.js
let count = 0;
let listeners = [];

export const counterStore = {
  subscribe(callback) {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter(l => l !== callback);
    };
  },

  getSnapshot() {
    return count;
  },

  increment() {
    count++;
    listeners.forEach(callback => callback());
  },

  decrement() {
    count--;
    listeners.forEach(callback => callback());
  },
};

// Component.jsx
import { useSyncExternalStore } from 'react';
import { counterStore } from './externalStore';

function Counter() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={counterStore.increment}>+</button>
      <button onClick={counterStore.decrement}>-</button>
    </div>
  );
}
```

---

## 4. Browser API Examples

### Example 1: Window Size

```jsx
function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

function subscribe(callback) {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
}

function useWindowSize() {
  const size = useSyncExternalStore(
    subscribe,
    getWindowSize,
    () => ({ width: 0, height: 0 }) // Server snapshot
  );

  return size;
}

// Usage
function App() {
  const { width, height } = useWindowSize();
  
  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

---

### Example 2: Network Status

```jsx
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => true // Assume online on server
  );

  return isOnline;
}

// Usage
function NetworkIndicator() {
  const isOnline = useOnlineStatus();
  
  return (
    <div className={isOnline ? 'online' : 'offline'}>
      {isOnline ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}
```

---

### Example 3: Media Query

```jsx
function useMediaQuery(query) {
  const subscribe = useCallback((callback) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', callback);
    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  }, [query]);

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = () => false; // Default for SSR

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div>
      {isMobile && <MobileView />}
      {!isMobile && <DesktopView />}
      {isDark && <p>Dark mode detected</p>}
    </div>
  );
}
```

---

## 5. State Management Integration

### Example 1: Redux Integration

```jsx
// useReduxStore.js
import { useSyncExternalStore } from 'react';
import { store } from './reduxStore';

export function useReduxStore(selector) {
  const subscribe = (callback) => {
    return store.subscribe(callback);
  };

  const getSnapshot = () => {
    return selector(store.getState());
  };

  return useSyncExternalStore(subscribe, getSnapshot);
}

// Usage
function UserProfile() {
  const user = useReduxStore(state => state.user);
  const isLoading = useReduxStore(state => state.loading);

  if (isLoading) return <div>Loading...</div>;
  return <div>Hello, {user.name}!</div>;
}
```

---

### Example 2: Zustand-like Store

```jsx
// createStore.js
export function createStore(initialState) {
  let state = initialState;
  let listeners = [];

  return {
    getState() {
      return state;
    },

    setState(newState) {
      state = typeof newState === 'function' 
        ? newState(state) 
        : newState;
      
      listeners.forEach(listener => listener());
    },

    subscribe(listener) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
  };
}

// userStore.js
const userStore = createStore({ name: 'Guest', loggedIn: false });

export function useUserStore(selector) {
  return useSyncExternalStore(
    userStore.subscribe,
    () => selector(userStore.getState())
  );
}

// Usage
function Header() {
  const name = useUserStore(state => state.name);
  const isLoggedIn = useUserStore(state => state.loggedIn);

  return (
    <header>
      {isLoggedIn ? `Welcome, ${name}` : 'Please log in'}
    </header>
  );
}
```

---

## 6. SSR (Server-Side Rendering)

### With getServerSnapshot

```jsx
function useWindowWidth() {
  const subscribe = (callback) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  const getSnapshot = () => window.innerWidth;

  // ✅ GOOD: Provide server snapshot
  const getServerSnapshot = () => 1024; // Default width for SSR

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Works on both client and server
function Component() {
  const width = useWindowWidth();
  return <div>Width: {width}</div>;
}
```

---

### Without getServerSnapshot

```jsx
function useWindowWidth() {
  const subscribe = (callback) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  const getSnapshot = () => window.innerWidth;

  // ❌ BAD: No server snapshot
  return useSyncExternalStore(subscribe, getSnapshot);
}

// ⚠️ Error during SSR: "window is not defined"
```

---

## 7. Performance Considerations

### Selector Optimization

```jsx
// ❌ BAD: Creates new object every time
function Component() {
  const data = useSyncExternalStore(
    store.subscribe,
    () => ({ name: store.name, age: store.age }) // New object!
  );
  return <div>{data.name}</div>;
}

// ✅ GOOD: Return primitive or stable reference
function Component() {
  const name = useSyncExternalStore(
    store.subscribe,
    () => store.name // Primitive value
  );
  return <div>{name}</div>;
}

// ✅ GOOD: Memoize selector
function Component() {
  const selector = useCallback(() => ({
    name: store.name,
    age: store.age,
  }), []);

  const data = useSyncExternalStore(
    store.subscribe,
    selector
  );
  return <div>{data.name}</div>;
}
```

---

### Subscribe Function Stability

```jsx
// ❌ BAD: New subscribe function on every render
function Component({ storeId }) {
  const data = useSyncExternalStore(
    (callback) => subscribeToStore(storeId, callback), // New function!
    () => getStoreData(storeId)
  );
  return <div>{data}</div>;
}

// ✅ GOOD: Stable subscribe function
function Component({ storeId }) {
  const subscribe = useCallback((callback) => {
    return subscribeToStore(storeId, callback);
  }, [storeId]);

  const getSnapshot = useCallback(() => {
    return getStoreData(storeId);
  }, [storeId]);

  const data = useSyncExternalStore(subscribe, getSnapshot);
  return <div>{data}</div>;
}
```

---

## 8. Real-World Examples

### Example 1: Local Storage Sync

```jsx
function createLocalStorageStore(key, initialValue) {
  let listeners = [];

  const getSnapshot = () => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  };

  const subscribe = (callback) => {
    const handleStorage = (e) => {
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  };

  const setState = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    listeners.forEach(callback => callback());
  };

  return { getSnapshot, subscribe, setState };
}

function useLocalStorage(key, initialValue) {
  const store = useMemo(
    () => createLocalStorageStore(key, initialValue),
    [key, initialValue]
  );

  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => initialValue // Server snapshot
  );

  return [value, store.setState];
}

// Usage
function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}
```

---

### Example 2: URL Query Parameters

```jsx
function subscribeToURL(callback) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

function getURLSnapshot() {
  return new URLSearchParams(window.location.search);
}

function useQueryParams() {
  const params = useSyncExternalStore(
    subscribeToURL,
    getURLSnapshot,
    () => new URLSearchParams() // Server snapshot
  );

  return params;
}

// Usage
function SearchPage() {
  const params = useQueryParams();
  const query = params.get('q');
  const page = params.get('page') || '1';

  return (
    <div>
      <p>Search query: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}
```

---

## 9. Interview Questions

### Q1: What is useSyncExternalStore?

**Answer:** `useSyncExternalStore` is a React 18+ hook that lets you subscribe to external stores in a way that's safe for Concurrent React. It prevents "tearing" - when different parts of the UI show different versions of data.

```jsx
const data = useSyncExternalStore(subscribe, getSnapshot);
```

---

### Q2: What is "tearing" in React?

**Answer:** **Tearing** is when different components render with different versions of the same external data during a single render cycle. It can happen in Concurrent React when:
1. External store updates during rendering
2. Different components read the store at different times
3. **Result:** UI inconsistency

`useSyncExternalStore` prevents this by ensuring all components see the same snapshot.

---

### Q3: When should you use useSyncExternalStore?

**Answer:** Use when subscribing to external data sources:
- Browser APIs (window size, network status, media queries)
- External state management (Redux, Zustand, MobX)
- Custom event emitters
- LocalStorage, SessionStorage
- URL/query parameters

**Don't use** for React state (`useState`, `useReducer`, Context) - they're already concurrent-safe.

---

### Q4: What are the three parameters of useSyncExternalStore?

**Answer:**

1. **`subscribe(callback)`** - Sets up subscription, returns cleanup function
2. **`getSnapshot()`** - Returns current store value
3. **`getServerSnapshot()`** (optional) - Returns initial value for SSR

---

### Q5: Why does getSnapshot need to return immutable data?

**Answer:** React uses `Object.is()` to compare snapshots. If `getSnapshot()` returns a new object every time, React thinks the store changed and re-renders unnecessarily.

```jsx
// ❌ BAD: New object every time
() => ({ value: store.value })

// ✅ GOOD: Return same object if value hasn't changed
() => store.value
```

---

### Q6: What's the difference between useSyncExternalStore and useEffect + useState?

**Answer:**

**`useEffect` + `useState`:**
- Can cause tearing in Concurrent React
- Updates after render (asynchronous)
- Not safe for external stores

**`useSyncExternalStore`:**
- Prevents tearing
- Updates synchronously during render
- Designed for external stores

---

### Q7: Is useSyncExternalStore only for React 18+?

**Answer:** The hook was introduced in React 18 for Concurrent React. There's a **shim package** (`use-sync-external-store`) for React 17:

```bash
npm install use-sync-external-store
```

```jsx
import { useSyncExternalStore } from 'use-sync-external-store/shim';
```

---

### Q8: Can you use useSyncExternalStore with Redux?

**Answer:** Yes! Redux's `useSelector` uses `useSyncExternalStore` internally in React 18+. But you can also create custom hooks:

```jsx
function useReduxStore(selector) {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
}
```

---

### Q9: What happens if getSnapshot returns different value on every call?

**Answer:** React will re-render infinitely because it thinks the store is constantly changing.

```jsx
// ❌ BAD: Infinite loop!
useSyncExternalStore(
  subscribe,
  () => ({ value: store.value }) // New object every time!
);
```

**Solution:** Return primitive values or memoized objects.

---

### Q10: Do you need useSyncExternalStore for Context API?

**Answer:** No! Context API is built into React and already concurrent-safe. Use `useContext()` instead.

`useSyncExternalStore` is only for **external** (non-React) stores.

---

## Summary: useSyncExternalStore Checklist

When using `useSyncExternalStore`:

- ✅ Use for external stores (browser APIs, Redux, custom stores)
- ✅ Subscribe function must return cleanup function
- ✅ getSnapshot must return immutable/stable values
- ✅ Provide getServerSnapshot for SSR
- ✅ Memoize subscribe and getSnapshot with useCallback
- ✅ Don't use for React state (useState, Context)
- ✅ Understand it prevents tearing in Concurrent React

Your `useSyncExternalStore` knowledge is interview-ready when you can explain:

1. What it does (subscribes to external stores safely)
2. What tearing is (inconsistent UI from concurrent updates)
3. When to use it (external stores, browser APIs)
4. The three parameters (subscribe, getSnapshot, getServerSnapshot)
5. Why getSnapshot must return stable values
6. How it differs from useEffect + useState
7. Real-world use cases (window size, network status, Redux)



