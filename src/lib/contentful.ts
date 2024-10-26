import { createClient, type Asset } from "contentful";

export const contentfulClient = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.DEV
        ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
        : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
    host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export function isAssetLink(link: any): link is Asset {
    return link && link.sys && link.sys.type === "Asset";
}
