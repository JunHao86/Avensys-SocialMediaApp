import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function CreatePostModal() {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleMediaUrlChange = (event) => {
    setMediaUrl(event.target.value);
  }

  const handleSubmit = () => {
    const username = localStorage.getItem('username');

    axios
      .post(`http://localhost:8080/createpost/${username}`, { content, mediaUrl })
      .then(response => {
        console.log(response);
        handleClose();
      })
      .catch(error => {
        console.error(`Error creating post: ${error}`);
      });
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicText">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Enter post content" value={content} onChange={handleContentChange} />
            </Form.Group>

            <Form.Group controlId="formBasicText">
              <Form.Label>Media URL</Form.Label>
              <Form.Control type="text" placeholder="Enter media URL" value={mediaUrl} onChange={handleMediaUrlChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreatePostModal;
