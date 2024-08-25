import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <h1>Navbar</h1>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Login</Link>
            <Outlet />
        </nav>
    )
}