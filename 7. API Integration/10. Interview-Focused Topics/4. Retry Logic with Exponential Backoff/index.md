# Retry Logic with Exponential Backoff

Implementing retry logic for failed API requests - exponential backoff, retry strategies, when to retry, and handling retry failures.

---

## Core Concept

**Retry logic** automatically retries failed API requests. **Exponential backoff** increases delay between retries exponentially.

**Why Exponential Backoff:**
- Prevents overwhelming server
- Gives server time to recover
- Reduces unnecessary retries

---

## Basic Retry Implementation

### Simple Retry

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

## Exponential Backoff

### Exponential Backoff Implementation

```javascript
async function fetchWithExponentialBackoff(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      // Exponential backoff: 1s, 2s, 4s, 8s...
      const delay = Math.pow(2, i) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

---

## React Hook with Retry

### useApiWithRetry Hook

```javascript
function useApiWithRetry(url, options = {}) {
  const { maxRetries = 3, retryableStatuses = [500, 502, 503, 504] } = options;
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async (retry = 0) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url);
      
      if (!res.ok) {
        // Only retry for retryable statuses
        if (retryableStatuses.includes(res.status) && retry < maxRetries) {
          const delay = Math.pow(2, retry) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          setRetryCount(retry + 1);
          return fetchData(retry + 1);
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setData(data);
      setRetryCount(0);
    } catch (err) {
      if (err.name === 'AbortError') {
        return; // Request was cancelled
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, maxRetries, retryableStatuses]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retry = useCallback(() => {
    fetchData(0);
  }, [fetchData]);

  return { data, error, loading, retry, retryCount };
}
```

---

## When to Retry

### Retryable vs Non-Retryable Errors

```javascript
function shouldRetry(error, response, retryCount, maxRetries) {
  // Don't retry if max retries reached
  if (retryCount >= maxRetries) return false;

  // Network errors - retry
  if (!response) return true;

  // Server errors (5xx) - retry
  if (response.status >= 500) return true;

  // Rate limit (429) - retry (with longer delay)
  if (response.status === 429) return true;

  // Client errors (4xx) - don't retry (except 429)
  if (response.status >= 400 && response.status < 500) {
    return response.status === 429;
  }

  return false;
}
```

---

## Retry with Jitter

### Add Randomness to Backoff

```javascript
function exponentialBackoffWithJitter(attempt, baseDelay = 1000) {
  const exponentialDelay = Math.pow(2, attempt) * baseDelay;
  const jitter = Math.random() * 1000; // Random 0-1000ms
  return exponentialDelay + jitter;
}

// Prevents thundering herd (all clients retry at same time)
```

---

## Common Interview Questions

### Q: How do you implement retry logic?

**A:** Use exponential backoff, retry only for retryable errors (5xx, network), limit max retries, and add jitter to prevent thundering herd.

### Q: What's exponential backoff?

**A:** Delay between retries increases exponentially (1s, 2s, 4s, 8s...). Prevents overwhelming server.

### Q: When should you retry vs not retry?

**A:** Retry for network errors and 5xx errors. Don't retry for 4xx errors (client errors) except 429 (rate limit).

---

## Related Topics

- [Error Handling Patterns](./1.%20Error%20Handling%20Patterns%20in%20React.md) - Error handling
- [Error Handling](../1.%20HTTP/7.%20Error%20Handling.md) - HTTP error handling

---

## Summary

**Retry Logic:**
- Exponential backoff (1s, 2s, 4s, 8s...)
- Retry only retryable errors (5xx, network)
- Limit max retries
- Add jitter to prevent thundering herd

**When to Retry:**
- ✅ Network errors
- ✅ 5xx server errors
- ✅ 429 rate limit
- ❌ 4xx client errors (except 429)

**Key Takeaway:** Implement retry logic with exponential backoff. Only retry for retryable errors (network, 5xx). Use jitter to prevent all clients retrying simultaneously.

