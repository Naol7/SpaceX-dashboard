/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'space-blue': '#0B3D91',
          'rocket-red': '#FC3D21',
          'launch-orange': '#FFA630',
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          mono: ['Space Mono', 'monospace']
        }
      },
    },
    plugins: [],
  }