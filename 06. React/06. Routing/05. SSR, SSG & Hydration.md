# SSR, SSG & Hydration

## TL;DR
- **SSR** (Server-Side Rendering) = Generate HTML on server for each request
- **SSG** (Static Site Generation) = Generate HTML at build time
- **ISR** (Incremental Static Regeneration) = Update static pages after build
- **Hydration** = Attach React to server-rendered HTML on client
- **CSR** (Client-Side Rendering) = Generate HTML in browser
- **Benefits:** SEO, faster initial load, better social sharing
- **Trade-offs:** Server complexity, deployment costs, state management
- **Frameworks:** Next.js, Remix, Gatsby
- **React 18+:** Streaming SSR, Selective Hydration

---

## 1. Rendering Strategies

### CSR (Client-Side Rendering)

```
Browser Request → Server sends empty HTML + JS bundle
                → Browser downloads JS
                → React renders content
                → User sees page
```

**HTML sent:**
```html
<div id="root"></div>
<script src="bundle.js"></script>
```

**Pros:**
- Simple deployment
- Rich interactivity
- No server needed

**Cons:**
- Slow initial load
- Poor SEO
- Blank page while loading

---

### SSR (Server-Side Rendering)

```
Browser Request → Server renders React to HTML
                → Server sends complete HTML
                → Browser shows content immediately
                → React hydrates (attaches events)
                → Page becomes interactive
```

**HTML sent:**
```html
<div id="root">
  <h1>Hello World</h1>
  <button>Click Me</button>
</div>
<script src="bundle.js"></script>
```

**Pros:**
- Fast initial paint
- Great SEO
- Works without JS

**Cons:**
- Server overhead
- More complex
- Hydration mismatch issues

---

### SSG (Static Site Generation)

```
Build Time → Pre-render all pages to HTML
           → Deploy static files
           → Serve from CDN

Browser Request → CDN serves pre-rendered HTML
                → Fast response
                → React hydrates
```

**Pros:**
- Fastest possible load
- Cheap hosting (CDN)
- Perfect SEO
- Scales infinitely

**Cons:**
- Build time grows with pages
- Can't have dynamic data
- Requires rebuild for updates

---

### ISR (Incremental Static Regeneration)

```
First Request → Serve stale static page immediately
              → Regenerate in background
              → Next request gets updated page
```

**Pros:**
- Fast like SSG
- Can update without rebuild
- Best of SSG + SSR

**Cons:**
- More complex
- Needs compatible hosting (Vercel, Netlify)

---

## 2. Hydration

**Hydration** = Process of attaching React event handlers to server-rendered HTML.

### How Hydration Works

```jsx
// Server: Renders to HTML string
const html = ReactDOMServer.renderToString(<App />);
// Result: <div><button>Click Me</button></div>

// Client: Attaches events to existing HTML
ReactDOM.hydrateRoot(document.getElementById('root'), <App />);
// Result: Same HTML, but now interactive
```

---

### Hydration Mismatch

```jsx
// ❌ BAD: Server and client render differently
function Component() {
  // Server always returns null (Date not available)
  // Client returns actual date
  return <div>{typeof window !== 'undefined' ? new Date().toString() : null}</div>;
}
```

**Error:** "Text content does not match server-rendered HTML."

---

### Fix: useEffect for Client-Only Code

```jsx
// ✅ GOOD: Only run on client
function Component() {
  const [date, setDate] = useState(null);

  useEffect(() => {
    setDate(new Date().toString());
  }, []);

  return <div>{date || 'Loading...'}</div>;
}
```

---

### Fix: Suppress Hydration Warning

```jsx
// ✅ For cases where mismatch is intentional
<div suppressHydrationWarning>
  {new Date().toString()}
</div>
```

---

## 3. Next.js Rendering Methods

### getServerSideProps (SSR)

```jsx
// runs on every request
export async function getServerSideProps(context) {
  const { params, req, res, query } = context;

  const data = await fetchData(params.id);

  return {
    props: { data }, // Passed to page component
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}

export default Page;
```

**Use when:**
- Need fresh data on every request
- User-specific content
- Authentication required

---

### getStaticProps (SSG)

```jsx
// runs at build time
export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: { data },
    revalidate: 60, // ISR: Regenerate after 60 seconds
  };
}

function Page({ data }) {
  return <div>{data.title}</div>;
}

export default Page;
```

**Use when:**
- Content rarely changes
- Same for all users
- Performance critical

---

