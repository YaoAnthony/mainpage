/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#3A89C9",
        "secondary": "#9CC4E4",
        "tertiary": "#E9F2F9",
        "font" : "#1B325F",
        "accent" : "#D15656",
        "accept" : "#32a852",
        "gray-200" : "#F5F5F5",
        "white-placeholder" : "#F5F5F5",
        "white-background" : "#ffffff1a",
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      scale: {
        '200': '2',
        '175': '1.75',
        '150': '1.5',
        '125': '1.25',
        '110': '1.1',
        '90': '0.9',
        '75': '0.75',
        '50': '0.5',
        '25': '0.25',
      },
      padding: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '18': '4.5rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '40': '10rem',
        '45': '11.25rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
      }, 
      boxShadow :{
        "default": "rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px",
        "product": "rgba(0,0,0,0.08) 0 4px 15px",
        "search": 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      },
      fontFamily: { 
        erode: ['ErodeFont'],
        loraFont: ['LoraFont'],
      },
    },
  },
  plugins: [],
}
