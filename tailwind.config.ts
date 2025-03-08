import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'slow-bounce': {
          '0%, 100%': { 
            transform: 'translateY(0)', 
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(-25%)', 
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          },
        },
        float: {
          '0%': { 
            transform: 'translateY(100vh) translateX(0)',
            opacity: '0.2'
          },
          '50%': {
            transform: 'translateX(20px)',
            opacity: '0.25'
          },
          '100%': { 
            transform: 'translateY(-100%) translateX(-20px)',
            opacity: '0'
          },
        },
        'float-reverse': {
          '0%': { 
            transform: 'translateY(-100%) translateX(0)',
            opacity: '0.2'
          },
          '50%': {
            transform: 'translateX(-20px)',
            opacity: '0.25'
          },
          '100%': { 
            transform: 'translateY(100vh) translateX(20px)',
            opacity: '0'
          },
        },
        'float-horizontal': {
          '0%': { 
            transform: 'translateX(-100%) translateY(0)',
            opacity: '0.2'
          },
          '50%': {
            transform: 'translateY(20px)',
            opacity: '0.25'
          },
          '100%': { 
            transform: 'translateX(100vw) translateY(-20px)',
            opacity: '0'
          },
        },
        pulse: {
          '0%, 100%': {
            opacity: '0.6',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.3',
            transform: 'scale(1.05)'
          },
        }
      },
      animation: {
        'slow-bounce': 'slow-bounce 3s infinite',
        float: 'float 15s infinite linear',
        'float-reverse': 'float-reverse 18s infinite linear',
        'float-horizontal': 'float-horizontal 20s infinite linear',
        'pulse': 'pulse 4s infinite ease-in-out',
        'float-slow': 'float 25s infinite linear',
        'float-fast': 'float 10s infinite linear'
      }
    },
  },
  plugins: [],
} satisfies Config;
