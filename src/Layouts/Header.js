import { Link, NavLink } from 'react-router-dom';
import './Layout.css';

export default function Header({ logout }) {
  const token = localStorage.getItem('token');

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h3 className="text-logo">Kopi Santai</h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3 p-2 align-items-end">
              <li className="nav-item">
                <NavLink data-testid="navlink-home" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink data-testid="navlink-menu" to="menu">
                  Menu
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink data-testid="navlink-order" to="order">
                  Order
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink data-testid="navlink-games" to="games">
                  Games
                </NavLink>
              </li>
              |
              { token ? (
                <>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-profile" to="profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item m-auto">
                    <button type="button" onClick={logout} className="btn py-0 px-2" style={{ backgroundColor: '#ff6d6d' }}>Logout</button>
                  </li>
                </>
              )
                : (
                  <>
                    <li className="nav-item">
                      <NavLink data-testid="navlink-login" to="login">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink data-testid="navlink-register" to="register">
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
