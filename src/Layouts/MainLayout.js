import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ logout, isLoggedIn }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header logout={logout} isLoggedIn={isLoggedIn} />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
