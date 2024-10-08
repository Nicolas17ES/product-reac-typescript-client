// UploadContext.tsx

import React, { createContext, useReducer, ReactNode } from 'react';
import type { UploadState, UploadAction } from '../../types.d.ts'; // Adjust path as needed
import uploadReducer from './UploadReducer';

// Initial state
export const initialState: UploadState = {
    isPDFReady: false,
    showPreview: false,
    selectedImage: null,
    language: 'en',
    displaySpinner: false,
    loadingMessage: '',
};

// Create the context with separate state values
const UploadContext = createContext<{
    isPDFReady: boolean;
    showPreview: boolean;
    selectedImage: File | null;
    language: 'en' | 'fr' | 'es';
    displaySpinner: boolean;
    loadingMessage: string;
    dispatch: React.Dispatch<UploadAction>;
}>({
    isPDFReady: initialState.isPDFReady,
    showPreview: initialState.showPreview,
    selectedImage: initialState.selectedImage,
    language: initialState.language,
    displaySpinner: initialState.displaySpinner,
    loadingMessage: initialState.loadingMessage,
    dispatch: () => undefined, // Default no-op dispatch function
});

interface UploadProviderProps {
    children: ReactNode;
}

export const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(uploadReducer, initialState);

    return (
        <UploadContext.Provider value={{
            isPDFReady: state.isPDFReady,
            showPreview: state.showPreview,
            selectedImage: state.selectedImage,
            language: state.language,
            displaySpinner: state.displaySpinner,
            loadingMessage: state.loadingMessage,
            dispatch,
        }}>
            {children}
        </UploadContext.Provider>
    );
};

export default UploadContext;

