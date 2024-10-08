import { useState, useContext } from "react";
import UploadContext from "../context/UploadContext";
import ImageMessageForm from '../components/ImageMessageForm'
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useLanguageFile from '../hooks/useLanguageFile';
import { HomeContent } from '../hooks/languagestypes.d'


type VisibleForm = boolean;


const Home: React.FC = () => {

    const { dispatch, isPDFReady } = useContext(UploadContext);

    const content = useLanguageFile('home') as HomeContent;

    const [isFormVisible, setIsFormVisible] = useState<VisibleForm>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isPDFReady) {
            navigate('/confirmation');
            dispatch({ type: 'SET_SHOW_PREVIEW', payload: false });
            toast.success(content.toast);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPDFReady])

    if (!content) {
        return null;
    }


    return (
        <div className="page-container">
            <header className="home-header">
                <h1 className="title">{content.title}</h1>
                <h2 className="subtitle">
                    {content.subtitle}
                </h2>
            </header>
            {!isFormVisible &&
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="main-button button"
                    aria-expanded={isFormVisible}
                    aria-controls="image-message-form"
                    aria-label="Start the process of generating a PDF"
                >
                    {content.start}
                </button>
            }
            {(isFormVisible && !isPDFReady) && <ImageMessageForm />}
        </div>
    )
}

export default Home
