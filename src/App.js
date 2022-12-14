import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';
import MenuPage from './Pages/Menu';
import PageNotFound from './Pages/PageNotFound';
import Profile from './Pages/Profile';
import MenuDetail from './Pages/MenuDetail';
import OrderItem from './Pages/OrderItem';
import Order from './Pages/Order';
import Home from './Pages/Home';
import Games from './Pages/Games';
import Dashboard from './Pages/Admin/Dashboard';
import MenuAdmin from './Pages/Admin/MenuAdmin';
import CouponAdmin from './Pages/Admin/CouponAdmin';
import Promotion from './Pages/Admin/Promotion';
import ReviewAdmin from './Pages/Admin/ReviewAdmin';
import PageUnauthorized from './Pages/PageUnauthorized';
import PageForbidden from './Pages/PageForbidden';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="register"
          element={<Register />}
        />
        <Route
          path="profile"
          element={<Profile />}
        />
        <Route
          path="/menu"
          element={<MenuPage />}
        />
        <Route
          path="/menu/:id"
          element={<MenuDetail />}
        />
        <Route
          path="/games"
          element={<Games />}
        />
        <Route
          path="/cart"
          element={<OrderItem />}
        />
        <Route
          path="/order"
          element={<Order />}
        />
      </Route>
      <Route
        path="internal"
        element={<MainLayout />}
      >
        <Route
          path=""
          element={<Dashboard />}
        />
        <Route
          path="menu"
          element={<MenuAdmin />}
        />
        <Route
          path="menu/:id/review"
          element={<ReviewAdmin />}
        />
        <Route
          path="coupon"
          element={<CouponAdmin />}
        />
        <Route
          path="promotion"
          element={<Promotion />}
        />
      </Route>
      <Route
        path="/unauthorized"
        element={<PageUnauthorized />}
      />
      <Route
        path="/forbidden"
        element={<PageForbidden />}
      />
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
