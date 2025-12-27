import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        editions: {
          gold: "hsl(var(--editions-gold))",
          purple: "hsl(var(--editions-purple))",
          blue: "hsl(var(--editions-blue))",
          green: "hsl(var(--editions-green))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-in": { from: { opacity: "0", transform: "translateY(30px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in-up": { from: { opacity: "0", transform: "translateY(60px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in-down": { from: { opacity: "0", transform: "translateY(-30px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in-left": { from: { opacity: "0", transform: "translateX(-50px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "fade-in-right": { from: { opacity: "0", transform: "translateX(50px)" }, to: { opacity: "1", transform: "translateX(0)" } },
        "scroll-bounce": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(10px)" } },
        "rotate-slow": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "scale-up": { from: { opacity: "0", transform: "scale(0.8)" }, to: { opacity: "1", transform: "scale(1)" } },
        "blur-in": { from: { opacity: "0", filter: "blur(20px)" }, to: { opacity: "1", filter: "blur(0)" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(100%)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "shimmer": { from: { backgroundPosition: "-200% 0" }, to: { backgroundPosition: "200% 0" } },
        "float": { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-20px)" } },
        "pulse-glow": { "0%, 100%": { opacity: "0.4", transform: "scale(1)" }, "50%": { opacity: "0.8", transform: "scale(1.05)" } },
        "gradient-shift": { "0%, 100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fade-in-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-left": "fade-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-right": "fade-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 30s linear infinite",
        "scale-up": "scale-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "blur-in": "blur-in 1s ease-out forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
