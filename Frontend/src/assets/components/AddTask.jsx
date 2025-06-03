
import { GlobalContext } from "../../context/GlobalContext"
import { useState, useRef, useEffect, useContext } from "react"


export default function AddTask() {
    const { addTask, tasks, setTasks } = useContext(GlobalContext)
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState("")
    const inputTitle = useRef()
    const inputDesc = useRef()
    const inputSelect = useRef()
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";




    useEffect(() => {
        inputTitle.current.focus();
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const nuovaTask = {
            title: taskTitle,
            description: inputDesc.current.value,
            status: inputSelect.current.value
        }


        let isValid = true;
        const arrSymbols = symbols.split("")
        for (let i = 0; i < arrSymbols.length; i++) {
            if (taskTitle.includes(arrSymbols[i]) || taskTitle === "") {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            setError("Titolo della task non valido")
            return;
        } else {
            setError("")
        }

        const result = await addTask(nuovaTask);
        if (result.success) {
            alert("Operazione eseguita con successo, Task Aggiunta")
            setTasks([...tasks, result.task]);
            inputDesc.current.value = "";
            inputSelect.current.value = "";
            setTaskTitle("")
        } else {
            alert(result.message)
            inputDesc.current.value = "";
            inputSelect.current.value = "";
            setTaskTitle("")
        }

    }

    return (
        <div>
            <h2>AGGIUNGERE UNA TASK</h2>
            <form className="container-form" onSubmit={handleSubmit}>
                <input
                    ref={inputTitle} //ref solo per dare il focus al title
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