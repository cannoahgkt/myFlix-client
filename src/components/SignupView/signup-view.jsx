import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./signup-view.scss";
import { NavigationBar } from "../nav-bar/navigation-bar";

export const SignupView = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Form className="form-container" onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="form-group">
            <Form.Label className="form-label">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="form-group">
            <Form.Label className="form-label">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group">
            <Form.Label className="form-label">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="submit-button">
            Sign Up
          </Button>
        </Form>
      </Container>
    </>
  );
};
