# Concurrent React & React Fiber

## TL;DR

- **React Fiber** = Complete rewrite of React's core algorithm (React 16+)
- **Concurrent Rendering** = React can pause, resume, and prioritize renders (React 18+)
- **Key benefit:** Keep UI responsive during expensive updates
- **Fiber:** Enables time-slicing and prioritization
- **Concurrent Features:** `useTransition`, `useDeferredValue`, Suspense, `startTransition`
- **Automatic Batching:** Multiple state updates batched together
- **Non-blocking:** High-priority updates (typing) can interrupt low-priority updates (data fetching)
- **Incremental Rendering:** React can split work into chunks

---

## 1. What is React Fiber?

**React Fiber** is React's reconciliation engine - a complete rewrite of React's core algorithm introduced in React 16.

### Before Fiber (React 15 and earlier)

React used a **stack-based, synchronous** reconciliation algorithm:

```
User action → Component updates → Reconciliation (blocking) → DOM update → UI ready
                                        ↑
                                   Blocks main thread
                                   Can't be interrupted
```

**Problems:**

- Long renders **block** the main thread
- Can't pause/resume work
- No prioritization
- Janky animations
- Unresponsive UI during updates

---

### After Fiber (React 16+)

Fiber enables **incremental, interruptible** rendering:

```
User action → Split into units of work → Process work → Check time → More work?
                                              ↓              ↓           ↓
                                         Render chunk   Yield to   Resume or
                                                       browser     Prioritize
```

**Benefits:**

- ✅ Pause and resume rendering
- ✅ Prioritize different types of updates
- ✅ Reuse or discard work
- ✅ Split work into chunks
- ✅ Keep UI responsive

---

## 2. How Fiber Works

### Fiber is a Data Structure

Each component has a **Fiber node** - a JavaScript object representing a unit of work:

```javascript
{
  type: 'div',              // Component type
  key: null,                // Unique key
  stateNode: DOMNode,       // Reference to DOM node or component instance
  child: FiberNode,         // First child
  sibling: FiberNode,       // Next sibling
  return: FiberNode,        // Parent fiber
  alternate: FiberNode,     // Previous version (for diffing)
  effectTag: 'UPDATE',      // What kind of work (PLACEMENT, UPDATE, DELETION)
  pendingProps: {...},      // New props
  memoizedProps: {...},     // Previous props
  memoizedState: {...},     // Previous state
  updateQueue: [...],       // Queue of updates
}
```

---

### Fiber Tree Structure

```jsx
<App>
  <Header>
    <Nav />
  </Header>
  <Main>
    <Content />
  </Main>
</App>
```

**Fiber Tree:**

```
App Fiber
├─ child → Header Fiber
│          ├─ child → Nav Fiber
│          └─ return → App Fiber
└─ sibling → Main Fiber
             ├─ child → Content Fiber
             └─ return → App Fiber
```

**Traversal:**

1. Process App
2. Go to child (Header)
3. Process Header, go to child (Nav)
4. Process Nav, no children, return to Header
5. No siblings, return to App
6. Go to sibling (Main)
7. Continue...

---

### Two Phases: Render & Commit

**Phase 1: Render** (Interruptible)

- Build fiber tree
- Calculate changes
- Can be paused
- Can be discarded

**Phase 2: Commit** (Synchronous)

- Apply changes to DOM
- Run side effects
- Cannot be interrupted

```
Render Phase (async)          Commit Phase (sync)
─────────────────────         ──────────────────
Work on fiber trees     →     Apply to DOM
Can be interrupted            Must complete
Can be restarted              One-shot execution
```

---

## 3. Concurrent Rendering (React 18+)

**Concurrent Rendering** allows React to prepare multiple versions of the UI at once and interrupt low-priority work for urgent updates.

### Enabling Concurrent Mode

```jsx
// React 18: Opt-in with new root API
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

**Old API (Legacy Mode):**

```jsx
// React 17 and earlier
import ReactDOM from "react-dom";

ReactDOM.render(<App />, document.getElementById("root"));
```

---

## 4. Priority Levels

React Fiber assigns priority levels to updates:

| Priority          | Description             | Example                 | Can be interrupted? |
| ----------------- | ----------------------- | ----------------------- | ------------------- |
| **Immediate**     | Must happen right now   | Controlled input, click | No                  |
| **User-blocking** | User interaction result | Hover, focus            | Rarely              |
| **Normal**        | Regular updates         | Network responses       | Yes                 |
| **Low**           | Can wait                | Analytics, logging      | Yes                 |
| **Idle**          | Only when idle          | Offscreen content       | Yes                 |

---

### Example: Priority in Action

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    // HIGH PRIORITY: Update input immediately
    setQuery(e.target.value);

    // LOW PRIORITY: Search can wait
    startTransition(() => {
      const searchResults = expensiveSearch(e.target.value);
      setResults(searchResults);
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      <SearchResults results={results} />
    </>
  );
}
```

