# Environment Variables Syntax Guide

**IMPORTANT**: Correct usage of environment variables in your Orvion project

---

## ✅ Correct Usage

### Frontend (React + Vite)

**File**: `src/services/chatApi.js`

```javascript
// CORRECT: Use import.meta.env with VITE_ prefix
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// WRONG: Don't use process.env in frontend code
// const API_URL = process.env.VITE_API_URL; // ❌ Won't work!
```

**In .env.local:**
```env
VITE_API_URL=http://localhost:3001
```

**In Vercel Environment Variables:**
```
VITE_API_URL=https://api.your-domain.com
```

---

### Backend (Node.js + Express)

**File**: `server/index.js`, `server/services/chatService.js`, etc.

```javascript
// CORRECT: Use process.env (no VITE_ prefix)
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// WRONG: Don't use import.meta.env in backend
// const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY; // ❌ Won't work!
```

**In /server/.env:**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_API_KEY=your_google_api_key_here
```

**In Vercel Environment Variables:**
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
GOOGLE_API_KEY=your_google_api_key_here
```

---

## Key Differences

| Aspect | Frontend (Vite) | Backend (Node.js) |
|--------|-----------------|-------------------|
| **Access Method** | `import.meta.env.VITE_*` | `process.env.*` |
| **Prefix Required** | ✅ **MUST** use `VITE_` | ❌ **NO** `VITE_` prefix |
| **Example** | `VITE_API_URL` | `GOOGLE_API_KEY` |
| **Access Code** | `import.meta.env.VITE_API_URL` | `process.env.GOOGLE_API_KEY` |
| **Why Different?** | Vite strips & replaces at build time | Node.js reads from environment |

---

## Complete Variable Reference

### Frontend Variables (with VITE_ prefix)

```javascript
// .env.local or Vercel
VITE_API_URL=http://localhost:3001

// In code:
import.meta.env.VITE_API_URL
```

| Variable | Prefix | File | Access |
|----------|--------|------|--------|
| `VITE_API_URL` | ✅ Required | `.env.local` | `import.meta.env.VITE_API_URL` |

### Backend Variables (NO prefix)

```javascript
// .env or Vercel
GOOGLE_API_KEY=AIzaSy...
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development

// In code:
process.env.GOOGLE_API_KEY
process.env.FRONTEND_URL
process.env.PORT
process.env.NODE_ENV
```

| Variable | Prefix | File | Access |
|----------|--------|------|--------|
| `GOOGLE_API_KEY` | ❌ None | `.env` | `process.env.GOOGLE_API_KEY` |
| `FRONTEND_URL` | ❌ None | `.env` | `process.env.FRONTEND_URL` |
| `PORT` | ❌ None | `.env` | `process.env.PORT` |
| `NODE_ENV` | ❌ None | `.env` | `process.env.NODE_ENV` |

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Using process.env in Frontend

```javascript
// WRONG - Won't work in browser
const API_URL = process.env.VITE_API_URL;

// CORRECT
const API_URL = import.meta.env.VITE_API_URL;
```

**Why?** `process.env` doesn't exist in browser code. Vite replaces `import.meta.env.VITE_*` at build time.

---

### ❌ Mistake 2: Missing VITE_ prefix in Frontend

```javascript
// WRONG - Won't be exposed to browser
// .env has: API_URL=...
const API_URL = import.meta.env.API_URL; // undefined

// CORRECT - Use VITE_ prefix
// .env has: VITE_API_URL=...
const API_URL = import.meta.env.VITE_API_URL; // works
```

**Why?** Vite only exposes variables prefixed with `VITE_` for security.

---

### ❌ Mistake 3: Using VITE_ prefix in Backend

```javascript
// WRONG - Backend doesn't use VITE_
// .env has: VITE_GOOGLE_API_KEY=...
const key = process.env.VITE_GOOGLE_API_KEY; // ❌ Wrong

// CORRECT - Don't use VITE_ prefix for backend
// .env has: GOOGLE_API_KEY=...
const key = process.env.GOOGLE_API_KEY; // ✅ Correct
```

**Why?** `VITE_` prefix is a frontend-only convention. Backend reads environment directly.

---

### ❌ Mistake 4: Forgetting to Redeploy on Vercel

```
After adding/changing environment variables in Vercel:
1. ✅ Add/update variable
2. ✅ Click Save
3. ❌ MISTAKE: Assuming changes take effect immediately

MUST: Redeploy the project for changes to apply!
```

