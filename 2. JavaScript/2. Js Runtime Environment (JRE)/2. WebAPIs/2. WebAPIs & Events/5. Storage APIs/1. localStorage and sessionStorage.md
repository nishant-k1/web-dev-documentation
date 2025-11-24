# localStorage and sessionStorage

Understanding Web Storage API - localStorage and sessionStorage.

---

## Core Concept

**Web Storage API** provides two storage mechanisms:

1. **localStorage** - Data persists across browser sessions
2. **sessionStorage** - Data persists only for the current tab session

Both store data as **key-value pairs** (strings only).

---

## localStorage

### What is localStorage?

**localStorage** stores data that persists even after the browser is closed and reopened.

**Key Characteristics:**

- ✅ Persists across browser sessions
- ✅ Shared across all tabs/windows of same origin
- ✅ ~5-10MB storage limit (varies by browser)
- ✅ Synchronous API (blocking)
- ❌ Only stores strings

---

### localStorage API

**Methods:**

```javascript
// Set item
localStorage.setItem("key", "value");

// Get item
const value = localStorage.getItem("key");

// Remove item
localStorage.removeItem("key");

// Clear all
localStorage.clear();

// Get key by index
const key = localStorage.key(0);

// Get number of items
const length = localStorage.length;
```

**Properties:**

```javascript
// Direct property access (alternative syntax)
localStorage.key = "value"; // Set
const value = localStorage.key; // Get
delete localStorage.key; // Remove
```

---

### localStorage Examples

**Example 1: Storing User Preferences**

```javascript
// Save theme preference
localStorage.setItem("theme", "dark");

// Retrieve theme preference
const theme = localStorage.getItem("theme") || "light";
document.body.className = theme;
```

**Example 2: Storing Objects**

```javascript
// Store object (must stringify)
const user = { name: "John", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Retrieve object (must parse)
const storedUser = JSON.parse(localStorage.getItem("user"));
console.log(storedUser.name); // 'John'
```

**Example 3: Checking if Key Exists**

```javascript
if (localStorage.getItem("key") !== null) {
  // Key exists
  console.log("Value:", localStorage.getItem("key"));
} else {
  // Key doesn't exist
  console.log("Key not found");
}
```

---

## sessionStorage

### What is sessionStorage?

**sessionStorage** stores data that persists only for the current tab session. Data is cleared when the tab is closed.

**Key Characteristics:**

- ✅ Persists for tab session
- ✅ Isolated per tab (not shared across tabs)
- ✅ ~5-10MB storage limit
- ✅ Synchronous API (blocking)
- ❌ Only stores strings

---

### sessionStorage API

**Same API as localStorage:**

```javascript
// Set item
sessionStorage.setItem("key", "value");

// Get item
const value = sessionStorage.getItem("key");

// Remove item
sessionStorage.removeItem("key");

// Clear all
sessionStorage.clear();

// Get key by index
const key = sessionStorage.key(0);

// Get number of items
const length = sessionStorage.length;
```

---

### sessionStorage Examples

**Example 1: Temporary Form Data**

```javascript
// Save form data before navigation
const formData = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
};
sessionStorage.setItem("formData", JSON.stringify(formData));

// Restore form data on page load
window.addEventListener("load", () => {
  const saved = sessionStorage.getItem("formData");
  if (saved) {
    const formData = JSON.parse(saved);
    document.getElementById("name").value = formData.name;
    document.getElementById("email").value = formData.email;
  }
});
```

**Example 2: Tab-Specific Data**

```javascript
// Each tab has its own sessionStorage
sessionStorage.setItem("tabId", Math.random().toString());

// This value is different in each tab
console.log(sessionStorage.getItem("tabId"));
```

---

## localStorage vs sessionStorage

### Comparison Table

| Feature          | localStorage                   | sessionStorage      |
| ---------------- | ------------------------------ | ------------------- |
| **Persistence**  | Across sessions                | Tab session only    |
| **Scope**        | All tabs/windows (same origin) | Single tab only     |
| **Cleared when** | User clears browser data       | Tab closes          |
| **Use case**     | User preferences, settings     | Temporary form data |
| **API**          | Same                           | Same                |

---

### When to Use localStorage

✅ **Use localStorage for:**

- User preferences (theme, language)
- Settings that should persist
- Data that should be shared across tabs
- Data that should survive browser restart

**Example:**

