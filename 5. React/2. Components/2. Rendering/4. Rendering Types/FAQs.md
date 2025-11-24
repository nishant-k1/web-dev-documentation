# FAQs: Rendering Types

## When does build takes place

Build happens only during deployment and doesn't depend on rendering type (SSG, SSR, ISR, CSR)

## When does re-build takes place

Rebuild happens only during re-deployment and doesn't depend on rendering type (SSG, SSR, ISR, CSR)

## Rendering during build time vs rendering on server, isn't build is also generated on server?

While both technically happen on a server, they are fundamentally different in when and how often rendering occurs.

Build-time rendering (SSG) happens once during deployment.
Server-side rendering (SSR) happens on every request at runtime.

## In SSR on every request the page is updated and newly generated html preloaded with data is fetched from the server. Now tell me once the this html is fetched does re-build happens i.e. build refresh takes place? Does build gets updated with this newly fetched html?

No, the build does not get updated. There is no rebuild.

➤ HTML is rendered fresh on every request.
➤ Not cached by default (but can be manually cached with advanced setups).

SSR can be combined with CDN-level caching to simulate ISR-like performance — but that’s a more manual setup.

**In SSR, the build contains:**

- Your server code (e.g., React components, API logic)
- The logic to dynamically fetch data and generate HTML on the fly per request

**But the HTML is not saved anywhere. It is:**

- Generated in memory
- Sent to the client
- Discarded — because the next request will get freshly generated HTML again

## In ISR, does rebuild happens on every request

No full rebuild happens — but the HTML gets regenerated and cached per page.

➤ HTML is pre-rendered once, then cached per page.
➤ Automatically revalidated & updated without full rebuild.

ISR is built-in caching at the framework level, which makes it effortless for developers.

Build Time:

- Static pages are pre-rendered and cached.
- These are served quickly on initial requests.

On Request (After Revalidation Time):

- If a request comes after the revalidate time (e.g., 10 seconds),
- The old cached HTML is still served to the current user,
- But in the background, Next.js regenerates a new version of that page using fresh data.

New Version:

- The newly regenerated HTML is cached and will be served to future requests.
- No full rebuild of the site happens.
- Only the specific page (route) is regenerated — like a "mini SSG" on demand.

## In SSG, html file is generated and saved in build permanently once build happens, in SSR, on every request the html is generated not during build time, neither the generated file gets saved or cached in build or anywhere, and discarded. in ISR, html is saved and generated during build time, but after certain revalidation time when the request is made to server then the old saved file gets replaced with the newly generated html file and gets saved in the build?

**SSG (Static Site Generation)**

- HTML is generated at build time.
- Stored permanently in the build output directory (e.g., .next/static).
- Served via CDN.
- No regeneration until you manually rebuild/deploy.

**SSR (Server-Side Rendering)**

- HTML is generated on each request.
- Not stored anywhere permanently (not saved in .next/ or build output).
- Discarded after the response is sent.
- Slightly slower than SSG/ISR but supports dynamic content.

**ISR (Incremental Static Regeneration)**

1. Initially behaves like SSG: Static HTML is generated during build and cached.

2. Then behaves like SSR in the background: When a page is requested after revalidate time, the server:

   Serves the old cached HTML immediately.

   In the background, fetches new data and generates new HTML.

   The new HTML replaces the old cached version.

⚠️ But: This new HTML does not modify your build folder. It’s saved in an internal server-side cache (like in Vercel/Netlify's server or Node memory/cache storage).

| Feature                 | SSG                        | SSR                       | ISR                                           |
| ----------------------- | -------------------------- | ------------------------- | --------------------------------------------- |
| Initial HTML Generation | At build time              | At request time           | At build time                                 |
| Served From             | Static file (CDN)          | Server-rendered each time | Static file (CDN)                             |
| HTML Saved              | ✅ Yes (in build output)   | ❌ No (discarded)         | ✅ Yes (in cache, not in build folder)        |
| HTML Update             | 🛠️ Manual rebuild required | 🆕 New on each request    | 🔁 Automatically after `revalidate` interval  |
| Use Case                | Blogs, marketing sites     | Auth pages, dashboards    | Blogs with periodic updates (e.g., every 60s) |
