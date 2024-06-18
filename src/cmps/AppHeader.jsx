import { NavLink } from "react-router-dom"
export function AppHeader() {
    return (
        <header className="app-header">
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink className="email-link" to='/email/inbox'>Email</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </nav>
        </header>
    )
}