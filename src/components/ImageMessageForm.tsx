import React, { ChangeEvent } from 'react'
import { ImageMessageContent } from '../hooks/languagestypes.d'
import useLanguageFile from '../hooks/useLanguageFile';
import { useState, useContext, useEffect } from "react";
import UploadContext from "../context/UploadContext";
import Preview from './Preview';
import { toast } from 'react-toastify';
import ModalPortal from './shared/ModalPortal';
import PreviewButton from './shared/PreviewButton';
import TextArea from './shared/TextArea';


type Message = string;
type Image = File | null;
type Blob = string | null;
type PreviewIsReady = boolean;

const ImageMessageForm: React.FC = () => {

    const { showPreview } = useContext(UploadContext);


    const content = useLanguageFile('imagemessage') as ImageMessageContent;

    const [message, setMessage] = useState<Message>('');
    const [image, setImage] = useState<Image>(null);
    const [blob, setBlob] = useState<Blob>(null);
    const [previewIsReady, setPreviewIsReady] = useState<PreviewIsReady>(false);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;

        if (!files || files.length === 0) {
            // If no file is selected (cancelled file selection) or files is null
            setImage(null);
            setBlob(null);
            setPreviewIsReady(false);
            return;
        }

        if (files.length > 1) {
            toast.error(content.toastone);
            event.target.value = '';
            return;
        }

        const file = files[0];
        setImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                setBlob(reader.result);
                setPreviewIsReady(true);
            } else {
                toast.error("Unexpected error: file could not be read as string.");
            }
        };
        reader.onerror = () => {
            toast.error(content.toasttwo);
        };

        reader.readAsDataURL(file);
    }



    useEffect(() => {
        return () => {
            setBlob(null);
            setMessage('');
            setImage(null);
            setPreviewIsReady(false);
        }
    }, []);

    if (!content) {
        return null;
    }

    return (
        <>
            <form className="form-container">
                <TextArea messageSetter={setMessage} value={message} maxLength={25} />
                <h4 className="upload-label">{content.title}</h4>
                <label htmlFor="file-upload" className="file-upload-label">{content.label}</label>
                <input
                    type="file"
                    id="file-upload"
                    className="file-input"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    aria-describedby="file-upload-feedback"
                    name="image"
                    multiple={false}
                    required
                />
                {image && <small className="file-name" id="file-upload-feedback">{image.name}</small>}
                <hr style={{ marginBottom: '50px' }} />
                {(previewIsReady && message.length > 0) && <PreviewButton />}
            </form>

            {showPreview && image && blob &&(
                <ModalPortal>
                    <Preview message={message} image={blob} name={image.name} />
                </ModalPortal>
            )}
        </>
    )
}

export default ImageMessageForm