### getStaticPaths (SSG with Dynamic Routes)

```jsx
// Generate paths at build time
export async function getStaticPaths() {
  const posts = await fetchAllPosts();

  const paths = posts.map(post => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // or true, false
  };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);

  return {
    props: { post },
  };
}

function PostPage({ post }) {
  return <article>{post.title}</article>;
}

export default PostPage;
```

**fallback options:**
- `false`: Return 404 for unlisted paths
- `true`: Show fallback, generate in background
- `'blocking'`: Wait for generation

---

## 4. React 18 SSR Improvements

### Streaming SSR

```jsx
import { renderToPipeableStream } from 'react-dom/server';

// Server
const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    response.setHeader('Content-Type', 'text/html');
    pipe(response);
  },
});
```

**Benefits:**
- Send HTML in chunks
- Show content progressively
- Faster Time to First Byte

---

### Selective Hydration

```jsx
// Components wrapped in Suspense hydrate independently
<Suspense fallback={<Spinner />}>
  <Comments /> {/* Hydrates when ready */}
</Suspense>
```

**Benefits:**
- Page interactive before all components hydrate
- Heavy components don't block light ones
- Better perceived performance

---

## 5. Data Fetching Patterns

### Server-Only Data Fetching

```jsx
// Next.js 13+ App Router
async function Page() {
  // This runs on server only
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // SSR
    // cache: 'force-cache', // SSG
    // next: { revalidate: 60 }, // ISR
  });

  return <div>{data.title}</div>;
}
```

---

### Client-Side Data Fetching

```jsx
'use client'; // Client Component

import { useEffect, useState } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>{data.title}</div>;
}
```

---

## 6. SEO Optimization

### Meta Tags

```jsx
// Next.js 13+ App Router
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
};

function Page() {
  return <div>Content</div>;
}
```

---

### Dynamic Meta Tags

```jsx
export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.image],
    },
  };
}
```

---

### Sitemap

```jsx
// app/sitemap.js
export default function sitemap() {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
    },
    {
      url: 'https://example.com/about',
      lastModified: new Date(),
    },
  ];
}
```

---

## 7. Performance Patterns

### Code Splitting with SSR

```jsx
import dynamic from 'next/dynamic';

// Client-side only component
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Spinner />,
});

function Page() {
  return (
    <div>
      <Header />
      <HeavyComponent />
    </div>
  );
}
```

---

### Image Optimization

```jsx
import Image from 'next/image';

function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // Load immediately
      placeholder="blur"
      blurDataURL="data:image/..."
    />
  );
}
```

---

## 8. Common Patterns

### Authentication

```jsx
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userData = await fetchUserData(session.userId);

  return {
    props: { user: userData },
  };
}

function ProtectedPage({ user }) {
  return <Dashboard user={user} />;
}
```

---

### API Routes

```jsx
// pages/api/users.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await db.users.findMany();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const user = await db.users.create({
      data: req.body,
    });
    res.status(201).json(user);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

---

## 9. Common Issues

### Issue 1: window/document Not Available

```jsx
// ❌ BAD: Breaks SSR
function Component() {
  const width = window.innerWidth; // Error on server
}

// ✅ GOOD: Check if running on client
function Component() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
}

// ✅ GOOD: Use Next.js dynamic import
const ClientOnlyComponent = dynamic(() => import('./ClientOnly'), {
  ssr: false,
});
```

---

### Issue 2: Hydration Mismatch

```jsx
// ❌ BAD: Random values differ
<div key={Math.random()}>Content</div>

// ✅ GOOD: Stable keys
<div key={item.id}>Content</div>

// ❌ BAD: Date differs between server/client
<div>{new Date().toString()}</div>

// ✅ GOOD: Only on client
const [date, setDate] = useState(null);
useEffect(() => setDate(new Date()), []);
```

---

### Issue 3: External Libraries

```jsx
// Library uses window/document
import SomeLibrary from 'some-library'; // ❌ Breaks SSR

