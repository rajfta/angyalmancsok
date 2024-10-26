import type { Asset, Entry, EntryFields } from "contentful";

export interface TypePostFields {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    thumbnail: Asset;
    description: EntryFields.Text;
    date: EntryFields.Date;
    content?: EntryFields.RichText;
    priority?: EntryFields.Integer;
    gallery?: Asset[];
}

export type TypePost = Entry<TypePostFields>;
