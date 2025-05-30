import { createContext, useState } from "react";

const GlobalContext = createContext()

export default function GlobalContextProvider({children}){

    const [tasks, setTasks] = useState([]);
    
    async function fetchTasks(){
        try{
            const response = await fetch( `${import.meta.env.VITE_API_URL}/tasks`)
            if(!response.ok){
                throw new Error('errore durante il fetch delle tasks...')
            }
            const tasks = await response.json()
            setTasks(tasks)
            console.log(tasks)
        }catch(error){
         console.error(error)
        }
    }





    return(
        <GlobalContext.Provider value={{
           tasks, 
           setTasks,
           fetchTasks

        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export {GlobalContext}