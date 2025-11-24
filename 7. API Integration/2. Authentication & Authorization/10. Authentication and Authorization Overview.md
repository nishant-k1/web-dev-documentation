# Understanding Authentication, Authorization, JWT, Sessions, Protected Routes

_A detailed conversation with clarification, step-by-step explanations, and corrections._

---

## 🟦 Authentication vs Authorization

### **Authentication**

- Proves **who the user is**.
- Happens during login.
- Credentials → server → check in DB → if valid → user authenticated.

### **Authorization**

- Decides **what the user can do** after being authenticated.
- Uses roles, permissions, etc.
- Same token can allow access to some resources but block others → this is **authorization** behavior.

---

## 🟦 Why Do We Need Tokens After Login?

HTTP is a **stateless protocol**.

This means:

- Every request is independent.
- Server **does NOT remember** who logged in earlier.
- So even if you logged in at 9:00 AM, your 9:01 AM request is treated like a **new stranger** unless you send proof.

**Tokens (or cookies)** act as that proof.

---

## 🟦 JWT-Based Authentication (Stateless)

### **Workflow**

1. User logs in → sends credentials to server.
2. Server checks DB.
3. If valid → server creates a **JWT**.
4. Server does **NOT store** this JWT.
5. JWT contains:
   - **Header** → type + signing algorithm
   - **Payload** → user ID, role, expiry, etc.
   - **Signature** → created using server’s **secret key**
6. Client stores this JWT (localStorage / sessionStorage).
7. Every future request → client sends the JWT.
8. Server:
   - Uses the **secret key** to verify the signature.
   - If match → token is valid.
   - If not → reject / logout user.

### **Important Notes**

- Server only stores **one thing** → `SECRET_KEY`
- JWT is **self-contained** → all user info is inside the token.
- JWT is **stateless** → server stores _no session data_ for each user.

---

## 🟦 Session-Based (Cookie-Based) Authentication (Stateful)

### **Workflow**

1. User logs in.
2. Server checks DB.
3. Server creates a **session object** containing user data.
4. Server generates a **session ID**.
5. Server stores the session in memory/DB like:

   ```
   sessionStore = {
     "abc123": { userId: 42, role: "admin" }
   }
   ```

6. Server sends a **cookie containing only the session ID** to the browser.
7. On every future request, browser automatically sends the cookie.
8. Server looks up the ID in its session store.
9. If found → user authenticated.

### **Important Notes**

- Cookie contains only a **session ID**, not user data.
- Server stores **all session data**, making it **stateful**.
- If session is deleted on the server → user is logged out everywhere.

---

## 🟦 Comparison: JWT vs Sessions

| Feature                     | JWT (Stateless)                | Session/Cookie (Stateful)      |
| --------------------------- | ------------------------------ | ------------------------------ |
| Where is user state stored? | In the **token** (client-side) | On the **server**              |
| What does server store?     | 1 secret key                   | Session objects for every user |
| Token contains?             | User data (claims)             | Only session ID                |
| Verification method         | Check signature                | Match session ID               |
| Performance                 | Scales better                  | Harder with many users         |
| Security                    | Token can’t be changed         | Session hijacking possible     |

---

## 🟦 Protected Routes, Public Routes, Private Routes

These terms belong **mostly to the frontend**.

### 🔹 Public Routes

- No login needed.
- Example: `/login`, `/signup`, `/about`.

### 🔹 Private/Protected Routes

- Require user authentication.
- Example: `/dashboard`, `/settings`.

### How are they protected?

**Frontend**:

- React route guards check if a token/session exists.
- If not → redirect to login.

**Backend**:

- For protected API routes, server checks JWT or session:
  - Valid → return data
  - Invalid → return 401 Unauthorized

**Important:**  
Backend access control is the _real security_.  
Frontend route protection is just _UX_, not security.

---

## 🟦 Key Clarifications You Understood Correctly

### ✔ "JWT also authenticates on every request."

Correct — JWT is used for:

- Re-authentication
- Authorization

### ✔ "Authorization is like a layer on top of authentication."

Yes — first the server verifies token → **authentication**,  
then checks role/permissions → **authorization**.

### ✔ “If no JWT or sessions are implemented, user gets access to everything.”

Correct — the server becomes blind after login.

### ✔ “Secret key must be stored on server.”

Correct — usually in environment variables.

### ✔ “Cookie is just a session ID.”

Correct — simple string.

---

## 🟦 Final Understanding Summary

### **JWT**

- Server signs token using secret key.
- Client stores token.
- Server does NOT store token.
- Stateless.

### **Sessions**

- Server stores user session.
- Client stores only session ID in cookie.
- Server matches session ID.
- Stateful.

### **Protected Routes**

Frontend + backend checks to prevent unauthorized navigation.

---
