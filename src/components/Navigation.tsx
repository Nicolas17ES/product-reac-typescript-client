import React, { useContext, ChangeEvent } from 'react';
import UploadContext from '../context/UploadContext'; // Adjust the path as necessary
import useLanguageFile from '../hooks/useLanguageFile';
import { NavigationContent } from '../hooks/languagestypes.d'


const Navigation: React.FC = () => {

    const { dispatch, language } = useContext(UploadContext);

    const content = useLanguageFile('navigation') as NavigationContent;

    const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value as 'en' | 'fr' | 'es';
        dispatch({ type: 'SET_LANGUAGE', payload: selectedLanguage });
    };
    console.log("language", language)

    if (!content) {
        return null;
    }

    return (
        <nav className="navbar-container" aria-label="Main Navigation">
            <a href="https://www.mesplaques.fr/" aria-label="Go to Mes Plaques homepage">
                <img
                    src={`/mesplaqueslogo.png`}
                    alt="Mes Plaques Logo"
                    className="logo"
                />
            </a>
            <select onChange={handleLanguageChange} aria-label="Select Language" className="language-dropdown">
                <option value="en">{content.en}</option>
                <option value="fr">{content.fr}</option>
            </select>
        </nav>
    );
};

export default Navigation;
