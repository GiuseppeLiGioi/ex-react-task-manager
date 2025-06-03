/*
Completare la funzione addTask in useTasks():
La funzione deve ricevere un oggetto contenente le proprietà title, description e status.

Effettuare una chiamata API POST /tasks, inviando l’oggetto come body in formato JSON.

La chiamata API restituisce un oggetto con la seguente struttura:

In caso di successo:

{ success: true, task:  la task creata  }
In caso di errore:

{ success: false, message: "Messaggio di errore" }
La funzione addTask deve controllare il valore di success nella risposta:

Se success è true, aggiornare lo stato globale aggiungendo la nuova task.
Se success è false, lanciare un errore con message come testo.
*/
import { useState } from "react";
export default function useTasks() {
    const [tasks, setTasks] = useState([]);

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
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(task)
            });
            const newTask = await response.json()
            if(!newTask.success){
             return { success: false, message: "Messaggio di errore" }
            }else{
             return { success: true, task:  newTask.task  }
            }
            
        } catch(error){
            console.error(error)
        }
        
    }


    const removeTask = () => {
        
    }
    const updateTask = () => {
        
    }

    return {tasks, setTasks, fetchTasks, addTask, removeTask, updateTask}

}
