/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/*.html',
    './dist/**/*.js',
    './src/**/*.{html,js}'
  ],
  important: '#root',
  plugins: [],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {}
  }
}
