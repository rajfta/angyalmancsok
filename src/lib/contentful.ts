import { type Asset, createClient, type Entry } from "contentful";

export const contentfulClient = createClient({
	space: import.meta.env.CONTENTFUL_SPACE_ID,
	accessToken: import.meta.env.DEV
		? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
		: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
	host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export function isAssetLink(link: unknown): link is Asset {
	return (
		typeof link === "object" &&
		link !== null &&
		"sys" in link &&
		typeof link.sys === "object" &&
		link.sys !== null &&
		"type" in link.sys &&
		link.sys.type === "Asset"
	);
}

export function isEntryLink(link: unknown): link is Entry {
	return (
		typeof link === "object" &&
		link !== null &&
		"sys" in link &&
		typeof link.sys === "object" &&
		link.sys !== null &&
		"type" in link.sys &&
		link.sys.type === "Entry"
	);
}
