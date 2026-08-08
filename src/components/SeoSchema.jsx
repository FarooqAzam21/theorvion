// SeoSchema.jsx
// Reusable structured data component for The Orvion — drop this into your Layout
// or App root so it renders on every page via react-helmet-async.
//
// Usage:
//   import SeoSchema from "./SeoSchema";
//   ...
//   <SeoSchema />   // place once, e.g. inside your root Layout component
//
// This adds two JSON-LD blocks:
//   1. Organization — establishes who Orvion is, globally, with social profile links
//   2. ProfessionalService (LocalBusiness subtype) — anchors Karachi as HQ while
//      declaring worldwide service area, so it reinforces the local signal
//      WITHOUT touching your homepage copy, meta title, or meta description.

import { Helmet } from "react-helmet-async";

const SeoSchema = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Orvion",
    "alternateName": "Orvion",
    "url": "https://www.theorvion.io/",
    "logo": "https://www.theorvion.io/assets/logo.png",
    "description":
      "The Orvion builds premium, intelligent digital experiences — high-end web development, AI integration, and award-winning UI/UX design for growing businesses and tech leaders worldwide.",
    "email": "hello@theorvion.io",
    "sameAs": [
      "https://x.com/TheOrvion",
      "https://facebook.com/share/1DZYf1AYrt",
      "https://linkedin.com/company/the-orvion",
      "https://www.instagram.com/the_orvion"
    ],
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Karachi",
        "addressCountry": "PK"
      }
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "The Orvion",
    "image": "https://www.theorvion.io/assets/logo.png",
    "url": "https://www.theorvion.io/",
    "email": "hello@theorvion.io",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "addressCountry": "PK"
      // Add "streetAddress" and "postalCode" here once you have a public
      // business address you want listed — optional but strengthens local signal.
    },
    // areaServed left broad since Orvion is HQ'd in Karachi but works globally.
    "areaServed": [
      { "@type": "Country", "name": "Pakistan" },
      { "@type": "AdministrativeArea", "name": "Worldwide" }
    ],
    "serviceType": [
      "Digital Marketing",
      "Web Development",
      "AI Integration",
      "Software Development",
      "UI/UX Design",
      "Cloud Services"
    ],
    "sameAs": [
      "https://x.com/TheOrvion",
      "https://facebook.com/share/1DZYf1AYrt",
      "https://linkedin.com/company/the-orvion",
      "https://www.instagram.com/the_orvion"
    ]
  };

  return (
    <Helmet
      script={[
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(organizationSchema)
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify(localBusinessSchema)
        }
      ]}
    />
  );
};

export default SeoSchema;