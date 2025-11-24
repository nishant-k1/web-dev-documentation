# 🛡️ Web Security (Interview Perspective for Frontend Developers)

## - Web Platform (Security layer) not strictly part of Web APIs

Web security is all about protecting applications, user data, and communication from malicious activity. Frontend engineers are expected to understand **browser security models**, **common attacks**, and **defensive strategies**.

---

## ✅ 1. Same-Origin Policy (SOP)

- **Definition:** A browser security feature that restricts how scripts from one origin can interact with resources from another.
- **Origin:** Protocol + Domain + Port
- **Example:** JS from `https://example.com` **cannot** access `https://api.other.com/data`

---

## ✅ 2. CORS (Cross-Origin Resource Sharing)

- **Purpose:** Allows controlled access to resources across origins.
- **Enabled by the server** using headers like:
  ```http
  Access-Control-Allow-Origin: https://example.com
  Access-Control-Allow-Methods: GET, POST
  ```
- **Preflight request:** `OPTIONS` method sent before the actual request for methods like `PUT`, `DELETE`.

---

## ✅ 3. XSS (Cross-Site Scripting)

- **Attack:** Inject malicious JS into web pages viewed by others.
- **Types:**
  - Stored XSS: saved on the server
  - Reflected XSS: via URL or input
  - DOM-based XSS: directly in JS code
- **Prevention:**
  - Escape HTML entities
  - Sanitize inputs (`DOMPurify`, etc.)
  - Use frameworks that auto-escape (e.g. React)

---

## ✅ 4. CSRF (Cross-Site Request Forgery)

- **Attack:** Forces authenticated users to perform unwanted actions (e.g., transfer funds).
- **Works by abusing cookies that are automatically sent**
- **Prevention:**
  - CSRF tokens
  - `SameSite` cookie attribute (`Lax`, `Strict`, `None`)
  - Avoid state-changing actions via GET

---

## ✅ 5. Content Security Policy (CSP)

- **Header-based security feature**
- Prevents XSS by controlling which scripts/styles can run

```http
Content-Security-Policy: script-src 'self' https://trusted.com
```

---

## ✅ 6. Secure Cookies

| Attribute       | Purpose                        |
| --------------- | ------------------------------ |
| `HttpOnly`      | JS can’t access it             |
| `Secure`        | Only sent over HTTPS           |
| `SameSite`      | Prevents CSRF (`Lax`/`Strict`) |
| `Domain`/`Path` | Scope of cookie                |

---

## ✅ 7. HTTPS & SSL/TLS

- **Always prefer HTTPS** over HTTP
- Prevents **MITM** (Man-In-The-Middle) attacks
- TLS encrypts data in transit

---

## ✅ 8. JWT Security (if using authentication)

- Don't store JWT in `localStorage` (XSS-prone)
- Prefer `HttpOnly` cookies
- Short expiration + refresh tokens
- Sign with strong secret/key

---

## ✅ 9. Clickjacking Protection

- Prevent UI from being embedded in iframes
- Use:
  ```http
  X-Frame-Options: DENY
  ```

---

## ✅ 10. Headers for Security

| Header                      | Purpose                           |
| --------------------------- | --------------------------------- |
| `Strict-Transport-Security` | Forces HTTPS                      |
| `X-Content-Type-Options`    | Prevent MIME-sniffing             |
| `X-Frame-Options`           | Prevent clickjacking              |
| `X-XSS-Protection` (legacy) | Blocks reflective XSS             |
| `Referrer-Policy`           | Controls `Referer` header sharing |

---

## ✅ 11. Dependency Vulnerabilities

- Scan with tools: `npm audit`, Snyk, `yarn audit`
- Keep 3rd-party packages updated

---

## 🔥 Bonus: Real Interview Questions

1. What is the Same-Origin Policy? How does CORS relate to it?
2. How do you prevent XSS in your app?
3. What is CSRF, and how do you protect against it?
4. What's the difference between `HttpOnly` and `Secure` cookies?
5. How do you secure JWT tokens in a React frontend?
6. Why is storing tokens in `localStorage` dangerous?

---

## 🧵 Summary (1-liner)

> "Web security in frontend means understanding the browser's defense mechanisms (like SOP, CORS), protecting against XSS/CSRF, using HTTPS, secure cookies, and configuring proper headers to harden your app against attacks."
