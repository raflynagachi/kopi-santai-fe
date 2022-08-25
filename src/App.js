import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';
import MenuPage from './Pages/Menu';
import PageNotFound from './Pages/PageNotFound';
import Profile from './Pages/Profile';

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    localStorage.setItem('token', '');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    localStorage.getItem('token');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token === true);
    if (isLoggedIn) {
      setUser(jwt(token));
    }
  }, [isLoggedIn]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout logout={logout} isLoggedIn={isLoggedIn} />}
      >
        <Route
          path="login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="profile"
          element={<Profile user={user} />}
        />
        <Route
          path="/menu"
          element={<MenuPage />}
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
