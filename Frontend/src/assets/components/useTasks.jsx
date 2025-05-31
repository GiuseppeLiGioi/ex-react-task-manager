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


    const addTask = () => {

    }
    const removeTask = () => {
        
    }
    const updateTask = () => {
        
    }

    return {tasks, setTasks, fetchTasks, addTask, removeTask, updateTask}

}
