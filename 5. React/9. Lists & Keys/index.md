# Lists & Keys in React

## TL;DR

- Use `map()` to render lists: `items.map(item => <Component key={item.id} />)`
- **Keys** are required for list items to help React identify which items changed
- Keys must be **unique** among siblings (not globally)
- **Best key:** Stable, unique ID from your data (`user.id`)
- **Avoid index as key** unless list is static (never reordered/filtered/added/removed)
- Keys are **not accessible as props** (use separate prop if needed)
- Wrong keys cause bugs: wrong items updated, state mixed up, performance issues

---

## 1. Rendering Lists with map()

### Basic List Rendering

```jsx
function UserList() {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user}</li>
      ))}
    </ul>
  );
}
```

**Output:**

```html
<ul>
  <li>Alice</li>
  <li>Bob</li>
  <li>Charlie</li>
</ul>
```

### List of Objects

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build project", completed: true },
    { id: 3, text: "Deploy app", completed: false },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.completed} />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## 2. What are Keys?

**Keys** help React identify which items have changed, been added, or removed. They give list items a **stable identity**.

### Why Keys Matter

When you render a list without keys:

```jsx
// ❌ BAD: No keys
<ul>
  {users.map((user) => (
    <li>{user.name}</li>
  ))}
</ul>
```

React warning:

```
Warning: Each child in a list should have a unique "key" prop.
```

**What React does without keys:**

- Can't efficiently determine which items changed
- May re-render entire list unnecessarily
- May lose component state during re-renders
- Performance degrades with large lists

---

## 3. How Keys Work (Reconciliation)

Keys help React's **reconciliation algorithm** identify which elements changed.

### Without Keys (Inefficient)

```jsx
// Initial render
<ul>
  <li>Alice</li>
  <li>Bob</li>
</ul>

// After adding Charlie at the start
<ul>
  <li>Charlie</li>  // React thinks: Alice changed to Charlie
  <li>Alice</li>    // React thinks: Bob changed to Alice
  <li>Bob</li>      // React thinks: New element added
</ul>

// Result: React re-renders ALL items!
```

### With Keys (Efficient)

```jsx
// Initial render
<ul>
  <li key="1">Alice</li>
  <li key="2">Bob</li>
</ul>

// After adding Charlie (key="3") at the start
<ul>
  <li key="3">Charlie</li>  // React: New element (key 3)
  <li key="1">Alice</li>    // React: Same element (key 1) - no change
  <li key="2">Bob</li>      // React: Same element (key 2) - no change
</ul>

// Result: React only adds Charlie, reuses Alice and Bob!
```

---

## 4. Choosing the Right Key

### ✅ BEST: Unique ID from Data

```jsx
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// ✅ Use database ID
<ul>
  {users.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>;
```

**Why this is best:**

- Stable (doesn't change)
- Unique (no duplicates)
- Consistent across renders

---

### ⚠️ SOMETIMES OK: Index as Key

```jsx
const users = ["Alice", "Bob", "Charlie"];

// ⚠️ OK only if list is static
<ul>
  {users.map((user, index) => (
    <li key={index}>{user}</li>
  ))}
</ul>;
```

**When index is acceptable:**

- ✅ List is **static** (never changes)
- ✅ Items are **never reordered**
- ✅ Items are **never filtered**
- ✅ No **add/remove** operations

**When index is BAD:**

- ❌ List can be reordered
- ❌ Items can be added/removed
- ❌ Items can be filtered
- ❌ List items have internal state

---

### ❌ WRONG: Non-Unique Keys

```jsx
// ❌ BAD: Multiple items with same key
<ul>
  {users.map(user => (
    <li key="user">{user.name}</li>  // All items have key="user"!
  ))}
</ul>

// ❌ BAD: Using array index of parent
<ul>
  {users.map(user => (
    <li key={0}>{user.name}</li>  // All items have key=0!
  ))}
</ul>
```

---

### ❌ WRONG: Random Keys

```jsx
// ❌ BAD: Random key changes every render
<ul>
  {users.map((user) => (
    <li key={Math.random()}>{user.name}</li>
  ))}
</ul>
```

**Problem:** New random key every render → React treats as new element → entire list re-renders!

---

## 5. Index as Key: The Problem

### Problem 1: Reordering Breaks

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ]);

  // ❌ BAD: Using index as key
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <input type="checkbox" />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**Scenario:**

1. User checks checkbox next to "Task 2"
2. User reorders: moves "Task 3" to top
3. **Bug:** Checkbox is still on 2nd item (now "Task 2" is 3rd)!

**Why?** Keys (0, 1, 2) stay same, but items moved. React thinks same elements, just different data.

### Problem 2: Adding Items Breaks State

```jsx
function InputList() {
  const [items, setItems] = useState(["Item 1", "Item 2"]);

  const addItem = () => {
    setItems(["New Item", ...items]); // Add at start
  };

  // ❌ BAD: Using index as key
  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      {items.map((item, index) => (
        <div key={index}>
          <input defaultValue={item} />
        </div>
      ))}
    </div>
  );
}
```

