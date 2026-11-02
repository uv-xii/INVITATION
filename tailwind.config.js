/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#712d2b',
          deep: '#532725',
          dark: '#321d1b',
          light: '#954640',
        },
        ivory: {
          DEFAULT: '#faf6ec',
          warm: '#fffdf8',
          dark: '#efe6d6',
          cream: '#f6efdf',
        },
        gold: {
          DEFAULT: '#b69459',
          antique: '#b69459',
          light: '#d8c18c',
          champagne: '#eee0c4',
          dark: '#806a40',
          shimmer: '#f3e7cb',
        },
        maroon: {
          DEFAULT: '#49332d',
          deep: '#352923',
          dark: '#241d19',
        },
        terracotta: {
          DEFAULT: '#a4523f',
          light: '#c27b61',
          dark: '#853d32',
        },
        champagne: {
          DEFAULT: '#eee0c4',
          light: '#f7eedc',
          dark: '#d1bd95',
        },
        leaf: {
          DEFAULT: '#36594c',
          deep: '#253e35',
          light: '#62816d',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'mandap-pattern': "radial-gradient(circle at center, rgba(196, 154, 80, 0.15) 0%, transparent 70%)",
        'royal-gradient': "linear-gradient(135deg, #781C32 0%, #591D2C 50%, #3F121E 100%)",
        'gold-foil': "linear-gradient(135deg, #E8D4B5 0%, #C49A50 50%, #DFBD78 80%, #9B7432 100%)",
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(196, 154, 80, 0.45)',
        'royal-card': '0 10px 30px -5px rgba(63, 18, 30, 0.15), 0 0 0 1px rgba(196, 154, 80, 0.25)',
        'seal': '0 10px 25px rgba(89, 29, 44, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}

