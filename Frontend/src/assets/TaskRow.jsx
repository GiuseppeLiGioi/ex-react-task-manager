import React from "react"
const TaskRow = React.memo(({title, status, createdAt}) => {
 
return (
    <tr>
        <td>{title}</td>
        <td className={status === "To do" ? "red" : status === "Doing" ? "yellow" : "green"}>{status}</td>
        <td>{createdAt}</td>
    </tr>
)
})
export default TaskRow;
