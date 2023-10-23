/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/*.html', './dist/**/*.js'],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
