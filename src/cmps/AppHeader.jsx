import { NavLink } from "react-router-dom"
export function AppHeader() {
    return (
        <header className="app-header">
                <nav>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/email'>Email</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </nav>
        </header>
    )
}