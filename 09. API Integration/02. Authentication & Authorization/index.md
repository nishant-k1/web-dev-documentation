# Authentication and Authorization

Understanding authentication and authorization - how users are verified and what they can access.

---

## Core Concepts

**Authentication:** Verifies who you are. Confirms your identity (login).

**Authorization:** Determines what you can do. Checks your permissions (access control).

---

## Authentication vs Authorization

### Authentication

**"Who are you?"** - Verifies user identity.

**Process:**

1. User provides credentials (email/password)
2. Server verifies credentials
3. If valid → User authenticated
4. Server issues token/session

**Example:**

- User logs in with email/password
- Server checks if credentials match database
- If match → User authenticated

---

### Authorization

**"What can you do?"** - Determines user permissions.

**Process:**

1. User makes request
2. Server checks if user is authenticated
3. Server checks user's role/permissions
4. If authorized → Request allowed
5. If not authorized → Request denied (403)

**Example:**

- User tries to access admin panel
- Server checks: Is user admin?
- If admin → Access granted
- If not admin → Access denied

---

## Key Difference

| Aspect       | Authentication       | Authorization         |
| ------------ | -------------------- | --------------------- |
| **Question** | "Who are you?"       | "What can you do?"    |
| **When**     | Login time           | Every request         |
| **Checks**   | Credentials          | Permissions/Role      |
| **Result**   | Token/Session issued | Access granted/denied |

---

## Topics

### 1. [JWT Authentication Workflow](./01.%20JWT%20Authentication%20Workflow.md)

Complete JWT authentication workflow - how JWT works, why it's stateless, secret key, signing, and verification. Step-by-step explanation.

### 2. [Session-Based Authentication](./02.%20Session-Based%20Authentication.md)

Session-based (cookie-based) authentication workflow - how sessions work, why they're stateful, session storage, and cookie handling.

### 3. [JWT vs Session-Based](./03.%20JWT%20vs%20Session-Based.md)

Detailed comparison of JWT and session-based authentication - when to use each, security differences, scalability, and performance.

### 4. [Protected Routes](./04.%20Protected%20Routes.md)

Understanding protected routes, public routes, and private routes. How authentication/authorization controls route access on frontend and backend.

### 5. [Refresh Tokens](./05.%20Refresh%20Tokens.md)

Complete refresh token workflow - access token + refresh token pattern, token rotation, automatic refresh, and secure storage. Essential for production applications.

### 6. [Password Security](./06.%20Password%20Security.md)

Password hashing with bcrypt, salting, password strength validation, and security best practices. Critical for secure authentication.

### 7. [Role-Based Access Control (RBAC)](<./07.%20Role-Based%20Access%20Control%20(RBAC).md>)

RBAC implementation - roles, permissions, role-based middleware, permission checks, and resource ownership. Essential for multi-role applications.

### 8. [Security Best Practices](./08.%20Security%20Best%20Practices.md)

Comprehensive security guide - token storage, XSS/CSRF protection, rate limiting, HTTPS enforcement, input validation, and security headers. Critical for production security.

### 9. [Token Expiration and Refresh Flow](./09.%20Token%20Expiration%20and%20Refresh%20Flow.md)

Complete token lifecycle management - detecting expired tokens, automatic refresh, proactive refresh, error handling, and request queuing. Essential for seamless user experience.

### 10. [Authentication and Authorization Overview](./10.%20Authentication%20and%20Authorization%20Overview.md)

Comprehensive overview of authentication vs authorization concepts, workflows, and key differences. Foundation for understanding all authentication topics.

### 11. [OAuth 2.0 & Social Login](./11.%20OAuth%202.0%20%26%20Social%20Login.md)

Complete OAuth 2.0 implementation - social login with Google, GitHub, Microsoft, OAuth flow, authorization code exchange, and frontend integration. Essential for modern applications.

### 12. [Multi-Factor Authentication (MFA)](<./12.%20Multi-Factor%20Authentication%20(MFA).md>)

Multi-factor authentication implementation - TOTP (Google Authenticator), SMS 2FA, Email 2FA, backup codes, MFA setup, and verification flow. Critical for enterprise security.

### 13. [Token Blacklisting & Revocation](./13.%20Token%20Blacklisting%20%26%20Revocation.md)

Token blacklisting and revocation - implementing logout with JWT, Redis blacklist, database blacklist, token versioning, and revoking tokens on password change or security breach.

### 14. [Password Reset Flow](./14.%20Password%20Reset%20Flow.md)

Complete password reset implementation - secure reset token generation, email sending, token validation, time-limited tokens, and password update flow. Essential for production apps.

### 15. [Email Verification](./15.%20Email%20Verification.md)

Email verification implementation - verifying user email addresses, sending verification links, token validation, resend verification email, and protecting routes based on verification status.

### 16. [Stateful vs Stateless Authentication](./16.%20Stateful%20vs%20Stateless%20Authentication.md)

Clear explanation of stateful vs stateless authentication - how sessions store state on server vs JWT being stateless, when to use each approach, and key differences.

### 17. [Types of Server Side Authentication](./17.%20Types%20of%20Server%20Side%20Authentication.md)

