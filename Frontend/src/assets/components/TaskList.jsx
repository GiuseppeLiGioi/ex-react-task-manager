/*
Gestire l’eliminazione multipla in TaskList.jsx
Al click su "Elimina Selezionate", chiamare removeMultipleTasks passando selectedTaskIds.
Se la funzione esegue correttamente l'operazione:
Mostrare un alert di conferma dell’avvenuta eliminazione multipla.
Svuotare selectedTaskIds.
Se la funzione lancia un errore:
Mostrare un alert con il messaggio di errore ricevuto.
*/

import { useContext, useEffect, useState, useMemo, useCallback, useRef } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TaskRow from "./TaskRow"
import debounce from "lodash/debounce";


export default function TaskList() {
  const { tasks, setTasks, fetchTasks, removeMultipleTasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const inputRef = useRef();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);


  const sortTask = (e) => {
    const selectedSortBy = e.currentTarget.innerText.toLowerCase();
    if (sortBy.trim().toLowerCase() === selectedSortBy) {
      setSortOrder(sortOrder * -1)
    } else {
      setSortBy(selectedSortBy)
      setSortOrder(1)
    }

  }

  const filterLogic = useCallback(
    debounce(() => {
      if (!inputRef.current) return;

      const query = inputRef.current.value.toLowerCase();
      const filtered = tasks.filter((t) =>
        t.title.toLowerCase().includes(query)
      );
      setFilteredTasks(filtered);
    }, 500),
    [tasks]
  );


  const sortedTasks = useMemo(() => {

    const sorted = [...filteredTasks];

    sorted.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title) * sortOrder;
      }

      else if (sortBy === 'status') {
        const order = { 'To do': 0, 'Doing': 1, 'Done': 2 };
        return (order[a.status] - order[b.status]) * sortOrder;

      } else if (sortBy === "createdAt") {
        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return (aTime - bTime) * sortOrder;

      }
      return 0;

    })
    return sorted;
  }, [filteredTasks, sortBy, sortOrder])


const toggleSelection= (taskId) => {
  if(selectedTaskIds.includes(taskId)){
   setSelectedTaskIds(selectedTaskIds.filter((id) => id !== taskId))
  }else{
    setSelectedTaskIds([...selectedTaskIds, taskId])
  }
  
}
const handleDeleteSelected = async () => {
  try {
    await removeMultipleTasks(selectedTaskIds);
    alert("Task eliminate con successo!");
    setSelectedTaskIds([]);
    await fetchTasks();
  } catch (error) {
    alert(error.message);
  }
};

  useEffect(() => {
    fetchTasks()
  }, [])

useEffect(() => {
  setFilteredTasks(Array.isArray(tasks) ? tasks : []);
}, [tasks]);


  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Elenco Tasks</h2>
      <input
        type="text"
        placeholder="Digita il nome della Task..."
        ref={inputRef}
        onChange={ filterLogic}
        className="input-list"
      />


      <table className="task-table">
        <thead>
          <tr>
            <th className="task-header" onClick={sortTask}>title</th>
            <th className="task-header" onClick={sortTask}>status</th>
            <th className="task-header" onClick={sortTask}>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <TaskRow
              key={task.id}
              title={task.title}
              status={task.status}
              task={task}
              createdAt={task.createdAt}
              id={task.id}
              checked={selectedTaskIds.includes(task.id)} 
              onToggle={toggleSelection} 
            />
          ))}
        </tbody>
      </table>
      {
        selectedTaskIds.length > 0 && (
          <button className="btn-selection" onClick={handleDeleteSelected}>Elimina Selezionate</button>
        )
      }
    </div>

  )
}