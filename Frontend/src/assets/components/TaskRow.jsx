/*
Usare dayjs per formattare le date in formato italiano (DD/MM/YYYY)
Installare dayjs con il comando:

npm install dayjs
Modificare TaskRow.jsx e TaskDetail.jsx per visualizzare la data formattata in formato italiano (DD/MM/YYYY).
*/
import React from "react"
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';


const TaskRow = React.memo(({title, status, createdAt, id, checked, onToggle }) => {
    const formattedDate = dayjs(createdAt).format("DD/MM/YYYY");
return (
    <tr>
        <td><Link to={`/tasks/${id}`}>{title}</Link><span><input type="checkbox" checked={checked} onChange={() => onToggle(id)}/></span></td>
        <td className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>{status}</td>
        <td>{formattedDate}</td>
    </tr>
)
})
export default TaskRow;
