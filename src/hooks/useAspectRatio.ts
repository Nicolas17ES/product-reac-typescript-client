import { useState, useEffect, RefObject } from "react"; 
import type { Dimensions } from '../../types.d.ts'; // Adjust the import path as needed


type Width = number;
type Ratio = number | null;
type LoadingState = boolean;


interface UseAspectRatioReturn {
    dimensionsImageOne: Dimensions;
    dimensionsImageTwo: Dimensions;
    aspectRatio: Ratio;
    isLoading: LoadingState;
    handleImageLoad: (imageRef: RefObject<HTMLImageElement>) => void;
}



const useAspectRatio = (): UseAspectRatioReturn => {

    const [screenWidth, setScreenWidth] = useState<Width>(window.innerWidth);

    const [aspectRatio, setAspectRatio] = useState<Ratio>(null);

    const [isLoading, setIsLoading] = useState<LoadingState>(true);

    const [dimensionsImageOne, setDimensionsImageOne] = useState<Dimensions>({
        imageHeight: 0,
        imageWidth: 0,
        textHeight: 80
    });

    const [dimensionsImageTwo, setDimensionsImageTwo] = useState<Dimensions>({
        imageHeight: 0,
        imageWidth: 0,
        textHeight: 80
    });

    

    const handleImageLoad = (imageRef: RefObject<HTMLImageElement>): void => {
        if (imageRef?.current) {
            const { naturalWidth, naturalHeight } = imageRef.current;
            if (naturalWidth && naturalHeight) {
                // Calculate aspect ratio as width / height
                setAspectRatio(naturalWidth / naturalHeight);
                setIsLoading(false); // Set loading to false once aspect ratio is calculated
            }
        }
    };

    const updateScreenWidth = (): void => {
        setScreenWidth(window.innerWidth);
    };

    useEffect((): (() => void) => {
        window.addEventListener('resize', updateScreenWidth);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    useEffect((): void => {
        if (aspectRatio !== null) {
            // Determine container size and minimum text height based on screen width
            const containerSize: number = screenWidth < 600 ? 300 : 500;
            const minTextHeight: number = screenWidth < 600 ? 50 : 80;

            // OPTION 1: Calculate dimensions for image layout option 1: width / ratio
            let adjustedImageHeightOptionOne: number = containerSize / aspectRatio;

            const remainingHeight: number = containerSize - adjustedImageHeightOptionOne;

            // if remianing height is less than 80 pixels, image will be 420 pixels and text 80
            // Ensure minimum text height. Ratio must be at least 1.19 for image size to change and not be containerSize - minTextHeight
            if (remainingHeight < minTextHeight) {
                adjustedImageHeightOptionOne = containerSize - minTextHeight;
            }

            setDimensionsImageOne({
                imageHeight: adjustedImageHeightOptionOne,
                imageWidth: containerSize,
                textHeight: containerSize - adjustedImageHeightOptionOne
            });

            // OPTION 2: Calculate dimensions for image layout option 2 (only if aspect ratio > 1)
            if (aspectRatio > 1.19) {
                let adjustedImageHeightOptionTwo: number = containerSize - minTextHeight;

                setDimensionsImageTwo({
                    imageHeight: adjustedImageHeightOptionTwo,
                    imageWidth: containerSize,
                    textHeight: minTextHeight
                });
            }
        }
    }, [aspectRatio, screenWidth]);

    return {
        dimensionsImageOne, // Dimensions and text height for option 1 layout
        dimensionsImageTwo, // Dimensions and text height for option 2 layout (if applicable)
        aspectRatio,        // The aspect ratio of the image
        isLoading,          // Loading state indicating if aspect ratio is being calculated
        handleImageLoad     // Function to handle image loading and aspect ratio calculation
    };

};

export default useAspectRatio;



