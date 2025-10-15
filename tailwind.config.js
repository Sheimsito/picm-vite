/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // IMPORTANTE: Desactiva el reset de Tailwind
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#4F8CD9',
        'primary-hover': '#9cc5f4a8',
        bg: '#FFFFFF',
        'bg-secondary': '#F5F7FA',
        text: '#2E2E2E',
        'text-secondary': '#6B6B6B',
        success: '#6ECF8E',
        error: '#ec6e6e',
        border: '#E0E0E0',
      },
      boxShadow: {
        soft: '0 2px 5px rgba(0, 0, 0, 0.05)',
        medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
