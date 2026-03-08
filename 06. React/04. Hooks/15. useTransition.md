# useTransition Hook (React 18+)

## TL;DR
- **`useTransition`** = Mark state updates as **non-urgent** (low priority)
- Returns `[isPending, startTransition]`
- **`startTransition(callback)`** = Mark updates inside callback as transitions
- **`isPending`** = Boolean indicating if transition is in progress
- **Use case:** Keep UI responsive during slow updates (large lists, heavy computations)
- Non-blocking: Urgent updates (typing, clicking) interrupt transitions
- Works with **Concurrent Rendering** (React 18+)
- Common use: Search/filter large lists without freezing UI

---

## 1. What is useTransition?

**`useTransition`** lets you mark certain state updates as **transitions** (non-urgent), allowing React to keep the UI responsive by prioritizing urgent updates.

### The Problem (Without useTransition)

```jsx
function SearchList() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(items); // 10,000 items

  const handleChange = (e) => {
    setQuery(e.target.value);
    
    // Filter large list - BLOCKS UI!
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setList(filtered); // ❌ UI freezes while filtering
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      <List items={list} />
    </>
  );
}
```

**Problem:** Typing feels laggy because filtering 10,000 items blocks the UI.

---

### The Solution (With useTransition)

```jsx
import { useState, useTransition } from "react";

function SearchList() {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery); // ✅ Urgent: Update input immediately

    // ✅ Non-urgent: Mark filtering as transition
    startTransition(() => {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(newQuery.toLowerCase())
      );
      setList(filtered); // ✅ Won't block typing
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={list} />
    </>
  );
}
```

**Result:** Typing is smooth, filtering happens in background!

---

## 2. Syntax

```jsx
const [isPending, startTransition] = useTransition();
```

### Returns

- **`isPending`**: Boolean
  - `true` if transition is in progress
  - `false` otherwise
  - Use to show loading indicators

- **`startTransition(callback)`**: Function
  - Marks state updates in `callback` as transitions (low priority)
  - No parameters
  - No return value

---

## 3. How useTransition Works

### Priority System

React 18+ has **two priority levels**:

1. **Urgent updates** (high priority):
   - User input (typing, clicking)
   - Animations
   - Immediate feedback
   - **Not wrapped** in `startTransition`

2. **Transitions** (low priority):
   - UI updates that can wait
   - Heavy computations
   - Large list rendering
   - **Wrapped** in `startTransition`

### Example: Priority in Action

```jsx
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // URGENT: Update input immediately (high priority)
    setInput(e.target.value);

    // TRANSITION: Update list later (low priority)
    startTransition(() => {
      setList(filterItems(e.target.value));
    });
  };

  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <List items={list} />
    </>
  );
}
```

**What happens when user types fast:**
1. Input updates **immediately** (high priority)
2. List filtering is **deferred** (low priority)
3. If user types again before filtering completes, old filtering is **cancelled**
4. New filtering starts with latest input value
5. Result: **Smooth typing**, no lag!

---

## 4. Common Use Cases

### Use Case 1: Search/Filter Large Lists

```jsx
function ProductSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState(allProducts);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    startTransition(() => {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filtered);
    });
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search products..."
      />
      {isPending && <div>Searching...</div>}
      <ProductList products={products} />
    </div>
  );
}
```

---

### Use Case 2: Tab Switching with Heavy Content

```jsx
function Tabs() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const switchTab = (tab) => {
    // Mark tab switch as transition (heavy content rendering)
    startTransition(() => {
      setActiveTab(tab);
    });
  };

  return (
    <div>
      <button onClick={() => switchTab("home")}>Home</button>
      <button onClick={() => switchTab("posts")}>Posts (10,000 items)</button>
      <button onClick={() => switchTab("photos")}>Photos (5,000 items)</button>

      {isPending && <Spinner />}

      {activeTab === "home" && <Home />}
      {activeTab === "posts" && <Posts />} {/* Heavy */}
      {activeTab === "photos" && <Photos />} {/* Heavy */}
    </div>
  );
}
```

