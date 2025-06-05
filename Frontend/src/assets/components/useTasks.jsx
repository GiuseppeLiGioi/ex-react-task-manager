/*
Implementare la funzione removeMultipleTasks in useTasks.js
La funzione deve ricevere un array di ID e inviare più richieste DELETE /tasks/{id} in parallelo.
Utilizzare Promise.allSettled() per gestire successi ed errori senza interrompere il processo.
Per ogni richiesta che ha successo, la task deve essere rimossa dallo stato locale.
Se almeno una richiesta fallisce, lanciare un errore con un messaggio che mostra gli ID non eliminati.
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate()

    async function fetchTasks() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
            if (!response.ok) {
                throw new Error('errore durante il fetch delle tasks...')
            }
            const tasks = await response.json()
            setTasks(tasks)
            console.log(tasks)
        } catch (error) {
            console.error(error)
        }
    }


    const addTask = async (task) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            });
            const newTask = await response.json()
            if (!newTask.success) {
                return { success: false, message: "Messaggio di errore" }
            } else {
                return { success: true, task: newTask.task }
            }

        } catch (error) {
            console.error(error)
        }

    }


    const removeTask = async (taskId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });
            const data = await response.json()
            if (data.success) {
                setTasks((currentTask) => currentTask.filter(cT => cT.id !== taskId))
                alert("Eliminazione task avvenuta con successo")
                navigate('/')
            } else {
                throw new Error(data.message)
            }

        } catch (error) {
            alert("Errore durante la rimozione della task", error)
        }
    }


    const updateTask = async (updatedTask, taskId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask)
            });
            const data = await response.json()
            if (!data.success) {
                
                throw new Error("errore nell' aggiornamento della Task")
            } else {
                return { success: true, task: data.task }
            }

        } catch (error) {
            console.error(error)
        }

    }

    const removeMultipleTasks = async(arrId) => {

    }

    return { tasks, setTasks, fetchTasks, addTask, removeTask, updateTask, removeMultipleTasks}

}
