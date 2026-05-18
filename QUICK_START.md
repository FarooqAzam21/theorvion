# 🚀 Quick Start Guide - Codexa Agency Website

## ⚡ 30-Second Setup

```bash
# You're already set up! The dev server is running at:
# http://localhost:5173/

# In another terminal, run:
npm run dev

# To build for production:
npm run build

# To preview the build locally:
npm run preview
```

---

## 📋 Essential Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:5173/
npm run build        # Build for production (creates dist/)
npm run preview      # View production build locally
npm run lint         # Check code quality
```

### Deployment
```bash
npm install -g vercel    # Install Vercel CLI
vercel                   # Deploy to Vercel
vercel --prod           # Deploy to production
```

### Maintenance
```bash
npm update              # Update all dependencies
npm audit              # Check for vulnerabilities
npm install            # Install missing dependencies
```

---

## 🎨 Quick Customization

### Change Company Name
**File:** `src/components/Navigation.jsx` line 46
```javascript
<motion.a href="#" className="text-2xl font-bold gradient-text">
  Your Company Name  // ← Change this
</motion.a>
```

### Change Colors
**File:** `tailwind.config.js` lines 1-9
```javascript
colors: {
  primary: "#your-color",     // Main dark color
  secondary: "#your-color",   // Secondary color
  accent: "#your-color",      // Accent color
},
```

### Update Hero Section
**File:** `src/components/Hero.jsx` lines 37-45
- Update headline (line 37)
- Update tagline (line 43)
- Update CTA buttons (lines 51-64)

### Update Services
**File:** `src/components/Services.jsx` lines 12-54
Replace the services array with your 8 services

### Update Team Members
**File:** `src/components/Team.jsx` lines 10-44
Update the team array with your team info

### Update Portfolio
**File:** `src/components/Portfolio.jsx` lines 10-51
Replace projects array with your work

### Update Contact Info
**File:** `src/components/Contact.jsx` lines 55-65
Update email, phone, and address

---

## ✅ Pre-Launch Checklist

### Content Updates
- [ ] Replace "Codexa" with your company name
- [ ] Update all service descriptions
- [ ] Add real team members with photos
- [ ] Add portfolio projects with images
- [ ] Update testimonials with real client feedback
- [ ] Change contact information

### Design Customization
- [ ] Update colors in tailwind.config.js
- [ ] Add company logo to public/ folder
- [ ] Change favicon
- [ ] Update meta tags in index.html

### Functionality Setup
- [ ] Integrate contact form (Formspree/EmailJS)
- [ ] Setup WhatsApp link with country code
- [ ] Add Google Analytics tracking
- [ ] Test all links and buttons

### Deployment
- [ ] Create GitHub repository
- [ ] Connect to Vercel
- [ ] Set up custom domain
- [ ] Enable auto-deploys from main branch

---

## 📁 Key Files to Edit

| What to Change | Where | Line |
|---|---|---|
| Company Name | Navigation.jsx | 46 |
| Hero Headline | Hero.jsx | 37 |
| Hero Tagline | Hero.jsx | 43 |
| Services | Services.jsx | 12+ |
| Team Members | Team.jsx | 10+ |
| Projects | Portfolio.jsx | 10+ |
| Testimonials | Testimonials.jsx | 10+ |
| Contact Info | Contact.jsx | 55+ |
| Colors | tailwind.config.js | 6+ |
| Meta Tags | index.html | 9-14 |

---

## 🌍 File Structure Map

```
codexa/
├── 📂 src/
│   ├── 📂 components/       ← All page sections
│   ├── App.jsx             ← Main layout
│   ├── main.jsx            ← Entry point
│   ├── index.css           ← Global styles
│   └── App.css             ← Component styles
├── 📂 public/              ← Logo, favicon, images
├── index.html              ← HTML template
├── package.json            ← Dependencies
├── tailwind.config.js      ← Colors, fonts, theme
├── vite.config.js          ← Build settings
└── README.md              ← Full documentation
```

---

## 🖼️ Adding Images

### 1. Save image to public folder
```
public/
├── favicon.svg
├── logo.png              ← Add your logo here
├── team-member.jpg       ← Add team photos
└── portfolio-project.jpg ← Add project images
```

### 2. Reference in components
```jsx
<img src="/logo.png" alt="Company Logo" />
<img src="/team-member.jpg" alt="Team Member Name" />
```

---

## 🚀 Deployment in 3 Steps

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/you/codexa.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your GitHub repository
3. Click "Deploy"

### Step 3: Add Custom Domain
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records
4. Done! 🎉

---

## 🔗 First-Time Setup

```bash
# Clone or enter the project
cd codexa

# Install dependencies (if needed)
npm install

# Start dev server
npm run dev

# Open in browser:
# http://localhost:5173/
```

---

## 🐛 Troubleshooting

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### Dependencies missing?
```bash
rm -rf node_modules
npm install
```

### Build fails?
```bash
npm run build -- --debug
```

### Changes not showing?
```bash
# Clear cache
rm -rf dist .vite
npm run dev
```

---

## 📊 Build Info

Current sizes:
- **CSS**: 22.88 KB (5.03 KB gzipped)
- **JavaScript**: 354.66 KB (109.65 KB gzipped)
- **Total**: ~115 KB (production ready!)

---

## 🎯 What's Ready

✅ Full website built
✅ All animations working
✅ Responsive on mobile, tablet, desktop
✅ Dark mode professional design
✅ Development server running
✅ Production build tested
✅ Ready for deployment
✅ Customization guides provided

---

## 📞 Important Links

- **Local Dev**: http://localhost:5173/
- **React Docs**: https://react.dev/
- **Tailwind Docs**: https://tailwindcss.com/
- **Vercel Deploy**: https://vercel.com/
- **Framer Motion**: https://www.framer.com/motion/

---

## 🎉 You're All Set!

Your professional agency website is ready to use!

**Current Status**: 
- ✅ Code: Complete
- ✅ Testing: Passed
- ✅ Ready to: Customize
- ✅ Ready to: Deploy

**Next Actions**:
1. Update content with your info
2. Add your images
3. Deploy to Vercel
4. Set up custom domain
5. Launch! 🚀

---

**Questions?** Check the README.md or DEPLOYMENT_GUIDE.md for more details.

**Happy Coding!** 💻✨