**What happens:**

1. User types "R"
2. React immediately updates input (high priority)
3. React starts search (low priority)
4. User types "E" before search completes
5. React **interrupts** search, updates input first
6. Then restarts search with "RE"

---

## 5. Concurrent Features

### 5.1. startTransition

Mark non-urgent updates:

```jsx
import { startTransition } from "react";

function TabContainer() {
  const [tab, setTab] = useState("home");

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab); // Low priority
    });
  };

  return (
    <>
      <button onClick={() => selectTab("home")}>Home</button>
      <button onClick={() => selectTab("posts")}>Posts</button>
      <button onClick={() => selectTab("contact")}>Contact</button>

      <TabContent tab={tab} />
    </>
  );
}
```

---

### 5.2. useTransition

Hook version with pending state:

```jsx
import { useTransition } from "react";

function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value) => {
    setQuery(value); // Urgent

    startTransition(() => {
      const data = expensiveSearch(value); // Non-urgent
      setResults(data);
    });
  };

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <Spinner />}
      <Results data={results} />
    </>
  );
}
```

---

### 5.3. useDeferredValue

Defer a value's update:

```jsx
import { useDeferredValue, useMemo } from "react";

function ProductList({ products, searchQuery }) {
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [products, deferredQuery]);

  return <List items={filteredProducts} />;
}
```

**Behavior:**

- `searchQuery` updates immediately (user types)
- `deferredQuery` updates with low priority
- Keeps typing smooth while filtering happens in background

---

### 5.4. Suspense for Data Fetching

```jsx
import { Suspense } from "react";

function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // React 19
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userId={123} />
    </Suspense>
  );
}
```

**Concurrent behavior:**

- React renders fallback immediately
- Continues preparing `UserProfile` in background
- Swaps in when ready

---

## 6. Automatic Batching (React 18+)

React 18 **automatically batches** state updates everywhere:

### React 17 (Limited Batching)

```jsx
// ✅ Batched in event handlers
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // One re-render
}

// ❌ NOT batched in async code
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Two re-renders!
}, 1000);

fetch("/api").then(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // Two re-renders!
});
```

---

### React 18 (Automatic Batching)

```jsx
// ✅ Batched everywhere
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // One re-render
}, 1000);

fetch("/api").then(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // One re-render
});

// Even in event handlers
el.addEventListener("click", () => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // One re-render
});
```

---

### Opting Out of Batching

```jsx
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1);
  });
  // DOM updated here

  flushSync(() => {
    setFlag((f) => !f);
  });
  // DOM updated again
}
```

**Warning:** Rarely needed, can hurt performance.

---

## 7. Time Slicing

**Time Slicing** = Break rendering work into small chunks, yielding to browser between chunks.

```
Without Time Slicing (Blocking):
[=======Long Render=======] ← Blocks for 100ms
                            ↓ UI frozen

With Time Slicing (Non-blocking):
[==] yield [==] yield [==] yield [==] yield [==]
 ↑          ↑          ↑          ↑          ↑
 5ms     handle      5ms      handle     5ms
        events              events
```

**Result:** UI stays responsive even during expensive renders.

---

## 8. Benefits of Concurrent React

### 1. Responsive UI

```jsx
// ❌ Before: Typing feels laggy
function SearchPage() {
  const [query, setQuery] = useState("");
  const results = expensiveSearch(query); // Blocks typing

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Results data={results} />
    </>
  );
}

// ✅ After: Typing is smooth
function SearchPage() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = expensiveSearch(deferredQuery);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Results data={results} />
    </>
  );
}
```

---

### 2. Better Loading States

```jsx
// ❌ Before: Hard to coordinate loading states
function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  if (!user || !posts) return <Loading />;
  return <ProfileView user={user} posts={posts} />;
}

// ✅ After: Suspense coordinates automatically
function Profile() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileView /> {/* Suspends until data ready */}
    </Suspense>
  );
}
```

---

### 3. Smoother Animations

```jsx
// Animations don't stutter during state updates
function AnimatedList({ items }) {
  const [filter, setFilter] = useState("");

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <motion.div>
        {" "}
        {/* Framer Motion */}
        {items.filter(/* ... */).map((item) => (
          <motion.div key={item.id} layout>
            {" "}
            {/* ✅ Smooth */}
            {item.name}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
```

---

## 9. Common Patterns

### Pattern 1: Urgent vs Non-Urgent Updates

```jsx
function Dashboard() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (value) => {
    // Urgent: Update input immediately
    setInput(value);

    // Non-urgent: Filter data with transition
    startTransition(() => {
      const filtered = filterData(data, value);
      setData(filtered);
    });
  };

  return (
    <>
      <input
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {isPending && <Spinner />}
      <DataGrid data={data} />
    </>
  );
}
```

---

### Pattern 2: Optimistic UI with Transitions