**Bug:**

1. User types in first input: "Item 1 EDITED"
2. User clicks "Add Item"
3. New item appears at top
4. **Bug:** "Item 1 EDITED" now appears in 2nd input!

**Why?** Index keys shifted, React reused DOM element at index 0 for new item.

---

### ✅ Solution: Use Stable IDs

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
    { id: 3, text: "Task 3" },
  ]);

  // ✅ GOOD: Using stable ID
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {" "}
          {/* Stable ID */}
          <input type="checkbox" />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**Now:**

- Reordering works correctly (keys move with items)
- Adding items works correctly (keys stay with their data)
- State preserved correctly

---

## 6. Keys Must Be Unique Among Siblings

Keys only need to be unique **within the same parent**, not globally.

```jsx
function App() {
  const list1 = [{ id: 1, name: 'Alice' }];
  const list2 = [{ id: 1, name: 'Bob' }];  // Same ID as list1 - OK!

  return (
    <>
      {/* Different lists, same keys = OK */}
      <ul>
        {list1.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <ul>
        {list2.map(item => (
          <li key={item.id}>{item.name}</li>  {/* Same key=1, but different parent */}
        ))}
      </ul>
    </>
  );
}
```

---

## 7. Keys Are Not Props

You **cannot access** the `key` prop inside the component.

```jsx
function Item({ key }) {
  console.log(key); // ❌ undefined! Keys don't get passed
  return <li>Item</li>;
}

// Usage
{
  items.map((item) => (
    <Item key={item.id} /> // Key not accessible inside Item
  ));
}
```

### If You Need the Key Value

Pass it as a separate prop:

```jsx
function Item({ id, name }) {
  console.log(id); // ✅ Works!
  return <li>{name}</li>;
}

// Usage
{
  items.map((item) => (
    <Item
      key={item.id} // For React
      id={item.id} // For component
      name={item.name}
    />
  ));
}
```

---

## 8. Common List Patterns

### Pattern 1: Filtering Lists

```jsx
function TodoList({ todos }) {
  const [filter, setFilter] = useState("all");

  const filtered = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true; // 'all'
  });

  return (
    <>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul>
        {filtered.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
```

---

### Pattern 2: Sorting Lists

```jsx
function UserList({ users }) {
  const [sortBy, setSortBy] = useState("name");

  const sorted = [...users].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    return 0;
  });

  return (
    <ul>
      {sorted.map((user) => (
        <li key={user.id}>
          {user.name} - {user.age}
        </li>
      ))}
    </ul>
  );
}
```

---

### Pattern 3: Nested Lists

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

**Important:** Both outer and inner lists need keys!

---

### Pattern 4: Conditional Items

```jsx
function ItemList({ items, showCompleted }) {
  return (
    <ul>
      {items.map((item) =>
        showCompleted || !item.completed ? (
          <li key={item.id}>{item.text}</li>
        ) : null
      )}
    </ul>
  );
}

// Better: Filter first, then map
function ItemList({ items, showCompleted }) {
  const visibleItems = items.filter((item) => showCompleted || !item.completed);

  return (
    <ul>
      {visibleItems.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

---

### Pattern 5: Adding Items with Generated IDs

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addTodo = (text) => {
    setTodos([...todos, { id: nextId, text, completed: false }]);
    setNextId(nextId + 1);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Better: Use crypto.randomUUID() or nanoid
import { nanoid } from "nanoid";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: nanoid(), // Generates unique ID
        text,
        completed: false,
      },
    ]);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

## 9. Performance with Large Lists

### Problem: Rendering 10,000 Items

```jsx
// ⚠️ Slow with large lists
function HugeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
  }));

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}
```

### Solution: Virtualization

Only render visible items using libraries like `react-window`:

```jsx
import { FixedSizeList } from "react-window";

function HugeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`,
  }));

  const Row = ({ index, style }) => (
    <div style={style}>{items[index].text}</div>
  );

  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

## 10. Common Mistakes & Fixes

### ❌ Mistake 1: No Keys

```jsx
// BAD
{
  users.map((user) => <li>{user.name}</li>);
}

// GOOD
{
  users.map((user) => <li key={user.id}>{user.name}</li>);
}
```

---

### ❌ Mistake 2: Index as Key for Dynamic Lists

```jsx
// BAD: List can be reordered/filtered
{
  todos.map((todo, index) => <li key={index}>{todo.text}</li>);
}

// GOOD: Use stable ID
{
  todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
}
```

---

### ❌ Mistake 3: Non-Unique Keys

```jsx
// BAD: Duplicate keys
const items = [
  { id: 1, name: "A" },
  { id: 1, name: "B" }, // Same ID!
];

{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}

// GOOD: Ensure unique keys
const items = [
  { id: 1, name: "A" },
  { id: 2, name: "B" }, // Unique ID
];
```

---

### ❌ Mistake 4: Using map() Without Return

```jsx
// BAD: No return statement
{
  users.map((user) => {
    <li key={user.id}>{user.name}</li>; // ❌ Nothing rendered!
  });
}

