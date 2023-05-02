import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      
      <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/LearnReact/">Main App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/LearnReact/">Home</Nav.Link>
            <Nav.Link href="/LearnReact/product">Product</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Outlet />
    </>
  )
};

export default Layout;