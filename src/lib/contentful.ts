import { type EntryFieldTypes, createClient } from "contentful";

export interface Post {
    contentTypeId: "post";
    fields: {
        title: EntryFieldTypes.Text;
        slug: EntryFieldTypes.Text;
        thumbnail: EntryFieldTypes.AssetLink;
        description: EntryFieldTypes.Text;
        date: EntryFieldTypes.Date;
        content: EntryFieldTypes.RichText;
        priority: EntryFieldTypes.Number;
        gallery: EntryFieldTypes.AssetLink[];
    };
}

export const contentfulClient = createClient({
    space: import.meta.env.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.DEV
        ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
        : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
    host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
