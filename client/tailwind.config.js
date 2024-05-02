/** @type {import('tailwindcss').Config} */
import { content, plugin } from 'flowbite-react/tailwind';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(),
  ],
};