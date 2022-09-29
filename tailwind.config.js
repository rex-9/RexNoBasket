/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#1a202c',
        primary: '#0297a5',
        primaryHover: '#00c5e9',
        danger: '#f7665e',
        dangerHover: '#ff0a19',
      },
    },
  },
  plugins: [],
};
