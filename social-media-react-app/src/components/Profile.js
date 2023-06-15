import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from './NavBar';
import CreateProfilePost from './CreateProfilePost';
import UpdateMediaPost from './UpdateMediaPost';
import UpdateProfilePost from './UpdateProfilePost';

function Profile() {

    const navigate = useNavigate();
    
    return (
        <div>
        <NavBar />
        <Container>
            <Row>
            <CreateProfilePost/>
            <Col md={8}>
            <UpdateProfilePost/>
        </Col>
                
            </Row>
           <updateProfilepost/>
        </Container>
        </div>
    )
}

export default Profile