---

### Use Case 3: Debounced Search (Alternative Pattern)

```jsx
function SearchWithTransition() {
  const [query, setQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Immediate

    // Defer expensive search
    startTransition(() => {
      setDeferredQuery(value);
    });
  };

  // Only search with deferred query
  const results = useMemo(
    () => searchDatabase(deferredQuery),
    [deferredQuery]
  );

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <SearchResults results={results} />
    </>
  );
}
```

---

### Use Case 4: Sorting/Filtering Large Data

```jsx
function DataTable({ data }) {
  const [sortKey, setSortKey] = useState("name");
  const [sortedData, setSortedData] = useState(data);
  const [isPending, startTransition] = useTransition();

  const handleSort = (key) => {
    setSortKey(key); // Immediate UI update

    startTransition(() => {
      const sorted = [...data].sort((a, b) =>
        a[key] > b[key] ? 1 : -1
      );
      setSortedData(sorted);
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("age")}>Age</th>
          <th onClick={() => handleSort("email")}>Email</th>
        </tr>
      </thead>
      <tbody>
        {isPending && <tr><td colSpan={3}>Sorting...</td></tr>}
        {sortedData.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

## 5. useTransition vs useDeferredValue

Both handle non-urgent updates, but differently:

| Feature | useTransition | useDeferredValue |
|---------|--------------|------------------|
| **Control** | You control when transition starts | React automatically defers value |
| **Use case** | Wrap state updates | Defer prop/state value |
| **isPending** | ✅ Provides `isPending` flag | ❌ No pending flag |
| **Flexibility** | More control | Simpler |

### Example Comparison

```jsx
// useTransition: You control the transition
const [isPending, startTransition] = useTransition();
const handleChange = (e) => {
  setQuery(e.target.value);
  startTransition(() => {
    setList(filter(e.target.value));
  });
};

