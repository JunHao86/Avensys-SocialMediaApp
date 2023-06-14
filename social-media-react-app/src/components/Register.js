import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    if (!username || !password || !email) {
      setErrorMessage('Please fill in all the fields');
      return;
    }

    axios
      .post('http://localhost:8080/register', {
        username,
        password,
        email,
      })
      .then(response => {
        console.log(response.data);
        navigate('/login');
        localStorage.setItem('successMessage', 'Account created successfully');
      })
      .catch(error => {
        if (error.response && error.response.status === 409) {
          setErrorMessage('Username exists, please enter another username');
        } else {
          console.error(`Error: ${error}`);
          setErrorMessage('Error creating account. Please contact system administrator');
        }
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <Card.Header className="text-center font-weight-bold">Create a new user</Card.Header>
            <Card.Body>
              {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} className="rounded-pill mb-3" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} className="rounded-pill mb-3" />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} className="rounded-pill mb-3" />
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-block rounded-pill mb-3">Create User</Button>
                <Button href="/login" variant="secondary" className="btn-block rounded-pill mb-3">Back to Login</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
