import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        User<span>Hub</span>
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Users
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Register
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
        >
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