// useDeferredValue: React defers automatically
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const list = useMemo(() => filter(deferredQuery), [deferredQuery]);
```

**When to use which:**
- **useTransition**: When you control the update (setState inside callback)
- **useDeferredValue**: When you receive value as prop or want simpler API

---

## 6. isPending Flag

The `isPending` flag is crucial for UX - show loading indicators while transition is in progress.

### Example: Loading Indicators

```jsx
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    setQuery(e.target.value);

    startTransition(() => {
      setResults(searchItems(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleSearch} />

      {/* Show loading indicator */}
      {isPending && (
        <div className="loading-indicator">
          <Spinner /> Searching...
        </div>
      )}

      {/* Dim results while updating */}
      <div className={isPending ? "opacity-50" : ""}>
        <SearchResults results={results} />
      </div>
    </div>
  );
}
```

### Example: Disable Actions During Transition

```jsx
function UpdateProfile() {
  const [formData, setFormData] = useState({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();

    startTransition(async () => {
      await updateProfile(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}

      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
```

---

## 7. Limitations & Gotchas

### 1. Only Synchronous setState

```jsx
// ❌ BAD: Async code in startTransition
startTransition(async () => {
  const data = await fetchData(); // ❌ Won't work as expected
  setData(data);
});

// ✅ GOOD: Async outside, setState inside
const handleFetch = async () => {
  const data = await fetchData();
  
  startTransition(() => {
    setData(data); // ✅ Only setState is transition
  });
};
```

---

### 2. Must Control the State

```jsx
// ❌ BAD: Can't mark props updates as transitions
function Child({ data }) {
  startTransition(() => {
    // Can't mark parent's state update as transition
  });
}

// ✅ GOOD: Mark state updates you control
function Parent() {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  startTransition(() => {
    setData(newData); // ✅ You control this state
  });
}
```

---

### 3. Not a Substitute for Debouncing

```jsx
// ❌ BAD: Still fires on every keystroke
const handleChange = (e) => {
  startTransition(() => {
    setQuery(e.target.value);
    // Still updates on EVERY keystroke, just low priority
  });
};

// ✅ GOOD: Combine with debouncing if needed
const handleChange = (e) => {
  const value = e.target.value;
  setQuery(value); // Immediate

  // Debounce + transition
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    startTransition(() => {
      setResults(search(value));
    });
  }, 300);
};
```

---

### 4. Requires Concurrent Features

```jsx
// useTransition requires Concurrent Mode (React 18+)
// If using React 17 or earlier, it won't work

// In React 18, no special setup needed:
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 8. Real-World Examples

### Example 1: E-commerce Product Filter

```jsx
function ProductPage() {
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    inStock: false,
  });
  const [isPending, startTransition] = useTransition();

  const applyFilter = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    startTransition(() => {
      const filtered = allProducts.filter(product => {
        if (newFilters.category !== "all" && product.category !== newFilters.category) {
          return false;
        }
        if (newFilters.inStock && !product.inStock) {
          return false;
        }
        // ... more filters
        return true;
      });
      setProducts(filtered);
    });
  };

  return (
    <div>
      <FilterPanel filters={filters} onFilterChange={applyFilter} />
      {isPending && <LoadingOverlay />}
      <ProductGrid products={products} isPending={isPending} />
    </div>
  );
}
```

---

### Example 2: Dashboard with Multiple Charts

```jsx
function Dashboard() {
  const [dateRange, setDateRange] = useState("week");
  const [chartData, setChartData] = useState(computeInitialData());
  const [isPending, startTransition] = useTransition();

  const handleDateRangeChange = (range) => {
    setDateRange(range);

    startTransition(() => {
      // Expensive calculation
      const newData = computeChartData(range);
      setChartData(newData);
    });
  };

  return (
    <div>
      <select value={dateRange} onChange={(e) => handleDateRangeChange(e.target.value)}>
        <option value="day">Last Day</option>
        <option value="week">Last Week</option>
        <option value="month">Last Month</option>
        <option value="year">Last Year</option>
      </select>

      <div className={isPending ? "opacity-60" : ""}>
        <SalesChart data={chartData.sales} />
        <RevenueChart data={chartData.revenue} />
        <UserChart data={chartData.users} />
      </div>
    </div>
  );
}
```

---

### Example 3: Code Editor with Syntax Highlighting

```jsx
function CodeEditor() {
  const [code, setCode] = useState("");
  const [highlightedCode, setHighlightedCode] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCodeChange = (newCode) => {
    setCode(newCode); // Immediate: Update textarea

    startTransition(() => {
      // Expensive: Syntax highlighting
      const highlighted = syntaxHighlight(newCode);
      setHighlightedCode(highlighted);
    });
  };

  return (
    <div className="editor">
      <textarea
        value={code}
        onChange={(e) => handleCodeChange(e.target.value)}
        spellCheck={false}
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: highlightedCode || code }}
      />
    </div>
  );
}
```

---

## 9. Interview Questions

### Q1: What is useTransition?

**Answer:** `useTransition` is a React hook that lets you mark state updates as **transitions** (non-urgent, low priority), keeping the UI responsive during expensive updates.

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setExpensiveState(newValue); // Low priority
});
```

---

### Q2: When should you use useTransition?

**Answer:** Use `useTransition` when:
- Updating large lists (search, filter, sort)
- Switching between tabs with heavy content
- Expensive computations that block UI
- You want to keep user input responsive

**Don't use for:**
- Urgent updates (user input)
- Simple state updates
- Already fast updates

---

### Q3: What does startTransition do?

**Answer:** `startTransition(callback)` marks all state updates inside the callback as **transitions** (low priority). React can interrupt and defer these updates to keep the UI responsive.

```jsx
startTransition(() => {
  setList(filterLargeList(query)); // Low priority
});
```

---

### Q4: What is isPending used for?

**Answer:** `isPending` is a boolean that's `true` while the transition is in progress. Use it to show loading indicators or dim content being updated.

```jsx
const [isPending, startTransition] = useTransition();

return (
  <>
    {isPending && <Spinner />}
    <Content isPending={isPending} />
  </>
);
```

---

### Q5: Can you use async code in startTransition?

**Answer:** No, `startTransition` only works with synchronous state updates. For async code, fetch the data first, then wrap the setState in `startTransition`.

```jsx
// ❌ BAD
startTransition(async () => {
  const data = await fetchData();
  setData(data);
});

// ✅ GOOD
const data = await fetchData();
startTransition(() => {
  setData(data);
});
```

---

### Q6: What's the difference between useTransition and useDeferredValue?

**Answer:**

| useTransition | useDeferredValue |
|--------------|------------------|
| You mark state updates | React defers a value |
| Provides `isPending` | No pending flag |
| More control | Simpler API |
| Wrap `setState` calls | Defer a prop/state |

---

### Q7: How does useTransition improve performance?

**Answer:** By allowing React to:
1. **Prioritize urgent updates** (user input) over transitions
2. **Interrupt transitions** if new urgent updates come in
3. **Batch transition updates** for efficiency
4. **Keep UI responsive** during expensive operations

---

### Q8: Can urgent updates interrupt transitions?

**Answer:** Yes! That's the key feature. If user types again while a transition is in progress, React cancels the old transition and starts a new one with the latest input.

```jsx
// User types "abc" quickly:
// "a" → starts transition
// "b" → interrupts previous, starts new transition
// "c" → interrupts previous, starts new transition
```

---

### Q9: Do you need Suspense with useTransition?

**Answer:** No, `useTransition` doesn't require Suspense. It's for marking state updates as low priority, not for loading states.

However, you can combine them:
```jsx
startTransition(() => {
  setTab("photos"); // Tab switch is a transition
  // <Photos /> might suspend and show Suspense fallback
});
```

---

### Q10: What React version is useTransition available in?

**Answer:** React 18+ (requires Concurrent Rendering features).

```jsx
// React 18 with createRoot (enables concurrent features)
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 10. Best Practices

### ✅ Always Do:

1. **Use for expensive updates** (filtering, sorting large data)
2. **Show loading indicators** with `isPending`
3. **Keep urgent updates outside** `startTransition`
4. **Test performance** - measure before/after
5. **Combine with useMemo** for expensive computations

### ❌ Never Do:

1. **Wrap urgent updates** (user input, clicks)
2. **Use for async operations** directly
3. **Mark everything** as a transition (defeats purpose)
4. **Forget to show loading state** (users need feedback)
5. **Use as debouncing replacement** (different purposes)

### 🎯 Advanced:

- Combine with `useDeferredValue` for complex scenarios
- Use with React Router for smooth navigation
- Implement optimistic UI updates alongside transitions
- Profile with React DevTools to verify improvements
- Consider virtual scrolling for very large lists

---

## Summary: useTransition Checklist

When using `useTransition`, ensure you:

- ✅ Understand it marks updates as low priority
- ✅ Use for expensive UI updates (large lists, heavy renders)
- ✅ Show loading indicators with `isPending`
- ✅ Keep urgent updates (input) outside `startTransition`
- ✅ Only wrap synchronous state updates
- ✅ Test that it actually improves perceived performance
- ✅ Know when to use `useTransition` vs `useDeferredValue`

Your `useTransition` knowledge is interview-ready when you can explain:

1. What it does (marks updates as low priority)
2. When to use it (expensive updates that block UI)
3. What `startTransition` and `isPending` do
4. How urgent updates can interrupt transitions
5. Difference from `useDeferredValue`
6. Why you can't use async code directly
7. Real-world use cases (search, tabs, filters)



