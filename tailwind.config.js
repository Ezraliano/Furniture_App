/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f3f0',
          100: '#ede3d9',
          200: '#dbc4b4',
          300: '#c49d85',
          400: '#b17a5c',
          500: '#8b4513',
          600: '#7a3d11',
          700: '#693410',
          800: '#582c0e',
          900: '#47240c',
        },
        secondary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#b9e5b9',
          300: '#85d185',
          400: '#4db84d',
          500: '#228b22',
          600: '#1e7a1e',
          700: '#1a691a',
          800: '#165816',
          900: '#124712',
        },
        accent: {
          50: '#fffef0',
          100: '#fffcdb',
          200: '#fff8b8',
          300: '#fff085',
          400: '#ffe452',
          500: '#ffd700',
          600: '#e6c200',
          700: '#ccac00',
          800: '#b39700',
          900: '#998200',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}