import { NavLink } from "react-router-dom";
export default function Navbar(){
return(
<nav className="navbar">
<NavLink className="navbar-child" to="/">Tasks</NavLink>
<NavLink className="navbar-child" to="/tasks/new">ADD Tasks</NavLink>
</nav>

)
}