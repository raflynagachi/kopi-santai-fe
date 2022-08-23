import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';
import Register from './Pages/Register';

function App() {
  const [token, setToken] = useState('');

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
      </Route>
    </Routes>
  );
}

export default App;
