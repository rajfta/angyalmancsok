/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f5f7ee",
                    100: "#e9ecdb",
                    200: "#d4dcba",
                    300: "#b8c591",
                    DEFAULT: "#a8b77e",
                    400: "#a8b77e",
                    500: "#809250",
                    600: "#63733d",
                    700: "#4c5932",
                    800: "#3f492b",
                    900: "#373f28",
                    950: "#1c2112",
                },
                secondary: {
                    50: "#faf6f2",
                    DEFAULT: "#f3eae1",
                    100: "#f3eae1",
                    200: "#e7d5c3",
                    300: "#d7b79a",
                    400: "#c59472",
                    500: "#b97b56",
                    600: "#ac694a",
                    700: "#8f533f",
                    800: "#744538",
                    900: "#5e3a30",
                    950: "#321d18",
                },
                almond: {
                    50: "#fef5ee",
                    DEFAULT: "#fde2ca", // true almond
                    100: "#fde2ca", // true almond
                    200: "#fbcfad",
                    300: "#f8ad79",
                    400: "#f48143",
                    500: "#f15f1e",
                    600: "#e24614",
                    700: "#bb3313",
                    800: "#952917",
                    900: "#782516",
                    950: "#410f09",
                },
                bg: {
                    DEFAULT: "#faf6f2",
                    header: "#f3eae1",
                },
                text: {
                    DEFAULT: "#1c2112",
                    description: "#1e293b",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
