# Pagination Strategies

Understanding pagination - offset-based vs cursor-based pagination, infinite scrolling, and when to use each approach.

---

## Core Concept

**Pagination** splits large datasets into smaller pages to improve performance and user experience.

**Two Main Approaches:**
1. **Offset-based** - Page numbers (1, 2, 3...)
2. **Cursor-based** - Token/ID-based (more efficient)

---

## Offset-Based Pagination

### How It Works

**Offset-based pagination** uses page numbers and limit.

**API:**
```
GET /api/users?page=1&limit=20
GET /api/users?page=2&limit=20
```

**Backend:**
```javascript
app.get('/api/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;

  const users = await User.find()
    .skip(offset)
    .limit(limit);

  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);

  res.json({
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
});
```

---

### Frontend Implementation

```javascript
function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetch(`/api/users?page=${page}&limit=20`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setPagination(data.pagination);
      });
  }, [page]);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      
      <div>
        <button
          disabled={!pagination?.hasPrev}
          onClick={() => setPage(p => p - 1)}
        >
          Previous
        </button>
        
        <span>Page {page} of {pagination?.totalPages}</span>
        
        <button
          disabled={!pagination?.hasNext}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

---

### Pros and Cons

**Pros:**
- ✅ Simple to implement
- ✅ Easy to understand
- ✅ Can jump to any page
- ✅ Shows total count

**Cons:**
- ❌ Performance degrades with large offsets
- ❌ Inconsistent if data changes (items can appear on multiple pages)
- ❌ Not suitable for real-time data

---

## Cursor-Based Pagination

### How It Works

**Cursor-based pagination** uses a cursor (ID or timestamp) to fetch next page.

**API:**
```
GET /api/users?cursor=abc123&limit=20
GET /api/users?cursor=xyz789&limit=20
```

**Backend:**
```javascript
app.get('/api/users', async (req, res) => {
  const cursor = req.query.cursor;
  const limit = parseInt(req.query.limit) || 20;

  let query = User.find().sort({ _id: 1 }).limit(limit + 1);
  
  if (cursor) {
    query = query.where('_id').gt(cursor);
  }

  const users = await query;
  const hasNext = users.length > limit;
  
  if (hasNext) {
    users.pop(); // Remove extra item
  }

  const nextCursor = hasNext ? users[users.length - 1]._id : null;

  res.json({
    users,
    pagination: {
      cursor: nextCursor,
      hasNext,
      limit
    }
  });
});
```

---

### Frontend Implementation

```javascript
function UserList() {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasNext, setHasNext] = useState(true);

  const loadMore = () => {
    const url = cursor
      ? `/api/users?cursor=${cursor}&limit=20`
      : `/api/users?limit=20`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setUsers(prev => [...prev, ...data.users]);
        setCursor(data.pagination.cursor);
        setHasNext(data.pagination.hasNext);
      });
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      
      {hasNext && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
```

---

### Pros and Cons

**Pros:**
- ✅ Consistent (no duplicate/missing items)
- ✅ Better performance (indexed queries)
- ✅ Works well with real-time data
- ✅ No offset calculation needed

**Cons:**
- ❌ Can't jump to specific page
- ❌ More complex implementation
- ❌ No total count

---

## Infinite Scrolling

### Implementation

```javascript
function InfiniteScrollList() {
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const loadMore = async () => {
    if (loading || !hasNext) return;

    setLoading(true);
    const url = cursor
      ? `/api/users?cursor=${cursor}&limit=20`
      : `/api/users?limit=20`;

    const res = await fetch(url);
    const data = await res.json();

    setUsers(prev => [...prev, ...data.users]);
    setCursor(data.pagination.cursor);
    setHasNext(data.pagination.hasNext);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasNext]);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
    </div>
  );
}
```

---

## When to Use Each

### Use Offset-Based When:

✅ **Small datasets** (< 10,000 items)
✅ **Need page numbers** (user wants to jump to page 5)
✅ **Need total count** (showing "Page 1 of 10")
✅ **Static data** (doesn't change frequently)

---

### Use Cursor-Based When:

✅ **Large datasets** (> 10,000 items)
✅ **Real-time data** (data changes frequently)
✅ **Infinite scroll** (load more on scroll)
✅ **Performance critical** (need fast queries)

---

## Best Practices

### 1. Use Cursor for Large Datasets

```javascript
// ✅ Good - Cursor for large dataset
GET /api/users?cursor=abc123&limit=20

// ❌ Bad - Offset for large dataset
GET /api/users?page=1000&limit=20 // Slow!
```

---

### 2. Combine with Loading States

```javascript
// ✅ Good - Show loading state
{loading && <div>Loading...</div>}
{hasNext && <button onClick={loadMore}>Load More</button>}
```

---

### 3. Handle Empty States

```javascript
// ✅ Good - Handle empty
{users.length === 0 && !loading && (
  <div>No users found</div>
)}
```

---

## Common Questions

### Q: Which is better, offset or cursor?

**A:** Cursor is better for large datasets and real-time data. Offset is simpler for small, static datasets.

### Q: Can I use cursor with page numbers?

**A:** Not directly. Cursor doesn't support jumping to specific pages. Use offset if you need page numbers.

### Q: How do I implement "Load More" button?

**A:** Use cursor-based pagination, store cursor in state, fetch next page when button clicked.

---

## Related Topics

- [Debouncing & Throttling](./1.%20Debouncing%20%26%20Throttling%20API%20Calls.md) - Optimize scroll events
- [Performance Optimization](../8.%20Performance%20Optimization/index.md) - API performance

---

## Summary

**Pagination Types:**
- **Offset-based** - Page numbers, simple, good for small datasets
- **Cursor-based** - Token-based, efficient, good for large datasets
- **Infinite scroll** - Load more on scroll, uses cursor-based

**Best Practices:**
- Use cursor for large datasets
- Use offset for small, static datasets
- Show loading states
- Handle empty states

**Key Takeaway:** Use offset-based for simple cases with page numbers. Use cursor-based for large datasets, real-time data, and infinite scroll. Cursor is more efficient and consistent.

