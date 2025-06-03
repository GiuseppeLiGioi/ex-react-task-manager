/*
Gestione del Submit del Form:

Al click del bottone "Aggiungi Task", il form deve SOLO stampare in console l’oggetto task con i valori inseriti (NON deve ancora essere inviata la richiesta all’API).
*/

import { useState, useRef, useEffect } from "react"

export default function AddTask(){
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState("")
    const inputDesc = useRef()
    const inputSelect = useRef()
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    useEffect(() => {

    let isValid = true;
    const arrSymbols = symbols.split("")
    for(let i=0; i<arrSymbols.length; i++){
        if(taskTitle.includes(arrSymbols[i]) || taskTitle === ""){
            isValid = false;
            break;
        }
    }
  
    if(!isValid){
        setError("Titolo della task non valido")
    }else{
        setError("")
    }
    }, [taskTitle])

      const handleSubmit = (e) => {
        e.preventDefault()
        const Task = {
            title: taskTitle,
            description: inputDesc.current.value,
            state: inputSelect.current.value
        }
        console.log(Task)
    }

return (
    <div>
        <h2>AGGIUNGERE UNA TASK</h2>
        <form className="container-form" onSubmit={handleSubmit}>
        <input 
        className="form-input"
        type="text"
        placeholder="inserisci il titolo della nuova task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}

        <textarea
        className="form-textarea" 
        ref={inputDesc}
        placeholder="inserisci il contenuto della task"
        />
        
        <label>Stato:</label>
        <select ref={inputSelect} defaultValue="To Do" className="form-select"> 
         <option value="To Do">To Do</option> 
         <option value="Doing">Doing</option>  
         <option value="Done">Done</option>        
        </select>

        <button type="submit">Aggiungi Task</button>

        </form>
    </div>
)
}