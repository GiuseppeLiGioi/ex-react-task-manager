/*

*/
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"

export default function TaskDetail(){
    const {tasks, removeTask} = useContext(GlobalContext)
    const {id} = useParams()
    const task = tasks.find((t) => t.id === parseInt(id));

     if (!task) {
        return <p>Task non trovata.</p>
    }

    return (
        <div className="container-details">
            <h2 className="title-single-task">DETTAGLI DELLA TASK: {task.id}</h2>

            <h3 className="single-detail-h">NOME DELLA TASK: {task.title}</h3>
            <p className="single-detail-p">DESCRIZIONE DELLA TASK: {task.description}</p>
            <h4 className="single-detail-h">STATO DELLA TASK: {task.status}</h4>
            <p className="single-detail-p">CREAZIONE DELLA TASK: {task.createdAt}</p>

            <button className="btn-detail" onClick={() => removeTask(task.id)}>Rimuovi Task</button>
            
        </div>
    )
}