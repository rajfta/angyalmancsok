import type {
    Asset,
    ChainModifiers,
    Entry,
    EntryFieldTypes,
    EntrySkeletonType,
    LocaleCode,
} from "contentful";

export interface Dog {
    name: string;
    thumbnail: Asset<undefined, string> | null;
    photoWithOwner: Asset<undefined, string> | null;
    nicknames: string[] | undefined;
    workplaces: string[] | undefined;
    ownerName: string;
    priority: number;
    content: any;
    certificates: ("SEGÍTŐ" | "TANULÓ" | "TERÁPIÁS")[];
}

export interface TypeDogFields {
    name: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    photoWithOwner: EntryFieldTypes.AssetLink;
    nicknames?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    workplaces?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    owner: EntryFieldTypes.EntryLink<TypeMemberSkeleton>;
    content: EntryFieldTypes.RichText;
    priority: EntryFieldTypes.Integer;
    certificates: EntryFieldTypes.Array<
        EntryFieldTypes.Symbol<"SEGÍTŐ" | "TANULÓ" | "TERÁPIÁS">
    >;
}

export type TypeDogSkeleton = EntrySkeletonType<TypeDogFields, "dog">;
export type TypeDog<
    Modifiers extends ChainModifiers,
    Locales extends LocaleCode = LocaleCode,
> = Entry<TypeDogSkeleton, Modifiers, Locales>;

export interface TypeMemberFields {
    name: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    certificates?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    content: EntryFieldTypes.RichText;
    dogs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeDogSkeleton>>;
    priority?: EntryFieldTypes.Integer;
}

export type TypeMemberSkeleton = EntrySkeletonType<TypeMemberFields, "member">;
export type TypeMember<
    Modifiers extends ChainModifiers,
    Locales extends LocaleCode = LocaleCode,
> = Entry<TypeMemberSkeleton, Modifiers, Locales>;

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
    date: EntryFieldTypes.Date;
    content?: EntryFieldTypes.RichText;
    priority?: EntryFieldTypes.Integer;
    gallery?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<
    Modifiers extends ChainModifiers,
    Locales extends LocaleCode = LocaleCode,
> = Entry<TypePostSkeleton, Modifiers, Locales>;
