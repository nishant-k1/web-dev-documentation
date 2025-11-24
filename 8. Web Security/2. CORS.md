# 🌐 CORS (Cross-Origin Resource Sharing) — Web Developer Guide

- CORS is a **browser security feature** that controls how web pages can request resources from **different origins** (domains).
- It exists to **enforce the Same-Origin Policy** and protect users.
- CORS is designed to protect users, not servers.
- CORS is enforced by the browser, not by the server.
- Its purpose is to prevent malicious websites from accessing sensitive data on behalf of the user without their knowledge.

---

## Without CORS

```html
<!-- evil.com -->
<script>
  fetch("https://bank.com/account-info", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then(console.log);
</script>
```

If the user is already logged in to bank.com, their cookies are sent automatically, and evil.com can steal your private data.

✅ CORS blocks this unless:

- The bank’s server explicitly allows evil.com with proper CORS headers
- The browser sees that and permits the response

## What CORS Does Not Do

- It does not protect the server from receiving cross-origin requests
- The request still hits the server
- It's the response that the browser blocks from being accessed

## 🔒 Same-Origin Policy Recap

The **Same-Origin Policy (SOP)** restricts JavaScript from making requests to a different origin than the one that served the web page.

- **Origin = Protocol + Domain + Port**
- Example:
  - Page: `https://frontend.com`
  - API: `https://api.frontend.com` ✅ same-origin (if port is same)
  - API: `http://api.frontend.com` ❌ different (protocol mismatch)
  - API: `https://otherdomain.com` ❌ different origin

---

## ✅ What is CORS?

> **CORS (Cross-Origin Resource Sharing)** is a protocol that allows servers to specify who can access their resources and how.

It's enforced by **browsers**, not servers.

---

## 🧪 Example Use Case

```js
fetch("https://api.otherdomain.com/data");
```

Unless the server at `api.otherdomain.com` sends the correct **CORS headers**, the browser **blocks the response**, even though the request went through.

---

## 📦 Key CORS Headers (Server-Side)

| Header                             | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| `Access-Control-Allow-Origin`      | Specifies allowed origin(s)                |
| `Access-Control-Allow-Methods`     | Allowed HTTP methods (`GET`, `POST`, etc.) |
| `Access-Control-Allow-Headers`     | Custom headers allowed in request          |
| `Access-Control-Allow-Credentials` | Whether to send cookies/auth headers       |
| `Access-Control-Expose-Headers`    | Headers exposed to client JS               |

---

## 🧬 Types of CORS Requests

### 1. **Simple Request**

- Must meet all:
  - Methods: `GET`, `POST`, `HEAD`
  - Content-Type: `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`
  - No custom headers

➡️ Sent **directly**, no pre-check.

---

### 2. **Preflight Request**

- Happens **automatically** before actual request if:
  - Method is not simple (e.g. `PUT`, `DELETE`)
  - Custom headers (e.g. `Authorization`)
  - `Content-Type` is not one of the simple types

➡️ Browser sends an `OPTIONS` request first.

```http
OPTIONS /api/data HTTP/1.1
Origin: https://frontend.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization
```

Server must respond with:

```http
Access-Control-Allow-Origin: https://frontend.com
Access-Control-Allow-Methods: PUT
Access-Control-Allow-Headers: Authorization
```

---

## ⚠️ Common Pitfalls

### ❌ "CORS error" = Browser blocked the response

- Server didn’t send the proper `Access-Control-Allow-*` headers

### ❌ Misunderstanding: CORS is a **client issue**

- ✅ It's a **server-side config** problem
- Frontend devs often need to coordinate with backend to fix it

### ❌ Credentials (cookies, auth headers) not working?

- You must enable:
  - `credentials: 'include'` in fetch
  - `Access-Control-Allow-Credentials: true` on the server
  - Set `Access-Control-Allow-Origin` to a **specific** domain (not `*`)

```js
fetch("https://api.com/data", {
  method: "GET",
  credentials: "include",
});
```

---

## 🛠️ Dev/Localhost Tip

- On localhost, CORS is often a headache.
- Use a **proxy** (`vite.config.js`, `webpack.config.js`) or a **CORS middleware** in dev server (e.g. in Express).

---

## 🔥 Interview Talking Points

> “CORS is a browser-enforced policy that allows secure cross-origin requests. The server must send specific headers like `Access-Control-Allow-Origin` to permit access.”

- “CORS errors happen **at the browser level**, and the fix must be made **at the server**.”
- “Preflight `OPTIONS` requests are triggered automatically when using non-simple HTTP methods or custom headers.”
- “For cookies/auth headers, use `credentials: 'include'` and `Access-Control-Allow-Credentials: true`.”

---

## ✅ Summary

| Concept               | Key Points                    |
| --------------------- | ----------------------------- |
| Same-Origin Policy    | Restricts cross-domain access |
| CORS                  | Controlled exception to SOP   |
| Simple vs Preflight   | Based on method + headers     |
| Server-side headers   | Required to enable CORS       |
| Credentials (cookies) | Special handling required     |
| Dev workaround        | Use proxy or CORS middleware  |

---

## 🧵 Summary (1-liner)

> "CORS is a browser mechanism that enforces secure cross-origin requests by requiring servers to explicitly allow access using response headers."
