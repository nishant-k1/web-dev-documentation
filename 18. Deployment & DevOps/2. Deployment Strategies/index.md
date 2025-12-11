# Deployment Strategies

Deploying React/Next.js applications to production. Understanding different hosting platforms, deployment processes, and best practices.

---

## What is Deployment?

**Deployment** is the process of making your application available to users on the internet. It involves:

1. Building your app for production
2. Uploading files to a server/hosting platform
3. Configuring the server
4. Making the app accessible via URL

---

## Pre-Deployment Checklist

### ✅ Before Deploying

- [ ] Build works locally (`npm run build`)
- [ ] Environment variables set
- [ ] API endpoints point to production
- [ ] Error handling in place
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Analytics/monitoring set up

---

## Deployment Platforms

### 1. Vercel (Recommended for Next.js)

**Best for:** Next.js, React apps, static sites

**Features:**
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ CDN globally distributed
- ✅ Serverless functions
- ✅ Preview deployments
- ✅ Environment variables management

**Deployment Steps:**

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Production deploy:**
```bash
vercel --prod
```

**Or connect GitHub:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings
4. Deploy automatically on push

**Build Settings (Next.js):**
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install`

---

### 2. Netlify

**Best for:** React apps, static sites, JAMstack

**Features:**
- ✅ Continuous deployment from Git
- ✅ Form handling
- ✅ Serverless functions
- ✅ Split testing
- ✅ Environment variables

**Deployment Steps:**

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Login:**
```bash
netlify login
```

3. **Deploy:**
```bash
netlify deploy
```

4. **Production deploy:**
```bash
netlify deploy --prod
```

**Or connect GitHub:**
1. Go to [netlify.com](https://netlify.com)
2. Add new site from Git
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `build` (CRA) or `.next` (Next.js)

---

### 3. GitHub Pages

**Best for:** Static React apps, portfolios

**Features:**
- ✅ Free hosting
- ✅ Custom domains
- ✅ Automatic HTTPS

**Deployment Steps:**

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json:**
```json
{
  "homepage": "https://yourusername.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

---

### 4. AWS (S3 + CloudFront)

**Best for:** Enterprise apps, high traffic

**Features:**
- ✅ Scalable
- ✅ CDN (CloudFront)
- ✅ Custom domain
- ⚠️ More complex setup

**Deployment Steps:**

1. **Build app:**
```bash
npm run build
```

2. **Upload to S3:**
```bash
aws s3 sync build/ s3://your-bucket-name
```

3. **Configure CloudFront** for CDN

---

### 5. Heroku

**Best for:** Full-stack apps, Node.js backends

**Features:**
- ✅ Easy deployment
- ✅ Add-ons (databases, etc.)
- ✅ Environment variables

**Deployment Steps:**

1. **Install Heroku CLI:**
```bash
npm i -g heroku
```

2. **Login:**
```bash
heroku login
```

3. **Create app:**
```bash
heroku create your-app-name
```

4. **Deploy:**
```bash
git push heroku main
```

---

## Build Process

### Create React App

```bash
# Build for production
npm run build

# Output: build/ folder
# Contains optimized, minified files
```

**Build output:**
```
build/
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── index.html
└── asset-manifest.json
```

### Next.js

```bash
# Build for production
npm run build

# Output: .next/ folder
# Contains server and client bundles
```

**Build output:**
```
.next/
├── server/
├── static/
└── BUILD_ID
```

### Vite

```bash
# Build for production
npm run build

# Output: dist/ folder
```

---

## Environment Variables in Production

### Vercel

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_API_URL` = `https://api.myapp.com`
   - `DATABASE_URL` = `postgresql://...`
3. Redeploy

### Netlify

1. Go to Site Settings → Environment Variables
2. Add variables
3. Redeploy

### Heroku

```bash
heroku config:set REACT_APP_API_URL=https://api.myapp.com
```

---

## Deployment Best Practices

### 1. Use Environment Variables

```javascript
// ✅ GOOD
const API_URL = process.env.REACT_APP_API_URL;

// ❌ BAD
const API_URL = "https://api.myapp.com";
```

### 2. Optimize Build

**Create React App:**
```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx source-map-explorer 'build/static/js/*.js'"
  }
}
```

**Next.js:**
```javascript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};
```

### 3. Set Up Error Boundaries

```javascript
// ErrorBoundary.js
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Send to error monitoring service
    console.error('Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 4. Configure Security Headers

**Next.js:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
```

### 5. Set Up Monitoring

```javascript
// Monitor errors
window.addEventListener('error', (event) => {
  // Send to error tracking service
  console.error('Error:', event.error);
});
```

---

## Continuous Deployment (CD)

### GitHub Actions

**`.github/workflows/deploy.yml`:**
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Vercel/Netlify

- ✅ Automatic deployment on git push
- ✅ Preview deployments for PRs
- ✅ Rollback to previous versions

---

## Common Deployment Issues

### Issue: Build Fails

**Solutions:**
- ✅ Check Node.js version matches
- ✅ Clear `node_modules` and reinstall
- ✅ Check for TypeScript errors
- ✅ Verify all dependencies installed

### Issue: Environment Variables Not Working

**Solutions:**
- ✅ Check variable names (prefix required)
- ✅ Set variables in hosting platform
- ✅ Redeploy after setting variables

### Issue: 404 on Refresh (SPA)

**Solutions:**
- ✅ Configure redirects (Netlify: `_redirects` file)
- ✅ Use Next.js (handles routing server-side)

**Netlify `_redirects` file:**
```
/*    /index.html   200
```

---

## Performance Optimization

### 1. Code Splitting

```javascript
// Lazy load components
const Dashboard = React.lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### 2. Image Optimization

**Next.js:**
```jsx
import Image from 'next/image';

<Image src="/photo.jpg" width={500} height={300} />
```

### 3. Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

---

## Monitoring After Deployment

### 1. Check Build Logs

- ✅ Look for warnings/errors
- ✅ Verify build size
- ✅ Check for missing dependencies

### 2. Test Production URL

- ✅ Verify app loads
- ✅ Test all features
- ✅ Check API connections
- ✅ Verify environment variables

### 3. Monitor Performance

- ✅ Use Lighthouse
- ✅ Check Core Web Vitals
- ✅ Monitor error rates

---

## Quick Reference

| Platform | Best For | Setup Complexity | Cost |
|----------|----------|------------------|------|
| **Vercel** | Next.js, React | ⭐ Easy | Free tier available |
| **Netlify** | React, Static | ⭐ Easy | Free tier available |
| **GitHub Pages** | Static sites | ⭐⭐ Medium | Free |
| **AWS** | Enterprise | ⭐⭐⭐⭐ Complex | Pay as you go |
| **Heroku** | Full-stack | ⭐⭐ Medium | Free tier available |

---

## Key Takeaways

1. ✅ **Choose platform** based on your needs
2. ✅ **Set environment variables** in hosting platform
3. ✅ **Test build locally** before deploying
4. ✅ **Monitor after deployment** for errors
5. ✅ **Use CD** for automatic deployments

---

## Related Topics

- [Environment Variables](./1.%20Environment%20Variables/index.md) - Managing config
- [CI/CD Pipelines](./3.%20CI%20CD%20Pipelines.md) - Automated deployment
- [Error Monitoring](../8.%20Production%20%26%20Monitoring/1.%20Error%20Monitoring/index.md) - Production debugging

