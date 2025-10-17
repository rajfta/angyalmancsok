import { defineCollection, z } from "astro:content";

const dogCollection = defineCollection({
	type: "content",
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
	type: "content",
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
	type: "content",
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
	type: "content",
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
	type: "content",
	schema: z.object({
		name: z.string(),
		logo: z.string(),
		website: z.string().optional(),
		priority: z.number().optional(),
	}),
});

const programCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string(), // Lucide icon name as string
		priority: z.number().optional(),
	}),
});

export const collections = {
	dogs: dogCollection,
	members: memberCollection,
	posts: postCollection,
	testimonials: testimonialCollection,
	partners: partnerCollection,
	programs: programCollection,
};
