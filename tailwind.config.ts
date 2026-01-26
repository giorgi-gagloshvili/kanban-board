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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#4a53fa",
      },
      fontFamily: {
        poppins: ["poppins, sans-serif"],
        "poppins-bold": ["poppins-bold, sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
