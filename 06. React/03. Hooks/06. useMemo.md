# `useMemo` Hook

## TL;DR
- Memoizes expensive computations
- Only recalculates when dependencies change
- Returns the memoized value
- Use for expensive calculations, not cheap operations
- Helps prevent unnecessary re-computations

## What is `useMemo`?

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders. It only recalculates when one of its dependencies changes.

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]); // Only recalculates if a or b changes
```

## Basic Syntax

```jsx
const value = useMemo(
  () => {
    // Expensive computation
    return computedValue;
  },
  [dependency1, dependency2] // Dependencies
);
```

## When to Use `useMemo`

### ✅ DO Use For:

1. **Expensive Calculations**

```jsx
function DataAnalysis({ data }) {
  // ✅ Good - expensive operation
  const statistics = useMemo(() => {
    return {
      mean: calculateMean(data),
      median: calculateMedian(data),
      stdDev: calculateStdDev(data),
      correlation: calculateCorrelation(data)
    };
  }, [data]);
  
  return <div>Mean: {statistics.mean}</div>;
}
```

2. **Filtering/Sorting Large Lists**

```jsx
function ProductList({ products, searchQuery, sortBy }) {
  // ✅ Good - avoid re-filtering on every render
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.name.includes(searchQuery))
      .sort((a, b) => a[sortBy] - b[sortBy]);
  }, [products, searchQuery, sortBy]);
  
  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

3. **Preventing Reference Changes**

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ Without useMemo - new object every render
  const config = { theme: 'dark', locale: 'en' };
  
  // ✅ With useMemo - same reference until dependencies change
  const config = useMemo(() => {
    return { theme: 'dark', locale: 'en' };
  }, []); // Empty array = never changes
  
  return <Child config={config} />;
}

const Child = React.memo(({ config }) => {
  // Only re-renders if config reference changes
  return <div>{config.theme}</div>;
});
```

### ❌ DON'T Use For:

1. **Simple Calculations**

```jsx
// ❌ BAD - useMemo overhead > calculation cost
const doubled = useMemo(() => count * 2, [count]);

// ✅ GOOD - just calculate it
const doubled = count * 2;
```

2. **Primitive Values**

```jsx
// ❌ BAD - primitives are cheap to compare
const name = useMemo(() => firstName + lastName, [firstName, lastName]);

// ✅ GOOD - string concatenation is fast
const name = firstName + lastName;
```

3. **Every Single Calculation**

```jsx
// ❌ BAD - over-optimization
const a = useMemo(() => x + 1, [x]);
const b = useMemo(() => y * 2, [y]);
const c = useMemo(() => z - 5, [z]);

// ✅ GOOD - only memoize what matters
const a = x + 1;
const b = y * 2;
const expensiveC = useMemo(() => heavyCalculation(z), [z]);
```

## Real-World Examples

### Example 1: Search with Filtering

```jsx
function UserSearch({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...'); // Only logs when dependencies change
    
    return users
      .filter(user => {
        if (filter === 'active') return user.active;
        if (filter === 'inactive') return !user.active;
        return true;
      })
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [users, searchTerm, filter]);
  
  return (
    <div>
      <input 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 2: Complex Data Transformation

```jsx
function SalesChart({ salesData, timeRange }) {
  const chartData = useMemo(() => {
    // Expensive transformation
    const filtered = salesData.filter(sale => 
      sale.date >= timeRange.start && sale.date <= timeRange.end
    );
    
    const grouped = filtered.reduce((acc, sale) => {
      const month = sale.date.getMonth();
      acc[month] = (acc[month] || 0) + sale.amount;
      return acc;
    }, {});
    
    return Object.entries(grouped).map(([month, amount]) => ({
      month: monthNames[month],
      amount,
      growth: calculateGrowth(amount, grouped[month - 1])
    }));
  }, [salesData, timeRange]);
  
  return <Chart data={chartData} />;
}
```

### Example 3: Derived State

```jsx
function ShoppingCart({ items }) {
  const [discount, setDiscount] = useState(0);
  
  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => 
      sum + item.price * item.quantity, 0
    );
    
    const tax = subtotal * 0.1;
    const discountAmount = subtotal * (discount / 100);
    const total = subtotal + tax - discountAmount;
    
    return { subtotal, tax, discountAmount, total };
  }, [items, discount]);
  
  return (
    <div>
      <p>Subtotal: ${summary.subtotal}</p>
      <p>Tax: ${summary.tax}</p>
      <p>Discount: -${summary.discountAmount}</p>
      <p>Total: ${summary.total}</p>
    </div>
  );
}
```

### Example 4: Optimizing Child Component Props

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // Without useMemo, filteredTodos is new array every render
  // Child would re-render even if todos/filter didn't change
  const filteredTodos = useMemo(() => {
    switch(filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  // Memoize handlers to prevent Child re-renders
  const handleToggle = useCallback((id) => {
    setTodos(todos => 
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }, []);
  
  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={filteredTodos} onToggle={handleToggle} />
    </div>
  );
}

const TodoList = React.memo(({ todos, onToggle }) => {
  console.log('TodoList rendered');
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});
```

## useMemo vs useCallback

### Key Difference

```jsx
// useMemo - memoizes the RESULT (value)
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

// useCallback - memoizes the FUNCTION itself
const memoizedFunction = useCallback((x) => doSomething(x), []);
```

### Equivalent Forms

```jsx
// These are equivalent:
const fn = useCallback((x) => x * 2, []);
const fn = useMemo(() => (x) => x * 2, []);

// These are equivalent:
const value = useMemo(() => x * 2, [x]);
const value = useCallback(x * 2, [x]); // ❌ Won't work - useCallback expects function
```

### When to Use Which

```jsx
function Component() {
  // ✅ useMemo for values
  const expensiveResult = useMemo(() => {
    return heavyCalculation(data);
  }, [data]);
  
  // ✅ useCallback for functions
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return (
    <Child 
      data={expensiveResult}
      onClick={handleClick}
    />
  );
}
```

## Common Interview Questions

### Q1: What's the difference between useMemo and just caching in a variable?

**Answer:**

```jsx
// ❌ WRONG - variable resets every render
function Component() {
  const expensive = calculateExpensive(); // Runs every render!
  return <div>{expensive}</div>;
}

// ✅ CORRECT - useMemo caches across renders
function Component() {
  const expensive = useMemo(() => calculateExpensive(), []); // Runs once
  return <div>{expensive}</div>;
}
```

### Q2: Does useMemo guarantee the value won't be recalculated?

**Answer:** No! React may choose to discard memoized values to free memory. Don't rely on it for correctness, only for performance.

```jsx
// ❌ WRONG - don't rely on memoization for correctness
const [count, setCount] = useState(0);
const doubled = useMemo(() => {
  setCount(prev => prev + 1); // Side effect!
  return value * 2;
}, [value]);

// ✅ CORRECT - only for optimization
const doubled = useMemo(() => value * 2, [value]);
```

### Q3: Should you use useMemo everywhere?

**Answer:** No! Premature optimization is bad. Use when:
1. Expensive calculations
2. Large list operations
3. Preventing unnecessary child re-renders

Profile first, optimize if needed.

### Q4: What happens if dependencies are missing?

**Answer:** Same as useEffect - stale closures:

```jsx
function Component({ items }) {
  const [multiplier, setMultiplier] = useState(2);
  
  // ❌ WRONG - missing multiplier
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * multiplier, 0);
  }, [items]); // multiplier changes won't trigger recalculation
  
  // ✅ CORRECT
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * multiplier, 0);
  }, [items, multiplier]);
}
```

### Q5: useMemo vs React.memo?

**Answer:**
- **useMemo**: Memoizes a value inside a component
- **React.memo**: Memoizes entire component render

```jsx
// useMemo - memoize value
function Component() {
  const value = useMemo(() => expensive(), []);
  return <div>{value}</div>;
}

