/*
Creare il componente Modal.jsx, che deve:
Accettare i seguenti props:
title: il titolo della modale.
content: il contenuto principale della modale.
show: stato booleano per mostrare o nascondere la modale.
onClose: funzione per chiudere la modale.
onConfirm: funzione eseguita al click del bottone di conferma.
confirmText (opzionale, default "Conferma"): testo del bottone di conferma.
Utilizzare ReactDOM.createPortal per rendere la modale indipendente dal flusso di rendering.
Implementare i pulsanti "Annulla" (chiude la modale) e "Conferma" (esegue onConfirm).

*/
import { createPortal } from 'react-dom';
export default function Modal({title, content, show, onClose, onConfirm}){


    return show && createPortal(
        <div  className='container-modal'>
            <div className='container'>
            <h5 className='title-modal'>Sei sicuro di voler eliminare la Task</h5>
            <button onClick={onClose}></button>
            <button onClick={onConfirm}></button>
             
            </div>
        </div>,
        document.body
    )
}