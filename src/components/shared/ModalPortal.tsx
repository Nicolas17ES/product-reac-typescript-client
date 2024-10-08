import ReactDom from 'react-dom'
import type { ModalPortalProps } from '../../../types.d.ts';



const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {

    return ReactDom.createPortal(
        <>
            <div
                className="modal-overlay"
                role="presentation"
                aria-hidden="true"
            ></div>
            <div className="modal" role="dialog">
                {children}
            </div>
        </>,
        document.getElementById('preview-modal') as HTMLElement
    );
};

export default ModalPortal;