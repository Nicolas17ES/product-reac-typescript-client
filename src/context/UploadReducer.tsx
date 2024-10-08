import type { UploadState, UploadAction } from '../../types';
import { initialState } from "./UploadContext"; // Import the initial state from UploadContext

const uploadReducer = (state: UploadState, action: UploadAction): UploadState => {
    switch (action.type) {
        case 'SET_IS_PDF_READY':
            return { ...state, isPDFReady: action.payload };
        case 'SET_SHOW_PREVIEW':
            return { ...state, showPreview: action.payload };
        case 'SET_SELECTED_IMAGE':
            return { ...state, selectedImage: action.payload };
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        case 'SET_DISPLAY_SPINNER':
            return { ...state, displaySpinner: action.payload };
        case 'SET_LOADING_MESSAGE':
            return { ...state, loadingMessage: action.payload };
        case 'RESET_STATE':
            return {
                ...initialState, // Reset all state values to their initial values
                language: state.language, // Preserve the current language setting
            };
        default:
            return state;
    }
};

export default uploadReducer;
