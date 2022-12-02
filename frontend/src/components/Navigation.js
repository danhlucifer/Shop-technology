import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/userSlice";

function Navigation() {
  const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

  function handleLogout(){
    dispatchEvent(logout());
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>React-Bootstrap</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user */}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {/* if user */}
            {user && (
              <NavDropdown title={`${user.name}`} id="basic-nav-dropdown">
                {user.isAdmin && (
                  <>
                    <LinkContainer to="/dashboard">
                      <NavDropdown.Item href="">Dashboard</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/new-product">
                      <NavDropdown.Item href="">
                        Create Product
                      </NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                {!user.isAdmin && (
                  <>
                    <LinkContainer to="/cart">
                      <NavDropdown.Item href="">Cart</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/order">
                      <NavDropdown.Item href="">
                        My orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
                <NavDropdown.Divider />
                <Button variant="danger" className="logout-btn" onClick={handleLogout}>Logout</Button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
