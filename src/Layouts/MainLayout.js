import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ logout }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header logout={logout} />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
