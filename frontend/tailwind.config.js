module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e5e7eb',
          100: '#6f40ed',
          200: '#3f56eb',
          300: '#1d1c44',
          400: '#0f172a'
        },
      },
    },
  },
  plugins: [],
};
