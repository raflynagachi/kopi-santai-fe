import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';
import MenuPage from './Pages/Menu';
import PageNotFound from './Pages/PageNotFound';

function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    setIsLoggedIn(!!token === false);
  }, [token]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout logout={logout} isLoggedIn={isLoggedIn} />}
      >
        <Route
          path="login"
          element={<Login setToken={setToken} />}
        />
        <Route
          path="register"
          element={<Register setToken={setToken} />}
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
