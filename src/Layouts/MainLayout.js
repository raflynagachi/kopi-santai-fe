import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HeaderAdmin from './HeaderAdmin';

export default function MainLayout({ logout, isAdmin }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {
        isAdmin
          ? <HeaderAdmin logout={logout} />
          : <Header logout={logout} />
      }
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
