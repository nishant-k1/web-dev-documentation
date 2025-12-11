# CI/CD Pipelines

Continuous Integration (CI) and Continuous Deployment (CD) pipelines. Automating testing, building, and deployment processes.

---

## What is CI/CD?

### Continuous Integration (CI)
**Automatically test and build** your code when you push changes.

**Benefits:**
- ✅ Catch bugs early
- ✅ Ensure code quality
- ✅ Prevent broken code from merging

### Continuous Deployment (CD)
**Automatically deploy** your code to production after tests pass.

**Benefits:**
- ✅ Faster releases
- ✅ Consistent deployments
- ✅ Less manual work

---

## CI/CD Workflow

```
Developer pushes code
    ↓
CI: Run tests
    ↓
CI: Build application
    ↓
CI: Run linting/type checking
    ↓
CD: Deploy to staging (if tests pass)
    ↓
CD: Deploy to production (if staging OK)
```

---

## GitHub Actions

### Basic Workflow

**`.github/workflows/ci.yml`:**
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test -- --coverage
      
      - name: Build
        run: npm run build
```

### Deployment Workflow

**`.github/workflows/deploy.yml`:**
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## GitLab CI/CD

### Basic Pipeline

**`.gitlab-ci.yml`:**
```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --prod --token $VERCEL_TOKEN
  only:
    - main
```

---

## Common CI/CD Patterns

### 1. Test Before Merge

```yaml
# Run tests on every PR
on:
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
```

### 2. Deploy to Staging First

```yaml
# Deploy to staging, then production
jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to staging
        run: vercel --env=staging
  
  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: [test, deploy-staging]
    steps:
      - name: Deploy to production
        run: vercel --prod
```

### 3. Matrix Testing (Multiple Node Versions)

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    
steps:
  - uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node-version }}
  - run: npm test
```

### 4. Caching Dependencies

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: '18'
    cache: 'npm'  # Caches node_modules

- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

---

## Environment Variables in CI/CD

### GitHub Actions Secrets

1. Go to Repository Settings → Secrets
2. Add secrets:
   - `API_URL`
   - `VERCEL_TOKEN`
   - `DATABASE_URL`

3. Use in workflow:
```yaml
env:
  REACT_APP_API_URL: ${{ secrets.API_URL }}
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

### GitLab CI Variables

1. Go to Settings → CI/CD → Variables
2. Add variables
3. Use in `.gitlab-ci.yml`:
```yaml
script:
  - echo $API_URL
```

---

## Best Practices

### 1. Run Tests First

```yaml
# ✅ GOOD: Tests run before build
jobs:
  test:
    steps:
      - run: npm test
  
  build:
    needs: test  # Wait for tests
    steps:
      - run: npm run build
```

### 2. Use Specific Versions

```yaml
# ✅ GOOD: Specific versions
- uses: actions/checkout@v3
- uses: actions/setup-node@v3

# ❌ BAD: Latest may break
- uses: actions/checkout@latest
```

### 3. Cache Dependencies

```yaml
# ✅ GOOD: Cache node_modules
- uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 4. Fail Fast

```yaml
# ✅ GOOD: Stop on first failure
- run: npm run lint || exit 1
- run: npm test || exit 1
```

### 5. Clean Up After

```yaml
- name: Cleanup
  if: always()  # Run even if job fails
  run: |
    rm -rf node_modules
    rm -rf build
```

---

## Common CI/CD Tasks

### Linting

```yaml
- name: Run ESLint
  run: npm run lint
```

### Type Checking

```yaml
- name: Type check
  run: npm run type-check
```

### Testing

```yaml
- name: Run tests
  run: npm test -- --coverage
```

### Building

```yaml
- name: Build
  run: npm run build
  env:
    REACT_APP_API_URL: ${{ secrets.API_URL }}
```

### Deployment

```yaml
- name: Deploy
  run: |
    npm install -g vercel
    vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## Troubleshooting

### Issue: Tests Fail in CI but Pass Locally

**Solutions:**
- ✅ Check Node.js version matches
- ✅ Clear cache and reinstall dependencies
- ✅ Check environment variables
- ✅ Verify test database/API URLs

### Issue: Build Fails in CI

**Solutions:**
- ✅ Check for missing dependencies
- ✅ Verify build command
- ✅ Check environment variables
- ✅ Review build logs

### Issue: Deployment Fails

**Solutions:**
- ✅ Verify deployment tokens
- ✅ Check environment variables
- ✅ Review deployment logs
- ✅ Test deployment locally first

---

## Advanced Patterns

### 1. Conditional Deployment

```yaml
deploy:
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  steps:
    - run: vercel --prod
```

### 2. Manual Approval

```yaml
deploy-production:
  environment:
    name: production
    url: https://myapp.com
  when: manual  # Requires manual approval
  steps:
    - run: vercel --prod
```

### 3. Parallel Jobs

```yaml
jobs:
  test-unit:
    steps:
      - run: npm run test:unit
  
  test-e2e:
    steps:
      - run: npm run test:e2e
  
  deploy:
    needs: [test-unit, test-e2e]  # Wait for both
    steps:
      - run: vercel --prod
```

---

## Quick Reference

### GitHub Actions Triggers

```yaml
on:
  push:              # On push
    branches: [ main ]
  pull_request:      # On PR
    branches: [ main ]
  schedule:          # Cron job
    - cron: '0 0 * * *'
  workflow_dispatch: # Manual trigger
```

### Common Actions

```yaml
- uses: actions/checkout@v3          # Checkout code
- uses: actions/setup-node@v3        # Setup Node.js
- uses: actions/cache@v3             # Cache files
- uses: actions/upload-artifact@v3   # Upload artifacts
```

---

## Key Takeaways

1. ✅ **CI runs tests** automatically on code changes
2. ✅ **CD deploys** automatically after tests pass
3. ✅ **Use secrets** for sensitive data
4. ✅ **Cache dependencies** for faster builds
5. ✅ **Test before deploying** to production

---

## Related Topics

- [Environment Variables](./1.%20Environment%20Variables/index.md) - Managing secrets in CI/CD
- [Deployment Strategies](./2.%20Deployment%20Strategies.md) - Where to deploy
- [Error Monitoring](../8.%20Production%20%26%20Monitoring/1.%20Error%20Monitoring/index.md) - Monitoring deployments

