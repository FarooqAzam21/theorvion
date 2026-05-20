# Vercel Deployment Quick Start

**Fastest path to deploying on Vercel + connecting Hostinger domain**

---

## 5-Minute Setup

### 1. Prepare Your Code (5 min)

```bash
# Create .env.local for testing (don't commit this)
echo "VITE_API_URL=http://localhost:3001" > .env.local

# Build locally to verify
npm run build
cd server && npm install
npm run dev # In separate terminal

# Test API works
curl http://localhost:3001/health
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## Deploy to Vercel (10 minutes)

### Frontend Deployment

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Framework**: Vite (auto-detected)
4. **Root Directory**: `.` (current)
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. Click **Deploy**
8. Wait 2-3 minutes for deployment
9. Your URL: `https://YOUR-PROJECT.vercel.app`

### Backend Deployment

1. Create new Vercel project for backend
2. Select same GitHub repo
3. **Root Directory**: `server`
4. **Build Command**: `npm install`
5. **Start Command**: `node index.js`
6. Click **Deploy**
7. Note backend URL: `https://YOUR-BACKEND.vercel.app`

---

## Add Environment Variables (5 minutes)

### For Backend (api.vercel.app)

1. **Settings** → **Environment Variables**
2. Add these (NO VITE_ prefix for backend):

| Name | Value |
|------|-------|
| `GOOGLE_API_KEY` | Your API key from https://aistudio.google.com/apikey |
| `FRONTEND_URL` | `https://YOUR-PROJECT.vercel.app` |
| `NODE_ENV` | `production` |

Access in code: `process.env.VARIABLE_NAME`

3. Click **Redeploy** (important!)

### For Frontend (YOUR-PROJECT.vercel.app)

1. **Settings** → **Environment Variables**
2. Add (with VITE_ prefix):

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND.vercel.app` |

Access in code: `import.meta.env.VITE_API_URL`

3. Click **Redeploy**

---

## Connect Hostinger Domain (15 minutes)

### Option A: Nameservers (Recommended, 24-48 hours)

**In Vercel:**
1. **Domains** → **Add Domain**
2. Enter your Hostinger domain
3. Select **Nameservers** method
4. Copy the 4 Vercel nameservers

**In Hostinger Control Panel:**
1. **Domains** → Your domain
2. **Nameservers** → Edit
3. Paste Vercel nameservers
4. Save
5. Wait 24-48 hours for propagation

### Option B: DNS Records (Faster, immediate)

**In Vercel:**
1. **Domains** → **Add Domain**
2. Select **DNS Records** method
3. Add these records in Hostinger DNS:

```
Type: A       | Name: @   | Value: 76.76.19.165
Type: CNAME   | Name: www | Value: cname.vercel-dns.com.
Type: TXT     | Name: _vercel | Value: (verification code from Vercel)
```

For API subdomain:
```
Type: CNAME   | Name: api | Value: cname.vercel-dns.com.
```

---

## Verify Everything Works

```bash
# Test frontend loads
curl https://your-domain.com

# Test API is reachable
curl https://api.your-domain.com/health

# Test chat API
curl -X POST https://api.your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| API returns 502 | Redeploy backend, check `GOOGLE_API_KEY` in env vars |
| CORS errors | Verify `FRONTEND_URL` matches your domain in backend env vars |
| Domain not working | Wait 24-48 hours for DNS propagation, check status in Vercel |
| Env vars not loading | **Redeploy** after changing env vars (critical!) |
| Can't connect to API | Check `VITE_API_URL` in frontend env vars |

---

## Environment Variables Checklist

### Backend Required:
- [ ] `GOOGLE_API_KEY` - from https://aistudio.google.com/apikey
- [ ] `FRONTEND_URL` - your frontend Vercel URL

### Frontend Required:
- [ ] `VITE_API_URL` - your backend Vercel URL

### After Hostinger Domain Connected:
- [ ] `FRONTEND_URL` → `https://your-domain.com`
- [ ] `VITE_API_URL` → `https://api.your-domain.com`

---

## Success Indicators

✅ Domain resolves to your site  
✅ Chat works end-to-end  
✅ No CORS errors in console  
✅ API responds to requests  
✅ HTTPS is enforced  
✅ Pages load in < 3 seconds  

---

**Estimated Total Time**: 30-45 minutes (plus 24-48 hours for DNS propagation)
