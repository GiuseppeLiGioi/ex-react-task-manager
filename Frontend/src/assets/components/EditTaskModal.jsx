/*
Deve accettare i seguenti props:
show (boolean): determina se la modale è visibile.
onClose (function): funzione per chiudere la modale.
task (object): oggetto che rappresenta il task da modificare.
onSave (function): funzione che viene chiamata al salvataggio con il task aggiornato.
Utilizzare il componente Modal per creare la modale di modifica, passandogli i seguenti valori:
title: "Modifica Task".
content: un form contenente i campi del task da modificare.
onConfirm: deve attivare il submit del form.
*/
import Modal from "./Modal"
import { GlobalContext } from "../../context/GlobalContext"
import { useRef, useState } from "react"
export default function EditTaskModal({show, onClose, task, onSave}) {
    const { tasks, setTasks, updateTask } = useContext(GlobalContext)
    const inputForm = useRef()

    const initialtask = {
        title: '',
        description: '',
        status: ''
    }


    const formContent = (
        
    )

    return(
        <div> 
            <Modal 
            title="Modifica Task"
            content={formContent}
            onConfirm={() => updateTask(initialtask, task.id)}
            
            />
        </div>
    )
}