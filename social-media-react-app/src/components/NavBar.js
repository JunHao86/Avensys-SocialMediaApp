import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Image, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser);
  }, [location]);

  return (
    location.pathname !== '/login' && location.pathname !== '/register' && user && (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <Image src="/src/components/avatar.png" /> TweGram
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">All Posts</Nav.Link>
            {user.role === 'Admin' && <Nav.Link href="#link">Admin Controls</Nav.Link>}
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <Image src="/avatar.png" /> {user.username} {user.role === 'Admin' && '[ADMIN]'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  );
}

export default NavBar;
