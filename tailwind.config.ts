import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        brand: {
          purple: '#9333EA',
          'purple-light': '#A855F7',
          'purple-dark': '#7E22CE',
          pink: '#EC4899',
          'pink-light': '#F472B6',
          'pink-dark': '#DB2777',
        },
        neon: {
          purple: '#9333EA',
          'purple-light': '#A855F7',
          'purple-vivid': '#7E22CE',
          pink: '#EC4899',
          'pink-light': '#F472B6',
          blue: '#1eaedb',
          'sky-blue': '#33c3f0',
        },
        glass: {
          dark: 'rgba(0, 0, 0, 0.1)',
          light: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.05)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #9b87f5, 0 0 10px #9b87f5, 0 0 15px #9b87f5' 
          },
          '50%': { 
            boxShadow: '0 0 10px #33c3f0, 0 0 20px #33c3f0, 0 0 30px #33c3f0' 
          }
        },
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 15px #9333EA, 0 0 30px #9333EA'
          },
          '50%': {
            'box-shadow': '0 0 25px #EC4899, 0 0 50px #EC4899'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'glow-pulse': 'glow-pulse 3s infinite',
        'gradient': 'gradient 8s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out'
      },
      boxShadow: {
        'neon-purple': '0 0 5px #9b87f5, 0 0 10px #9b87f5',
        'neon-blue': '0 0 5px #33c3f0, 0 0 10px #33c3f0',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, #9333EA 0%, #EC4899 100%)',
        'neon-glow': 'linear-gradient(90deg, #9333EA 0%, #EC4899 100%)',
        'gradient-sharp': 'linear-gradient(60deg, #9333EA 0%, #EC4899 100%)',
        'gradient-smooth': 'linear-gradient(90deg, rgba(147,51,234,0.2) 0%, rgba(236,72,153,0.2) 100%)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
