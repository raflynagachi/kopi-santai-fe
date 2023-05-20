import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import { helpers } from '../Utils/API';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [role, setRole] = useState('');

  const logout = () => {
    navigate('/login');
    localStorage.setItem('token', '');
    window.location.reload();
  };

  useEffect(() => {
    if (helpers.isValidToken(token)) {
      setRole(jwt(token).user.role);
    }
  }, [token]);

  return (
    <header className="sticky-top" style={{ backgroundColor: '#efefef' }}>
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
              { role !== 'ADMIN' && (
                <>
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
                </>
              )}
              { role === 'ADMIN' && (
                <>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-home" to="/internal/">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-menu" to="/internal/menu">
                      Menu
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-coupon" to="/internal/coupon">
                      Coupon
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-promotion" to="/internal/promotion">
                      Promotion
                    </NavLink>
                  </li>
                </>
              )}
              { role === 'USER' && (
                <>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-orderItem" to="cart">
                      Cart
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
                </>
              )}
              |
              { token ? (
                <>
                  <li className="nav-item">
                    <NavLink data-testid="navlink-profile" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
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
