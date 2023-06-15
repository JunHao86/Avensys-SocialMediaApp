import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adminpanel from './components/Adminpanel';
import UpdateMediaPost from './components/UpdateMediaPost';
import UpdateUser from './components/UpdateUser';
import Explore from './components/Explore';
import Profile from './components/Profile';
import UpdateProfilePost from './components/UpdateProfilePost';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/Adminpanel" element={<Adminpanel/>}/>
        <Route path="/Explore" element={<Explore/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route exact path="/updateprofilepost" element={<UpdateProfilePost/>}/>
        <Route exact path="/updatemediapost" element={<UpdateMediaPost />} />
        <Route exact path="/updateuser" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default App;
