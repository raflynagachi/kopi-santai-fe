import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>404 Page Not Found</h2>
      <br />
      <NavLink to="/" style={{ textDecoration: 'none' }} className="bg-info p-2 rounded">Home</NavLink>
    </div>
  );
}
