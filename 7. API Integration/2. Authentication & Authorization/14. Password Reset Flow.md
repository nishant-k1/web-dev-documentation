# Password Reset Flow

Understanding password reset implementation - secure reset token generation, email sending, token validation, and complete password reset workflow.

---

## Core Concept

**Password Reset** allows users to reset their password when forgotten, using a secure, time-limited reset token sent via email.

**Key Requirements:**
- ✅ Secure token generation
- ✅ Time-limited tokens (15-60 minutes)
- ✅ Single-use tokens
- ✅ Email delivery
- ✅ Token validation
- ✅ Secure password update

---

## Complete Password Reset Flow

### Flow Diagram

```
1. User clicks "Forgot Password"
   ↓
2. User enters email address
   ↓
3. Backend generates reset token
   ↓
4. Backend stores token (hashed) with expiration
   ↓
5. Backend sends email with reset link
   ↓
6. User clicks link in email
   ↓
7. Frontend shows reset password form
   ↓
8. User enters new password
   ↓
9. Frontend sends token + new password to backend
   ↓
10. Backend validates token
   ↓
11. Backend updates password
   ↓
12. Backend invalidates token
   ↓
13. User can login with new password
```

---

## Step-by-Step Implementation

### Step 1: Request Password Reset

**Frontend:**

