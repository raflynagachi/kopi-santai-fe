import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';
import MenuPage from './Pages/Menu';
import PageNotFound from './Pages/PageNotFound';

function App() {
  const [token, setToken] = useState('');

  console.log(token);
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
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
