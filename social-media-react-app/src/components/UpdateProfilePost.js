import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function UpdateProfilePost() {
  
  const post = useSelector(function(data)
  {
    return data.Post_UserReducer.post
  }) 
  const [formData, setFormData] = useState(post);

  const handleChange = (event) => {
    setFormData({
        ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the existing object with the form values
    const updatedPost = {
      ...post,
      ...formData,
    };
      
    axios.post(`http://localhost:8080/userposts/${formData.user.username}/update/${formData.postId}`,
      updatedPost)
    .then(response => { 
      console.log(response.data)           
    })
    .catch(error => {
        console.error(`Error fetching user data: ${error}`);
    });
    
    console.log(formData)
    window.location.pathname = "/Profile"
  }
  
  return (
    <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Header>Update Media Post</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control type="text" required name="content" value={formData.content} onChange={handleChange } />
              </Form.Group>
              <Form.Group controlId="media_url">
                <Form.Label>media_URL</Form.Label>
                <Form.Control type="text"  name="mediaUrl" value={formData.mediaUrl} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="caption">
                <Form.Label>Caption</Form.Label>
                <Form.Control type="text" required name="caption" value={formData.caption} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="createdAt">
                <Form.Label>Date Created</Form.Label>
                <Form.Control type="text" required name="createdAt" value={formData.createdAt} onChange={handleChange} disabled />
              </Form.Group>
              <Button type="submit" variant="primary">Update</Button>
              <Button href="/Profile" variant="secondary">Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}


export default UpdateProfilePost