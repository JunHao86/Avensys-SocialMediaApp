import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import Adminpanel from './components/Adminpanel';
import UpdateMediaPost from './components/UpdateMediaPost';
import UpdateUser from './components/UpdateUser';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />       
        <Route path="/adminpanel" element={<Adminpanel />} />
        <Route exact path="/updatemediapost" element={<UpdateMediaPost />} />
        <Route exact path="/updateuser" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
