/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

module.exports = {
  'content': [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: '#fdbd10',
      secondary: '#a6a6a6',
      accent: '#ffefc6',
      danger: '#ef5a56',
      light: '#fafafa',
      font: '#292929'
    }
  },
  plugins: [
    
  ],
};
