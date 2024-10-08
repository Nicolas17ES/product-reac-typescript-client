// types.ts

// Define the structure of content for each section in the JSON file
export interface HomeContent {
    toast: string;
    title: string;
    subtitle: string;
    start: string;
}

export interface LoaderContent {
    load: string;
}

export interface PreviewButtonContent {
    hide: string;
    show: string;
}

export interface PreviewContent {
    opt_one: string;
    opt_two: string;
    title: string;
    button: string;
}

export interface TextareaContent {
    characters: string;
    allowed: string;
    placeholder: string;
    label: string;
}

export interface ImageMessageContent {
    toastone: string;
    toasttwo: string;
    title: string;
    label: string;
}

export interface NavigationContent {
    en: string;
    fr: string;
}

export interface ConfirmationContent {
    title: string;
    paragraph: string;
    again: string;
    visit: string;
}

// Define a type mapping keys to their content types
export type ContentMap = {
    home: HomeContent;
    loader: LoaderContent;
    previewButton: PreviewButtonContent;
    preview: PreviewContent;
    textarea: TextareaContent;
    imagemessage: ImageMessageContent;
    navigation: NavigationContent;
    confirmation: ConfirmationContent;
};

// Define a type for the content keys
export type ContentKey = keyof ContentMap;

// Define the content type for use in the hook
export type ContentType = ContentMap[ContentKey];
