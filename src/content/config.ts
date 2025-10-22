import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const dogCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/dogs" }),
	schema: z.object({
		name: z.string(),
		thumbnail: z.string(),
		photoWithOwner: z.string().optional(),
		nicknames: z.array(z.string()).optional(),
		workplaces: z.array(z.string()).optional(),
		owner: z.string().optional(), // Reference to member ID
		certificates: z.array(z.enum(["SEGÍTŐ", "TANULÓ", "TERÁPIÁS"])).optional(),
		priority: z.number(),
	}),
});

const memberCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/members" }),
	schema: z.object({
		name: z.string(),
		picture: z.string(),
		role: z.string(),
		dogs: z.array(z.string()).optional(),
		titles: z.string().optional(),
		priority: z.number(),
	}),
});

const postCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		thumbnail: z.string().optional(),
		description: z.string().optional(),
		date: z.date(),
		priority: z.number().optional(),
		gallery: z.array(z.string()).optional(),
	}),
});

const testimonialCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/testimonials" }),
	schema: z.object({
		quote: z.string(),
		author: z.string(),
		dogName: z.string(),
		handlerName: z.string(),
		dogPhoto: z.string(),
		priority: z.number().optional(),
	}),
});

const partnerCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/partners" }),
	schema: z.object({
		name: z.string(),
		logo: z.string(),
		website: z.string().optional(),
		priority: z.number().optional(),
	}),
});

const programCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/programs" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string(), // Lucide icon name as string
		imageUrl: z.string().optional(),
		priority: z.number().optional(),
	}),
});

const aboutCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/about" }),
	schema: z.object({
		title: z.string(),
		content: z.string(),
		image: z.string().optional(),
		icon: z.string().optional(), // Lucide icon name as string
		priority: z.number(),
	}),
});

const contactCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/contact" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string().optional(),
		icon: z.string().optional(), // Lucide icon name as string
		sectionType: z.enum(["hero", "volunteer", "requirements", "process"]),
		priority: z.number().optional(),
		tasks: z.array(z.string()).optional(), // For volunteer tasks list
		steps: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			)
			.optional(), // For process steps
		requirements: z
			.array(
				z.object({
					title: z.string(),
					description: z.string(),
				}),
			)
			.optional(), // For requirements list
	}),
});

export const collections = {
	dogs: dogCollection,
	members: memberCollection,
	posts: postCollection,
	testimonials: testimonialCollection,
	partners: partnerCollection,
	programs: programCollection,
	about: aboutCollection,
	contact: contactCollection,
};
