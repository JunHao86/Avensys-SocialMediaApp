import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[user, setUser] = useState({})
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleSubmit = event => {
    event.preventDefault();
    axios
    .post('http://localhost:8080/login', {
      username,
      password,
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('username', username); // Save username
      setUser(response.data)      
      navigate('/welcome');
     
      
    })
    .catch(error => {
      console.error(`Error: ${error}`);
      setError('Invalid username or password');
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" required onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button type="submit" variant="primary">Login</Button>
                <Button href="/register" variant="secondary">Create User</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
