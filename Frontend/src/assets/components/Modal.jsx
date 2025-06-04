/*


*/
import { createPortal } from 'react-dom';
export default function Modal({title, content, show, onClose, onConfirm}){


    return show && createPortal(
        <div  className='container-modal'>
            <div className='container'>
            <h5 className='title-modal'>{title}</h5>
            <p className='p-modal'>{content}</p>
            <button onClick={onClose}>Annulla</button>
            <button onClick={onConfirm}>Conferma</button>
             
            </div>
        </div>,
        document.body
    )
}