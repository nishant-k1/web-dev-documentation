# Error Monitoring & Logging

Monitoring and tracking errors in production applications. Setting up error tracking services, logging strategies, and production debugging.

---

## Why Error Monitoring Matters

### The Problem

**Without error monitoring:**

- ❌ Users report bugs you can't reproduce
- ❌ Errors happen silently in production
- ❌ No visibility into what's breaking
- ❌ Hard to debug production issues

**With error monitoring:**

- ✅ See errors as they happen
- ✅ Get stack traces and context
- ✅ Track error frequency
- ✅ Debug production issues easily

---

## Error Monitoring Services

### 1. Sentry (Most Popular)

**Best for:** React, Next.js, all frameworks

**Features:**

- ✅ Automatic error capture
- ✅ Source maps support
- ✅ User context
- ✅ Performance monitoring
- ✅ Release tracking

**Setup:**

1. **Install:**

```bash
npm install @sentry/react
```

2. **Initialize (React):**

```javascript
// index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

3. **Wrap app with ErrorBoundary:**

```javascript
import { ErrorBoundary } from "@sentry/react";

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <YourApp />
    </ErrorBoundary>
  );
}
```

**Next.js Setup:**

```javascript
// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

```javascript
// sentry.server.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

---

### 2. LogRocket

**Best for:** Session replay, debugging

**Features:**

- ✅ Session replay
- ✅ Console logs
- ✅ Network requests
- ✅ Redux state

**Setup:**

```bash
npm install logrocket
```

```javascript
import LogRocket from "logrocket";

LogRocket.init(process.env.REACT_APP_LOGROCKET_ID);
```

---

### 3. Bugsnag

**Best for:** Enterprise apps

**Features:**

- ✅ Error tracking
- ✅ Release tracking
- ✅ User context

**Setup:**

```bash
npm install @bugsnag/js @bugsnag/plugin-react
```

```javascript
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

Bugsnag.start({
  apiKey: process.env.REACT_APP_BUGSNAG_KEY,
  plugins: [new BugsnagPluginReact()],
});
```

---

## React Error Boundaries

### Basic Error Boundary

```javascript
// ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to error monitoring service
    console.error("Error caught:", error, errorInfo);

    // Send to Sentry
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Using Error Boundary

```javascript
// App.js
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <YourApp />
    </ErrorBoundary>
  );
}
```

---

## Manual Error Logging

### Logging Errors Manually

```javascript
// utils/errorLogger.js
export const logError = (error, errorInfo = {}) => {
  // Log to console (development)
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error, errorInfo);
  }

  // Send to Sentry (production)
  if (window.Sentry) {
    window.Sentry.captureException(error, {
      extra: errorInfo,
    });
  }

  // Send to custom API
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      ...errorInfo,
    }),
  });
};
```

### Using Manual Logging

```javascript
try {
  await fetchUserData();
} catch (error) {
  logError(error, {
    context: "fetchUserData",
    userId: currentUser.id,
  });
}
```

---

## Logging Strategies

### 1. Log Levels

```javascript
// utils/logger.js
const logger = {
  error: (message, data) => {
    console.error(`[ERROR] ${message}`, data);
    // Send to error monitoring
  },

  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data);
  },

  info: (message, data) => {
    console.log(`[INFO] ${message}`, data);
  },

  debug: (message, data) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
};

export default logger;
```

### 2. Structured Logging

```javascript
logger.error("User login failed", {
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
});
```

### 3. Contextual Logging

```javascript
// Add user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Add tags
Sentry.setTag("page", "checkout");
Sentry.setTag("environment", "production");

// Add extra context
Sentry.setContext("checkout", {
  cartValue: cart.total,
  itemCount: cart.items.length,
});
```

---

## Error Handling Patterns

### 1. API Error Handling

```javascript
// api/client.js
async function apiRequest(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(`API Error: ${response.status}`);
      error.status = response.status;
      error.response = await response.json();

      // Log to error monitoring
      logError(error, {
        url,
        method: options.method,
        status: response.status,
      });

      throw error;
    }

    return await response.json();
  } catch (error) {
    // Network errors
    if (error.name === "TypeError") {
      logError(error, {
        url,
        type: "network_error",
      });
    }

    throw error;
  }
}
```

