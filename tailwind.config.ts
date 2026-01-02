import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "2rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-border))",
        ring: "hsl(var(--color-primary))",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-text-primary))",

        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          light: "hsl(var(--color-primary-light))",
          dark: "hsl(var(--color-primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          light: "hsl(var(--color-secondary-light))",
          dark: "hsl(var(--color-secondary-dark))",
        },
        success: {
          DEFAULT: "hsl(var(--color-success))",
          light: "hsl(var(--color-success-light))",
          bg: "hsl(var(--color-success-bg))",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning))",
          light: "hsl(var(--color-warning-light))",
          bg: "hsl(var(--color-warning-bg))",
        },
        danger: {
          DEFAULT: "hsl(var(--color-danger))",
          light: "hsl(var(--color-danger-light))",
          bg: "hsl(var(--color-danger-bg))",
        },
      },

      fontFamily: {
        sans: ["var(--font-primary)"],
      },

      fontSize: {
        "display-xl": "var(--font-size-display-xl)",
        "display-lg": "var(--font-size-display-lg)",
        "display-md": "var(--font-size-display-md)",
      },

      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
      },

      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        primary: "var(--shadow-primary)",
        secondary: "var(--shadow-secondary)",
      },

      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [animate],
};

export default config;
