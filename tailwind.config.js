/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Inconsolata', 'monospace'], 
        cursive: ['"Dancing Script"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        handwritten: ['"Pacifico"', 'cursive'], 
        fancy: ['"Great Vibes"', 'cursive'],
        body: ['Lato', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        slab: ['"Roboto Slab"', 'serif'],
      }, 
    },
  },
  plugins: [],
}

