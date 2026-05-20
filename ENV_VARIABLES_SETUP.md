# Environment Variables Setup Guide

Complete reference for all environment variables needed for Vercel deployment.

---

## Frontend Variables (React + Vite)

### Development (.env.local in root)

```env
VITE_API_URL=http://localhost:3001
```

### Production (Vercel Environment Variables)

```env
VITE_API_URL=https://your-backend.vercel.app
# Or after connecting custom domain:
VITE_API_URL=https://api.your-domain.com
```

**Important**: 
- Frontend variables **must** be prefixed with `VITE_`
- Access in code: `import.meta.env.VITE_API_URL`
- Plain `process.env` won't work in browser code

---

## Backend Variables (Node.js + Express)

### Development (.env file in /server)

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GOOGLE_API_KEY=your_google_api_key_here
LOG_LEVEL=debug
```

Access in code: `process.env.GOOGLE_API_KEY`

### Production (Vercel Environment Variables)

```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
# Or after custom domain:
FRONTEND_URL=https://your-domain.com
GOOGLE_API_KEY=your_google_api_key_here
LOG_LEVEL=info
```

**Important**: 
- Backend uses `process.env` (Node.js standard)
- Do NOT prefix backend variables with `VITE_`
- `VITE_` prefix is only for frontend variables

---

## How to Get API Keys

### Google Generative AI Key

1. Visit: https://aistudio.google.com/apikey
2. Click **Create API key in new project**
3. Google will create the key automatically
4. Copy the key (looks like: `AIzaSyD...xxxxx`)
5. Keep it secret - add to `.gitignore`
6. Add to Vercel as environment variable

**Security**: 
- Never commit API keys to Git
- Use `.gitignore` to prevent commits
- Use Vercel's environment variables for production
- Rotate keys periodically if compromised

---

## Adding Variables to Vercel

### Via Vercel Dashboard

1. Go to your project in Vercel
2. Click **Settings**
3. Go to **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Name**: `GOOGLE_API_KEY`
   - **Value**: Your actual key
   - **Environments**: Select all (Production, Preview, Development)
6. Click **Add**
7. **Important**: Redeploy your project for changes to take effect

### Redeploy After Adding Variables

1. Go to **Deployments** tab
2. Find latest deployment
3. Click the three dots **...**
4. Select **Redeploy**
5. Wait for redeployment to complete

---

## Environment Variable by Environment

### Development

```
Where: Local machine (.env file)
Backend: http://localhost:3001
Frontend: http://localhost:5173
```

### Preview (Vercel)

```
Where: Vercel preview deployments
Backend: https://your-backend-preview.vercel.app
Frontend: https://your-project-preview.vercel.app
Used for: Pull request previews
```

### Production (Vercel)

```
Where: Vercel production deployments
Backend: https://your-backend.vercel.app
Frontend: https://your-project.vercel.app
Used for: Main deployments
```

### Production with Custom Domain

```
Where: Vercel with Hostinger domain
Backend: https://api.your-domain.com
Frontend: https://your-domain.com
Used for: After domain is verified and connected
```

---

## Environment Variable Validation

### Frontend (.env.local in root)

- [ ] `VITE_API_URL` variable set (with VITE_ prefix)
- [ ] Accessed via `import.meta.env.VITE_API_URL` in code
- [ ] Points to correct backend URL
- [ ] Not committed to Git (in .gitignore)

### Backend (.env in /server)

- [ ] `GOOGLE_API_KEY` is valid
- [ ] `FRONTEND_URL` is correct (no VITE_ prefix)
- [ ] Accessed via `process.env.GOOGLE_API_KEY` in code
- [ ] `PORT` and `NODE_ENV` set correctly
- [ ] Not committed to Git (in .gitignore)

### Vercel Environment Variables

- [ ] Both frontend and backend have their vars set
- [ ] Variables match production URLs
- [ ] All required variables present
- [ ] Project redeployed after adding variables

---

## Troubleshooting Variables

### Issue: "API key is invalid"

**Solution:**
1. Verify key is correctly copied (no spaces)
2. Generate new key from https://aistudio.google.com/apikey
3. Update Vercel environment variable
4. Redeploy

### Issue: "Cannot find module or use API"

**Solution:**
1. Check frontend has `VITE_API_URL` variable
2. Check backend has `GOOGLE_API_KEY` variable
3. Verify variables in Vercel (Settings → Environment Variables)
4. Redeploy both frontend and backend
5. Wait 1-2 minutes for cold start

### Issue: CORS errors on production

**Solution:**
1. Verify `FRONTEND_URL` in backend matches frontend domain
2. Add domain to CORS allowed origins in backend code:
   ```javascript
   const allowedOrigins = [
     process.env.FRONTEND_URL,
     'https://your-domain.com',
     'https://www.your-domain.com',
   ];
   ```
3. Redeploy backend

### Issue: Variables work locally but not on Vercel

**Solution:**
1. **Critical**: Did you redeploy after adding variables?
2. Check variable names exactly match code (case-sensitive)
3. Verify environment selection (Production vs Preview)
4. Check logs in Vercel dashboard
5. Try manual redeploy from Deployments tab

---

## Security Best Practices

### ✅ DO:
- [ ] Store API keys in environment variables only
- [ ] Use `.gitignore` to prevent `.env` files from Git
- [ ] Rotate keys if compromised
- [ ] Use different keys for dev/prod if possible
- [ ] Review Vercel environment variables regularly
- [ ] Redeploy when updating critical variables

### ❌ DON'T:
- [ ] Commit `.env` files to Git
- [ ] Expose API keys in frontend code
- [ ] Share keys in chat, email, or public
- [ ] Use same key across multiple environments
- [ ] Log sensitive data
- [ ] Store hardcoded secrets

---

## .gitignore Setup

Add to your `.gitignore`:

```
# Environment files
.env
.env.local
.env.*.local
.env.production.local
.env.development.local

# Dependencies
node_modules/

# Build outputs
dist/
build/

# Logs
*.log
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
```

---

## Vercel Environment Variables UI Reference

```
📦 Project: YOUR-PROJECT
⚙️ Settings → Environment Variables

Format:
┌─────────────────────┬──────────────────┬────────────────────┐
│ Name                │ Value            │ Environments       │
├─────────────────────┼──────────────────┼────────────────────┤
│ VITE_API_URL        │ https://api...   │ ✓ Production       │
│                     │                  │ ✓ Preview          │
│                     │                  │ ✓ Development      │
├─────────────────────┼──────────────────┼────────────────────┤
│ GOOGLE_API_KEY      │ AIzaSy...        │ ✓ Production       │
│                     │                  │ ✓ Preview          │
│                     │                  │ ✓ Development      │
└─────────────────────┴──────────────────┴────────────────────┘
```

---

## Quick Variable Reference

| Variable | Location | Access Method | Purpose |
|----------|----------|---|----------|
| `VITE_API_URL` | Frontend `.env.local` | `import.meta.env.VITE_API_URL` | Tells frontend where backend is |
| `GOOGLE_API_KEY` | Backend `.env` & Vercel | `process.env.GOOGLE_API_KEY` | Authenticates with Google AI |
| `FRONTEND_URL` | Backend `.env` & Vercel | `process.env.FRONTEND_URL` | CORS whitelist - allows frontend to access backend |
| `PORT` | Backend `.env` | `process.env.PORT` | Server listening port |
| `NODE_ENV` | Backend `.env` & Vercel | `process.env.NODE_ENV` | Environment mode (development/production) |

---

**Last Updated**: May 2026
