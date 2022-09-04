import { NavLink } from 'react-router-dom';
import jwt from 'jwt-decode';
import { useState, useEffect } from 'react';
import { helpers } from '../Utils/API';

export default function PageForbidden() {
  const token = localStorage.getItem('token');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (helpers.isValidToken(token)) {
      setRole(jwt(token).user.role);
    }
  }, [token]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>403 Forbidden Access</h2>
      <br />
      <NavLink to={role === 'ADMIN' ? '/internal' : '/'} style={{ textDecoration: 'none' }} className="bg-info p-2 rounded">Home</NavLink>
    </div>
  );
}
