// MockUploadContext.tsx

import React, { createContext, useReducer, ReactNode } from 'react';
import uploadReducer from '../../src/context/UploadReducer'; // Adjust the path as necessary
import { UploadState, UploadAction } from '../../types'; // Adjust path as needed

export const mockInitialState: UploadState = {
    isPDFReady: false,
    showPreview: false,
    selectedImage: null,
    language: 'en',
    displaySpinner: false,
    loadingMessage: '',
};

export const UploadContext = createContext<{
    state: UploadState;
    dispatch: React.Dispatch<UploadAction>;
}>({
    state: mockInitialState,
    dispatch: () => undefined, // Default no-op dispatch function
});

interface MockUploadProviderProps {
    children: ReactNode;
}

export const MockUploadProvider: React.FC<MockUploadProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(uploadReducer, mockInitialState);

    return (
        <UploadContext.Provider value={{ state, dispatch }}>
            {children}
        </UploadContext.Provider>
    );
};
