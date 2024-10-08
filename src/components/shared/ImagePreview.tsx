import React from "react";
import type { ImagePreviewProps } from '../../../types.d.ts'; // Adjust the import path as needed

const ImagePreview = React.forwardRef<HTMLImageElement, ImagePreviewProps>(
    ({ image, message, dimensions, onLoad, loadingState, option }, ref) => {

        return (
            <div
                className={`preview-container preview-container-${option}`}
                style={{ display: loadingState ? 'none' : 'block' }}
                role="region"
                aria-label={`Image preview container, option ${option}`}
            >
                <img
                    className="image"
                    src={image}
                    alt="Preview"
                    ref={ref}
                    style={{ width: `${dimensions.imageWidth}px`, height: `${dimensions.imageHeight}px`, objectFit: 'cover' }}
                    onLoad={onLoad}
                />
                <div className="image-text-container" style={{ height: `${dimensions.textHeight}px` }}>
                    <p className="image-text">{message}</p>
                </div>
            </div>
        );
    }
);

// Ensure the ref type is consistent with the usage in the parent component
ImagePreview.displayName = "ImagePreview";

export default ImagePreview;