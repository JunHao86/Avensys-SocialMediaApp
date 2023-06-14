import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/register', {
        username,
        password,
        email,
      })
      .then(response => {
        console.log(response.data);
        // you can automatically log the user in or redirect them to the login page
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  return (
    <Container>
      <h1>Create a new user</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">Create User</Button>
      </Form>
    </Container>
  );
}

export default Register;
