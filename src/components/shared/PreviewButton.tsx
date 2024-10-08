import useLanguageFile from '../../hooks/useLanguageFile';
import React, {useContext} from "react";
import UploadContext from "../../context/UploadContext";
import { MdOutlinePreview } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";


const PreviewButton = () => {

    const { dispatch, showPreview, displaySpinner } = useContext(UploadContext);

    const content = useLanguageFile('previewButton');

    const togglePreviewState = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch({
            type: 'SET_SHOW_PREVIEW',
            payload: !showPreview
        })
    }

    const buttonStyle: React.CSSProperties = showPreview ? { position: 'absolute', top: '10px', right: '10px', zIndex: 999, backgroundColor: 'transparent' } : {};

    if (!content) {
        return null;
    }

    return (
        <button
            onClick={togglePreviewState}
            style={buttonStyle}
            className="button"
            disabled={displaySpinner}
            aria-expanded={showPreview}
            aria-label={showPreview ? content.hide : content.show}
        >
            {showPreview ? content.hide : content.show}
            {showPreview ? <FaWindowClose aria-hidden="true" /> : <MdOutlinePreview size={19} aria-hidden="true" />}
        </button>
    )
}

export default PreviewButton
