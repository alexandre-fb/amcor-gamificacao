/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    fontFamily: {
      rem: ['REM', 'sans-serif'],
    },
    extend: {
      colors: {
        'amcor-dark-blue': '#00395A',
        'amcor-light-blue': '#00A1DE',
        'amcor-green': '#00A551',
      },
      backgroundImage: {
        'amcor-desk-lg': "url('/images/backgrounds/bg-amcor-desk-lg.webp')",
        'amcor-desk': "url('/images/backgrounds/bg-amcor-desk.webp')",
        'amcor-mobile': "url('/images/backgrounds/bg-amcor-mobile.webp')",
      },
      maxWidth: {
        'container': '1300px'
      },
      lineHeight: {
        initial: 'initial'
      },
      screens: {
        'w1315': '1315px',
        'w1295': '1295px',
        'w1150': '1150px',
        'w710': '710px',
        'w694': '694px',
        'w653': '653px',
        'w640': '640px',
        'w525': '525px',
        'w425': '425px',
      },
      borderRadius: {
        '20': '20px',
      },
      fontSize: {
        '13': '0.813rem' //13px
      }
    }
  },
  plugins: [],
}

