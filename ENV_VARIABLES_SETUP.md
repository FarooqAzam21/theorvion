# Environment Variables Setup Guide

Complete reference for all environment variables needed for Vercel deployment.

---

## Frontend Variables

### Development (.env.local)

```env
# Local development - backend runs on localhost
VITE_API_URL=http://localhost:3001
```

### Production (Vercel Environment Variables)

```env
# Production - backend on Vercel
VITE_API_URL=https://your-backend.vercel.app

# Or after connecting custom domain
VITE_API_URL=https://api.your-domain.com
```

**Note**: Frontend variables must be prefixed with `VITE_` to be accessible in browser

---

## Backend Variables

### Development (.env file in /server)

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend Configuration
FRONTEND_URL=http://localhost:5173

# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# Optional: Logging
LOG_LEVEL=debug
```

### Production (Vercel Environment Variables)

```env
# Server Configuration
PORT=3001
NODE_ENV=production

# Frontend Configuration (update after domain is live)
FRONTEND_URL=https://your-project.vercel.app
# Or after custom domain:
FRONTEND_URL=https://your-domain.com

# Google Generative AI
GOOGLE_API_KEY=your_google_api_key_here

# Optional
LOG_LEVEL=info
```

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

- [ ] `VITE_API_URL` points to backend
- [ ] Starts with `VITE_` prefix
- [ ] Not committed to Git

### Backend (.env in /server)

- [ ] `GOOGLE_API_KEY` is valid
- [ ] `FRONTEND_URL` is correct
- [ ] `PORT` matches backend configuration
- [ ] `NODE_ENV=production` for production
- [ ] Not committed to Git

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

| Variable | Location | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_API_URL` | Frontend .env.local | Tells frontend where backend is | `http://localhost:3001` |
| `GOOGLE_API_KEY` | Backend .env & Vercel | Authenticates with Google AI | `AIzaSy...` |
| `FRONTEND_URL` | Backend .env & Vercel | Allows frontend to access backend via CORS | `http://localhost:5173` |
| `PORT` | Backend .env | Server listening port | `3001` |
| `NODE_ENV` | Backend .env & Vercel | Environment mode | `development` or `production` |

---

**Last Updated**: May 2026
