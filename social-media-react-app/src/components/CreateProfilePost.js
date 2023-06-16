import { useState } from 'react'
import React  from 'react'
import { Button, Container,Form} from 'react-bootstrap'
import axios from 'axios'
import { getDownloadURL,getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from "./Firebase"

function CreateProfilePost() {

    const userObject = localStorage.getItem('user')
    const username = localStorage.getItem('username')
    const storage = getStorage();

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
   
    //Event to handle 
    const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      const storageRef = ref(storage, 'gs://springtest-f7ba8.appspot.com/' + file.name);
      
      try {
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully!');
        const downloadURL = await getDownloadURL(storageRef);
        console.log('File download URL:', downloadURL)

        //From handleChange
        setFormData({
          ...formData,
        [event.target.name]: downloadURL,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    

    const handleChange = (event) => {
        setFormData({
            ...formData,
          [event.target.name]: event.target.value,
        });
      };
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        //--------------------

        //Merging with Firebase:
        //String of file link from Firebase should be set in FormData
        //Currently it is holding String pathname to file w/ fakepath
        
        //Either from here, upload to Firebase, receive URL from Firebase, setFormData
        //or upload to Firebase upon handleFileUpload, setFormData with URL received from Firebase

        //--------------------

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
    window.location.pathname = "/Profile"
      }
  return (
    <Container>
        <h3>Write something new for your friends to see!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control type="text" name="caption" required placeholder="Enter Name" onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control type="text" name="content" required placeholder="Enter Content" onChange={handleChange}/>
          </Form.Group>
{/* New mediaURL (select file to upload to FireBase) */}
          <Form.Group controlId="mediaUrl">
            <Form.Label>Media URL</Form.Label>
            <Form.Control type="file" name="mediaUrl" placeholder="Enter URL" onChange={handleFileUpload}/>
          </Form.Group>

{/* Old mediaURL (insert your own URL) */}
          {/* <Form.Group controlId="mediaUrl">
            <Form.Label>Media URL</Form.Label>
            <Form.Control type="text" name="mediaUrl" placeholder="Enter URL" onChange={handleChange}/>
          </Form.Group> */}
          <Button type="submit" variant="primary" className="btn-block rounded-pill mb-3">Submit</Button>
        </Form>
  </Container>
  )
}

export default CreateProfilePost