/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.js',
    'dist/**/*.html',
    'templates/**/*.liquid',
    'snippets/**/*.liquid',
    'layout/**/*.liquid',
    'sections/**/*.liquid',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '520px',
      'md': '768px',
      'lg': '976px',
      'xl': '1440px',
      '2xl': '1536px',
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': {
        DEFAULT: '#212529'
      }
    },
    spacing: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
    },
    extend: {},
  },
  plugins: [],
}
