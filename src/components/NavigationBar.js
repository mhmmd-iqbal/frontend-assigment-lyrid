import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


const NavigationBar = () => {    
  const navigate = useNavigate()

  const SignOut = () => {
    NotificationManager.success('Logout berhasil!')
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/auth')
    }, 1000);
  }

  useEffect(()=>{
    if(!localStorage.getItem("token")) {
      navigate("/auth");
    }
  },[]);

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Employee Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={SignOut}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavigationBar