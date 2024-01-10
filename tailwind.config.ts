import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        '9/10': '89%',
        '8.5/10': '85%',
      },
      margin: {
        "mt-53": "53px"
      }
    },
  },
  plugins: [],
} satisfies Config;
