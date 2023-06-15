import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function Welcome() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  
  const navigate = useNavigate(); 
  function navAdmin()
  {
      navigate("/adminpanel")
  }

  useEffect(() => {
    const username = localStorage.getItem('username');

    axios
      .get(`http://localhost:8080/user/${username}`)
      .then(response => {
        setUser(response.data); 
       
      })
      .catch(error => {
        console.error(`Error fetching user data: ${error}`);
      });

    axios
      .get(`http://localhost:8080/userposts/${username}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(`Error fetching posts: ${error}`);
      });
  }, []);

  if (!user || !posts) {
    return <p>Error, no permission...</p>;
  }

  const isAdmin = (user.role === 'Admin') ? (
    <button onClick={navAdmin}>AdminPanel</button>
  ) : null;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <h3>Role: {user.role}</h3>
      <h3>Email: {user.email}</h3>
      {isAdmin}

      <h2>Your Posts:</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Welcome;
