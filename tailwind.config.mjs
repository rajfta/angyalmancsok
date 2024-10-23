/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                primary: "#81b3c9",
                bg: {
                    primary: "#e2dad2",
                    header: "#EEECEA",
                },
                text: {
                    primary: "#3b3b3b",
                },
            },
        },
    },
    plugins: [],
};
