import React from 'react'
import NavBar from './NavBar'
import { Container,Form,Row,Col} from 'react-bootstrap'
function CreateProfilePost() {

    const user = useSelector(function(data)
    {
        console.log(data)
                  return data.UserReducer.user
    })
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

        axios.post("http://localhost:8080/username/"${user}"/post",
        updatedPost
       )
       .then(response => { 
         console.log(response.data)           
         
       })
       .catch(error => {
           console.error(`Error fetching user data: ${error}`);
         });
    console.log("updatedObject: ",updatedPost )
    //navigate("/adminpanel")
    window.location.pathname = "/Profile"
      }
  return (
    <Container>
    <Row>
      <Col md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control type="text" placeholder="Enter Content" />
          </Form.Group>
          <Form.Group controlId="mediaUrl">
            <Form.Label>Media URL</Form.Label>
            <Form.Control type="text" placeholder="Enter URL" />
          </Form.Group>
          <Button type="submit" variant="primary" className="btn-block rounded-pill mb-3">Submit</Button>
        </Form>
      </Col>
      <Col md={8}>
        {/* Content for the right section */}
      </Col>
    </Row>
  </Container>
  )
}

export default CreateProfilePost