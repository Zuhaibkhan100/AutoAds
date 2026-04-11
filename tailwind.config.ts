import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B0B0B",
        accent: "#FFD60A",
        secondary: "#FFFFFF",
        highlight: "#3A86FF"
      },
    },
  },
  plugins: [],
};
export default config;
