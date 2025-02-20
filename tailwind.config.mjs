/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'media',
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Inter, monospace'
    },
    extend: {
      backgroundImage: {
        'gradient-light':
          "'radial-gradient(ellipse at 50% 50%, hsl(200, 100%, 97%), hsl(0, 0%, 100%))'",
        'gradient-dark':
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }]
      },
      colors: {
        mainbg: '#f3f4f6',

        dark: {
          mainbg: '#0c1017',
          lightbg: '#151c28',
          lighterbg: '#1c2535',
          darkbg: '#05070a',
          main: '#f3f4f6',
          notactive: '#8f9195',
          mainhover: '#c2c9d6',
          sec: '#82a0b8',
          focus: 'hsla(210, 98%, 42%, 0.5)',
          focusbord: '#027af2',
          placeholder: '#3c455a',
          mainborder: '#212732',
          mainborderhover: '#566481',
          menuactive: '#1d2430',
          menuhover: '#141a23',
          menuactivehover: '#2a3140'
        },

        mainfont: '#7f8d8e'
      }
    }
  },
  plugins: []
}
