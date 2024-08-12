import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#cc9966',
          50: '#c96'
        },
        secondary: {
          DEFAULT: '#cc6666',
        },
        black: {
          DEFAULT: "#000000",
          50: '#222',
          75: '#333',
          100: '#666666',
          200: '#999999',
          300: '#ebebeb',
          400: 'rgba(255, 255, 255, 0.1)',
          500: '#777',
          600: '#cccccc',
        },
      },
      width: {
        container: '1188px',
      },
      maxWidth: {
        container: '1188px',
      },
      boxShadow: {
        dropdown: '5px 10px 16px rgba(51, 51, 51, 0.05), -5px 10px 16px rgba(51, 51, 51, 0.05)',
        'mobile-nav': '0.1rem 0 0.6rem 0 rgba(51, 51, 51, 0.5)',
        variant: '0 0 0 1px #cccccc',
        thumbnail: '0 0 0 1px #c96',
      },
    },
  },
  plugins: [],
};
export default config;
