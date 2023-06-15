import { useState } from 'react'
import React  from 'react'
import NavBar from './NavBar'
import { Button, Container,Form,Row,Col} from 'react-bootstrap'
import axios from 'axios'


function CreateProfilePost() {

    const userObject = localStorage.getItem('user')
    const username = localStorage.getItem('username')

    const getCurrentTimestamp = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      return timestamp;
    };

    const [formData, setFormData] = useState({
      postId:0,
      caption:'',
      content:'',
      mediaUrl:'',
      createdAt:getCurrentTimestamp()
    });


    

    const handleChange = (event) => {
        setFormData({
            ...formData,
          [event.target.name]: event.target.value,
        });
      };
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // Update the existing object with the form values
        //formData.user = user;
        setFormData({ ...formData, user: userObject });
      
        axios.post(`http://localhost:8080/userposts/${username}/post`,
        formData
       )
       .then(response => { 
         console.log(response.data)           
         
       })
       .catch(error => {
           console.error(`Error fetching user data: ${error}`);
         });
    console.log("updatedObject: ",formData )
    //navigate("/adminpanel")
    //window.location.pathname = "/Profile"
      }
  return (
    <Container>
    <Row className="justify-content-center">
      <Col md={4} >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control type="text" name="caption" placeholder="Enter Name" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control type="text" name="content" placeholder="Enter Content" onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="mediaUrl">
            <Form.Label>Media URL</Form.Label>
            <Form.Control type="text" name="mediaUrl" placeholder="Enter URL" onChange={handleChange}/>
          </Form.Group>
          <Button type="submit" variant="primary" className="btn-block rounded-pill mb-3">Submit</Button>
        </Form>
      </Col>
      <Col>
        {/* Content for the right section */}
      </Col>
    </Row>
  </Container>
  )
}

export default CreateProfilePost