```javascript
// User theme preference
localStorage.setItem("theme", "dark");

// User language preference
localStorage.setItem("language", "en");
```

---

### When to Use sessionStorage

✅ **Use sessionStorage for:**

- Temporary form data
- Data that should be cleared when tab closes
- Tab-specific data
- Data that shouldn't persist

**Example:**

```javascript
// Temporary shopping cart (cleared when tab closes)
sessionStorage.setItem("cart", JSON.stringify(cartItems));

// Multi-step form data
sessionStorage.setItem("step1Data", JSON.stringify(formData));
```

---

## Storage Events

**Storage events** fire when storage changes in other tabs/windows.

```javascript
// Listen for storage changes
window.addEventListener("storage", (event) => {
  console.log("Key:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("Storage area:", event.storageArea);
});
```

**Important:** Storage events only fire in **other tabs/windows**, not the tab that made the change.

**Example:**

```javascript
// Tab 1: Set value
localStorage.setItem("message", "Hello");

// Tab 2: Receives storage event
window.addEventListener("storage", (event) => {
  if (event.key === "message") {
    console.log("New message:", event.newValue); // 'Hello'
  }
});
```

---

## Limitations

### 1. String Storage Only

**Problem:** Can only store strings.

**Solution:** Use `JSON.stringify()` and `JSON.parse()`.

```javascript
// ❌ Doesn't work
localStorage.setItem("user", { name: "John" });

// ✅ Works
localStorage.setItem("user", JSON.stringify({ name: "John" }));
const user = JSON.parse(localStorage.getItem("user"));
```

---

### 2. Storage Quota

**Problem:** Limited storage (~5-10MB).

**Solution:** Check quota before storing large data.

```javascript
// Check if storage is available
try {
  localStorage.setItem("test", "value");
  localStorage.removeItem("test");
  console.log("Storage available");
} catch (e) {
  if (e.name === "QuotaExceededError") {
    console.log("Storage quota exceeded");
  }
}
```

---

### 3. Synchronous API

**Problem:** Blocking operations (can freeze UI).

**Solution:** Use for small data, or wrap in async function.

```javascript
// ❌ Can block UI
localStorage.setItem("largeData", veryLargeString);

// ✅ Better: Use async wrapper
async function setStorage(key, value) {
  return new Promise((resolve) => {
    localStorage.setItem(key, value);
    resolve();
  });
}
```

---

## Best Practices

### 1. Always Use Try-Catch

```javascript
try {
  localStorage.setItem("key", "value");
} catch (e) {
  if (e.name === "QuotaExceededError") {
    console.error("Storage quota exceeded");
  } else {
    console.error("Storage error:", e);
  }
}
```

### 2. Check for Support

```javascript
if (typeof Storage !== "undefined") {
  // localStorage is supported
  localStorage.setItem("key", "value");
} else {
  // localStorage not supported
  console.error("localStorage not supported");
}
```

### 3. Use Helper Functions

```javascript
// Helper for objects
const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage error:", e);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Storage error:", e);
      return null;
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

// Usage
storage.set("user", { name: "John" });
const user = storage.get("user");
```

---

## Common Questions

### Q: What happens if storage quota is exceeded?

**A:** Browser throws `QuotaExceededError`. Always wrap storage operations in try-catch.

### Q: Can I store functions or objects directly?

**A:** No, only strings. Use `JSON.stringify()` for objects.

### Q: Is localStorage secure?

**A:** No. Any script on the same origin can access it. Don't store sensitive data.

### Q: Does localStorage work in incognito/private mode?

**A:** Yes, but data is cleared when the private session ends.

### Q: What's the difference between localStorage and sessionStorage?

**A:** localStorage persists across sessions, sessionStorage only for the tab session.

---

## Related Topics

- [Cookies](./2.%20Cookies.md) - Alternative storage mechanism
- [Storage Comparison](./4.%20Storage%20Comparison.md) - Compare all storage types
- [Browser Storage Mechanisms](../../../../../../19.%20Browser%20Internals/18.%20Browser%20Storage%20Mechanisms.md) - How browsers store data internally

---

## Summary

**localStorage:**

- ✅ Persists across sessions
- ✅ Shared across tabs
- ✅ Use for user preferences

**sessionStorage:**

- ✅ Persists for tab session
- ✅ Isolated per tab
- ✅ Use for temporary data

**Both:**

- Store strings only (use JSON for objects)
- ~5-10MB limit
- Synchronous API
- Same-origin policy
