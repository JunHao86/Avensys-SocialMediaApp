import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from './NavBar';
import{addPost_User,socialAppStore} from "./redux.js";
import { useDispatch} from "react-redux";
import CreateProfilePost from './CreateProfilePost';
import UpdateMediaPost from './UpdateMediaPost';
import UpdateProfilePost from './UpdateProfilePost';



function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const [imageError, setImageError] = useState(false); //
    const ud = useDispatch()
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const username = localStorage.getItem('username');
  
      axios
        .get(`http://localhost:8080/user/${username}`)
        .then(response => {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data)); // Save user data
        })
        .catch(error => {
          console.error(`Error fetching user data: ${error}`);
          navigate('/login');
        });
  
      axios
        .get(`http://localhost:8080/userposts/${username}`)
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => {
          console.error(`Error fetching posts: ${error}`);
        });
    }, [navigate]);
  
    if (!user || !posts) {
      console.log('Loading user and posts...');
      return <p>Loading...</p>;
    }
  
    console.log('User:', user);
    console.log('Posts:', posts);
  
    function UpdatePost(post)
    {
        console.log(post)
        
        ud(addPost_User(post))
        console.log("get socialAppStore.getState()",socialAppStore.getState())
        navigate("/updateprofilepost")
    }

    function DeletePost(post)
    {
        console.log(post)
        
        axios.post(`http://localhost:8080/userposts/${user.username}/delete/${post.postId}`,
           post
          )
          .then(response => { 
            console.log(response.data)           
            window.location.pathname = "/profile"
          })
          .catch(error => {
              console.error(`Error fetching user data: ${error}`);
            });
    }

    
    const handleImageError = () => {
      setImageError(true);
    };


    return (
      <div>
        <NavBar />
        <Container>
        <div class="container text-center">
        <div class="row">
          <div class="col-4">
            <CreateProfilePost/>
          </div>
          <div class="col-8">
          <h3>Your posts thus far</h3>
          <Row >
                {posts.map((post, index) => (
                <Col key={index} xs={12} md={4} lg={3} className="mb-4">
                    <Card >
                        <div class="card-header">
                            <button onClick={() =>UpdatePost(post)} className='btn btn-success'>Update</button>
                            <button onClick={() =>DeletePost(post)} className='btn btn-danger'>Delete</button>
                        </div>
                        <div>
                        {post.mediaUrl && 
                        (<Card.Img variant="top" src={post.mediaUrl} alt="Error occured" 
                        onError={handleImageError}/>)}
                        {/* {imageError ? (<a href={post.mediaUrl}>Click here to view</a>) : (<a></a>) } */}
                        {/* <a href={post.mediaUrl}>Hyperlink</a> */}
                        </div>
                        <Card.Body>
                            <h5><Card.Text>{post.caption}</Card.Text></h5>
                            <p><Card.Text>{post.content}</Card.Text></p>
                            
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
          </div>
        </div>
        </div>




            
            
        </Container>
      </div>
    );
  }

export default Profile