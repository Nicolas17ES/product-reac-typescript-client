import React, { useContext, useRef, useCallback, RefObject } from "react";
import UploadContext from "../context/UploadContext";
import type { PreviewProps } from '../../types.d.ts'
import useLanguageFile from '../hooks/useLanguageFile';
import { PreviewContent } from '../hooks/languagestypes.d'
import useAspectRatio from "../hooks/useAspectRatio";
import useCaptureImage from "../hooks/useCaptureImage";
import useScreenWidth from '../hooks/useScreenWidth';
import { IoIosSend } from "react-icons/io";
import Spinner from './shared/Spiner'
import ImagePreview from './shared/ImagePreview'
import SelectImageButton from './shared/SelectImageButton'

type ImageRef = RefObject<HTMLImageElement>;

const Preview: React.FC<PreviewProps> = ({ message, image, name }) => {

    const { dispatch, displaySpinner } = useContext(UploadContext);

    const content = useLanguageFile('preview') as PreviewContent;

    const screenWidth = useScreenWidth();

    const imageRefOne: ImageRef = useRef(null);
    const imageRefTwo: ImageRef = useRef(null);

    const { dimensionsImageOne, dimensionsImageTwo, aspectRatio, isLoading, handleImageLoad: handleImageLoadHook } = useAspectRatio();

    const { capturedImage, handleSubmit, handleSelectImage } = useCaptureImage(dispatch, name);

    const handleImageLoad = useCallback((imageRef: ImageRef): void => {
        handleImageLoadHook(imageRef);
    }, [handleImageLoadHook]);

    if (!content) {
        return null;
    }


    return (
        <>
            {aspectRatio && aspectRatio > 1.19 ? <h2 className="title">{content.title}</h2> : null}

            {displaySpinner && <Spinner />}

            <div className="preview-images-container">
                <section className="image-container" aria-labelledby="image-one-label">
                    <ImagePreview
                        loadingState={isLoading}
                        image={image}
                        message={message}
                        dimensions={dimensionsImageOne}
                        ref={imageRefOne}
                        onLoad={() => handleImageLoad(imageRefOne)}
                        option={'one'}
                    />
                    {aspectRatio && (aspectRatio > 1.19 && !capturedImage && screenWidth > 1000) &&
                        <SelectImageButton onClick={() => handleSelectImage(1)} text={content.opt_one} aria-label="Select image option one" />
                    }
                </section>

                {(aspectRatio && aspectRatio > 1.19 && screenWidth > 1000) && (
                    <section className="image-container" aria-labelledby="image-two-label">
                        <ImagePreview
                            image={image}
                            message={message}
                            dimensions={dimensionsImageTwo}
                            ref={imageRefTwo}
                            onLoad={() => handleImageLoad(imageRefTwo)}
                            option={'two'}
                        />
                        {aspectRatio > 1.19 && !capturedImage &&
                            <SelectImageButton onClick={() => handleSelectImage(2)} text={content.opt_two} aria-label="Select image option two" />
                        }
                    </section>
                )}
            </div>
            {aspectRatio && (aspectRatio <= 1 || (aspectRatio > 1 && capturedImage) || screenWidth < 1000) && (
                <button
                    onClick={handleSubmit}
                    className="button button-submit"
                    aria-label="Submit form"
                >
                    {content.button} <IoIosSend size={19} />
                </button>
            )}
        </>
    )
}

export default Preview
