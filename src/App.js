import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';
import Home from './Pages/Home';

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
          path="/"
          element={<Home />}
        />
        <Route
          path="login"
          element={<Login setToken={setToken} />}
        />
        <Route
          path="register"
          element={<Register setToken={setToken} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
