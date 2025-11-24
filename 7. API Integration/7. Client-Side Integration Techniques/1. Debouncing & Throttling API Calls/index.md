# Debouncing & Throttling API Calls

Understanding debouncing and throttling for API calls - preventing excessive requests, optimizing search inputs, and improving performance.

---

## Core Concept

**Debouncing** and **Throttling** are techniques to limit how often a function (API call) executes.

**Key Difference:**
- **Debounce** - Wait for pause, then execute once
- **Throttle** - Execute at most once per time period

---

## Debouncing

### What is Debouncing?

**Debouncing** delays function execution until after a pause in activity.

**Use Case:** Search input - wait until user stops typing

**Example:**
```
User types: "r" → "re" → "rea" → "reac" → "react"
Without debounce: 5 API calls
With debounce (300ms): 1 API call (after user stops)
```

---

### Debounce Implementation

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const debouncedSearch = debounce((query) => {
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => console.log(data));
}, 300);

// User types "react"
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

---

### React Hook: useDebounce

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```

---

### Debounce with AbortController

```javascript
let abortController = null;

const debouncedSearch = debounce(async (query) => {
  // Cancel previous request
  if (abortController) {
    abortController.abort();
  }

  // Create new request
  abortController = new AbortController();
  
  try {
    const res = await fetch(`/api/search?q=${query}`, {
      signal: abortController.signal
    });
    const data = await res.json();
    setResults(data);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  }
}, 300);
```

---

## Throttling

### What is Throttling?

**Throttling** limits function execution to at most once per time period.

**Use Case:** Scroll events, resize events - execute periodically

**Example:**
```
User scrolls rapidly: 100 events in 1 second
Without throttle: 100 function calls
With throttle (100ms): 10 function calls (one per 100ms)
```

---

### Throttle Implementation

```javascript
function throttle(func, delay) {
  let lastCall = 0;
  
  return function (...args) {
    const now = Date.now();
    
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Usage
const throttledScroll = throttle(() => {
  fetch('/api/scroll-position')
    .then(res => res.json());
}, 100);

window.addEventListener('scroll', throttledScroll);
```

---

### Throttle with Leading/Trailing

```javascript
function throttle(func, delay, options = {}) {
  let lastCall = 0;
  let timeoutId = null;
  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      // Execute immediately
      if (leading) {
        lastCall = now;
        func.apply(this, args);
      }
    } else if (trailing && !timeoutId) {
      // Schedule execution
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, delay - timeSinceLastCall);
    }
  };
}

// Usage
const throttled = throttle(() => {
  console.log('Throttled call');
}, 1000, { leading: true, trailing: true });
```

---

## When to Use Debounce vs Throttle

### Use Debounce When:

✅ **Search input** - Wait for user to finish typing
✅ **Form validation** - Wait for user to finish input
✅ **Window resize** - Wait for user to finish resizing
✅ **Button clicks** - Prevent double-clicks

**Pattern:** "Wait for pause, then execute"

---

### Use Throttle When:

✅ **Scroll events** - Update periodically
✅ **Mouse move** - Track cursor position
✅ **API polling** - Check for updates periodically
✅ **Resize events** - Update layout periodically

**Pattern:** "Execute at most once per period"

---

## Real-World Examples

### Example 1: Search Input (Debounce)

```javascript
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedSearch = useMemo(
    () => debounce(async (q) => {
      if (!q) {
        setResults([]);
        return;
      }

      const res = await fetch(`/api/search?q=${q}`);
      const data = await res.json();
      setResults(data);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [query, debouncedSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Example 2: Scroll Position (Throttle)

```javascript
function ScrollTracker() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const throttledUpdate = throttle(() => {
      setScrollY(window.scrollY);
      
      // Send to server (throttled)
      fetch('/api/scroll-position', {
        method: 'POST',
        body: JSON.stringify({ y: window.scrollY })
      });
    }, 100);

    window.addEventListener('scroll', throttledUpdate);
    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);

  return <div>Scroll: {scrollY}px</div>;
}
```

---

### Example 3: Auto-save (Debounce)

```javascript
function AutoSaveEditor() {
  const [content, setContent] = useState('');

  const debouncedSave = useMemo(
    () => debounce(async (text) => {
      await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify({ content: text })
      });
      console.log('Saved!');
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSave(content);
    return () => {
      debouncedSave.cancel?.();
    };
  }, [content, debouncedSave]);

  return (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
}
```

---

## Best Practices

### 1. Choose Right Delay

```javascript
// ✅ Good - 300ms for search (feels responsive)
const debouncedSearch = debounce(search, 300);

// ❌ Bad - 50ms too short, 2000ms too long
const debouncedSearch = debounce(search, 50); // Too many calls
const debouncedSearch = debounce(search, 2000); // Feels slow
```

---

### 2. Clean Up on Unmount

```javascript
// ✅ Good - Clean up timeout
useEffect(() => {
  const debounced = debounce(fn, 300);
  return () => {
    debounced.cancel?.();
  };
}, []);
```

---

### 3. Cancel Previous Requests

```javascript
// ✅ Good - Cancel previous API call
let abortController = null;

const debouncedSearch = debounce(async (query) => {
  if (abortController) {
    abortController.abort();
  }
  
  abortController = new AbortController();
  await fetch(`/api/search?q=${query}`, {
    signal: abortController.signal
  });
}, 300);
```

---

### 4. Use Libraries for Production

```javascript
// ✅ Good - Use lodash.debounce or similar
import debounce from 'lodash.debounce';

const debouncedSearch = debounce(search, 300);
```

---

## Common Questions

### Q: What's the difference between debounce and throttle?

**A:**
- **Debounce** - Wait for pause, execute once
- **Throttle** - Execute at most once per period

### Q: When should I use debounce vs throttle?

**A:**
- **Debounce** - Search input, form validation (wait for pause)
- **Throttle** - Scroll, resize (execute periodically)

### Q: What delay should I use?

**A:**
- Search: 300-500ms
- Auto-save: 1000-2000ms
- Scroll: 100-200ms
- Resize: 200-300ms

---

## Related Topics

- [Pagination Strategies](./2.%20Pagination%20Strategies.md) - Handling large datasets
- [Request Cancellation](../1.%20HTTP/12.%20Request%20Cancellation%20and%20Timeouts.md) - AbortController
- [Performance Optimization](../8.%20Performance%20Optimization/index.md) - API performance

---

## Summary

**Debouncing:**
- Waits for pause, executes once
- Best for: Search input, form validation
- Delay: 300-500ms typically

**Throttling:**
- Executes at most once per period
- Best for: Scroll events, resize events
- Delay: 100-200ms typically

**Key Takeaway:** Debounce waits for pause (search), throttle limits frequency (scroll). Use debounce for user input, throttle for events. Always clean up and cancel previous requests.

