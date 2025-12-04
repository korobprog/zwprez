import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--text-main)",
            },
            fontFamily: {
                sans: ["var(--font-sans)"],
                heading: ["var(--font-heading)"],
            },
        },
    },
    plugins: [],
};
export default config;
