# Environment Variables & Configuration

Managing environment variables and configuration for different environments (development, staging, production). Essential for managing API keys, secrets, and environment-specific settings.

---

## What Are Environment Variables?

**Environment variables** are key-value pairs that store configuration data outside your code. They allow you to:

- ✅ Keep secrets out of your codebase
- ✅ Use different configs for dev/staging/production
- ✅ Change settings without code changes
- ✅ Share code without exposing secrets

---

## Why Environment Variables Matter

### Security
```javascript
// ❌ BAD: Hardcoded API key
const API_KEY = "sk_live_1234567890abcdef";

// ✅ GOOD: Environment variable
const API_KEY = process.env.REACT_APP_API_KEY;
```

### Different Environments
```javascript
// Development
API_URL = "http://localhost:3000"

// Production
API_URL = "https://api.myapp.com"
```

---

## Environment Variables in React (Create React App)

### Setup

1. **Create `.env` file** in project root:
```bash
# .env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_API_KEY=dev_key_123
```

2. **Access in code:**
```javascript
// App.js
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

fetch(`${API_URL}/users`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});
```

### Rules for Create React App

- ✅ **Must start with `REACT_APP_`** to be exposed to browser
- ✅ Available in `process.env.REACT_APP_*`
- ✅ Restart dev server after changing `.env`
- ❌ Variables without `REACT_APP_` prefix are NOT exposed

### Example `.env` Files

**`.env` (default - loaded in all environments):**
```bash
REACT_APP_APP_NAME=My App
REACT_APP_VERSION=1.0.0
```

**`.env.development` (development only):**
```bash
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=true
```

**`.env.production` (production only):**
```bash
REACT_APP_API_URL=https://api.myapp.com
REACT_APP_DEBUG=false
```

**`.env.local` (local overrides - gitignored):**
```bash
REACT_APP_API_KEY=my_local_key
```

### Priority Order

1. `.env.development.local` / `.env.production.local` (highest)
2. `.env.local`
3. `.env.development` / `.env.production`
4. `.env` (lowest)

---

## Environment Variables in Vite

### Setup

1. **Create `.env` file:**
```bash
# .env
VITE_API_URL=http://localhost:3000
VITE_API_KEY=dev_key_123
```

2. **Access in code:**
```javascript
// main.jsx
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Rules for Vite

- ✅ **Must start with `VITE_`** to be exposed to browser
- ✅ Available in `import.meta.env.VITE_*`
- ✅ Hot reload works (no restart needed)
- ❌ Variables without `VITE_` prefix are NOT exposed

### Example `.env` Files

**`.env`:**
```bash
VITE_APP_NAME=My App
```

**`.env.development`:**
```bash
VITE_API_URL=http://localhost:3000
```

**`.env.production`:**
```bash
VITE_API_URL=https://api.myapp.com
```

---

## Environment Variables in Next.js

### Setup

1. **Create `.env.local` file:**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret_123
```

2. **Access in code:**

**Client-side (browser):**
```javascript
// Must start with NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

**Server-side (API routes, getServerSideProps):**
```javascript
// Can access ALL variables
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_SECRET_KEY;
```

### Rules for Next.js

- ✅ **`NEXT_PUBLIC_*`** → Exposed to browser
- ✅ **No prefix** → Server-only (secure)
- ✅ Available in `process.env.*`
- ✅ Server variables are secure (not sent to browser)

### Example `.env` Files

**`.env.local` (gitignored - secrets):**
```bash
DATABASE_URL=postgresql://...
API_SECRET_KEY=secret_123
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**`.env.development`:**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEBUG=true
```

**`.env.production`:**
```bash
NEXT_PUBLIC_API_URL=https://api.myapp.com
NEXT_PUBLIC_DEBUG=false
```

---

## Security Best Practices

### ✅ DO

1. **Never commit `.env.local` or `.env` with secrets:**
```bash
# .gitignore
.env.local
.env*.local
```

2. **Use different keys for dev/prod:**
```bash
# Development
REACT_APP_API_KEY=dev_key_123

# Production (set in hosting platform)
REACT_APP_API_KEY=prod_key_456
```

3. **Validate environment variables:**
```javascript
// config.js
const requiredEnvVars = ['REACT_APP_API_URL', 'REACT_APP_API_KEY'];

requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    throw new Error(`Missing required env var: ${varName}`);
  }
});

