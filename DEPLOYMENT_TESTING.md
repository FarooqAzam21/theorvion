# Vercel Deployment - Testing & Troubleshooting

Commands and procedures to verify your Vercel deployment works correctly.

---

## Pre-Deployment Testing

Test everything locally before deploying to Vercel.

### Frontend Build Test

```bash
# Navigate to project root
cd /path/to/Orvion

# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview

# Should open: http://localhost:4173
# Verify:
# ✅ Site loads without errors
# ✅ Chat widget visible
# ✅ Navigation works
# ✅ Console has no errors (F12 → Console tab)
```

### Backend Test

```bash
# Navigate to backend
cd /path/to/Orvion/server

# Install dependencies
npm install

# Start backend
npm run dev

# Should show: Server running on port 3001

# In another terminal, test API endpoints
```

#### Test Health Endpoint

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-05-19T..."
}
```

#### Test Chat API

```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, who are you?",
    "conversationId": "test-123"
  }'
```

Expected response:
```json
{
  "response": "I'm Orvion, a RAG chatbot...",
  "conversationId": "test-123"
}
```

#### If API Returns 500 Error

```bash
# Check if .env file exists in /server
ls -la .env

# Check environment variables are set
echo $GOOGLE_API_KEY

# View backend logs
npm run dev
# Look for error messages
```

---

## Post-Deployment Testing

### Test Frontend Deployment

```bash
# Test your Vercel frontend URL
curl https://your-project.vercel.app

# Should return HTML (not 404 or error)

# Or in browser:
# 1. Go to https://your-project.vercel.app
# 2. Wait for page to load
# 3. Check for HTTPS (padlock icon)
# 4. Open DevTools (F12)
# 5. Check Console tab for errors
```

### Test Backend Deployment

```bash
# Test your Vercel backend URL
curl https://your-backend.vercel.app/health

# Should return JSON:
# {"status": "ok", ...}

# If 502 Bad Gateway:
# 1. Backend may not be deployed correctly
# 2. Check Vercel logs (Dashboard → Functions)
# 3. Verify environment variables are set
# 4. Redeploy backend
```

### Test API Communication

```bash
# From frontend to backend
curl https://your-project.vercel.app/api/chat \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"message": "Test"}'
```

---

## Debugging Commands

### Check DNS Resolution

```bash
# Basic DNS check
nslookup your-domain.com

# Detailed DNS info
dig your-domain.com

# Check nameservers
nslookup -type=NS your-domain.com

# Expected output (for Method 1):
# ns1.vercel-dns.com
# ns2.vercel-dns.com
# ns3.vercel-dns.com
# ns4.vercel-dns.com

# Check A records (for Method 2)
dig your-domain.com +short
# Should return: 76.76.19.165
```

### Check Domain Propagation

Use online tool:
```
https://www.whatsmydns.net
Enter: your-domain.com
```

Or use command line:
```bash
# Check from multiple DNS servers
for ns in 8.8.8.8 1.1.1.1 9.9.9.9; do
  echo "Checking from $ns:"
  nslookup your-domain.com $ns | grep -A1 "^Name:"
done
```

### SSL Certificate Check

```bash
# Check SSL certificate
openssl s_client -connect your-domain.com:443 -showcerts

# Check expiry
openssl s_client -connect your-domain.com:443 2>/dev/null | \
  openssl x509 -noout -dates

# Should show:
# notBefore=...
# notAfter=... (should be in future)
```

### Test API Endpoint Response

```bash
# Get full response with headers
curl -v https://api.your-domain.com/health

# Should show:
# HTTP/2 200
# {"status": "ok"}

# If getting different status:
# 404 - API endpoint doesn't exist
# 502 - Backend not running
# 503 - Too many connections
```

---

## Vercel Logs & Debugging

### View Build Logs

1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Deployments** tab
4. Click on latest deployment
5. Click **Logs** button
6. Scroll to see build output and errors

### View Runtime Logs

For backend (serverless functions):

1. Go to backend project → **Deployments**
2. Click latest deployment
3. Go to **Functions** tab
4. Click on your function (`index.js` or similar)
5. View function logs and errors

### Common Log Errors

```
Error: Cannot find module 'express'
→ Solution: npm install not running, check build command

Error: GOOGLE_API_KEY is undefined
→ Solution: Environment variable not set, redeploy

Error: CORS origin not allowed
→ Solution: FRONTEND_URL env var is wrong

Error: 502 Bad Gateway
→ Solution: Function crashed, check logs above
```

---

## CORS Troubleshooting

### Check CORS Headers

```bash
# Test CORS headers from frontend
curl -H "Origin: https://your-project.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS https://api.your-domain.com/api/chat -v

# Look for response headers:
# Access-Control-Allow-Origin: https://your-project.vercel.app
# Access-Control-Allow-Methods: GET, POST
# Access-Control-Allow-Headers: Content-Type
```

### Browser Console CORS Error

If you see in browser console:
```
Access to XMLHttpRequest at 'https://api...' from origin 'https://your-project...' 
has been blocked by CORS policy
```

**Fix:**
1. Check `FRONTEND_URL` in backend env vars
2. Ensure it matches your frontend domain
3. Redeploy backend
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try again

---

## Performance Testing

### Page Load Time

```bash
# Using curl with timing
curl -w "Time: %{time_total}s\n" https://your-domain.com

# Should be < 3 seconds

# Detailed breakdown:
curl -w "
  Time Connect:    %{time_connect}s\n
  Time TTFB:       %{time_starttransfer}s\n
  Time Total:      %{time_total}s\n
