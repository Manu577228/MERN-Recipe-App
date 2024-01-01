import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function CustomNavbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="p-4">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-white text-2xl font-bold"
        >
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/create-recipe" className="text-white">
              Create Recipe
            </Nav.Link>
            {!cookies.access_token ? (
              <Nav.Link as={Link} to="/auth" className="text-white">
                Login/Register
              </Nav.Link>
            ) : (
              <Button variant="link" onClick={logout} className="text-white">
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
