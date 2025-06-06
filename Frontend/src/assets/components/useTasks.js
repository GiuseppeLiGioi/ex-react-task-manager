// useTasks.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useTasks() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    async function fetchTasks() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
            if (!response.ok) {
                throw new Error("Errore durante il fetch delle tasks...");
            }
            const data = await response.json();
            setTasks(data);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addTask(task) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            const newTask = await response.json();

            if (!newTask.success) {
                return { success: false, message: "Messaggio di errore" };
            }

            return { success: true, task: newTask.task };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Errore nella richiesta" };
        }
    }

    async function removeTask(taskId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                setTasks((current) => current.filter((t) => t.id !== taskId));
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error("Errore nell'aggiornamento della task");
            }

            return { success: true, task: data.task };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Errore durante aggiornamento" };
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

        setTasks((current) =>
            current.filter((t) => !arrId.includes(t.id) || idErrati.includes(t.id))
        );

        if (idErrati.length > 0) {
            throw new Error(`Impossibile eliminare le task con ID: ${idErrati.join(",")}`);
        }
    }

    return {
        tasks,
        setTasks,
        fetchTasks,
        addTask,
        removeTask,
        updateTask,
        removeMultipleTasks,
    };
}
