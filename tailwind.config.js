/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(12, 131, 254, 0.7), 0 0 10px rgba(12, 131, 254, 0.5)' },
          '100%': { boxShadow: '0 0 10px rgba(12, 131, 254, 0.9), 0 0 20px rgba(12, 131, 254, 0.7), 0 0 30px rgba(0, 255, 136, 0.5)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 10px rgba(12, 131, 254, 0.7), 0 0 20px rgba(12, 131, 254, 0.4)',
        'glow-green': '0 0 10px rgba(0, 255, 136, 0.7), 0 0 20px rgba(0, 255, 136, 0.4)',
      },
    },
  },
  plugins: [],
}
