import { useContext, useEffect } from "react"
import {Link} from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext"
import TaskRow from "../TaskRow"

export default function TaskList() {

  const { tasks, setTasks, fetchTasks } = useContext(GlobalContext)
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Elenco Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th className="task-header">Nome</th>
            <th className="task-header">Stato</th>
            <th className="task-header">Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
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