```javascript
function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Password reset link sent to your email');
    } else {
      setMessage(data.error || 'Failed to send reset link');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

**Backend:**

```javascript
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Find user
  const user = await User.findOne({ email });
  
  // Always return success (don't reveal if email exists)
  // This prevents email enumeration attacks
  if (!user) {
    return res.json({
      message: 'If email exists, reset link has been sent',
    });
  }

  // Generate secure random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expiration (1 hour)
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  // Store hashed token in database
  await User.findByIdAndUpdate(user.id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: resetTokenExpires,
  });

  // Create reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user.id}`;

  // Send email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });

    res.json({
      message: 'If email exists, reset link has been sent',
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});
```

---

### Step 2: Validate Reset Token

**Backend - Token Validation:**

```javascript
app.get('/api/verify-reset-token', async (req, res) => {
  const { token, userId } = req.query;

  if (!token || !userId) {
    return res.status(400).json({ error: 'Token and user ID required' });
  }

  // Hash provided token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user with matching token
  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() }, // Not expired
  });

  if (!user) {
    return res.status(400).json({
      valid: false,
      error: 'Invalid or expired reset token',
    });
  }

  res.json({ valid: true });
});
```

---

### Step 3: Reset Password Form

**Frontend:**

```javascript
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validToken, setValidToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  useEffect(() => {
    // Verify token on mount
    if (token && userId) {
      fetch(`/api/verify-reset-token?token=${token}&userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setValidToken(data.valid);
          setLoading(false);
        })
        .catch(() => {
          setValidToken(false);
          setLoading(false);
        });
    } else {
      setValidToken(false);
      setLoading(false);
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        userId,
        newPassword: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Password reset successful. Please login.');
      navigate('/login');
    } else {
      alert(data.error || 'Password reset failed');
    }
  };

  if (loading) {
    return <div>Verifying reset token...</div>;
  }

  if (!validToken) {
    return (
      <div>
        <h2>Invalid or Expired Reset Link</h2>
        <p>The password reset link is invalid or has expired.</p>
        <a href="/forgot-password">Request a new reset link</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={8}
      />
      <button type="submit">Reset Password</button>
    </form>
  );
}
```

---

### Step 4: Reset Password Endpoint

**Backend:**

```javascript
app.post('/api/reset-password', async (req, res) => {
  const { token, userId, newPassword } = req.body;

  // Validate input
  if (!token || !userId || !newPassword) {
    return res.status(400).json({ error: 'All fields required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password too short' });
  }

  // Hash provided token
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({
      error: 'Invalid or expired reset token',
    });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password and clear reset token
  await User.findByIdAndUpdate(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
    tokenVersion: user.tokenVersion + 1, // Revoke all existing tokens
  });

  res.json({ message: 'Password reset successful' });
});
```

---

## Security Best Practices

### 1. Generate Secure Random Tokens

```javascript
// ✅ Good - Cryptographically secure random
const resetToken = crypto.randomBytes(32).toString('hex');

// ❌ Bad - Predictable
const resetToken = Math.random().toString(36);
```

---

### 2. Hash Tokens Before Storing

```javascript
// ✅ Good - Hash token before storing
const hashedToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex');

await User.findByIdAndUpdate(user.id, {
  resetPasswordToken: hashedToken,
});
```

---

### 3. Set Short Expiration Times

```javascript
// ✅ Good - 1 hour expiration
const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

// ❌ Bad - 24 hours (too long)
const resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
```

---

### 4. Make Tokens Single-Use

```javascript
// ✅ Good - Clear token after use
await User.findByIdAndUpdate(user.id, {
  password: hashedPassword,
  resetPasswordToken: null, // Clear token
  resetPasswordExpires: null,
});
```

---

### 5. Don't Reveal Email Existence

```javascript
// ✅ Good - Always return success
if (!user) {
  return res.json({
    message: 'If email exists, reset link has been sent',
  });
}

// ❌ Bad - Reveals if email exists
if (!user) {
  return res.status(404).json({ error: 'Email not found' });
}
```

---

### 6. Rate Limit Reset Requests

```javascript
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per window
  message: 'Too many reset requests, please try again later',
});

app.post('/api/forgot-password', resetLimiter, async (req, res) => {
  // Reset logic
});
```

---

### 7. Include User ID in Reset Link

```javascript
// ✅ Good - Include user ID for faster lookup
const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&id=${user.id}`;

// ⚠️ Less secure - Token only (requires searching all users)
const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
```

---

### 8. Validate Password Strength

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

if (!validatePassword(newPassword)) {
  return res.status(400).json({
    error: 'Password does not meet requirements',
  });
}
```

---

## Complete Example

### Database Schema

```javascript
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  tokenVersion: { type: Number, default: 0 },
});
```

---

### Full Backend Implementation

```javascript
const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: 'Too many reset requests',
});

// Request reset
app.post('/api/forgot-password', resetLimiter, async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  
  // Don't reveal if email exists
  if (!user) {
    return res.json({
      message: 'If email exists, reset link has been sent',
    });
  }

  // Generate token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

  await User.findByIdAndUpdate(user.id, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: resetTokenExpires,
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&id=${user.id}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset',
    html: `
      <h2>Password Reset</h2>
      <p>Click <a href="${resetUrl}">here</a> to reset your password.</p>
      <p>Link expires in 1 hour.</p>
    `,
  });

  res.json({ message: 'If email exists, reset link has been sent' });
});

// Reset password
app.post('/api/reset-password', async (req, res) => {
  const { token, userId, newPassword } = req.body;

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'Password too short' });
  }

  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user.id, {
    password: hashedPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
    tokenVersion: user.tokenVersion + 1,
  });

  res.json({ message: 'Password reset successful' });
});
```

---

## Common Questions

### Q: How long should reset tokens be valid?

**A:** 15-60 minutes. Balance between security (shorter) and usability (longer).

### Q: Should I hash reset tokens?

**A:** Yes. Hash tokens before storing in database. Compare hashed values.

### Q: What if user requests multiple resets?

**A:** Invalidate previous tokens when generating new one. Only latest token works.

### Q: Should I revoke all tokens on password reset?

**A:** Yes. Increment token version or blacklist all tokens to force re-login.

### Q: How do I prevent email enumeration?

**A:** Always return same success message, regardless of whether email exists.

---

## Related Topics

- [Password Security](./6.%20Password%20Security.md) - Password hashing
- [Token Blacklisting & Revocation](./13.%20Token%20Blacklisting%20%26%20Revocation.md) - Revoke tokens on reset
- [Email Verification](./15.%20Email%20Verification.md) - Similar token flow

---

## Summary

**Password Reset Flow:**
1. User requests reset → Enter email
2. Backend generates secure token
3. Backend stores hashed token with expiration
4. Backend sends email with reset link
5. User clicks link → Frontend shows reset form
6. User enters new password
7. Backend validates token
8. Backend updates password
9. Backend clears token
10. Backend revokes all existing tokens

**Security Best Practices:**
- ✅ Generate cryptographically secure random tokens
- ✅ Hash tokens before storing
- ✅ Set short expiration (15-60 minutes)
- ✅ Make tokens single-use
- ✅ Don't reveal email existence
- ✅ Rate limit reset requests
- ✅ Validate password strength
- ✅ Revoke all tokens on password change

**Key Takeaway:** Password reset requires secure token generation, time-limited tokens, email delivery, and token validation. Always hash tokens, set short expiration, and revoke all existing tokens after password reset.

