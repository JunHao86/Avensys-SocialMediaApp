import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from './NavBar';

function Welcome() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [imageErrors, setImageErrors] = useState([]);

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
    console.log('Loading user and posts...');
    return <p>Loading...</p>;
  }

  console.log('User:', user);
  console.log('Posts:', posts);

  const handleImageError = index => {
    setImageErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = true;
      return updatedErrors;
    });
  };

  return (
    <div>
      <NavBar />
      <Container>
        <h2 className="mt-4">Welcome, {user.username}!</h2>
        <Row className="mt-4">
          {posts.map((post, index) => (
            <Col key={index} xs={12} md={4} lg={3} className="mb-4">
              <Card>
                {post.mediaUrl && !imageErrors[index] ? (
                <Card.Img
                variant="top"
                src={post.mediaUrl}
                alt="Error occurred"
                onError={() => handleImageError(index)}
                />
                ) : (
                <a href={post.mediaUrl}>Hyperlink</a>
                )}
                <Card.Body>
                  <Card.Text>{post.content}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;
