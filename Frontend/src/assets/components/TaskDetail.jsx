/*
Creare TaskDetail.jsx per mostrare:
Nome (title)
Descrizione (description)
Stato (status)
Data di creazione (createdAt)
Un bottone "Elimina Task", che per ora stampa solo "Elimino task" in console.
*/
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"

export default function TaskDetail(){
    const {tasks} = useContext(GlobalContext)
    const {id} = useParams()
    const task = tasks.find((t) => t.id === parseInt(id));

     if (!task) {
        return <p>Task non trovata.</p>
    }

    return (
        <div>
            <h2 className="title-single-task">DETTAGLI DELLA TASK: {id}</h2>

            <h3>NOME DELLA TASK: {task.title}</h3>
            <p>DESCRIZIONE DELLA TASK: {task.description}</p>
            <h4>STATO DELLA TASK: {task.status}</h4>
            <p>CREAZIONE DELLA TASK: {task.createdAt}</p>

            <button onClick={() => console.log("task rimossa")}>Rimuovi Task</button>
            
        </div>
    )
}