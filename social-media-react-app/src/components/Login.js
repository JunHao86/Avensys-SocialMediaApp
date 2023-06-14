import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please enter your Username and Password');
      return;
    }

    axios
      .post('http://localhost:8080/login', {
        username,
        password,
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('username', username); // Save username
        navigate('/welcome');
      })
      .catch(error => {
        console.error(`Error: ${error}`);
        setError('Invalid username or password');
      });
  };

  useEffect(() => {
    const successMsg = localStorage.getItem('successMessage');
    if (successMsg) {
      setSuccessMessage(successMsg);
      localStorage.removeItem('successMessage');
    }
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Header className="text-center font-weight-bold">SocialMedia App</Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" required onChange={(e) => setUsername(e.target.value)} className="rounded-pill" />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} className="rounded-pill" />
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-block rounded-pill mb-3">Login</Button>
                <Button href="/register" variant="secondary" className="btn-block rounded-pill mb-3">Create User</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
