import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function UpdateUser({ user, closeModal }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      ...formData,
    };

    axios
      .post('http://localhost:8080/admin/update/user', updatedUser)
      .then((response) => {
        console.log(response.data);
        closeModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Error updating user: ${error}`);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            required
            name='username'
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='text'
            required
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            required
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='role' className='mb-3'>
          <Form.Label>Role</Form.Label>
          <Form.Select
            required
            name='role'
            value={formData.role}
            onChange={handleChange}
          >
            <option value=''>Select Role</option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
          </Form.Select>
        </Form.Group>

        <Button type='submit' variant='primary' >
          <FontAwesomeIcon icon={faCheck} size='2x' />
        </Button>
      </Form>
    </>
  );
}

export default UpdateUser;