```jsx
function CommentForm() {
  const [comments, setComments] = useState([]);
  const [isPending, startTransition] = useTransition();

  const addComment = async (text) => {
    // Optimistic update
    const tempComment = { id: Date.now(), text, pending: true };
    setComments([...comments, tempComment]);

    // Actual API call (non-urgent)
    startTransition(async () => {
      const savedComment = await saveComment(text);
      setComments((comments) =>
        comments.map((c) => (c.id === tempComment.id ? savedComment : c))
      );
    });
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment} pending={comment.pending} />
      ))}
      {isPending && <Saving />}
      <CommentInput onSubmit={addComment} />
    </>
  );
}
```

---

## 10. Interview Questions

### Q1: What is React Fiber?

**Answer:** React Fiber is React's reconciliation engine - a complete rewrite of the core algorithm. It enables:

- Incremental rendering (split work into chunks)
- Pausable and resumable rendering
- Prioritization of updates
- Concurrent rendering features

Introduced in React 16.

---

### Q2: What is Concurrent Rendering?

**Answer:** Concurrent Rendering allows React to work on multiple versions of the UI at once and interrupt low-priority renders for urgent updates. Keeps UI responsive during expensive operations.

**Key features:**

- `useTransition`
- `useDeferredValue`
- Suspense for data fetching
- Automatic batching

---

### Q3: How does Fiber improve performance?

**Answer:** Fiber enables:

1. **Time-slicing:** Break work into chunks, yield to browser
2. **Prioritization:** Handle urgent updates first
3. **Interruptibility:** Pause low-priority work for urgent updates
4. **Concurrent rendering:** Prepare updates in background

**Result:** UI stays responsive even during heavy renders.

---

### Q4: What's the difference between Legacy Mode and Concurrent Mode?

**Answer:**

**Legacy Mode** (React 17):

```jsx
ReactDOM.render(<App />, root);
```

- Synchronous rendering
- No concurrent features
- Limited batching

**Concurrent Mode** (React 18):

```jsx
createRoot(root).render(<App />);
```

- Concurrent rendering
- Full concurrent features
- Automatic batching everywhere

---

### Q5: What is automatic batching in React 18?

**Answer:** Automatic batching groups multiple state updates into a single re-render for better performance. In React 18, it works **everywhere** (event handlers, promises, timeouts), not just in React event handlers.

```jsx
// React 18: One re-render
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
}, 1000);
```

---

### Q6: When should you use startTransition?

**Answer:** Use `startTransition` to mark non-urgent updates that can be interrupted:

- Filtering large lists
- Search results
- Expensive calculations
- Non-critical UI updates

**Don't use for:**

- Controlled inputs (typing)
- Critical UI feedback
- Animations

---

### Q7: What's the difference between useTransition and useDeferredValue?

**Answer:**

**`useTransition`:** For your own state updates

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setState(newValue);
});
```

**`useDeferredValue`:** For values you don't control (props, external state)

```jsx
const deferredValue = useDeferredValue(prop);
```

---

### Q8: What are the two phases of React rendering?

**Answer:**

**Render Phase** (interruptible):

- Build/update fiber tree
- Calculate what changed
- Can be paused/resumed
- Can be discarded

**Commit Phase** (synchronous):

- Apply changes to DOM
- Run effects
- Cannot be interrupted

---

### Q9: What is time-slicing in React?

**Answer:** Time-slicing is when React breaks rendering work into small chunks and yields to the browser between chunks. This keeps the main thread free to handle user interactions, making the UI feel responsive even during expensive renders.

---

### Q10: Is Concurrent Rendering automatic in React 18?

**Answer:** **No**, you must opt-in by using the new root API:

```jsx
import { createRoot } from "react-dom/client";
createRoot(root).render(<App />);
```

Then use concurrent features like `useTransition`, `useDeferredValue`, Suspense.

---

## Summary: Concurrent React & Fiber Checklist

Understanding Concurrent React:

- ✅ Know Fiber enables incremental, interruptible rendering
- ✅ Understand render phase (async) vs commit phase (sync)
- ✅ Use `createRoot` to enable concurrent features
- ✅ Mark non-urgent updates with `useTransition`
- ✅ Defer values with `useDeferredValue`
- ✅ Leverage automatic batching (everywhere in React 18)
- ✅ Understand priority levels (Immediate → Idle)
- ✅ Know when concurrent features help (expensive renders)

Your Concurrent React knowledge is interview-ready when you can explain:

1. What Fiber is (reconciliation engine enabling concurrency)
2. How Fiber works (fiber tree, two phases)
3. What Concurrent Rendering is (interruptible, prioritized updates)
4. Concurrent features (`useTransition`, `useDeferredValue`, Suspense)
5. Automatic batching in React 18
6. Time-slicing concept
7. When to use concurrent features
8. Benefits (responsive UI, smoother updates)
