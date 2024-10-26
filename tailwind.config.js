// module.exports = {
//   content: [
//     './entrypoints/popup/**/*.{html,js,ts,tsx}'
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: ["assets/**", "entrypoints/**", "components/**"],
  theme: {
    extend: {
      important: true,
    },
  },
  plugins: [],
};