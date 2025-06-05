/*
Implementare la logica di ordinamento con useMemo(), in modo che l’array ordinato venga ricalcolato solo quando cambiano tasks, sortBy o sortOrder:
Ordinamento per title → alfabetico (localeCompare).
Ordinamento per status → ordine predefinito: "To do" < "Doing" < "Done".
Ordinamento per createdAt → confrontando il valore numerico della data (.getTime()).
Applicare sortOrder per definire se l’ordine è crescente o decrescente.
*/

import { useContext, useEffect, useState, useMemo } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TaskRow from "../TaskRow"
import useTasks from "./useTasks"

export default function TaskList() {
  const { tasks, setTasks, fetchTasks } = useContext(GlobalContext)
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setsortOrder] = useState(1)


  const sortTask = (e) => {
    const selectedSortBy = e.currentTarget.innerText;
    if (sortBy.trim().toLowerCase() === selectedSortBy) {
      setsortOrder(selectedSortBy * -1)
    } else {
      setSortBy(selectedSortBy)
      setsortOrder(1)
    }

  }

  const sortLogic = useMemo(() => {
    const sorted = [...tasks];
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
  }, [tasks, sortBy, sortOrder])


  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Elenco Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th className="task-header" onClick={sortTask}>title</th>
            <th className="task-header" onClick={sortTask}>status</th>
            <th className="task-header" onClick={sortTask}>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {sortLogic.map(task => (
            <TaskRow
              key={task.id}
              title={task.title}
              status={task.status}
              createdAt={task.createdAt}
              id={task.id}
            />
          ))}
        </tbody>
      </table>
    </div>

  )
}