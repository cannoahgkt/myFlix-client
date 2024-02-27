import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Link, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../nav-bar/navigation-bar";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://cfmovies-ffc8e49a7be5.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>
              }
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={handleLogin} /></Col>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                !user ? <Navigate to="/login" replace /> :
                movies.length === 0 ? <Col>The list is empty!</Col> :
                <Col md={8}><MovieView movie={selectedMovie} /></Col>
              }
            />
            <Route
              path="/"
              element={
                !user ? <Navigate to="/login" replace /> :
                movies.length === 0 ? <Col>The list is empty!</Col> :
                movies.map((movie) => (
                  <Col className="mb-4" key={movie._id} md={3}>
                    <Link to={`/movies/${movie._id}`} onClick={() => handleMovieSelect(movie)}>
                      <MovieCard movie={movie} />
                    </Link>
                  </Col>
                ))
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
