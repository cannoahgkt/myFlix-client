import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../nav-bar/navigation-bar";

const MainView = () => {
  const storedUserJSON = localStorage.getItem('user');
  const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://cfmovies-ffc8e49a7be5.herokuapp.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setMovies(data);
        } else {
          console.error("Empty response received from the server");
          setError("Empty response received from the server"); // Set error state
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies: " + error.message); // Set error state
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
          // Remove setToken(null) if token state is not defined in your component
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={6}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={6}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          // setToken(token); // Add token state if necessary
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col style={{ color: "white" }}>
                      <p>The list is empty. Loading data from API...</p>
                    </Col>
                  ) : (
                    <MovieView movies={movies} user={user} />
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col style={{ color: "white" }}>
                      <p>The list is empty. Loading data from API...</p>
                    </Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
          {error && (
            <Col style={{ color: "red", textAlign: "center" }}>
              <p>{error}</p>
            </Col>
          )}
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
