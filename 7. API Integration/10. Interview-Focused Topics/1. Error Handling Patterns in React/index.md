# Error Handling Patterns in React

React-specific error handling patterns - error boundaries, error state management, user-friendly error messages, and error recovery strategies.

---

## Core Concept

**Error handling in React** requires different patterns than plain JavaScript. Components need to handle errors gracefully and provide good UX.

**Key Patterns:**
- Error boundaries (class components)
- Error state in hooks
- User-friendly error messages
- Error recovery

---

## Pattern 1: Error State in Hooks

### Basic Error Handling

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user.name}</div>;
}
```

---

### Custom Hook for Error Handling

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(setData)
      .catch(err => {
        setError({
          message: err.message,
          type: err.name,
        });
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, error, loading } = useApi(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{user.name}</div>;
}
```

---

## Pattern 2: Error Boundaries

### Error Boundary Component

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <UserProfile userId={123} />
</ErrorBoundary>
```

---

## Pattern 3: Handling Different Error Types

### Categorize Errors

```javascript
function handleApiError(error, response) {
  if (!response) {
    // Network error
    return {
      type: 'network',
      message: 'Network error. Please check your connection.',
      retryable: true,
    };
  }

  switch (response.status) {
    case 401:
      return {
        type: 'authentication',
        message: 'Please login again',
        action: 'redirect',
        redirectTo: '/login',
      };
    case 403:
      return {
        type: 'authorization',
        message: 'You don\'t have permission',
        action: 'show',
      };
    case 404:
      return {
        type: 'notFound',
        message: 'Resource not found',
        action: 'show',
      };
    case 422:
      return {
        type: 'validation',
        message: 'Validation errors',
        errors: response.data.errors,
        action: 'show',
      };
    case 429:
      return {
        type: 'rateLimit',
        message: 'Too many requests. Please try again later.',
        retryable: true,
        retryAfter: response.headers.get('Retry-After'),
      };
    case 500:
    case 502:
    case 503:
      return {
        type: 'server',
        message: 'Server error. Please try again later.',
        retryable: true,
      };
    default:
      return {
        type: 'unknown',
        message: 'An error occurred',
        retryable: true,
      };
  }
}

// Usage
fetch('/api/users')
  .then(async res => {
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw { response: res, data: errorData };
    }
    return res.json();
  })
  .catch(err => {
    const error = handleApiError(err, err.response);
    setError(error);
  });
```

---

## Pattern 4: User-Friendly Error Messages

### Error Display Component

```javascript
function ErrorDisplay({ error }) {
  if (!error) return null;

  const getErrorMessage = () => {
    switch (error.type) {
      case 'network':
        return 'Unable to connect. Please check your internet connection.';
      case 'authentication':
        return 'Your session has expired. Please login again.';
      case 'authorization':
        return 'You don\'t have permission to access this resource.';
      case 'validation':
        return 'Please fix the errors below.';
      case 'rateLimit':
        return 'Too many requests. Please wait a moment.';
      case 'server':
        return 'Server error. Our team has been notified.';
      default:
        return 'Something went wrong. Please try again.';
    }
  };

  return (
    <div className="error-message">
      <p>{getErrorMessage()}</p>
      {error.retryable && (
        <button onClick={error.onRetry}>Retry</button>
      )}
      {error.type === 'validation' && error.errors && (
        <ul>
          {Object.entries(error.errors).map(([field, message]) => (
            <li key={field}>{field}: {message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## Pattern 5: Error Recovery

### Retry on Error

```javascript
function useApiWithRetry(url, maxRetries = 3) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async (retry = 0) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setData(data);
      setRetryCount(0);
    } catch (err) {
      if (retry < maxRetries) {
        // Exponential backoff
        const delay = Math.pow(2, retry) * 1000;
        setTimeout(() => {
          setRetryCount(retry + 1);
          fetchData(retry + 1);
        }, delay);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, maxRetries]);

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

## Common Interview Questions

### Q: How do you handle API errors in React?

**A:** Use error state in hooks, error boundaries for component tree errors, categorize errors by type, show user-friendly messages, and provide retry mechanisms.

### Q: What's the difference between error boundaries and try-catch?

**A:** Error boundaries catch errors in component tree (rendering, lifecycle). try-catch catches errors in event handlers and async code.

### Q: How do you show different error messages for different error types?

**A:** Categorize errors by status code or error type, create error mapping, and display appropriate messages based on error category.

---

## Related Topics

- [Error Handling](../1.%20HTTP/7.%20Error%20Handling.md) - HTTP error handling
- [Loading States Management](./2.%20Loading%20States%20Management.md) - Loading patterns
- [Retry Logic](./4.%20Retry%20Logic%20with%20Exponential%20Backoff.md) - Retry strategies

---

## Summary

**Error Handling Patterns:**
- Error state in hooks (most common)
- Error boundaries (component tree errors)
- Categorize errors by type
- User-friendly error messages
- Error recovery (retry)

**Best Practices:**
- Always handle errors
- Show user-friendly messages
- Provide retry for retryable errors
- Log errors for debugging
- Handle different error types differently

**Key Takeaway:** Handle errors gracefully in React. Use error state in hooks, error boundaries for component errors, categorize errors, and provide user-friendly messages with retry options.

