# ✔ Server-Side Authentication — What’s Included & What’s Not

A clear separation of **pure server-side authentication methods** vs **authentication protocols/standards**.

---

# 🟦 Group 1 — Pure Server-Side Authentication Methods

These are built **directly in your backend** (Node/Express, Django, Go, Java, etc.).  
The server itself performs the login logic.

## **1. Session-Based Authentication (Cookie-Based)**

- Server creates and stores a session.
- Client stores a session ID inside a cookie.
- Server matches session ID on each request.
- **Stateful authentication**.

## **2. JWT-Based Authentication**

- Server signs a JWT using a secret key.
- Client stores the JWT and sends it on each request.
- Server verifies token using the secret key.
- **Stateless authentication**.

## **3. Basic Authentication**

- Browser sends username + password with each request.
- Server checks credentials every time.
- Not secure for real apps without HTTPS.

## **4. API Key Authentication**

- Client includes a static API key in requests.
- Backend verifies the API key.
- Common for machine-to-machine communication.

## **5. HMAC / Signature-Based Authentication**

- Client signs each request using a shared secret.
- Server re-computes signature to verify authenticity.
- Used in high-security APIs (banking, AWS S3).

### ✔ These 5 are the **popular custom server-side authentication types**.

---

# 🟥 Group 2 — NOT Server-Side Authentication

These are **protocols or identity systems**, not backend-auth logic you write manually.

## ❌ **6. OAuth 2.0**

Delegated authorization (Login with Google, Facebook, GitHub).  
Not a server-side auth system.

## ❌ **7. OpenID Connect (OIDC)**

Identity layer on top of OAuth 2.0.  
Used for user identity, not backend-session management.

## ❌ **8. SAML**

Enterprise SSO (Single Sign-On) protocol.  
Not implemented as backend auth logic.

## ❌ **9. LDAP**

Corporate directory service (Active Directory).  
Used for authentication in intranets, not web apps.

## ❌ **10. MFA (Multi-Factor Authentication)**

Not a standalone auth type — it’s an **extra layer** added on top of existing login methods.

---

# 🟩 FINAL CLARIFICATION

### ✔ **Popular pure backend/server-side authentication methods:**

1. Session-Based Authentication
2. JWT-Based Authentication
3. Basic Auth
4. API Key Auth
5. HMAC / Signature-Based Auth

### ✔ These are the ones backend developers actually implement themselves.

### ✔ The _most commonly used_ in modern apps:

- **Sessions (stateful)**
- **JWT (stateless)**

Everything else is a protocol, identity system, or security add-on — not a server-side auth method.

---
