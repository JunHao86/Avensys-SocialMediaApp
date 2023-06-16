import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



function UpdateMediaPost({ post }) {
  const [formData, setFormData] = useState(post);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/admin/update/post', formData)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error(`Error updating post: ${error}`);
      });
  };

  useEffect(() => {
    setFormData(post);
  }, [post]);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          type="text"
          required
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="media_url">
        <Form.Label>Media URL</Form.Label>
        <Form.Control
          type="text"
          required
          name="mediaUrl"
          value={formData.mediaUrl}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="caption">
        <Form.Label>Caption</Form.Label>
        <Form.Control
          type="text"
          required
          name="caption"
          value={formData.caption}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="createdAt" className='mb-3'>
        <Form.Label>Date Created</Form.Label>
        <Form.Control
          type="text"
          required
          name="createdAt"
          value={formData.createdAt}
          onChange={handleChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        <FontAwesomeIcon icon={faCheck} size='2x' />
      </Button>
    </Form>
  );
}

export default UpdateMediaPost;
