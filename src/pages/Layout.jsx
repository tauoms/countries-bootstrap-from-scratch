import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid>
      <Row>
        <Navbar className="cstm-nav" style={{ width: "100%" }}>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="align-items-center justify-content-start">
                <i className="h2 bi bi-globe-asia-australia me-2" />
                {/* <LinkContainer to="/">
                  <Nav.Link className="navlink">Home</Nav.Link>
                </LinkContainer> */}
                <LinkContainer to="/" activeClassName="active-nav-link">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer
                  to="/favourites"
                  activeClassName="active-nav-link"
                >
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" activeClassName="active-nav-link">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
                {!user && (
                  <LinkContainer to="/login" activeClassName="active-nav-link">
                    <Nav.Link>Log in</Nav.Link>
                  </LinkContainer>
                )}
                {user && (
                  <>
                    <Button
                      className="button-bright d-flex align-items-center justify-content-center"
                      onClick={logout}
                    >
                      <i class="bi bi-box-arrow-right me-2" /> Log out
                    </Button>{" "}
                    <div className="mx-3">Hello, {user.email}</div>
                  </>
                )}
              </Nav>
              <div className="ms-auto align-items-center d-flex copyright">
                <span>&copy; 2024 Tuomas Kohvakka</span>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
