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
        void: 'var(--bg-void)',
        panel: 'var(--bg-panel)',
        surface: 'var(--bg-surface)',
        border: 'var(--border)',
        'accent-amber': 'var(--accent-amber)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-red': 'var(--accent-red)',
        'accent-green': 'var(--accent-green)',
        'text-primary': 'var(--text-primary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        bebas: ['"Bebas Neue"', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
