import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Auth() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center mt-5">
      <Row>
        <Col md={6} className="mb-4">
          <Login />
        </Col>
        <Col md={6}>
          <Register />
        </Col>
      </Row>
    </Container>
  );
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate("/");
    } catch (error) {
      console.log(error);

      // Set the error message based on the response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 to-indigo-500 p-6 rounded-lg text-white">
      <Form onSubmit={onSubmit}>
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        {/* Display the error message with a darker and bolder red color */}
        {errorMessage && (
          <div className="mb-3 text-red-800 font-bold text-center">{errorMessage}</div>
        )}
        <Form.Group controlId="login-username" className="mb-3">
          <Form.Label className="block text-sm font-bold mb-2">
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Group>
        <Form.Group controlId="login-password" className="mb-4">
          <Form.Label className="block text-sm font-bold mb-2">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-pink-700 hover:to-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Login now.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 to-indigo-500 p-6 rounded-lg text-white">
      <Form onSubmit={onSubmit}>
        <h2 className="text-2xl mb-4 text-center font-bold">Register</h2>
        <Form.Group controlId="register-username" className="mb-3">
          <Form.Label className="block text-sm font-bold mb-2">
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Group>
        <Form.Group controlId="register-password" className="mb-4">
          <Form.Label className="block text-sm font-bold mb-2">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-r hover:from-pink-700 hover:to-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Auth;
