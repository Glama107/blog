module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    './node_modules/flowbite-react/**/*.js'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '2/3': '66.666667%',
      },
      backgroundImage: {
        light_bg: "url('../public/bg.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    ('flowbite/plugin'),
  ],
};
