/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f1f7fa",
					100: "#dcebf1",
					200: "#bed8e3",
					400: "#5c97b4",
					500: "#407c9a",
					600: "#386682",
					700: "#33546b",
					800: "#30485a",
					900: "#2c3e4d",
					950: "#192733",
					DEFAULT: "#81b3c9",
				},
				secondary: {
					50: "#faf7f2",
					100: "#f3ede1",
					200: "#e6d8c2",
					300: "#d5be9c",
					400: "#c9a881",
					500: "#b78858",
					600: "#a9744d",
					700: "#8d5e41",
					800: "#724d3a",
					900: "#5d4031",
					950: "#322018",
				},
				accent: {
					50: "#fbf7fc",
					100: "#f8eef9",
					200: "#efdcf2",
					300: "#e3c0e7",
					400: "#d29bd7",
					600: "#a153a6",
					700: "#854388",
					800: "#6f3870",
					900: "#5d325d",
					950: "#3b173b",
					DEFAULT: "#c381c9",
				},
				enid: "#A6A7AC",
				bg: {
					DEFAULT: "#f3ede1",
					highlight: "#F1F1EF",
					header: "#f3ede1",
					"header-scrolled": "#e8e3da",
				},
				text: {
					heading: "#475569",
					DEFAULT: "#020617",
					description: "#475569",
					muted: "#94a3b8",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			rotate: {
				"x-90": "rotateX(90deg)",
				"-x-90": "rotateX(-90deg)",
			},
			transitionTimingFunction: {
				perspective: "cubic-bezier(0.76, 0, 0.24, 1)",
			},
			transitionDuration: {
				750: "750ms",
				1000: "1000ms",
			},
			zIndex: {
				100: "100",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
