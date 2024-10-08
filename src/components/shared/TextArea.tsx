import type { TextAreaProps } from '../../../types.d.ts';
import useLanguageFile from '../../hooks/useLanguageFile';
import React, { useState, useEffect, ChangeEvent } from "react";
import { toast } from 'react-toastify';


interface Alert {
    isVisible: boolean,
    color: 'orange' | 'red' | '',
    message: string,
}

type Text = string

const TextArea: React.FC<TextAreaProps> = ({ value, maxLength, messageSetter }) => {

    const content = useLanguageFile('textarea');
    const [alert, setAlert] = useState<Alert>({ isVisible: false, color: '', message: '' });
    const [text, setText] = useState<Text>('');


    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const text = event.target.value;
        if (text.length <= maxLength) {
            messageSetter(text);
            setText(text);
        } else {
            toast.error(`Message cannot exceed ${maxLength} characters.`);
        }
    }

    useEffect(() => {
        // Determine the appropriate alert message and style based on text length.
        let alertColor: 'orange' | 'red' | '' = '';
        let alertMessage: string = '';
        let isVisible: boolean = false;

        if(content) {
            if (text.length >= maxLength - 6 && text.length < maxLength - 2) {
                alertColor = 'orange';
                alertMessage = `${maxLength - text.length} ${content.characters}`;
                isVisible = true;
            } else if (text.length >= maxLength - 2 && text.length < maxLength) {
                alertColor = 'red';
                alertMessage = `${maxLength - text.length} ${content.characters}`;
                isVisible = true;
            } else if (text.length === maxLength) {
                alertColor = 'red';
                alertMessage = content.allowed;
                isVisible = true;
            }
            setAlert({ isVisible, color: alertColor, message: alertMessage });
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, maxLength]);


    if (!content) {
        return null;
    }

    return (
        <>
            <label htmlFor="textarea" className="upload-label">
                {content.label}
            </label>
            <textarea
                className="textarea"
                value={value}
                onChange={handleChange}
                placeholder={content.placeholder}
                name="message"
                maxLength={maxLength}
                aria-describedby="character-count"
                aria-required="true"
                required
            />
            {alert.isVisible && <sub id="character-count" className="alert-message" style={{ color: alert.color }}>{alert.message}</sub>}
            <hr style={{ marginBottom: '50px' }} />
        </>
    )
}

export default TextArea