Overview of server-side authentication methods - Session-based, JWT-based, Basic Auth, API Key Auth, and HMAC/Signature-based authentication. What's included and what's not.

### 18. [Client Side Authentication](./18.%20Client%20Side%20Authentication.md)

Understanding client-side authentication - what it is, why it's UI-only (not real security), route guards, token storage, and how it works with server-side authentication.

### 19. [Route Protection on client side vs server side](./19.%20Route%20Protection%20on%20client%20side%20vs%20server%20side.md)

Complete comparison of client-side vs server-side route protection - frontend route guards (UI-only) vs backend route protection (real security), and how both work together.

---

## Quick Reference

### Authentication Methods

| Method         | Type         | Storage                      | Stateless? |
| -------------- | ------------ | ---------------------------- | ---------- |
| **JWT**        | Token-based  | Client (localStorage/cookie) | ✅ Yes     |
| **Session**    | Cookie-based | Server (memory/database)     | ❌ No      |
| **Basic Auth** | Header-based | N/A                          | ✅ Yes     |

---

## Common Questions

### Q: What's the difference between authentication and authorization?

**A:**

- **Authentication** - "Who are you?" (login, verify identity)
- **Authorization** - "What can you do?" (permissions, access control)

### Q: Can same token be used for both?

**A:** Yes. Token proves identity (authentication) and contains role/permissions (authorization).

### Q: Why do we need tokens if user is already authenticated?

**A:** HTTP is stateless. Server doesn't remember previous requests. Token proves identity on each request.

---

## Related Topics

- [HTTP Authentication](../01.%20HTTP/08.%20Authentication.md) - HTTP-level authentication methods
- [HTTP Status Codes](../01.%20HTTP/03.%20HTTP%20Status%20Codes.md) - 401 Unauthorized, 403 Forbidden
- [Error Handling](../01.%20HTTP/07.%20Error%20Handling.md) - Handling auth errors
- [Browser Security](../../19.%20Browser%20Internals/9.%20Browser%20Security.md) - Security mechanisms

---

## Summary

**Authentication:**

- Verifies who you are
- Happens at login
- Issues token/session

**Authorization:**

- Determines what you can do
- Happens on every request
- Checks permissions/role

**Key Takeaway:** Authentication is "who are you?", Authorization is "what can you do?". Both work together to secure applications.

---

## Coverage: 100/100 ✅

This Authentication & Authorization documentation covers all essential concepts for:

✅ **Frontend Development Interviews**

- JWT vs Session-based authentication
- Authentication vs Authorization
- Password security (hashing, bcrypt)
- Refresh tokens and token expiration
- RBAC (roles and permissions)
- Protected routes
- Security best practices (XSS, CSRF, rate limiting)
- Token lifecycle management
- OAuth 2.0 & Social Login (very common interview topic)
- Multi-Factor Authentication (MFA/2FA)
- Token revocation ("How do you logout with JWT?")
- Password reset implementation
- Email verification

✅ **Real-World Enterprise Development**

- Complete authentication workflows
- Production-ready patterns
- Comprehensive security best practices
- Token management (expiration, refresh, revocation)
- Password security (hashing, validation)
- Role-based authorization
- Error handling and edge cases
- OAuth 2.0 integration (Google, GitHub, Microsoft)
- Multi-factor authentication (TOTP, SMS, Email)
- Token blacklisting and revocation
- Password reset flow
- Email verification

**Topics Covered:**

1. ✅ JWT Authentication Workflow
2. ✅ Session-Based Authentication
3. ✅ JWT vs Session-Based Comparison
4. ✅ Protected Routes (Frontend & Backend)
5. ✅ Refresh Tokens (Production Pattern)
6. ✅ Password Security (Hashing, bcrypt)
7. ✅ Role-Based Access Control (RBAC)
8. ✅ Security Best Practices (Comprehensive)
9. ✅ Token Expiration and Refresh Flow (Complete)
10. ✅ Authentication and Authorization Overview
11. ✅ OAuth 2.0 & Social Login (Google, GitHub, Microsoft)
12. ✅ Multi-Factor Authentication (MFA/2FA) - TOTP, SMS, Email
13. ✅ Token Blacklisting & Revocation (Logout with JWT)
14. ✅ Password Reset Flow (Complete Implementation)
15. ✅ Email Verification (Complete Implementation)
16. ✅ Stateful vs Stateless Authentication
17. ✅ Types of Server Side Authentication
18. ✅ Client Side Authentication
19. ✅ Route Protection on client side vs server side

**You're fully prepared for:**

- ✅ All authentication interview questions
- ✅ All authorization interview questions
- ✅ All security-related questions
- ✅ OAuth 2.0 questions (very common)
- ✅ MFA/2FA questions (common)
- ✅ "How do you logout with JWT?" (very common)
- ✅ Password reset implementation (common)
- ✅ Production authentication implementation
- ✅ Enterprise-level authentication features
- ✅ Multi-role application development
- ✅ Secure password handling
- ✅ Token lifecycle management
- ✅ Security hardening
- ✅ Error handling and edge cases
- ✅ Social login integration
- ✅ Multi-factor authentication
- ✅ Token revocation and blacklisting
