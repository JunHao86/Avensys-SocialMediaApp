import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from './NavBar';
import { useDispatch } from 'react-redux';
import { addPost_User, socialAppStore } from './redux';
import CreateProfilePost from './CreateProfilePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [imageErrors, setImageErrors] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');

    axios
      .get(`http://localhost:8080/user/${username}`)
      .then(response => {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
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

  function updatePost(post) {
    console.log(post);

    dispatch(addPost_User(post));
    console.log('get socialAppStore.getState()', socialAppStore.getState());
    navigate('/updateprofilepost');
  }

  function deletePost(post) {
    console.log(post);

    axios
      .post(`http://localhost:8080/userposts/${user.username}/delete/${post.postId}`, post)
      .then(response => {
        console.log(response.data);
        window.location.pathname = '/profile';
      })
      .catch(error => {
        console.error(`Error deleting post: ${error}`);
      });
  }

  const handleImageError = index => {
    setImageErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = true;
      return updatedErrors;
    });
  };

  return (
    <div>
      <NavBar />
      <Container>
        <div className="container text-center">
          <div className="row">
            <div className="col-4">
              <CreateProfilePost />
            </div>
            <div className="col-8">
              <h3>Your posts thus far</h3>
              <Row>
                {posts.map((post, index) => (
                  <Col key={index} xs={12} md={4} lg={3} className="mb-4">
                    <Card>
                      <div className="card-header">
                        <button onClick={() => updatePost(post)} className="btn btn-success">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => deletePost(post)} className="btn btn-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                      <div>
                        {post.mediaUrl && !imageErrors[index] ? (
                          <Card.Img
                            variant="top"
                            src={post.mediaUrl}
                            alt="Error occurred"
                            onError={() => handleImageError(index)}
                          />
                        ) : (
                          <a href={post.mediaUrl}>Hyperlink</a>
                        )}
                      </div>
                      <Card.Body>
                        <h5>
                          <Card.Text>{post.caption}</Card.Text>
                        </h5>
                        <p>
                          <Card.Text>{post.content}</Card.Text>
                        </p>
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

export default Profile;
