/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Orvion palette (from image)
        void: "#030008",
        night: "#060112",
        deep: "#0a021c",
        surface: "#12052d",
        elevated: "#1a0840",
        // Accent palette (Vibrant Purple/Violet)
        violet: {
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        electric: "#bf80ff",
        fuchsia: {
          400: "#e879f9",
          500: "#d946ef",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        indigo: {
          400: "#818cf8",
          500: "#6366f1",
        },
        space: {
          700: "#1e1b4b",
          800: "#1e1b4b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.25), transparent)",
        "glow-conic": "conic-gradient(from 180deg at 50% 50%, #7c3aed, #06b6d4, #7c3aed)",
      },
      animation: {
        blob: "blob 8s infinite ease-in-out",
        "blob-slow": "blob 12s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "text-glow": "textGlow 3s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -60px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.88)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        textGlow: {
          "0%, 100%": { textShadow: "0 0 20px rgba(139,92,246,0.5)" },
          "50%": { textShadow: "0 0 40px rgba(139,92,246,0.9), 0 0 80px rgba(34,211,238,0.3)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        "glow-violet": "0 0 30px rgba(168, 85, 247, 0.4)",
        "glow-intense": "0 0 50px rgba(168, 85, 247, 0.6), 0 0 100px rgba(168, 85, 247, 0.2)",
        "glow-cyan": "0 0 30px rgba(34, 211, 238, 0.4)",
        "glow-sm": "0 0 15px rgba(139, 92, 246, 0.3)",
        "inner-glow": "inset 0 0 30px rgba(139, 92, 246, 0.1)",
        "card-premium": "0 25px 60px rgba(0,0,0,0.6), 0 0 1px rgba(139,92,246,0.3)",
        "card-hover": "0 35px 80px rgba(0,0,0,0.7), 0 0 40px rgba(139,92,246,0.2)",
      },
    },
  },
  plugins: [],
}
