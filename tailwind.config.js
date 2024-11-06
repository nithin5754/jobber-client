/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        warning: "#f0ad4e",
        success: "#5cb85c",
        error: "#d9534f",
        info: "#5bc0de",
        customPurple: 'rgb(184, 44, 180)',
        customViolet:'rgb(118, 33, 179)'
      },
      colors: {
        customPurple: 'rgb(184, 44, 180)',
        customViolet:'rgb(118, 33, 179)'
      },
      border: {
        grey: "#e8e8e8",
             customPurple: 'rgb(184, 44, 180)',
        customViolet:'rgb(118, 33, 179)'
      },
      outline: {
        grey: "#e8e8e8",
             customPurple: 'rgb(184, 44, 180)',
        customViolet:'rgb(118, 33, 179)'
      },
      divide: {
        grey: "#e8e8e8",
             customPurple: 'rgb(184, 44, 180)',
        customViolet:'rgb(118, 33, 179)'
      },
    },
  },
  plugins: [],
};
