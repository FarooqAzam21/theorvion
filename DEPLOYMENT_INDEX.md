# Vercel + Hostinger Deployment Complete Guide - Index

**Complete documentation for deploying Orvion to Vercel and connecting Hostinger domain**

---

## 📚 Documentation Files

### 1. **VERCEL_QUICK_START.md** ⚡ START HERE
- **Purpose**: 30-45 minute deployment from start to finish
- **Best for**: Quick deployment without deep understanding
- **Contains**:
  - 5-minute code prep
  - Frontend deployment (10 min)
  - Backend deployment (10 min)
  - Environment variables (5 min)
  - Domain connection (15 min)

### 2. **VERCEL_DEPLOYMENT_GUIDE.md** 📖 COMPREHENSIVE REFERENCE
- **Purpose**: Complete guide with all details
- **Best for**: Understanding the full process and all options
- **Contains**:
  - Pre-deployment checklist
  - Step-by-step setup
  - Frontend & backend deployment options
  - Environment variables configuration
  - Hostinger domain connection
  - Troubleshooting section

### 3. **ENV_VARIABLES_SETUP.md** 🔐 ENVIRONMENT CONFIGURATION
- **Purpose**: All environment variable details
- **Best for**: Setting up and troubleshooting variables
- **Contains**:
  - Frontend variables
  - Backend variables
  - Development vs Production
  - How to get API keys
  - Security best practices
  - Troubleshooting variables

### 4. **HOSTINGER_DOMAIN_SETUP.md** 🌐 DOMAIN CONNECTION
- **Purpose**: Step-by-step Hostinger domain setup
- **Best for**: Connecting your domain after Vercel deployment
- **Contains**:
  - Nameservers method (recommended)
  - DNS records method (faster)
  - Hostinger UI walkthrough
  - Verification steps
  - Troubleshooting domain issues

### 5. **DEPLOYMENT_TESTING.md** ✅ TESTING & VERIFICATION
- **Purpose**: Test and verify deployment
- **Best for**: Making sure everything works
- **Contains**:
  - Pre-deployment testing
  - Post-deployment verification
  - Debugging commands
  - Performance testing
  - Troubleshooting decision tree

---

## 🚀 Quick Start Path (Choose One)

### Path 1: "Just Deploy It" (30 minutes)
1. Read: **VERCEL_QUICK_START.md**
2. Follow all steps
3. Run tests from **DEPLOYMENT_TESTING.md**
4. Done!

### Path 2: "Understand Everything" (1-2 hours)
1. Read: **VERCEL_DEPLOYMENT_GUIDE.md** (complete overview)
2. Read: **ENV_VARIABLES_SETUP.md** (understand variables)
3. Read: **HOSTINGER_DOMAIN_SETUP.md** (for domain)
4. Read: **DEPLOYMENT_TESTING.md** (verification)
5. Execute steps
6. Done!

### Path 3: "I'm Having Issues"
1. Check: **DEPLOYMENT_TESTING.md** troubleshooting tree
2. For variables: **ENV_VARIABLES_SETUP.md** troubleshooting
3. For domain: **HOSTINGER_DOMAIN_SETUP.md** troubleshooting
4. For full guide: **VERCEL_DEPLOYMENT_GUIDE.md** reference

---

## 🎯 Required Actions Before Starting

### Pre-Flight Checklist

```
ACCOUNTS:
☐ Vercel account created (https://vercel.com)
☐ GitHub account with repository pushed
☐ Hostinger account with domain purchased

CODE:
☐ Project pushed to GitHub
☐ .gitignore configured (no .env files)
☐ npm run build works locally
☐ Backend npm install works in /server

API KEYS:
☐ Google API key obtained (https://aistudio.google.com/apikey)
☐ Keep API key secure (add to .gitignore)

LOCAL TESTING:
☐ Frontend builds: npm run build
☐ Backend runs: cd server && npm run dev
☐ API responds: curl http://localhost:3001/health
```

---

## 📋 Step-by-Step Overview

### Phase 1: Preparation (5 min)

```bash
# Verify everything is ready
npm run build           # Frontend builds successfully
cd server
npm install            # Backend installs
npm run dev            # Backend starts
curl http://localhost:3001/health  # API responds
```

### Phase 2: Deploy Frontend (10 min)

```
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Framework: Vite (auto-detected)
4. Build Command: npm run build
5. Output Directory: dist
6. Click Deploy
7. Save frontend URL (your-project.vercel.app)
```

### Phase 3: Deploy Backend (10 min)

```
1. Create new Vercel project for backend
2. Select same repository
3. Root Directory: server
4. Build Command: npm install
5. Start Command: node index.js
6. Click Deploy
7. Save backend URL (your-backend.vercel.app)
```

### Phase 4: Set Environment Variables (5 min)

**Backend Vercel Project:**
```
GOOGLE_API_KEY = (from https://aistudio.google.com/apikey)
FRONTEND_URL = https://your-project.vercel.app
NODE_ENV = production
```

**Frontend Vercel Project:**
```
VITE_API_URL = https://your-backend.vercel.app
```

### Phase 5: Redeploy (5 min)

After adding env vars, redeploy both projects:
```
Frontend: Deployments → Latest → Redeploy
Backend:  Deployments → Latest → Redeploy
```

### Phase 6: Test Deployment (5 min)

