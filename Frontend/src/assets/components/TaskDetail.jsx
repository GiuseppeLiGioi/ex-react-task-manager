/*
Accettare i seguenti props:
title: il titolo della modale.
content: il contenuto principale della modale.
show: stato booleano per mostrare o nascondere la modale.
onClose: funzione per chiudere la modale.
onConfirm: funzione eseguita al click del bottone di conferma.
confirmText (opzionale, default "Conferma"): testo del bottone di conferma.
*/
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"
import Modal from "./Modal"

export default function TaskDetail(){
    const {tasks, removeTask} = useContext(GlobalContext)
    const {id} = useParams()
    const [modal, setModal] = useState(false);
    const task = tasks.find((t) => t.id === parseInt(id));

     if (!task) {
        return <p>Task non trovata.</p>
    }

    return (
        <>
        <div className="container-details">
            <h2 className="title-single-task">DETTAGLI DELLA TASK: {task.id}</h2>

            <h3 className="single-detail-h">NOME DELLA TASK: {task.title}</h3>
            <p className="single-detail-p">DESCRIZIONE DELLA TASK: {task.description}</p>
            <h4 className="single-detail-h">STATO DELLA TASK: {task.status}</h4>
            <p className="single-detail-p">CREAZIONE DELLA TASK: {task.createdAt}</p>

            <button className="btn-detail" onClick={() => setModal(true)}>Rimuovi Task</button>
            
        </div>

        {modal && 
        (<Modal 
         title="EHI ASPETTA! SEI SICURO..."
         content="Sei sicuro di voler eliminare la task?"
         show={modal}
         onClose={() => setModal(false)}
         onConfirm={() => removeTask(task.id)}
        />)}


        </>
    )
}