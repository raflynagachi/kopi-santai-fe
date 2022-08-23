import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/Login';
import MainLayout from './Layouts/MainLayout';

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
      </Route>
    </Routes>
  );
}

export default App;
