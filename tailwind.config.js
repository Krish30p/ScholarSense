/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090B',
        panel: '#111113',
        elevated: '#18181B',
        sidebar: '#0D0D0F',
        bordercol: '#1F1F23',
        primary: '#E4E4E7',
        muted: '#71717A',
        subtle: '#3F3F46',
        green: '#22C55E',
        red: '#EF4444',
        chartbar: '#27272A',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        bebas: ['"Bebas Neue"', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
