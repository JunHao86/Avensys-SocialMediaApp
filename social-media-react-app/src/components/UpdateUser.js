import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Button, Card, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateUser() {

  const navigate = useNavigate()
    const user = useSelector(function(data)
    {
        console.log(data)
                  return data.User_adminReducer.user
    }) 
    const [formData, setFormData] = useState(user);

    const handleChange = (event) => {
        setFormData({
            ...formData,
          [event.target.name]: event.target.value,
        });
      };
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Update the existing object with the form values
        const updatedUser = {
          ...user,
          ...formData,
        };

        axios.post("http://localhost:8080/admin/update/user",
        updatedUser
       )
       .then(response => { 
         console.log(response.data)           
         
       })
       .catch(error => {
           console.error(`Error fetching user data: ${error}`);
         });
    console.log("updatedObject: ",updatedUser )
    //navigate("/adminpanel")
    window.location.pathname = "/adminpanel"
      }
    
  return (
    
    <Container>
    <Row className="justify-content-center">
      <Col md={6}>
        <Card>
          <Card.Header>Update User</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" required name="username" value={formData.username} onChange={handleChange } />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" required name="password" value={formData.password} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" required name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" required name="role" value={formData.role} onChange={handleChange} />
              </Form.Group>
             {/*  {error && <p className="text-danger">{error}</p>} */}
              <Button type="submit" variant="primary">Update</Button>
              <Button href="/adminpanel" variant="secondary">Cancel</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}


export default UpdateUser
