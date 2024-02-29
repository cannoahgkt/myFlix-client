import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email
    };

    fetch("https://cfmovies-ffc8e49a7be5.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = "/login";
      } else {
        alert("Signup failed");
      }
    })
    .catch(error => {
      console.error("Error signing up:", error);
      alert("Something went wrong");
    });
  };

  return (
    <Container>
      <Form className="signupForm" onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-button">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};
