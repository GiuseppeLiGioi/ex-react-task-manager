import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"

export default function TaskList(){

    const {tasks, setTasks, fetchTasks} = useContext(GlobalContext)
    useEffect(() => {
      fetchTasks()
    }, [])

return(
    <h2>Sono TaskList</h2>
)
}