" https://your-domain.com
```

### API Response Time

```bash
time curl https://api.your-domain.com/health

# Should respond in < 1 second for health check
# May be slower on first request (cold start)
```

### Check Function Memory Usage

In Vercel Dashboard:
1. Backend project → **Analytics**
2. Check "Function Duration" and "Memory Usage"
3. If consistently high, increase memory in `vercel.json`

---

## Environment Variable Validation

### Verify Backend Variables Are Set

```bash
# In your backend code, add temporary logging:
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'SET' : 'MISSING');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

# Check logs in Vercel
# Should show your values (don't log full keys!)
```

**Backend variables:** Access with `process.env.VARIABLE_NAME` - NO VITE_ prefix

### Check Frontend Variables

In browser console:
```javascript
// Access Vite frontend variables with VITE_ prefix
console.log('API URL:', import.meta.env.VITE_API_URL);
```

**Frontend variables:** Must use `VITE_` prefix and access with `import.meta.env.VITE_API_URL`

---

## Step-by-Step Deployment Verification

### Immediately After Deployment

```bash
# 1. Check frontend is deployed
curl https://your-project.vercel.app --write-out "HTTP Status: %{http_code}\n"
# Should be: HTTP Status: 200

# 2. Check backend is deployed
curl https://your-backend.vercel.app/health --write-out "HTTP Status: %{http_code}\n"
# Should be: HTTP Status: 200

# 3. Check if endpoints are accessible
curl -X OPTIONS https://api.your-domain.com/api/chat -v
# Should show CORS headers
```

### After Domain Connection

```bash
# 1. Verify DNS resolution
nslookup your-domain.com
# Should resolve to: 76.76.19.165

# 2. Verify domain is live
curl https://your-domain.com --write-out "HTTP Status: %{http_code}\n"
# Should be: HTTP Status: 200

# 3. Test full chat flow
curl -X POST https://api.your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
# Should return valid JSON response
```

### 24 Hours After DNS Setup

```bash
# Verify everything is stable
# 1. Try from different network (phone hotspot)
curl https://your-domain.com

# 2. Check HTTPS is enforced
# In browser, try: http://your-domain.com
# Should redirect to https://your-domain.com

# 3. Check SSL certificate
openssl s_client -connect your-domain.com:443 < /dev/null | \
  grep "Issuer"
# Should show: Issuer: Let's Encrypt Authority
```

---

## Failed Deployment Recovery

### Rollback to Previous Deployment

1. Go to Vercel Dashboard
2. Click on project
3. Go to **Deployments** tab
4. Find previous working deployment
5. Click the three dots **...**
6. Select **Promote to Production**
7. Confirm - rollback completes instantly

### Redeploy Current Version

```bash
# Force new deployment via CLI
npm i -g vercel  # Install Vercel CLI
vercel --prod    # Deploy to production

# Or via GitHub:
# 1. Make a small change
# 2. Git push
# 3. Vercel auto-deploys
```

---

## Monitoring After Deployment

### Set Up Alerts

In Vercel Dashboard:
1. **Settings** → **Notifications**
2. Enable "Deployment failed"
3. Enable "Production error"
4. Select notification method (email)

### Regular Health Checks

```bash
# Create a simple health check script
# Save as: health-check.sh

#!/bin/bash
while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://your-domain.com/health)
  if [ "$STATUS" != "200" ]; then
    echo "Alert: API returned $STATUS at $(date)"
    # Send notification, etc.
  fi
  sleep 300  # Check every 5 minutes
done

# Run:
chmod +x health-check.sh
./health-check.sh
```

---

## Quick Troubleshooting Decision Tree

```
Q: Frontend shows 404?
├─ A: Check Build Command in Vercel settings
├─ A: Verify output directory is "dist"
└─ A: Redeploy

Q: API returns 502?
├─ A: Check backend logs in Vercel Functions
├─ A: Verify GOOGLE_API_KEY is set
├─ A: Redeploy backend
└─ A: Increase function memory in vercel.json

Q: CORS errors in console?
├─ A: Verify FRONTEND_URL in backend env vars
├─ A: Make sure domains match exactly
└─ A: Redeploy backend

Q: Domain not resolving?
├─ A: Check DNS propagation at whatsmydns.net
├─ A: Verify nameservers or A records in Hostinger
├─ A: Wait 24-48 hours for propagation
└─ A: Try from different network

Q: Chat not sending messages?
├─ A: Check VITE_API_URL in frontend env vars
├─ A: Verify API endpoint is accessible
├─ A: Check browser console for specific error
├─ A: Verify Google API key is valid
└─ A: Redeploy both frontend and backend
```

---

## Testing Checklist

After deployment, verify:

- [ ] Frontend loads at custom domain
- [ ] HTTPS is enforced (padlock icon)
- [ ] Chat widget appears
- [ ] Can type in chat input
- [ ] Chat sends message (no console errors)
- [ ] API responds with message
- [ ] Page responds in < 3 seconds
- [ ] Works on mobile
- [ ] No console errors (F12 → Console)
- [ ] No network errors (F12 → Network)
- [ ] Works on different browsers (Chrome, Firefox, Safari)

---

## Support & Resources

- **Vercel Status**: https://www.vercel-status.com
- **Vercel Docs**: https://vercel.com/docs
- **DNS Checker**: https://mxtoolbox.com
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html

---

**Last Updated**: May 2026
