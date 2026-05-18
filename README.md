# Codexa - Modern Software Agency Website

A professional, high-conversion software agency website built with **React**, **Tailwind CSS**, and **Framer Motion**. Perfect for attracting international clients with its modern design and smooth animations.

## 🚀 Features

- **Hero Section** - Captivating landing section with animated background and CTA buttons
- **Services Section** - Modern card-based layout showcasing 8 core services
- **About Us** - Agency mission, vision, and key statistics
- **Team Section** - Showcase team members with social links
- **Portfolio** - Impressive project gallery with tech stack details
- **Technologies** - Display of tech stack mastery
- **Testimonials** - Client success stories with ratings
- **Contact Section** - Professional contact form and communication channels
- **Navigation** - Sticky header with smooth scrolling
- **Footer** - Comprehensive footer with links and social media

## 🛠 Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🏃 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx      # Header with sticky nav
│   ├── Hero.jsx           # Landing hero section
│   ├── Services.jsx       # Services showcase
│   ├── About.jsx          # About section with stats
│   ├── Team.jsx           # Team members gallery
│   ├── Portfolio.jsx      # Project showcase
│   ├── Technologies.jsx   # Tech stack display
│   ├── Testimonials.jsx   # Client testimonials
│   ├── Contact.jsx        # Contact form
│   └── Footer.jsx         # Footer section
├── App.jsx                # Main app component
├── main.jsx              # Entry point
├── index.css             # Tailwind CSS setup
└── App.css               # Additional styles
```

## 🎨 Design Features

### Color Scheme
- **Primary**: `#0f172a` (Dark navy)
- **Secondary**: `#1e293b` (Slate)
- **Accent**: `#3b82f6` (Blue)
- **Gradients**: Blue to Cyan combinations

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Smooth breakpoints at 640px, 768px, 1024px, 1280px

### Animations
- Fade-in effects on scroll
- Hover animations on cards and buttons
- Floating elements
- Smooth transitions

## 🔧 Customization

### Update Company Information

Edit the following files to customize for your agency:

1. **Navigation.jsx** - Update company name and navigation links
2. **Hero.jsx** - Change tagline and CTA buttons
3. **Services.jsx** - Update service list and descriptions
4. **About.jsx** - Add your mission, vision, and stats
5. **Team.jsx** - Add team members with their details
6. **Portfolio.jsx** - Showcase your projects
7. **Technologies.jsx** - Update tech stack
8. **Contact.jsx** - Update contact information
9. **Footer.jsx** - Update company details and links

### Modify Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: "#your-primary-color",
      secondary: "#your-secondary-color",
      accent: "#your-accent-color",
    },
  },
}
```

### Add Images

1. Place images in `public/` folder
2. Reference them in components:
```jsx
<img src="/image-name.jpg" alt="Description" />
```

## 📱 Responsive Features

- **Mobile Navigation** - Hamburger menu for screens < 768px
- **Flexible Layouts** - Grid adjusts from 1 to 4 columns
- **Touch-Friendly** - Larger buttons and spacing on mobile
- **Optimized Images** - Efficient resource loading

## 🚀 Deployment on Vercel

### Method 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Method 2: Using GitHub

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your repository
   - Click "Deploy"

### Method 3: Drag & Drop

```bash
npm run build
```

Then drag the `dist` folder to [vercel.com/new](https://vercel.com/new)

## 📝 Environment Variables

Create a `.env` file (optional):

```
VITE_API_URL=https://api.example.com
```

Access in components:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## ⚡ Performance Optimization

- **Code Splitting** - Lazy load components
- **Image Optimization** - Use modern formats (WebP)
- **CSS Minification** - Built by Tailwind
- **Framer Motion** - GPU-accelerated animations
- **SEO Ready** - Semantic HTML structure

## 🔐 Security

- XSS Protection via React
- CSRF tokens for forms
- No sensitive data in client code
- Regular dependency updates

## 📦 Build Optimization

The build includes:
- Minified CSS and JavaScript
- Tree-shaking for unused code
- Gzip compression support
- Modern module format

Build size: ~50-60KB (gzipped)

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
npm run build -- --debug
```

## 🤝 Contributing

Feel free to customize and improve this template for your agency!

## 📄 License

This template is provided as-is for commercial use.

## 📞 Support

For questions or issues:
- Check the Vite documentation: [vite.dev](https://vite.dev)
- React docs: [react.dev](https://react.dev)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
- Framer Motion: [framer.com/motion](https://framer.com/motion)

## 🎯 Next Steps

1. **Update Content** - Replace placeholder text with your agency's information
2. **Add Images** - Add your portfolio images and team photos
3. **Setup Forms** - Integrate contact form with your backend or service (Formspree, etc.)
4. **Customize Links** - Update social media and navigation links
5. **SEO Setup** - Update meta tags and add sitemap.xml
6. **Analytics** - Add Google Analytics or similar tracking
7. **Deploy** - Push to Vercel for live hosting

---

**Built with ❤️ for modern digital agencies**

Version 1.0.0 | Last Updated: April 2026

