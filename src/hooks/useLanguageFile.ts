import { useState, useEffect, useContext } from 'react'; // Import React hooks for state management, side effects, and context
import UploadContext from '../context/UploadContext'; // Import context for global state management
import { ContentMap, ContentKey } from './languagestypes.d'


const useLanguageFile = <K extends ContentKey>(contentKey: K): ContentMap[K] | null => {

    const { language } = useContext(UploadContext); // Access the current language from context
    const [loadedContent, setLoadedContent] = useState<ContentMap[K] | null>(null); // State to store the loaded content

    useEffect(() => {
        const fetchData = async () => {
            try {
                const languageFile = await import(`../languages/${language}/general.json`);
                setLoadedContent(languageFile.default[contentKey][0]);
            } catch (error) {
                console.error(`Error loading language file: ${error}`);
            }
        };

        fetchData();
    }, [language, contentKey]); 

    return loadedContent; 
};

export default useLanguageFile;