export const config = {
  apiUrl: process.env.REACT_APP_API_URL,
  apiKey: process.env.REACT_APP_API_KEY,
};
```

4. **Use TypeScript for type safety:**
```typescript
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### ❌ DON'T

1. ❌ **Don't commit secrets to git:**
```bash
# ❌ BAD: Committing .env with secrets
git add .env
git commit -m "Add config"
```

2. ❌ **Don't expose server secrets to client:**
```javascript
// ❌ BAD: Server secret exposed to browser
const SECRET_KEY = process.env.SECRET_KEY; // Without NEXT_PUBLIC_ prefix in Next.js
```

3. ❌ **Don't hardcode fallbacks for secrets:**
```javascript
// ❌ BAD: Fallback exposes secret
const API_KEY = process.env.REACT_APP_API_KEY || "hardcoded_secret";
```

---

## Setting Environment Variables

### Local Development

**Option 1: `.env` file (recommended)**
```bash
# .env
REACT_APP_API_URL=http://localhost:3000
```

**Option 2: Command line:**
```bash
# Linux/Mac
REACT_APP_API_URL=http://localhost:3000 npm start

# Windows
set REACT_APP_API_URL=http://localhost:3000 && npm start
```

**Option 3: `.env.local` (gitignored):**
```bash
# .env.local (not committed)
REACT_APP_API_KEY=my_local_key
```

### Production Deployment

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL` = `https://api.myapp.com`
   - `DATABASE_URL` = `postgresql://...`
3. Redeploy

**Netlify:**
1. Go to Site Settings → Environment Variables
2. Add variables
3. Redeploy

**AWS/Heroku:**
```bash
# Set via CLI
heroku config:set REACT_APP_API_URL=https://api.myapp.com

# Or via dashboard
```

---

## Common Patterns

### Configuration Object

```javascript
// config.js
const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  apiKey: process.env.REACT_APP_API_KEY,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default config;
```

### Type-Safe Config (TypeScript)

```typescript
// config.ts
interface Config {
  apiUrl: string;
  apiKey: string;
  isDevelopment: boolean;
}

const getConfig = (): Config => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  if (!apiUrl || !apiKey) {
    throw new Error('Missing required environment variables');
  }

  return {
    apiUrl,
    apiKey,
    isDevelopment: process.env.NODE_ENV === 'development',
  };
};

export const config = getConfig();
```

### Environment-Specific API Client

```javascript
// apiClient.js
const API_URL = process.env.REACT_APP_API_URL;

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  }
}

export default new ApiClient(API_URL);
```

---

## Troubleshooting

### Problem: Variable is `undefined`

**Solution:**
- ✅ Check prefix (`REACT_APP_`, `VITE_`, `NEXT_PUBLIC_`)
- ✅ Restart dev server (Create React App)
- ✅ Check `.env` file location (project root)
- ✅ Check variable name spelling

### Problem: Variable exposed when it shouldn't be

**Solution:**
- ✅ Remove `REACT_APP_` / `VITE_` / `NEXT_PUBLIC_` prefix
- ✅ Use server-only variables (Next.js API routes)

### Problem: Different values in dev vs prod

**Solution:**
- ✅ Use `.env.development` and `.env.production`
- ✅ Set variables in hosting platform for production

---

## Quick Reference

| Framework | Prefix | Access | Server-Only? |
|-----------|--------|--------|--------------|
| **Create React App** | `REACT_APP_` | `process.env.REACT_APP_*` | ❌ No |
| **Vite** | `VITE_` | `import.meta.env.VITE_*` | ❌ No |
| **Next.js (Client)** | `NEXT_PUBLIC_` | `process.env.NEXT_PUBLIC_*` | ❌ No |
| **Next.js (Server)** | No prefix | `process.env.*` | ✅ Yes |

---

## Key Takeaways

1. ✅ **Use environment variables** for all configuration
2. ✅ **Never commit secrets** to git
3. ✅ **Use correct prefix** for your framework
4. ✅ **Validate variables** on app startup
5. ✅ **Set production variables** in hosting platform

---

## Related Topics

- [Deployment Strategies](./2.%20Deployment%20Strategies.md) - Setting env vars in production
- [CI/CD Pipelines](./3.%20CI%20CD%20Pipelines.md) - Managing env vars in CI/CD
- [Error Monitoring](../8.%20Production%20%26%20Monitoring/1.%20Error%20Monitoring/index.md) - Using env vars for error tracking

