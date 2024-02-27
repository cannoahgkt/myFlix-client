import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { NavigationBar } from "../nav-bar/navigation-bar"; // Import the NavigationBar component
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submits login data to the server
    fetch("YOUR_API_URL/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Username: username, Password: password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          // Calls onLoggedIn callback with user and token
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <NavigationBar /> {/* Render the NavigationBar component separately */}
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label className="form-label">Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3" 
              className="form-control"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label className="form-label">Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control" 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
};
