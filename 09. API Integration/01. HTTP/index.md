# HTTP

Understanding HTTP protocol for API integration - methods, status codes, headers, and best practices.

---

## Overview

HTTP (Hypertext Transfer Protocol) is the foundation of web APIs. Understanding HTTP is essential for building and consuming REST APIs, handling errors, and implementing authentication.

---

## Topics

### 1. [HTTP Protocol Basics](./01.%20HTTP%20Protocol%20Basics.md)

What is HTTP, HTTP vs HTTPS, HTTP versions (HTTP/1.1, HTTP/2, HTTP/3), and how HTTP works.

### 2. [HTTP Methods](./02.%20HTTP%20Methods.md)

GET, POST, PUT, PATCH, DELETE - when to use each method, idempotency, safety, and RESTful conventions.

### 3. [HTTP Status Codes](./03.%20HTTP%20Status%20Codes.md)

Understanding status codes: 2xx (success), 3xx (redirect), 4xx (client error), 5xx (server error). How to handle each.

### 4. [HTTP Headers](./04.%20HTTP%20Headers.md)

Common request and response headers, custom headers, CORS headers, and authentication headers.

### 5. [HTTP Request Response Structure](./05.%20HTTP%20Request%20Response%20Structure.md)

HTTP request structure (method, URL, headers, body) and response structure (status, headers, body).

### 6. [REST API Principles](./06.%20REST%20API%20Principles.md)

RESTful design principles, resource naming, HTTP methods for CRUD, and REST best practices.

### 7. [Error Handling](./07.%20Error%20Handling.md)

How to handle HTTP errors, error response formats, retry strategies, and status code handling.

### 8. [Authentication](./08.%20Authentication.md)

HTTP authentication methods: Basic Auth, Bearer Token, API Keys, and OAuth 2.0 concepts.

### 9. [CORS and Cross-Origin Requests](./09.%20CORS%20and%20Cross-Origin%20Requests.md)

Understanding CORS - simple vs preflight requests, CORS headers, common CORS errors, and solutions. Critical for frontend developers.

### 10. [Response Handling](./10.%20Response%20Handling.md)

How to handle different response types: JSON, text, blob, arrayBuffer. Response parsing methods and when to use each.

### 11. [Request Cancellation and Timeouts](./11.%20Request%20Cancellation%20and%20Timeouts.md)

How to cancel HTTP requests using AbortController, implement timeouts, and clean up requests on component unmount.

### 12. [File Uploads and Downloads](./12.%20File%20Uploads%20and%20Downloads.md)

File uploads with FormData, progress tracking, file downloads with blob URLs, and file validation. Essential for file handling.

### 13. [HTTP Clients](./13.%20HTTP%20Clients.md)

HTTP client libraries: fetch (built-in), axios, react-query, SWR. When to use each and their features.

---

## Quick Reference

### HTTP Methods

| Method     | Use For         | Idempotent | Safe   |
| ---------- | --------------- | ---------- | ------ |
| **GET**    | Retrieve data   | ✅ Yes     | ✅ Yes |
| **POST**   | Create resource | ❌ No      | ❌ No  |
| **PUT**    | Update/replace  | ✅ Yes     | ❌ No  |
| **PATCH**  | Partial update  | ❌ No      | ❌ No  |
| **DELETE** | Delete resource | ✅ Yes     | ❌ No  |

### Common Status Codes

| Code    | Meaning               | Use Case                           |
| ------- | --------------------- | ---------------------------------- |
| **200** | OK                    | Successful GET, PUT, PATCH         |
| **201** | Created               | Successful POST (resource created) |
| **204** | No Content            | Successful DELETE                  |
| **400** | Bad Request           | Invalid request data               |
| **401** | Unauthorized          | Missing/invalid authentication     |
| **403** | Forbidden             | Authenticated but not authorized   |
| **404** | Not Found             | Resource doesn't exist             |
| **422** | Unprocessable Entity  | Validation errors                  |
| **500** | Internal Server Error | Server error                       |

---

## Related Topics

- [Browser Request Lifecycle](../../19.%20Browser%20Internals/1.%20Browser%20Request%20Lifecycle.md) - How browsers handle HTTP requests
- [POST Request Content Types](../../19.%20Browser%20Internals/5.%20POST%20Request%20Content%20Types.md) - Content-Type headers
- [HTTP Request Data Types](../../19.%20Browser%20Internals/14.%20HTTP%20Request%20Data%20Types.md) - How data is encoded in HTTP
- [Basic File Uploads](../../19.%20Browser%20Internals/3.%20Basic%20File%20Uploads.md) - File input basics
- [Blob URLs and Memory Management](../../19.%20Browser%20Internals/12.%20Blob%20URLs%20and%20Memory%20Management.md) - Blob handling
- [GraphQL](../2.%20GraphQL/index.md) - Alternative to REST APIs
- [Authentication & Authorization](../7.%20Authentication%20&%20Authorization/index.md) - Detailed auth guide

---

## Key Takeaways

1. **HTTP is stateless** - Each request is independent
2. **HTTP methods have meaning** - Use correct method for the operation
3. **Status codes communicate results** - Handle them appropriately
4. **Headers provide metadata** - Use them for auth, content type, caching
5. **REST uses HTTP properly** - Follow RESTful principles for clean APIs
6. **CORS is critical** - Understand cross-origin requests and preflight
7. **Handle responses correctly** - Use appropriate parsing method (json, text, blob)
8. **Cancel requests** - Use AbortController for cleanup and better UX
9. **File handling** - FormData for uploads, Blob URLs for downloads

---

## Coverage: 100% ✅

This HTTP documentation covers all essential concepts for frontend development:

✅ HTTP Protocol Basics  
✅ HTTP Methods (GET, POST, PUT, PATCH, DELETE)  
✅ HTTP Status Codes (all ranges)  
✅ HTTP Headers (request, response, CORS)  
✅ Request/Response Structure  
✅ REST API Principles  
✅ Error Handling (comprehensive)  
✅ Authentication (all methods)  
✅ HTTP Clients (fetch, axios, react-query, SWR)  
✅ CORS and Cross-Origin Requests  
✅ Response Handling (JSON, text, blob, arrayBuffer)  
✅ Request Cancellation and Timeouts  
✅ File Uploads and Downloads

**You're fully prepared for:**

- ✅ Frontend development interviews
- ✅ Day-to-day API integration work
- ✅ Handling all HTTP scenarios
- ✅ Error handling and edge cases
- ✅ File operations
- ✅ CORS troubleshooting