```bash
# Frontend loads
curl https://your-project.vercel.app

# API responds
curl https://your-backend.vercel.app/health

# Chat API works
curl -X POST https://your-backend.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Phase 7: Connect Hostinger Domain (15-30 min)

**Option A: Nameservers (24-48 hours)**
```
1. Copy Vercel nameservers
2. Paste in Hostinger nameservers
3. Wait for propagation
```

**Option B: DNS Records (immediate)**
```
1. Add A record:    @ → 76.76.19.165
2. Add CNAME:      www → cname.vercel-dns.com
3. Add CNAME:      api → cname.vercel-dns.com
4. Wait 5-30 minutes
```

### Phase 8: Update URLs (2 min)

After domain is live:
```
Backend env var FRONTEND_URL: your-domain.com
Frontend env var VITE_API_URL: api.your-domain.com
Redeploy both
```

### Phase 9: Final Testing (5 min)

```bash
# Domain resolves
ping your-domain.com

# Frontend loads
https://your-domain.com

# API works
curl https://api.your-domain.com/health

# Chat works
Try chatting in the UI
```

---

## 🔑 Key Environment Variables

### Backend (Vercel - Node.js)
```
GOOGLE_API_KEY      - Your Google Generative AI key (required)
FRONTEND_URL        - Your frontend URL for CORS (required)
NODE_ENV            - production (recommended)
PORT                - 3001 (optional)

Access: process.env.VARIABLE_NAME (NO VITE_ prefix)
```

### Frontend (Vercel - React + Vite)
```
VITE_API_URL        - Your backend API URL (required, MUST have VITE_ prefix)

Access: import.meta.env.VITE_API_URL (with VITE_ prefix)
```

---

## ⏱️ Timeline

```
Phase 1 (Prep):           5 min
Phase 2 (Frontend):      10 min
Phase 3 (Backend):       10 min
Phase 4 (Env Vars):       5 min
Phase 5 (Redeploy):       5 min
Phase 6 (Test):           5 min
─────────────────────────────
Total (no domain):       40 min

Phase 7a (Nameservers): 0 min setup + 24-48 hrs wait
Phase 7b (DNS Records): 0 min setup + 5-30 min wait
Phase 8 (Update URLs):   2 min
Phase 9 (Final Test):    5 min
─────────────────────────────
Total with domain:      47 min + propagation time
```

---

## 🆘 Common Issues Quick Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| 502 Bad Gateway | Backend crashed or not deployed | Check logs, redeploy |
| CORS errors | Wrong FRONTEND_URL in backend | Update env var, redeploy |
| Can't reach API | API URL wrong in frontend | Update VITE_API_URL, redeploy |
| Domain not working | DNS not propagated yet | Wait 24-48 hours or use DNS records method |
| Env vars not loading | Not redeployed after adding vars | **Redeploy after adding env vars** |
| API key error | Invalid or expired API key | Get new key from aistudio.google.com/apikey |

---

## 📞 When You Need Help

1. **Deployment issues**: Check **DEPLOYMENT_TESTING.md** troubleshooting section
2. **Environment variables**: Check **ENV_VARIABLES_SETUP.md** troubleshooting
3. **Domain connection**: Check **HOSTINGER_DOMAIN_SETUP.md** troubleshooting
4. **General questions**: Read **VERCEL_DEPLOYMENT_GUIDE.md**
5. **Quick answers**: Check **VERCEL_QUICK_START.md**

---

## ✨ Success Indicators

After complete deployment, verify:

- ✅ Your site loads at `https://your-domain.com`
- ✅ HTTPS enforced (padlock icon)
- ✅ Chat widget visible and working
- ✅ Can type and send messages
- ✅ No console errors (F12 → Console)
- ✅ No CORS errors
- ✅ Pages load in < 3 seconds
- ✅ Works on different browsers
- ✅ Works on mobile

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Google AI Studio**: https://aistudio.google.com/apikey
- **Hostinger hPanel**: https://hpanel.hostinger.com
- **DNS Propagation Checker**: https://www.whatsmydns.net
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

## 📝 Document Quick Reference

| Need | File |
|------|------|
| Fast deployment | **VERCEL_QUICK_START.md** |
| All details | **VERCEL_DEPLOYMENT_GUIDE.md** |
| Environment setup | **ENV_VARIABLES_SETUP.md** |
| Domain connection | **HOSTINGER_DOMAIN_SETUP.md** |
| Testing/verification | **DEPLOYMENT_TESTING.md** |
| Overview/index | **THIS FILE** |

---

## 🎓 Learning Resources

- Vercel has excellent docs: https://vercel.com/docs
- Express.js deployment: https://vercel.com/docs/frameworks/express
- Hostinger support: https://support.hostinger.com
- DNS basics: https://en.wikipedia.org/wiki/Domain_Name_System

---

## ✅ Pre-Deployment Final Checklist

Before you start:

```
VERCEL ACCOUNT
☐ Signed up and verified
☐ GitHub connected
☐ Project imported or ready to import

HOSTINGER DOMAIN
☐ Domain purchased
☐ Domain active in Hostinger

GOOGLE API
☐ API key generated
☐ API key copied and saved securely
☐ Added to project notes (not in code!)

LOCAL VERIFICATION
☐ npm run build works
☐ npm run dev works in server/
☐ curl http://localhost:3001/health returns 200
☐ Git repository pushed to GitHub
☐ .gitignore has .env, node_modules, dist, .env.local

DOCUMENTATION
☐ Read at least one guide (this index + QUICK_START recommended)
☐ Understood environment variables
☐ Understood deployment phases
☐ Ready to follow steps
```

---

## 🚀 You're Ready!

Pick your path and start deploying:

1. **Fast Track**: Start with **VERCEL_QUICK_START.md**
2. **Complete Learning**: Start with **VERCEL_DEPLOYMENT_GUIDE.md**
3. **Issues?**: Jump to **DEPLOYMENT_TESTING.md**

---

**Created**: May 2026  
**Version**: 1.0  
**Status**: Complete and Ready to Use

Good luck with your deployment! 🎉
