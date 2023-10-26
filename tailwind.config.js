/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './build/*.html',
    './build/**/*.js',
    './build/**/*.jsx',
    './src/**/*.{html,js,jsx}'
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
