import UploadContext from "../context/UploadContext";
import { useNavigate } from 'react-router-dom';
import React,{ useContext } from "react";
import useLanguageFile from '../hooks/useLanguageFile';
import { ConfirmationContent } from '../hooks/languagestypes.d'


const DownloadConfirmation: React.FC = () => {

    const { dispatch } = useContext(UploadContext);

    const content = useLanguageFile('confirmation') as ConfirmationContent;

    const navigate = useNavigate();

    const handleButtonClick = (): void => {

        navigate('/');

        dispatch({type: 'RESET_STATE'})

    }

    if (!content) {
        return null;
    }

    return (
        <>

            <section className="page-container">
                <h2 className="confirmation-title title">{content.title}</h2>
                <p className="confirmation-paragraph subtitle">{content.paragraph}</p>
                <div className="buttons-container" style={{ marginTop: '100px' }}>
                    <button onClick={handleButtonClick} className="confirmation-button button" aria-label="Try the process again">{content.again}</button>
                    <a href="https://www.mesplaques.fr/" className="confirmation-button button" aria-label="Visit Mesplaques website">{content.visit}</a>
                </div>
            </section>
        </>
    );

}

export default DownloadConfirmation;