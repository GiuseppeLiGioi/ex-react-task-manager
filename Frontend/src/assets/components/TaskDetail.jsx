/*
Usare dayjs per formattare le date in formato italiano (DD/MM/YYYY)
Installare dayjs con il comando:

npm install dayjs
Modificare TaskRow.jsx e TaskDetail.jsx per visualizzare la data formattata in formato italiano (DD/MM/YYYY).
*/
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"
import dayjs from 'dayjs'
import Modal from "./Modal"
import EditTaskModal from "./EditTaskModal"

export default function TaskDetail() {
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)
    const { id } = useParams()
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return <p>Task non trovata.</p>
    }
    const formattedDate = dayjs(task.createdAt).format("DD/MM/YYYY");

   const handleSave = async (updatedTask) => {
  const result = await updateTask(updatedTask, task.id);
  if (result?.success) {
    alert("Task aggiornata con successo");
    setEditModal(false);
  } else {
    alert("Errore nell'aggiornamento");
  }
};



    return (
        <>
            <div className="container-details">
                <h2 className="title-single-task">DETTAGLI DELLA TASK: {task.id}</h2>

                <h3 className="single-detail-h">NOME DELLA TASK: {task.title}</h3>
                <p className="single-detail-p">DESCRIZIONE DELLA TASK: {task.description}</p>
                <h4 className="single-detail-h">STATO DELLA TASK: {task.status}</h4>
                <p className="single-detail-p">CREAZIONE DELLA TASK: {formattedDate}</p>

                <button className="btn-detail" onClick={() => setModal(true)}>Rimuovi Task</button>
                <button className="btn-detail" onClick={() => setEditModal(true)}>Modifica Task</button>

            </div>

            {modal &&
                (<Modal
                    title="EHI ASPETTA! SEI SICURO..."
                    content="Sei sicuro di voler eliminare la task?"
                    show={modal}
                    onClose={() => setModal(false)}
                    onConfirm={() => removeTask(task.id)}
                />)}

            {
                editModal &&
                (<EditTaskModal
                    content="Sei sicuro di voler eliminare la task?"
                    show={editModal}
                    task={task}
                    onClose={() => setEditModal(false)}
                    onSave={handleSave}
                />

                )
            }


        </>
    )
}