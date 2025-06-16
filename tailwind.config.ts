// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class", // enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
