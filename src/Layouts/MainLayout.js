import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
