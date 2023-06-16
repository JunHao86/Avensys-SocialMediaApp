import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Adminpanel from './components/Adminpanel';

function App() {

  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    axios
      .get(`http://localhost:8080/user/${username}`)
      .then(response => {
        const role = response.data.role;
        setUserRole(role);
      })
      .catch(error => {
        console.error(`Error fetching user data: ${error}`);
      });
  }, []);

  useEffect(() => {
    if (userRole && userRole.toLowerCase() !== 'admin') {
      navigate('/welcome');
    }
  }, [navigate, userRole]);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        {userRole && userRole.toLowerCase() === 'admin' ? (
          <Route path="/Adminpanel" element={<Adminpanel />} />
        ) : null}

      </Routes>
    </div>
  );
}

export default App;