// GOOD: Implicit return with ()
{
  users.map((user) => <li key={user.id}>{user.name}</li>);
}

// GOOD: Explicit return
{
  users.map((user) => {
    return <li key={user.id}>{user.name}</li>;
  });
}
```

---

### ❌ Mistake 5: Key on Wrong Element

```jsx
// BAD: Key on wrapper div, not list item
{
  users.map((user) => (
    <div key={user.id}>
      <li>{user.name}</li>
    </div>
  ));
}

// GOOD: Key on outermost element in map
{
  users.map((user) => <li key={user.id}>{user.name}</li>);
}

// ALSO GOOD: Key on fragment
{
  users.map((user) => (
    <React.Fragment key={user.id}>
      <dt>{user.name}</dt>
      <dd>{user.bio}</dd>
    </React.Fragment>
  ));
}
```

---

## 11. Interview Questions

### Q1: Why do we need keys in React?

**Answer:** Keys help React identify which items changed, were added, or removed. They enable efficient reconciliation by giving list items stable identities. Without keys, React can't determine which elements changed, leading to:

- Performance issues (unnecessary re-renders)
- State bugs (state mixed between items)
- Incorrect updates

---

### Q2: What makes a good key?

**Answer:** A good key is:

- **Stable**: Doesn't change between renders
- **Unique**: Different from siblings
- **Consistent**: Same item always has same key

Best choice: Database ID or unique identifier from your data.

```jsx
<li key={user.id}>{user.name}</li> // ✅ Best
```

---

### Q3: When is it okay to use index as key?

**Answer:** Index is acceptable ONLY when:

- List is static (never changes)
- Items are never reordered
- Items are never added/removed/filtered
- Items don't have internal state

If ANY of the above are false, use a stable ID instead.

---

### Q4: What happens if you use the same key for multiple items?

**Answer:** React will show a warning, and only one item will render. Keys must be unique among siblings for React to correctly identify and track elements.

---

### Q5: Can you access the key prop inside a component?

**Answer:** No. The `key` prop is reserved and not passed to the component. If you need the key value inside the component, pass it as a separate prop:

```jsx
<Item key={item.id} id={item.id} />
```

---

### Q6: What's wrong with using Math.random() as a key?

**Answer:** Random keys change on every render, causing React to treat elements as new every time. This destroys performance and loses component state. Keys must be stable across renders.

---

### Q7: Do keys need to be globally unique?

**Answer:** No, keys only need to be unique **among siblings** (within the same list). Different lists can have items with the same keys.

---

### Q8: How do keys relate to reconciliation?

**Answer:** During reconciliation, React uses keys to match elements from the old tree to the new tree. Same key = same element (update it). Different/missing key = different element (add/remove/reorder).

---

### Q9: What happens if you forget keys in a list?

**Answer:** React shows a warning in the console. Performance degrades because React can't optimize list updates. Component state may be lost or mixed between items when list changes.

---

### Q10: How would you generate unique IDs for new items without a database?

**Answer:** Options:

- `crypto.randomUUID()` (modern browsers)
- Libraries like `nanoid` or `uuid`
- Incremental counter (simple but not recommended for distributed systems)

```jsx
import { nanoid } from "nanoid";

const newItem = {
  id: nanoid(),
  text: "New todo",
};
```

---

## 12. Best Practices Summary

### ✅ Always Do:

1. **Provide keys** for all list items
2. **Use stable IDs** from your data (`item.id`)
3. **Ensure keys are unique** among siblings
4. **Put key on outermost element** in map callback
5. **Use index as key** ONLY for static lists

### ❌ Never Do:

1. **Omit keys** from lists
2. **Use random values** as keys (Math.random())
3. **Use non-unique keys** (same key for multiple items)
4. **Use index as key** for dynamic lists (reorderable/filterable)
5. **Try to access key prop** inside component

### 🎯 Advanced:

- Use virtualization (`react-window`) for very large lists
- Consider memoization (`React.memo`) for list items with expensive renders
- Filter/sort before mapping for better performance
- Use fragments with keys for multiple adjacent elements

---

## Summary: Lists & Keys Checklist

When rendering lists, ensure you:

- ✅ Use `map()` to transform data into components
- ✅ Provide `key` prop for every list item
- ✅ Use stable, unique IDs as keys (not index, not random)
- ✅ Put key on outermost element returned by map
- ✅ Understand keys help React track elements during reconciliation
- ✅ Know when index is acceptable (static lists only)
- ✅ Pass key value as separate prop if needed inside component

Your lists & keys knowledge is interview-ready when you can explain:

1. Why keys are necessary (reconciliation efficiency)
2. What makes a good key (stable, unique, consistent)
3. Why index as key is problematic (reordering, state bugs)
4. How keys relate to React's diffing algorithm
5. That keys are not accessible as props
6. Keys only need uniqueness among siblings
