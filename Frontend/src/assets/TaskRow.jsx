import React from "react"
import { Link } from 'react-router-dom';

const TaskRow = React.memo(({title, status, createdAt, id}) => {
 
return (
    <tr>
        <td><Link to={`/tasks/${id}`}>{title}</Link></td>
        <td className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>{status}</td>
        <td>{createdAt}</td>
    </tr>
)
})
export default TaskRow;
