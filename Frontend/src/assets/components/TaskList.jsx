/*
💡 Importante:
Il debounce non funziona bene sugli input controllati.
Rimuovere value dall’input, rendendolo non controllato, affinché il debounce possa funzionare correttamente.
*/

import { useContext, useEffect, useState, useMemo, useCallback, useRef } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TaskRow from "../TaskRow"
import debounce from "lodash/debounce";


export default function TaskList() {
  const { tasks, setTasks, fetchTasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState(1)
  const inputRef = useRef();
  const [filteredTasks, setFilteredTasks] = useState([]);


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


  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);


  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Elenco Tasks</h2>
      <input
        type="text"
        placeholder="Digita il nome della Task..."
        ref={inputRef}
        onChange={() => filterLogic()}
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
            />
          ))}
        </tbody>
      </table>
    </div>

  )
}