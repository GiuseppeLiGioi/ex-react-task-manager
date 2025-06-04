/*
Quando l’utente clicca su "Modifica", si apre la modale con il form precompilato.
L'onSave di EditTaskModal deve eseguire la funzione updateTask di useTasks(), passando la task modificata.
Se la funzione esegue correttamente l'operazione:
Mostrare un alert di conferma dell’avvenuta modifica.
Chiudere la modale.
Se la funzione lancia un errore:
Mostrare un alert con il messaggio di errore ricevuto.
*/
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"
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
                <p className="single-detail-p">CREAZIONE DELLA TASK: {task.createdAt}</p>

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