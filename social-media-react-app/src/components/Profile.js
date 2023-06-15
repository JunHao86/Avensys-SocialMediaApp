import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavBar from './NavBar';

function Profile() {

    const navigate = useNavigate();
    
    return (
        <div>
        <NavBar />
        <Container>
            <Row className="mt-4">

            </Row>
        </Container>
        </div>
    )
}

export default Profile