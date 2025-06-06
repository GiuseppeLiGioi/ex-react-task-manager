/*
Aggiornare addTask e updateTask in useTasks.js in modo che:
Prima di effettuare la chiamata API, controllino se esiste già un task con lo stesso nome.
Se il nome è già presente, lanciare un errore e impedire la creazione/modifica.

*/
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import tasksReducer from "../reducers/tasksReducer";

export default function useTasks() {
    const [tasks, dispatchTasks] = useReducer(tasksReducer,[]);
    const navigate = useNavigate();

    async function fetchTasks() {
        try {

            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
            if (!response.ok) {
                throw new Error("Errore durante il fetch delle tasks...");
            }
            const data = await response.json();
            dispatchTasks({type: "LOAD_TASKS", payload: data});
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addTask(task) {
        try {

            const nameAlreadyExist = tasks.some((t) => t.title.toLowerCase() === task.title.toLowerCase());

            if (nameAlreadyExist) {
                throw new Error("Impossibile aggiungere la task, nome già presente")
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            const result = await response.json();
            console.log("Risposta API addTask:", result);

            if (!result.success) {
                console.error("Errore backend:", result.message);
                return { success: false, message: result.message || "Errore backend" };
            }
             dispatchTasks({type: "ADD_TASK", payload: result.task })
           

        } catch (error) {
            console.error("Errore nella richiesta:", error);
            return { success: false, message: error.message || "Errore nella richiesta" };
        }
    }



    async function removeTask(taskId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                dispatchTasks({type: "REMOVE_TASK", payload: taskId });
                alert("Eliminazione task avvenuta con successo");
                navigate("/");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert("Errore durante la rimozione della task", error);
        }
    }

    async function updateTask(updatedTask, taskId) {
        try {
            const taskWithSameTitle = tasks.find((t) => t.title.toLowerCase() === updatedTask.title.toLowerCase());
            if(taskWithSameTitle && taskWithSameTitle.id !== updateTask.id){
                throw new Error("Impossibile aggiornare la task, nome già presente")
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error("Errore nell'aggiornamento della task");
            }
             dispatchTasks({type: "UPDATE_TASK", payload: data.task} )
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message || "Errore durante aggiornamento" };
        }
    }

    async function removeMultipleTasks(arrId) {
        const promises = arrId.map((id) =>
            fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { method: "DELETE" })
        );

        const results = await Promise.allSettled(promises);

        const idErrati = results
            .map((r, index) => (r.status === "rejected" ? arrId[index] : null))
            .filter((id) => id !== null);
        dispatchTasks({type: "REMOVE_MULTIPLE_TASKS", payload: idErrati });
        
        if (idErrati.length > 0) {
            throw new Error(`Impossibile eliminare le task con ID: ${idErrati.join(",")}`);
        }
    }

    return {
        tasks,
        fetchTasks,
        addTask,
        removeTask,
        updateTask,
        removeMultipleTasks,
    };
}
