import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar'; 

function Welcome() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    axios
      .get(`http://localhost:8080/user/${username}`)
      .then(response => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Save user data
      })
      .catch(error => {
        console.error(`Error fetching user data: ${error}`);
        navigate('/login');
      });

    axios
      .get(`http://localhost:8080/userposts/${username}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(`Error fetching posts: ${error}`);
      });
  }, [navigate]);

  if (!user || !posts) {
    return <p>Error, no permission...</p>;
  }

  return (
    <div>
      <NavBar /> 
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
