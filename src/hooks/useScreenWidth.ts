import { useState, useEffect } from "react"; // Import React hooks for state management and side effects


type ScreenWidth = number

const useScreenWidth = (): ScreenWidth => {

    const [screenWidth, setScreenWidth] = useState<ScreenWidth>(window.innerWidth);

    useEffect(() => {
        // Function to update the screen width state
        const handleResize = (): void => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenWidth
}


export default useScreenWidth;