### 2. Async Error Handling

```javascript
// Handle async errors in useEffect
useEffect(() => {
  async function fetchData() {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      logError(error, {
        context: "fetchUsers",
      });
      setError("Failed to load users");
    }
  }

  fetchData();
}, []);
```

### 3. Promise Error Handling

```javascript
// Global unhandled promise rejection handler
window.addEventListener("unhandledrejection", (event) => {
  logError(event.reason, {
    type: "unhandled_promise_rejection",
  });

  // Prevent default browser error
  event.preventDefault();
});
```

---

## Production Debugging

### 1. Source Maps

**Enable source maps in production:**

**Create React App:**

```json
// package.json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=true react-scripts build"
  }
}
```

**Next.js:**

```javascript
// next.config.js
module.exports = {
  productionBrowserSourceMaps: true,
};
```

**Vite:**

```javascript
// vite.config.js
export default {
  build: {
    sourcemap: true,
  },
};
```

### 2. Release Tracking

```javascript
// Track releases in Sentry
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  release: process.env.REACT_APP_VERSION,
  environment: process.env.NODE_ENV,
});
```

### 3. User Feedback

```javascript
// Collect user feedback on errors
Sentry.showReportDialog({
  eventId: errorEventId,
  user: {
    email: user.email,
  },
});
```

---

## Best Practices

### ✅ DO

1. **Set up error monitoring** before deploying
2. **Use Error Boundaries** to catch React errors
3. **Add context** to errors (user, page, action)
4. **Enable source maps** for better debugging
5. **Track releases** to correlate errors with deployments
6. **Set up alerts** for critical errors
7. **Review errors regularly** and fix high-frequency issues

### ❌ DON'T

1. **Don't log sensitive data** (passwords, tokens)
2. **Don't ignore errors** - always handle them
3. **Don't expose stack traces** to users
4. **Don't log everything** - use log levels
5. **Don't forget to test** error monitoring setup

---

## Common Patterns

### 1. Error Boundary with Retry

```javascript
class ErrorBoundary extends React.Component {
  state = { error: null, retryCount: 0 };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    logError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ error: null, retryCount: this.state.retryCount + 1 });
  };

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={this.handleRetry}>
            Retry ({this.state.retryCount})
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 2. Error Notification

```javascript
// Show user-friendly error message
const handleError = (error) => {
  logError(error);

  // Show toast notification
  toast.error("Something went wrong. Please try again.");

  // Or show modal
  setErrorModalOpen(true);
};
```

### 3. Error Recovery

```javascript
// Retry failed requests
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (i === retries - 1) {
        logError(error, { url, attempt: i + 1 });
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

## Monitoring Checklist

- [ ] Error monitoring service set up
- [ ] Error boundaries implemented
- [ ] Source maps enabled
- [ ] User context added
- [ ] Release tracking configured
- [ ] Alerts set up for critical errors
- [ ] Error logging tested
- [ ] Production errors reviewed regularly

---

## Quick Reference

### Sentry Setup

```javascript
// Initialize
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

// Capture error
Sentry.captureException(error);

// Add context
Sentry.setUser({ id: user.id });
Sentry.setTag("page", "checkout");
```

### Error Boundary

```javascript
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

---

## Key Takeaways

1. ✅ **Set up error monitoring** before production
2. ✅ **Use Error Boundaries** for React errors
3. ✅ **Add context** to errors for better debugging
4. ✅ **Enable source maps** for readable stack traces
5. ✅ **Review errors regularly** and fix issues

---

## Related Topics

- [Environment Variables](../7.%20Deployment%20%26%20DevOps/1.%20Environment%20Variables/index.md) - Setting up error monitoring keys
- [Deployment Strategies](../7.%20Deployment%20%26%20DevOps/2.%20Deployment%20Strategies/index.md) - Deploying with error monitoring
- [Error Handling](<../1.%20JavaScript/1.%20ECMAScript%20(ES)/12.%20Error%20Handling%20%26%20Debugging/index.md>) - Basic error handling
