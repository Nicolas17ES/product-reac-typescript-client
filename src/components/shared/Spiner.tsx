import { useContext } from "react";
import UploadContext from "../../context/UploadContext";


function Spinner() {

    const { loadingMessage } = useContext(UploadContext);

    return (
        <div className="loadingSpinnerContainer">
            <div className="loadingSpinner"></div>
            <p className="loadingMessage">{loadingMessage}</p>
        </div>
    )
}

export default Spinner