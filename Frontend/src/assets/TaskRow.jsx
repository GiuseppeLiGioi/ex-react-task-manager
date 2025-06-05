/*

*/
import React from "react"
import { Link } from 'react-router-dom';


const TaskRow = React.memo(({title, status, createdAt, id, checked, onToggle }) => {
return (
    <tr>
        <td><Link to={`/tasks/${id}`}>{title}</Link><span><input type="checkbox" checked={checked} onChange={() => onToggle(id)}/></span></td>
        <td className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>{status}</td>
        <td>{createdAt}</td>
    </tr>
)
})
export default TaskRow;
