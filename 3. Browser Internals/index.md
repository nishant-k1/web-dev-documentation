# Browser Internals

Understanding how browsers work internally - from networking to rendering to resource loading.

---

## Topics

### 1. [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md)

How browsers initiate and handle HTTP requests. Understanding the difference between browser-initiated requests and JavaScript-initiated requests.

### 2. [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md)

Which HTML elements trigger automatic HTTP requests and which don't. Complete list of resource-loading tags and their behavior.

### 3. [Basic File Uploads](./3.%20Basic%20File%20Uploads.md)

How file uploads work in HTML and JavaScript. Understanding `<input type="file">` behavior, FormData, and security restrictions.

### 4. [Form Submissions](./4.%20Form%20Submissions.md)

How HTML forms send data to servers. Supported HTTP methods (GET/POST), workarounds for PUT/PATCH/DELETE, and form encoding types.

### 5. [POST Request Content Types](./5.%20POST%20Request%20Content%20Types.md)

Understanding different Content-Type headers: `application/json`, `multipart/form-data`, `application/x-www-form-urlencoded`. When to use each and how they work.

### 6. [Resource Loading Behavior](./6.%20Resource%20Loading%20Behavior.md)

Synchronous vs asynchronous resource loading. How `<script>`, `<link>`, `<img>`, and other tags affect page performance. Understanding `defer`, `async`, and `type="module"`.

### 7. [HTTP Request Destinations](./7.%20HTTP%20Request%20Destinations.md)

Where automatic HTML requests go - localhost, production servers, CDNs, external domains. Understanding URL resolution and relative vs absolute paths.

### 8. [JavaScript Modules](./8.%20JavaScript%20Modules.md)

JavaScript modules vs regular files. How modules work, module scope, bundling, linking, and dynamic imports. How React/Vite/Webpack handle modules.

### 9. [Browser Security](./9.%20Browser%20Security.md)

Browser security restrictions: file input restrictions, CORS, Content Security Policy (CSP), mixed content, XSS protection, and cookie security.

### 10. [Quick Reference](./10.%20Quick%20Reference.md)

Quick lookup tables for all topics - HTML tags, Content-Types, loading behavior, form methods, modules, and more.

### 11. [Static File Serving](./11.%20Static%20File%20Serving.md)

Understanding how static files are served from localhost - the relationship between browser, server, and filesystem. How development servers work and why `file://` protocol is different.

### 12. [Blob URLs and Memory Management](./12.%20Blob%20URLs%20and%20Memory%20Management.md)

Understanding Blob objects, blob URLs, and how browsers handle binary data in memory. Where blob data is stored (RAM vs disk), how blob URLs work, and memory management.

### 13. [Large File Uploads and Chunking](./13.%20Large%20File%20Uploads%20and%20Chunking.md)

How large files (like 500GB videos) are uploaded using chunked/multipart uploads. Chunk size limits for different cloud services (S3, GCS, Azure), resumable uploads, and memory-efficient strategies.

### 14. [HTTP Request Data Types](./14.%20HTTP%20Request%20Data%20Types.md)

Complete guide to how different data types (text, files, JSON, etc.) are encoded and transmitted in HTTP requests. React Hook Form examples, Content-Type headers, and how backends parse different formats.

### 15. [Browser Rendering Pipeline](./15.%20Browser%20Rendering%20Pipeline.md)

Understanding how browsers transform HTML, CSS, and JavaScript into pixels on your screen. The Critical Rendering Path: HTML → DOM → CSSOM → Render Tree → Layout → Paint → Composite.

### 16. [Browser Caching Mechanisms](./16.%20Browser%20Caching%20Mechanisms.md)

How browsers cache resources to improve performance. HTTP cache headers (Cache-Control, ETag), cache validation, cache strategies, and Service Worker caching for offline functionality.

### 17. [Browser Layout and Rendering](./17.%20Browser%20Layout%20and%20Rendering.md)

Understanding reflow, repaint, and composite - how browsers update the page efficiently. What triggers each stage, how to minimize expensive operations, and optimization techniques.

### 18. [Browser Storage Mechanisms](./18.%20Browser%20Storage%20Mechanisms.md)

How browsers store data internally: localStorage, sessionStorage, cookies, and IndexedDB. Storage locations, quotas, eviction policies, and security isolation.

### 19. [Base64URL vs Blob URL](./19.%20Base64URL%20vs%20Blob%20URL.md)

Understanding the difference between Base64URL encoding and Blob URLs - encoding format vs browser API, use cases, and when to use each.

---

## Overview

This section covers everything about how browsers work internally - from networking and resource loading to rendering and caching. Each topic is broken down into dedicated files for easy reference and learning.

**Start here:** [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md) for the foundational concepts, then explore specific topics as needed.
