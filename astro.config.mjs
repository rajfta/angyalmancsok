// @ts-nocheck

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	output: "server",
	adapter: vercel({ imageService: true, devImageService: "sharp" }),
	integrations: [mdx(), react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
