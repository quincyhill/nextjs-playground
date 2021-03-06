module.exports = {
  purge: [
    // Use *.tsx if using TypeScript
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6670f3',
      },
    },
  },
  plugins: [],
}