// ✅ GOOD: Dynamic import with ssr: false
const SomeLibrary = dynamic(() => import('some-library'), {
  ssr: false,
});
```

---

## 10. Comparison Table

| Feature | CSR | SSR | SSG | ISR |
|---------|-----|-----|-----|-----|
| **Initial Load** | Slow | Fast | Fastest | Fastest |
| **SEO** | Poor | Great | Perfect | Perfect |
| **Hosting** | Simple | Server needed | CDN | Special hosting |
| **Data Freshness** | Real-time | Real-time | Stale | Near real-time |
| **Build Time** | Fast | N/A | Can be slow | Fast |
| **Scalability** | Excellent | Moderate | Excellent | Excellent |
| **Complexity** | Simple | Complex | Moderate | Complex |

---

## 11. Interview Questions

### Q1: What is Server-Side Rendering?

**Answer:** SSR generates HTML on the server for each request, sending complete HTML to the browser. Benefits: faster initial load, better SEO, works without JavaScript.

---

### Q2: What is hydration?

**Answer:** Hydration is the process of attaching React event handlers to server-rendered HTML, making it interactive. React "reuses" the existing DOM instead of creating it from scratch.

---

### Q3: What's the difference between SSR and SSG?

**Answer:**

**SSR:** Renders on each request
- Fresh data
- Server overhead
- Dynamic content

**SSG:** Renders at build time
- Static HTML
- Fastest performance
- Stale until rebuild

---

### Q4: What is a hydration mismatch?

**Answer:** When server-rendered HTML differs from client-rendered HTML, causing React to warn/error. Common causes:
- Using `window`/`document` on server
- Random values
- Different Date/Time between server/client

---

### Q5: How do you fix hydration mismatches?

**Answer:**
1. Use `useEffect` for client-only code
2. Use `suppressHydrationWarning` for intentional differences
3. Check `typeof window !== 'undefined'`
4. Use Next.js `dynamic` with `ssr: false`

---

### Q6: What is ISR?

**Answer:** Incremental Static Regeneration - updates static pages after deployment without rebuilding entire site. Combines benefits of SSG (speed) and SSR (fresh data).

```jsx
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60, // Regenerate every 60 seconds
  };
}
```

---

### Q7: When should you use SSR vs SSG?

**Answer:**

**Use SSR when:**
- Need real-time data
- User-specific content
- Frequently changing data

**Use SSG when:**
- Content rarely changes
- Same for all users
- Performance is critical
- Blog posts, docs, marketing pages

---

### Q8: What is Streaming SSR in React 18?

**Answer:** Streaming SSR sends HTML in chunks as components finish rendering, rather than waiting for entire page. Benefits:
- Faster Time to First Byte
- Progressive rendering
- Better perceived performance

---

### Q9: What is Selective Hydration?

**Answer:** React 18 feature that allows parts of the page to hydrate independently. Components in `<Suspense>` don't block hydration of other components.

---

### Q10: How does Next.js handle SEO?

**Answer:** Next.js provides:
- Built-in `<Head>` component for meta tags
- Automatic sitemap generation
- Pre-rendering (SSR/SSG) for crawlers
- Image optimization
- Automatic code splitting

---

## 12. Best Practices

### ✅ DO: Use SSG When Possible

```jsx
// Static content = use SSG
export async function getStaticProps() {
  const posts = await fetchPosts();
  return { props: { posts }, revalidate: 3600 };
}
```

---

### ✅ DO: Handle Loading States

```jsx
function Page() {
  const { data, isLoading } = useSWR('/api/data');

  if (isLoading) return <Skeleton />;
  return <Content data={data} />;
}
```

---

### ✅ DO: Optimize Images

```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

---

### ❌ DON'T: Use Browser APIs on Server

```jsx
// ❌ BAD
const width = window.innerWidth;

// ✅ GOOD
const [width, setWidth] = useState(0);
useEffect(() => {
  setWidth(window.innerWidth);
}, []);
```

---

### ❌ DON'T: Fetch Data in useEffect for SSR Pages

```jsx
// ❌ BAD: Negates SSR benefits
function Page() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
}

// ✅ GOOD: Fetch on server
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}
```

---

## Summary: SSR/SSG Checklist

- ✅ Understand rendering strategies (CSR, SSR, SSG, ISR)
- ✅ Know when to use each strategy
- ✅ Handle hydration correctly
- ✅ Avoid hydration mismatches
- ✅ Use appropriate data fetching method
- ✅ Optimize for SEO (meta tags, sitemaps)
- ✅ Handle browser APIs carefully
- ✅ Leverage React 18 features (Streaming, Selective Hydration)

Your SSR/SSG knowledge is interview-ready when you can explain:

1. Rendering strategies and trade-offs
2. How hydration works
3. Hydration mismatch causes and fixes
4. When to use SSR vs SSG vs ISR
5. Next.js data fetching methods
6. React 18 SSR improvements
7. Common patterns and issues
8. SEO optimization techniques



