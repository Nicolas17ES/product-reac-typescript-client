import { useState } from "react"; // Import the useState hook from React for managing state
import * as htmlToImage from 'html-to-image'; // Import html-to-image library for capturing HTML as images
import { uploadImage } from '../context/UploadActions'
import type { Dispatch, ImageName } from '../../types.d.ts'; // Adjust the import path as needed


type CapturedImage = HTMLElement | null;

interface UseCaptureImageReturn {
    handleSubmit: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>);
    handleSelectImage: ((imageNumber: number) => void);
    capturedImage: CapturedImage;
}



const useCaptureImage = (dispatch: Dispatch, name: ImageName): UseCaptureImageReturn => {

    const [capturedImage, setCapturedImage] = useState<CapturedImage>(null);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {

        e.preventDefault(); // Prevent default form submission behavior
        dispatch({ type: 'SET_IS_LOADING', payload: true }); // Set loading state to true
        dispatch({ type: 'SET_LOADING_MESSAGE', payload: 'Transforming image...' });

        let element: CapturedImage = capturedImage ? capturedImage : document.querySelector('.preview-container');

        if (element) {
            try {
                // Capture the element as a PNG image
                const dataUrl: string | undefined = await htmlToImage.toPng(element, {
                    backgroundColor: undefined,
                    height: 500,
                    width: 500,
                    quality: 0.8
                });

                if (dataUrl) {
                    // Convert the data URL to a Blob
                    const response: Response = await fetch(dataUrl);
                    const blob: Blob = await response.blob();
                    // Create a File object from the Blob
                    const file: File = new File([blob], name, { type: 'image/png' });

                    // Create a FormData object to hold the file and name
                    const formData: FormData = new FormData();
                    formData.append('image', file);
                    formData.append('name', name);

                    // Upload the image using the uploadImage action
                    await uploadImage({dispatch, formData});
                } else {
                    throw new Error("Failed to capture image as data URL.");
                }

            } catch (error) {
                // Log any errors that occur during the image capture or upload process
                console.error("Error capturing image:", error);
            }
        }

    }

    const handleSelectImage = (imageNumber: number): void => {
        // Select the image container based on the provided number
        const container: CapturedImage = imageNumber === 1 ? document.querySelector('.preview-container-one') : document.querySelector('.preview-container-two');
        setCapturedImage(container); // Set the selected image container
    };

    return {
        handleSubmit,        // Function to handle form submission and image upload
        handleSelectImage,  // Function to select the image element to be captured
        capturedImage        // The currently selected image element or null if not selected
    };

}


export default useCaptureImage;