// React.memo - memoize component
const Component = React.memo(function Component({ prop }) {
  return <div>{prop}</div>;
});
```

## Common Pitfalls & Gotchas

### 1. **Over-Optimization**

```jsx
// ❌ BAD - memoizing everything
function Component({ a, b, c }) {
  const sum = useMemo(() => a + b, [a, b]);
  const product = useMemo(() => a * b, [a, b]);
  const difference = useMemo(() => a - b, [a, b]);
  // useMemo overhead > calculation cost!
}

// ✅ GOOD - only memoize expensive operations
function Component({ largeArray }) {
  const sorted = useMemo(() => 
    largeArray.sort((a, b) => a - b),
    [largeArray]
  );
}
```

### 2. **Missing Dependencies**

```jsx
function Component({ data, filter }) {
  // ❌ WRONG - filter missing
  const filtered = useMemo(() => {
    return data.filter(item => item.type === filter);
  }, [data]);
  
  // ✅ CORRECT
  const filtered = useMemo(() => {
    return data.filter(item => item.type === filter);
  }, [data, filter]);
}
```

### 3. **Memoizing Entire Component Logic**

```jsx
// ❌ WRONG - don't memoize everything
function Component() {
  const everything = useMemo(() => {
    // entire component logic here
    return <div>...</div>;
  }, []);
  
  return everything;
}

// ✅ CORRECT - use React.memo instead
const Component = React.memo(function Component() {
  return <div>...</div>;
});
```

### 4. **New Objects in Dependencies**

```jsx
function Component() {
  // ❌ WRONG - config is new object every render
  const result = useMemo(() => 
    calculate(data, { threshold: 10, limit: 50 }),
    [data, { threshold: 10, limit: 50 }] // New object every time!
  );
  
  // ✅ CORRECT - depend on primitive values
  const threshold = 10;
  const limit = 50;
  const result = useMemo(() => 
    calculate(data, { threshold, limit }),
    [data, threshold, limit]
  );
}
```

## Best Practices

1. **Profile before optimizing** - use React DevTools Profiler
2. **Memoize expensive operations** - calculations, filtering, sorting
3. **Include all dependencies** - use ESLint plugin
4. **Don't memoize primitives** - overhead > benefit
5. **Measure impact** - verify memoization actually helps
6. **Keep functions pure** - no side effects in useMemo

## When to Use `useMemo`

✅ **Use when:**
- Expensive calculations (heavy math, large data processing)
- Filtering/sorting large lists
- Preventing child re-renders (with React.memo)
- Creating objects/arrays passed to memoized children

❌ **Don't use when:**
- Simple arithmetic operations
- String concatenation
- Primitive value operations
- Every single calculation "just in case"

## Related Concepts

- **useCallback**: Memoize functions instead of values
- **React.memo**: Memoize entire component
- **useEffect**: Similar dependency array behavior
- **React DevTools Profiler**: Measure render performance



