# `useInsertionEffect` Hook

## TL;DR
- Fires before DOM mutations, earlier than useLayoutEffect
- Specifically for CSS-in-JS libraries
- Most developers will never need this
- Introduced in React 18
- Cannot read/update DOM layout

## What is `useInsertionEffect`?

`useInsertionEffect` is a specialized Hook for CSS-in-JS library authors to inject `<style>` tags into the DOM before any layout effects fire. It solves performance problems specific to CSS-in-JS libraries.

## Execution Order

```
1. useInsertionEffect runs ⚡ (earliest)
2. DOM mutations
3. useLayoutEffect runs
4. Browser paints
5. useEffect runs
```

## Syntax

```jsx
useInsertionEffect(() => {
  // Insert styles
  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## Why It Exists

### Problem: CSS-in-JS Performance

```jsx
// ❌ PROBLEM: useLayoutEffect for styles
function Component() {
  useLayoutEffect(() => {
    // Insert <style> tag
    const style = document.createElement('style');
    style.textContent = `.my-class { color: red; }`;
    document.head.appendChild(style);
    
    // Then read layout - causes reflow!
    const height = element.offsetHeight;
  });
}
```

### Solution: useInsertionEffect

```jsx
// ✅ SOLUTION: Styles inserted before layout reading
function Component() {
  useInsertionEffect(() => {
    // Styles inserted early
    const style = document.createElement('style');
    style.textContent = `.my-class { color: red; }`;
    document.head.appendChild(style);
  });
  
  useLayoutEffect(() => {
    // Can now safely read layout
    const height = element.offsetHeight;
  });
}
```

## Real-World Usage (CSS-in-JS Libraries)

### Example: Simplified Styled Component

```jsx
let styleSheet = '';

function useInsertStyles(styles) {
  useInsertionEffect(() => {
    // Insert styles before any layout reads
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    document.head.appendChild(styleTag);
    
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [styles]);
}

function StyledButton({ children }) {
  const className = 'btn-' + Math.random().toString(36).slice(2);
  
  useInsertStyles(`
    .${className} {
      background: blue;
      color: white;
      padding: 10px;
    }
  `);
  
  return <button className={className}>{children}</button>;
}
```

## Common Interview Questions

### Q1: Should I use useInsertionEffect in my app?

**Answer:** Almost certainly no! It's only for CSS-in-JS library authors (styled-components, Emotion, etc.). Use useEffect or useLayoutEffect instead.

### Q2: What's the difference from useLayoutEffect?

**Answer:**
- **useInsertionEffect**: Fires before DOM mutations (insert styles)
- **useLayoutEffect**: Fires after DOM mutations (read layout)
- **useEffect**: Fires after paint (async side effects)

### Q3: Can you read the DOM in useInsertionEffect?

**Answer:** No! DOM hasn't been mutated yet. You can only insert things into the DOM, not read from it.

```jsx
// ❌ WRONG - can't read layout
useInsertionEffect(() => {
  const height = element.offsetHeight; // Unreliable!
});

// ✅ CORRECT - use useLayoutEffect for reading
useLayoutEffect(() => {
  const height = element.offsetHeight;
});
```

### Q4: Does it work with SSR?

**Answer:** Yes, but like useLayoutEffect, it runs only on client (not during server render).

## Common Pitfalls

### 1. **Using Instead of useEffect**

```jsx
// ❌ WRONG - overkill for normal side effects
useInsertionEffect(() => {
  fetch('/api/data').then(setData);
});

// ✅ CORRECT
useEffect(() => {
  fetch('/api/data').then(setData);
});
```

### 2. **Reading Layout**

```jsx
// ❌ WRONG - DOM not ready yet
useInsertionEffect(() => {
  const height = ref.current.offsetHeight;
});

// ✅ CORRECT - use useLayoutEffect
useLayoutEffect(() => {
  const height = ref.current.offsetHeight;
});
```

### 3. **General Application Logic**

```jsx
// ❌ WRONG - not for app logic
useInsertionEffect(() => {
  console.log('Component mounted');
});

// ✅ CORRECT
useEffect(() => {
  console.log('Component mounted');
});
```

## When to Use

✅ **Use ONLY for:**
- Building CSS-in-JS libraries
- Injecting `<style>` tags dynamically
- Critical CSS insertion performance

❌ **Don't use for:**
- Application code (99.9% of cases)
- Data fetching
- Event listeners
- Reading DOM layout
- General side effects

## Comparison Table

| Hook | Timing | Use Case |
|------|--------|----------|
| useInsertionEffect | Before DOM mutations | CSS-in-JS libraries |
| useLayoutEffect | After DOM mutations, before paint | DOM measurements |
| useEffect | After paint | General side effects |

## Library Example: Emotion-like

```jsx
// This is what Emotion/styled-components do internally
function createStyleInjector() {
  let cache = new Map();
  
  return function useStyles(styles) {
    const hash = hashStyles(styles);
    
    useInsertionEffect(() => {
      if (!cache.has(hash)) {
        const styleTag = document.createElement('style');
        styleTag.textContent = styles;
        document.head.appendChild(styleTag);
        cache.set(hash, styleTag);
      }
      
      return () => {
        const styleTag = cache.get(hash);
        if (styleTag && styleTag.parentNode) {
          styleTag.parentNode.removeChild(styleTag);
          cache.delete(hash);
        }
      };
    }, [hash]);
    
    return hash;
  };
}
```

## Best Practices

1. **Don't use unless building CSS-in-JS library**
2. **Only for style injection** - nothing else
3. **Can't read DOM** - only write to it
4. **Test performance** - measure if it actually helps

## Related Concepts

- **useLayoutEffect**: Runs after useInsertionEffect
- **useEffect**: Runs after useLayoutEffect
- **CSS-in-JS**: Primary use case (Emotion, styled-components)
- **React 18**: When it was introduced



