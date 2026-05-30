// HelmetConfig.jsx
// Install first: npm install react-helmet-async
// Wrap your App with <HelmetProvider> in main.jsx or index.js

import { Helmet } from "react-helmet-async";

const pageMeta = {
  "/": {
    title: "The Orvion | Intelligence in Every Layer",
    description:
      "The Orvion builds premium, intelligent digital experiences. High-end web development, AI integration, and award-winning UI/UX design for global tech leaders.",
    keywords: "web development, AI solutions, digital agency, premium design, SaaS website, software house, tech brand",
  },
  "/services": {
    title: "Our Services | The Orvion",
    description:
      "Explore The Orvion's full range of services — from custom web development and AI integrations to UI/UX design and SaaS product building.",
    keywords: "web development services, AI integration, UI UX design, SaaS development, software agency services",
  },
  "/about": {
    title: "About Us | The Orvion",
    description:
      "Learn about The Orvion — a premium digital agency crafting intelligent, high-performance web experiences for forward-thinking brands worldwide.",
    keywords: "about The Orvion, digital agency team, web development company, who we are",
  },
  "/why-us": {
    title: "Why Choose The Orvion | The Orvion",
    description:
      "Discover why global tech leaders trust The Orvion for their most critical digital products. Premium quality, AI-first thinking, and results that speak.",
    keywords: "why choose The Orvion, best digital agency, premium web agency, AI-first development",
  },
  "/contact": {
    title: "Contact Us | The Orvion",
    description:
      "Get in touch with The Orvion. Let's build something extraordinary together — reach out to discuss your project today.",
    keywords: "contact The Orvion, hire web agency, project inquiry, get in touch",
  },
};

const SEO = ({ path }) => {
  const meta = pageMeta[path] || pageMeta["/"];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content="The Orvion" />
      <link rel="canonical" href={`https://www.theorvion.io${path}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.theorvion.io${path}`} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content="https://www.theorvion.io/og-image.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://www.theorvion.io${path}`} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://www.theorvion.io/og-image.png" />
    </Helmet>
  );
};

export default SEO;

// ─────────────────────────────────────────────
// USAGE — add <SEO path="/about" /> at the top
// of each page component. Example:
//
// import SEO from "../components/HelmetConfig";
//
// const AboutPage = () => (
//   <>
//     <SEO path="/about" />
//     <main>... your page content ...</main>
//   </>
// );
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// SETUP — in your main.jsx / index.js:
//
// import { HelmetProvider } from "react-helmet-async";
//
// <HelmetProvider>
//   <App />
// </HelmetProvider>
// ─────────────────────────────────────────────
