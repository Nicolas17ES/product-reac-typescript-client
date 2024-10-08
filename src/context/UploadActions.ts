import type { UploadImageProps} from '../../types.d.ts'; 
import { toast } from 'react-toastify'; 

interface ErrorResponse {
    error?: string;
}

export const uploadImage = async ({ dispatch, formData }: UploadImageProps): Promise<void> => {

    dispatch({ type: 'SET_LOADING_MESSAGE', payload: 'Generating PDF...' });
    // Extract the file name from FormData and remove any image file extension
    const fileNameWithExtension = formData.get('name') as string || 'generated'; // Default to 'generated' if no name is provided
    const fileName = fileNameWithExtension.replace(/\.(jpg|jpeg|png)$/i, ''); // Remove image file extensions (jpg, jpeg, png)

    try {
        // Send a POST request to upload the image and generate a PDF
        const response = await fetch("/pdf/generate", {
            method: "POST", // HTTP method for the request
            body: formData, // The FormData object containing the image
        });

        // Check if the response is not OK (status code outside of 200-299 range)
        if (!response.ok) {
            // Attempt to read the response body as JSON
            const errorResponse: ErrorResponse =  await response.json();
            const errorMessage = errorResponse.error || 'An unknown error occurred'; // Default error message
            toast.error(`Error: ${errorMessage}`); // Display error notification
            dispatch({ type: 'SET_LOADING_MESSAGE', payload: '' });
            dispatch({ type: 'SET_IS_LOADING', payload: false });
            throw new Error(`HTTP error! status: ${response.status} - ${errorMessage}`); // Throw an error with status and message
        }

        // Get the response as a Blob (binary data)
        const blob: Blob = await response.blob();

        // Create a URL for the Blob to trigger a file download
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = window.URL.createObjectURL(blob); // Create a URL for the Blob object
        link.download = `${fileName}.pdf`; // Set the filename for the downloaded PDF
        link.click(); // Trigger the download by simulating a click

        // Clean up the URL object to free memory
        window.URL.revokeObjectURL(link.href);

        // Dispatch actions to update the state
        dispatch({ type: 'SET_IS_LOADING', payload: false }); // Hide loading spinner
        dispatch({ type: 'SET_IS_PDF_READY', payload: true }); // Set PDF ready state to true
        dispatch({ type: 'SET_LOADING_MESSAGE', payload: '' });

        return


    } catch (error: any) { // Catch block with type any to cover all error types
        const errorMessage = error.message || 'An unknown error occurred'; // Default error message
        toast.error(`Error: ${errorMessage}`); // Display error notification

        // Ensure loading state is updated in case of error
        dispatch({ type: 'SET_LOADING_MESSAGE', payload: '' });
        dispatch({ type: 'SET_IS_LOADING', payload: false });
    }

};