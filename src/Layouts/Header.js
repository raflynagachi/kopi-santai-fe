import { Link, NavLink } from 'react-router-dom';
import './Layout.css';

export default function Header() {
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
