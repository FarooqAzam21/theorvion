# Hostinger Domain to Vercel Connection Guide

Step-by-step instructions for connecting your Hostinger domain to Vercel.

---

## Overview

After deploying to Vercel, you need to connect your Hostinger domain so your app is accessible at `your-domain.com` instead of `your-project.vercel.app`.

**Two Methods:**
1. **Nameservers** (Recommended) - 24-48 hours to propagate
2. **DNS Records** (Faster) - Works immediately but more manual

---

## Method 1: Nameservers (Recommended)

### Step 1: Get Vercel Nameservers

1. Log in to https://vercel.com/dashboard
2. Go to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain: `your-domain.com`
5. Select **Use Nameservers**
6. You'll see 4 nameservers to copy:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
7. **Save these values** (you'll need them in Hostinger)

### Step 2: Update Hostinger Nameservers

1. Go to https://hpanel.hostinger.com (Hostinger Control Panel)
2. Log in with your credentials
3. Click **Domains** (top navigation)
4. Find your domain in the list
5. Click on the domain name
6. Click **Nameservers** (or **DNS Records** → **Nameservers**)
7. You should see current nameservers (usually Hostinger's)

### Step 3: Replace with Vercel Nameservers

1. **Remove** existing nameservers
2. **Add** Vercel's nameservers:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
3. Click **Save** or **Update**
4. You'll see a message: "Nameservers updated successfully"

### Step 4: Wait for Propagation

- ⏱️ **Propagation time**: 24-48 hours (sometimes faster)
- During this time, DNS is updating globally
- Your domain will start pointing to Vercel

### Step 5: Verify in Vercel

1. Back in Vercel → **Settings** → **Domains**
2. Click on your domain
3. You'll see status: "Pending" → "Valid"
4. Once "Valid", your domain is connected!

---

## Method 2: DNS Records (Faster Alternative)

Use this if you need immediate results or prefer manual control.

### Step 1: Get DNS Records from Vercel

1. Log in to https://vercel.com/dashboard
2. Go to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain: `your-domain.com`
5. Select **Add DNS Records** instead of Nameservers
6. Vercel shows you DNS records to add

### Step 2: Add DNS Records in Hostinger

1. Go to https://hpanel.hostinger.com
2. Click **Domains** → Your domain
3. Click **DNS/Nameservers**
4. Find **DNS Records** section
5. Click **Add Record** or **Edit** existing

#### Record 1: Root Domain A Record

```
Type:        A (Address Record)
Name/Host:   @ (or leave blank for root)
Value:       76.76.19.165
TTL:         3600 (or default)
```

Click **Save**

#### Record 2: WWW CNAME Record

```
Type:        CNAME (Canonical Name)
Name/Host:   www
Value:       cname.vercel-dns.com.
TTL:         3600 (or default)
```

Click **Save**

#### Record 3: Verification TXT Record

```
Type:        TXT
Name/Host:   _vercel (or _vercel.your-domain.com)
Value:       (copy from Vercel dashboard)
TTL:         3600
```

Click **Save**

### Step 3: Add API Subdomain Record (Optional)

If you want to use `api.your-domain.com` instead of backend.vercel.app:

```
Type:        CNAME
Name/Host:   api
Value:       cname.vercel-dns.com.
TTL:         3600
```

Click **Save**

### Step 4: Update Vercel Backend Domain

1. Go to backend project in Vercel
2. **Settings** → **Domains**
3. Add domain: `api.your-domain.com`
4. Vercel should recognize it (matching DNS records)
5. Click **Add**

### Step 5: Test DNS Records

```bash
# Test root domain
nslookup your-domain.com
# Should return: 76.76.19.165

# Test www
nslookup www.your-domain.com
# Should return: cname.vercel-dns.com

# Test API subdomain
nslookup api.your-domain.com
# Should return: cname.vercel-dns.com

# For detailed info
dig your-domain.com
```

---

## Post-Connection Configuration

### Update Environment Variables

After domain is active, update your environment variables:

**Backend (Vercel):**
1. Go to backend project → **Settings** → **Environment Variables**
2. Update `FRONTEND_URL`:
   ```
   From: https://your-project.vercel.app
   To:   https://your-domain.com
   ```
3. Click **Redeploy**

**Frontend (Vercel):**
1. Go to frontend project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL`:
   ```
   From: https://your-backend.vercel.com
   To:   https://api.your-domain.com
   ```
3. Click **Redeploy**

---

## Verification Checklist

### Domain Setup
- [ ] Domain purchased from Hostinger
- [ ] Nameservers or DNS records configured
- [ ] Domain added to Vercel
- [ ] Status shows "Valid" or "Active" in Vercel

### Verification
```bash
# All should work after propagation (up to 48 hours)

# Test 1: Domain resolves
ping your-domain.com

# Test 2: Frontend loads
curl https://your-domain.com

# Test 3: API endpoint responds
curl https://api.your-domain.com/health

# Test 4: Chat API works
curl -X POST https://api.your-domain.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### In Browser
- [ ] `https://your-domain.com` loads your site
- [ ] Browser shows HTTPS (padlock icon)
- [ ] Chat widget loads
- [ ] Chat sends messages successfully
- [ ] No CORS errors in console
- [ ] No API errors

---

## Troubleshooting

### Issue: Domain shows "Pending" in Vercel

**Wait longer** - Vercel hasn't verified the domain yet
- For nameservers: Wait 24-48 hours
- For DNS records: Wait 5-30 minutes
- Check Vercel logs for verification status

**Verify nameservers were set:**
```bash
nslookup -type=NS your-domain.com
```
Should show Vercel nameservers if method 1.

### Issue: "Domain not found" or 404

**Check DNS:**
```bash
dig your-domain.com
# Should return: 76.76.19.165
```

If not showing correct IP:
1. Verify A record is set correctly in Hostinger
2. Wait for DNS propagation
3. Clear browser cache (Ctrl+Shift+Del)
4. Try in incognito mode

### Issue: CORS errors after domain switch

**Environment variables not updated:**
1. Verify `FRONTEND_URL` in backend env vars
2. Ensure it matches your new domain
3. Redeploy backend
4. Clear browser cache

### Issue: "Connection refused" or API not responding

**Check backend is deployed:**
1. Go to backend project → **Deployments**
2. Check latest deployment succeeded
3. If failed, redeploy manually
4. Check backend environment variables are set
5. Try accessing API directly: `curl https://api.your-domain.com/health`

### Issue: Certificateproblems or "Not secure"

**SSL not issued yet:**
1. Vercel auto-generates SSL certificates
2. After domain verification, wait 5-10 minutes
3. HTTPS should be enforced automatically
4. Refresh page (don't just reload - full refresh: Ctrl+Shift+R)

### Issue: www vs non-www versions

**Ensure consistency:**
1. Verify both `your-domain.com` and `www.your-domain.com` have DNS records
2. In Vercel, add both domains if needed
3. Consider redirecting one to the other
4. Update environment variables if using one specifically

---

## Hostinger Dashboard Quick Reference

### Navigation

1. **Hpanel Login**: https://hpanel.hostinger.com
2. **Main Menu** (top left or hamburger icon)
3. Click **Domains**
4. Select your domain from list
5. Common sections:
   - **DNS/Nameservers** - Change nameservers
   - **DNS Records** - Add A, CNAME, TXT records
   - **SSL/TLS** - View SSL status
   - **Forwarding** - Redirect domains
   - **Settings** - Domain options

### DNS Records Interface

```
┌─────────────────────────────────────────────────────┐
│ Your Domain: your-domain.com                        │
├─────────────────────────────────────────────────────┤
│ Type    │ Name  │ Value         │ TTL   │ Actions   │
├─────────┼───────┼───────────────┼───────┼───────────┤
│ A       │ @     │ 76.76.19.165  │ 3600  │ Edit/Del  │
│ CNAME   │ www   │ cname.ver...  │ 3600  │ Edit/Del  │
│ CNAME   │ api   │ cname.ver...  │ 3600  │ Edit/Del  │
│ TXT     │ _ver  │ (verification)│ 3600  │ Edit/Del  │
└─────────┴───────┴───────────────┴───────┴───────────┘

[+ Add Record] [Refresh]
```

---

## Timeline Expectations

### Nameservers Method
```
0 min:     Set nameservers in Hostinger
1 hour:    Status: Pending (usually)
6-12 hrs:  May start working
24-48 hrs: Full propagation complete
```

### DNS Records Method
```
0 min:     Add records in Hostinger
5 mins:    DNS updates start
15-30 min: Usually fully propagated
```

---

## After Domain is Live

### Security
- [ ] SSL is automatically enforced (HTTPS)
- [ ] Certificate auto-renews (Vercel handles this)
- [ ] No additional SSL setup needed

### Maintenance
- [ ] Monitor domain renewal (1 year)
- [ ] Check Vercel domains dashboard quarterly
- [ ] Update environment variables if needed

### Performance
- [ ] Your site now loads on custom domain
- [ ] Users can bookmark your-domain.com
- [ ] Email can use @your-domain.com address
- [ ] Professional appearance with custom domain

---

## Support Resources

- **Hostinger Support**: https://support.hostinger.com
- **Vercel Domain Docs**: https://vercel.com/docs/concepts/projects/custom-domains
- **DNS Propagation Checker**: https://www.whatsmydns.net
- **Hostinger KB**: https://hostinger.com/help

---

**Last Updated**: May 2026
**Version**: 1.0
