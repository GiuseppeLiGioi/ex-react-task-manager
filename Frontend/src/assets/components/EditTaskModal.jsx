/*

*/
import Modal from "./Modal"
import { GlobalContext } from "../../context/GlobalContext"
import { useRef, useState, useEffect, useContext } from "react"
export default function EditTaskModal({show, onClose, task, onSave}) {
    const { tasks, setTasks, updateTask } = useContext(GlobalContext)
    const [updateTitle, setUpdateTitle] = useState('')
    const [updateDesc, setUpdateDesc] = useState('')
    const [updateStatus, setUpdateStatus] = useState('')
    const inputForm = useRef()
    
    useEffect(() => {
    if (task) {
      setUpdateTitle(task.title || '')
      setUpdateDesc(task.description || '')
      setUpdateStatus(task.status || 'To Do')
    }
  }, [task])

const handleSubmit = (e) => {
  e.preventDefault();
  const updatedTask = {
    title: updateTitle,
    description: updateDesc,
    status: updateStatus
  };
  onSave(updatedTask);
};

    const initialtask = {
        title: '',
        description: '',
        status: ''
    }


    const formContent = (
         <form className="container-form" ref={inputForm} onSubmit={handleSubmit}>
                <input
                    className="form-input"
                    type="text"
                    placeholder="inserisci il nuovo titolo della task"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                />
                

                <textarea
                    className="form-textarea"
                    value={updateDesc}
                    onChange={(e) => setUpdateDesc(e.target.value)}
                    placeholder="inserisci il contenuto della task"
                />

                <label>Stato:</label>
                <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)} className="form-select">
                    <option value="To Do">To Do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>

                <button id="btn-detail-update" type="submit">Aggiorna Task</button>

            </form>
    )

    return(
        <div> 
            <Modal 
            title="Modifica Task"
            content={formContent}
            onClose={onClose}
            show={show}
            onConfirm={ () => inputForm.current.requestSubmit()}
            
            />
        </div>
    )
}