---

## Verification Checklist

### Frontend Verification

```bash
# Build and check for undefined
npm run build

# In browser DevTools console:
console.log(import.meta.env.VITE_API_URL)
# Should print: http://localhost:3001 (or your API URL)
# If undefined, variable name is wrong
```

### Backend Verification

```bash
# In server/.env, add test:
PORT=3001
GOOGLE_API_KEY=test_key_here

# In code:
console.log('API Key:', process.env.GOOGLE_API_KEY);
console.log('Port:', process.env.PORT);

# Run and check logs
npm run dev
# Should print: API Key: test_key_here
```

---

## .env File Format Reference

### Frontend: /root/.env.local

```env
# CORRECT: Must use VITE_ prefix to be accessible in browser
VITE_API_URL=http://localhost:3001

# WRONG: Without VITE_ prefix, won't be exposed to browser
# API_URL=http://localhost:3001
```

### Backend: /server/.env

```env
# CORRECT: No VITE_ prefix needed
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_API_KEY=your_key_here

# WRONG: Don't use VITE_ prefix in backend
# VITE_GOOGLE_API_KEY=your_key_here
```

---

## Vercel Environment Variables Setup

### For Frontend Project

1. Go to Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Add:
   ```
   Name:        VITE_API_URL
   Value:       https://api.your-domain.com
   Environments: All
   ```
4. **Important**: Click **Redeploy** after adding

### For Backend Project

1. Go to Vercel Dashboard
2. **Settings** → **Environment Variables**
3. Add:
   ```
   Name:        GOOGLE_API_KEY
   Value:       your_actual_key_here
   Environments: All
   ```
   ```
   Name:        FRONTEND_URL
   Value:       https://your-domain.com
   Environments: All
   ```
4. **Important**: Click **Redeploy** after adding

---

## Debugging Environment Variables

### If Frontend Can't Access Variable

```javascript
// Check if variable exists
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

// Common issues:
// 1. Variable missing VITE_ prefix in .env
// 2. Didn't run npm run build after adding variable
// 3. Used process.env instead of import.meta.env
```

**Fix:**
1. Verify `.env.local` has `VITE_API_URL=...`
2. Run `npm run build` again
3. Or: Run `npm run dev` for auto-reload

### If Backend Can't Access Variable

```javascript
// Check if variable exists
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY);

// Common issues:
// 1. Variable missing from .env file
// 2. Using wrong variable name (case-sensitive)
// 3. .env file not in correct directory (/server/.env)
```

**Fix:**
1. Verify `/server/.env` has `GOOGLE_API_KEY=...`
2. Restart server: `npm run dev`
3. Check that process.env is used (not import.meta.env)

### On Vercel Deployment

If variables work locally but not on Vercel:

1. **Critical**: Did you **Redeploy** after adding variables?
2. Check variable names match exactly (case-sensitive)
3. Verify correct environment selected (Production/Preview)
4. Check Vercel function logs for errors

**Fix:**
1. Go to Vercel Dashboard
2. **Deployments** tab
3. Find latest deployment
4. Click **...** → **Redeploy**
5. Wait 2-3 minutes for redeploy to complete

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ ENVIRONMENT VARIABLES CHEAT SHEET                       │
├─────────────────────────────────────────────────────────┤
│ FRONTEND (React + Vite)                                 │
│ • File: .env.local                                      │
│ • Access: import.meta.env.VITE_*                       │
│ • Prefix: MUST use VITE_                               │
│ • Example: VITE_API_URL=http://localhost:3001           │
│                                                         │
│ BACKEND (Node.js + Express)                            │
│ • File: /server/.env                                    │
│ • Access: process.env.*                                │
│ • Prefix: NO VITE_ needed                              │
│ • Example: GOOGLE_API_KEY=AIzaSy...                     │
│                                                         │
│ VERCEL DEPLOYMENT                                       │
│ • Setting: Environment Variables                        │
│ • Add variables for both frontend & backend            │
│ • MUST redeploy after adding variables!                │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

✅ **Frontend**: `import.meta.env.VITE_*` (must have `VITE_` prefix)  
✅ **Backend**: `process.env.*` (no `VITE_` prefix)  
✅ **Vercel**: Add both frontend and backend variables, then redeploy  
❌ **Don't**: Use `process.env` in frontend code  
❌ **Don't**: Use `VITE_` prefix for backend variables  

---

**Version**: 1.0  
**Last Updated**: May 2026
