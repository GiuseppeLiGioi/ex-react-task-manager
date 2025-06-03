import { createContext } from "react";
import useTasks from "../assets/components/useTasks";

const GlobalContext = createContext()

export default function GlobalContextProvider({children}){
const {tasks, setTasks, fetchTasks, addTask, removeTask, updateTask} = useTasks()

    return(
        <GlobalContext.Provider value={{
           tasks, 
           setTasks,
           fetchTasks,
           addTask

        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext}