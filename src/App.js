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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
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
          path="/cart"
          element={<OrderItem />}
        />
      </Route>
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default App;
