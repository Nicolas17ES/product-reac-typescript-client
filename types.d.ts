export interface UploadState {
    isPDFReady: boolean;
    showPreview: boolean;
    selectedImage: File | null; // Adjust based on the type of selectedImage
    language: 'en' | 'fr' | 'es'; // Example: add more languages as needed
    displaySpinner: boolean;
    loadingMessage: string;
}


export type UploadAction =
    | { type: 'SET_IS_PDF_READY'; payload: boolean }
    | { type: 'SET_SHOW_PREVIEW'; payload: boolean }
    | { type: 'SET_SELECTED_IMAGE'; payload: File | null }
    | { type: 'SET_LANGUAGE'; payload: 'en' | 'fr' | 'es' }
    | { type: 'SET_IS_LOADING'; payload: boolean }
    | { type: 'SET_DISPLAY_SPINNER'; payload: boolean }
    | { type: 'SET_LOADING_MESSAGE'; payload: string }
    | { type: 'RESET_STATE'};


export interface TextAreaProps {
    value: string;
    maxLength: number;
    messageSetter: (message: string) => void;
}

export type ModalPortalProps = ReactNode;

export type Dispatch = React.Dispatch<UploadAction>



export interface formData {

}


export type Image = string;

export type ImageName = string;

export interface PreviewProps {
    message: string;
    image: Image;
    name: ImageName;
}

export interface Dimensions {
    imageHeight: number;
    imageWidth: number;
    textHeight: number;
}

export interface ImagePreviewProps {
    image: Image; 
    message: string;
    dimensions: Dimensions;
    onLoad: () => void;
    loadingState?: boolean;
    option: string;
}

export interface SelectButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>; // Standard MouseEvent handler type
    text: string;
}

export interface UploadImageProps {
    dispatch: Dispatch;
    formData: FormData;
}
