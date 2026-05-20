# Complete Vercel Deployment Guide for Orvion

This guide covers deploying both your React frontend and Node.js backend to Vercel, then connecting your Hostinger domain.

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Setting Up Vercel](#setting-up-vercel)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend Deployment](#backend-deployment)
5. [Environment Variables](#environment-variables)
6. [Connecting Hostinger Domain](#connecting-hostinger-domain)
7. [Testing & Troubleshooting](#testing--troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Vercel account (sign up at https://vercel.com)
- [ ] GitHub repository connected to Vercel
- [ ] All environment variables documented
- [ ] `.gitignore` configured (ignore `.env` files)
- [ ] Production build tested locally
- [ ] Hostinger account and domain purchased
- [ ] Node.js version specified (currently v18+)

---

## Setting Up Vercel

### Step 1: Create a Vercel Account

1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended for easier integration)
3. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Connect your GitHub repository containing the Orvion project
4. Click "Import"

---

## Frontend Deployment

### Configuration for React + Vite

Vercel automatically detects your Vite setup. No additional configuration needed, but you can create a `vercel.json` file in the root for custom build settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@VITE_API_URL"
  }
}
```

### Step 1: Configure Build & Output

In Vercel Dashboard:

1. Go to **Settings** → **Build & Development Settings**
2. **Framework**: Vite
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`
6. Click **Save**

### Step 2: Add Environment Variables for Frontend

In Vercel Dashboard → **Settings** → **Environment Variables**:

```
VITE_API_URL = https://api.your-domain.com
```

(You'll update this to your actual API URL after backend deployment)

### Step 3: Deploy Frontend

1. Click **Deploy**
2. Wait for deployment to complete
3. Your frontend will be available at `https://orvion.vercel.app` (or your custom domain)

---

## Backend Deployment

### Option 1: Deploy Backend on Vercel (Recommended for this setup)

Since you have an Express.js backend, you can deploy it as serverless functions on Vercel.

#### Step 1: Create `vercel.json` for Backend

Create `/vercel.json` in your project root:

```json
{
  "version": 2,
  "buildCommand": "cd server && npm install",
  "functions": {
    "server/index.js": {
      "runtime": "nodejs20.x",
      "memory": 1024,
      "maxDuration": 60
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    }
  ],
  "env": {
    "FRONTEND_URL": "@FRONTEND_URL",
    "GOOGLE_API_KEY": "@GOOGLE_API_KEY",
    "NODE_ENV": "production"
  }
}
```

#### Step 2: Modify Backend for Vercel

Create `/server/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "FRONTEND_URL": "@FRONTEND_URL",
    "GOOGLE_API_KEY": "@GOOGLE_API_KEY"
  }
}
```

#### Step 3: Update Backend Code for Vercel

Modify `server/index.js` to work with Vercel's serverless environment:

```javascript
// Add this at the top of server/index.js
import serverless from 'serverless-http';

// ... rest of your code ...

// At the bottom, export handler for Vercel
export default serverless(app);
```

Install the required dependency:

```bash
cd server
npm install serverless-http
```

#### Step 4: Create Separate Backend Deployment

**Option A: Deploy as separate Vercel project**

1. Create a new directory for the backend:
   ```bash
   mkdir orvion-backend
   cp -r server/* orvion-backend/
   ```

2. Initialize as separate Git repo:
   ```bash
   cd orvion-backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin https://github.com/YOUR_USERNAME/orvion-backend.git
   git push -u origin main
   ```

3. In Vercel Dashboard, import this new repository
4. Note the deployment URL (e.g., `https://orvion-backend.vercel.app`)

**Option B: Deploy both from same repo (Monorepo)**

1. Push both frontend and backend to same GitHub repo
2. In Vercel Settings → **General** → **Root Directory**: Leave blank for monorepo
3. For backend, set **Build Command**: `cd server && npm install && npm run build`

---

## Environment Variables

### Frontend Environment Variables

In **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value | Example |
|----------|-------|---------|
| `VITE_API_URL` | Your backend API URL | `https://api.your-domain.com` |

### Backend Environment Variables (Node.js - use process.env)

In **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Variable | Value | Required | Example |
|----------|-------|----------|----------|
| `GOOGLE_API_KEY` | Your Google Generative AI key | ✅ | `AIzaSy...` |
| `FRONTEND_URL` | Your frontend URL (for CORS) | ✅ | `https://orvion.vercel.app` |
| `PORT` | Server port | ❌ | `3001` |
| `NODE_ENV` | Environment mode | ❌ | `production` |

**Note**: Backend variables should NOT have `VITE_` prefix. Access with `process.env.VARIABLE_NAME`

### Getting Your Google API Key

1. Go to https://aistudio.google.com/apikey
2. Click **Create API key in new project**
3. Copy the API key
4. Add to Vercel Environment Variables as `GOOGLE_API_KEY`

### Setting Environment Variables in Vercel

1. Go to **Settings** → **Environment Variables**
2. Click **Add New**
3. Enter variable name and value
4. Select environments: **Production**, **Preview**, **Development**
5. Click **Add**
6. Redeploy for changes to take effect

---

## Connecting Hostinger Domain

### Step 1: Point Hostinger Domain to Vercel

1. **Log in to Hostinger Control Panel**
2. Go to **Domains** → Your Domain
3. Click **Manage DNS** or **DNS Records**

### Step 2: Update Nameservers (Recommended)

Vercel provides nameservers for your domain:

1. In Vercel Dashboard → **Domains**
2. Add your domain
3. Choose "Use Nameservers"
4. Copy the Vercel nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`

5. In Hostinger Control Panel:
   - Go to **Domains** → Your Domain → **Nameservers**
   - Replace existing nameservers with Vercel's
   - Save changes (can take 24-48 hours to propagate)

### Step 3: Configure Domain in Vercel

1. Go to Vercel Dashboard → **Settings** → **Domains**
2. Click **Add Domain**
3. Enter your Hostinger domain (e.g., `www.your-domain.com`)
4. Choose verification method
5. Wait for verification (can take up to 72 hours)

### Step 4: Add API Domain (for backend)

If backend is on separate Vercel project:

1. Go to backend project → **Settings** → **Domains**
2. Add subdomain: `api.your-domain.com`
3. Point to backend Vercel deployment

### Step 5: Update Frontend API URL

After backend domain is verified:

1. Frontend project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` to: `https://api.your-domain.com`
3. **Redeploy** frontend

### Alternative: DNS Records Method (Faster)

If nameservers change takes too long:

1. In Vercel → **Domains** → Choose "Add DNS Records"
2. Add these DNS records in Hostinger:

For Frontend (main domain):
```
Type: A
Name: @
Value: 76.76.19.165

Type: CNAME
Name: www
Value: cname.vercel-dns.com.

Type: TXT
Name: _vercel
Value: (Vercel verification code)
```

For API Subdomain:
```
Type: CNAME
Name: api
Value: cname.vercel-dns.com.
```

---

## SSL/TLS Certificate

Vercel automatically provisions free SSL certificates via Let's Encrypt:

1. Once domain is verified in Vercel
2. SSL certificate is auto-issued
3. HTTPS is enforced automatically
4. No additional action needed

---

## Testing & Troubleshooting

### Test Frontend Deployment

```bash
# Test build locally
npm run build
npm run preview

# Check console for errors
# Verify environment variables are loaded
```

### Test Backend Deployment

```bash
# Test locally
cd server
npm install
npm run dev

# Check API endpoints
curl http://localhost:3001/health
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Common Issues & Solutions

#### Issue: CORS Errors

**Solution:**
1. Verify `FRONTEND_URL` environment variable is set correctly
2. Add your domain to `allowedOrigins` in backend:
   ```javascript
   const allowedOrigins = [
     process.env.FRONTEND_URL,
     'https://your-domain.com',
     'https://www.your-domain.com',
   ];
   ```

#### Issue: API URL Not Working

**Solution:**
1. Verify `VITE_API_URL` in frontend environment variables
2. Ensure backend is deployed and responding
3. Check network tab in browser DevTools
4. Verify DNS propagation: `nslookup api.your-domain.com`

#### Issue: 502 Bad Gateway

**Solution:**
1. Check Vercel function logs: Dashboard → **Functions** → View logs
2. Verify Node.js version compatibility (v18+)
3. Check memory limit in backend (default 1024MB)
4. Redeploy backend

#### Issue: Environment Variables Not Loading

**Solution:**
1. Redeploy after adding env vars (critical!)
2. Check variable names exactly match in code
3. For frontend, prefix with `VITE_`
4. Verify correct environment (Production vs Preview)

---

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] API calls succeed from frontend
- [ ] Domain resolves correctly
- [ ] HTTPS is enforced
- [ ] Chat functionality works end-to-end
- [ ] Rate limiting is active
- [ ] CORS headers are correct
- [ ] Google API is responding
- [ ] Error logging is working

---

## Monitoring & Logs

### View Deployment Logs

1. Vercel Dashboard → Click on deployment
2. **Deployments** tab shows build logs
3. **Functions** tab shows runtime errors (backend)

### Monitor Performance

1. Go to **Analytics** tab
2. Track page load times, error rates
3. Monitor function duration and memory usage

---

## Rollback Previous Deployment

If something breaks:

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click the three dots → **Promote to Production**
4. Automatic rollback happens instantly

---

## Next Steps

1. **Configure Custom Analytics** (optional)
   - Go to **Analytics** to monitor traffic
   
2. **Set Up Email Notifications**
   - **Settings** → **Notifications** → Enable deployment alerts

3. **Enable Automatic Deployments**
   - Vercel auto-deploys on GitHub push
   - Verify in **Git** settings

4. **Set Up Preview Deployments**
   - Every pull request gets preview URL
   - Great for testing before production

---

## Useful Commands

```bash
# Build locally to test
npm run build

# Deploy manually via CLI (install first)
npm i -g vercel
vercel --prod

# Check domain DNS
nslookup your-domain.com
dig your-domain.com

# Test API connection
curl https://api.your-domain.com/health
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Express.js on Vercel**: https://vercel.com/docs/frameworks/express
- **Custom Domains**: https://vercel.com/docs/concepts/projects/custom-domains
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables
- **Google Generative AI**: https://ai.google.dev/

---

**Last Updated**: May 2026
**Version**: 1.0
