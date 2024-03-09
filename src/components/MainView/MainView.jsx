import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import { NavigationBar } from "../nav-bar/navigation-bar";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [moviesFromAPI, setMovies] = useState([]);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  useEffect(() => {
    if (!token) return;

    fetch("https://cfmovies-ffc8e49a7be5.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(movies => {
      const moviesFromAPI = movies.map(movie => {
        return {
          id: movie._id,
          title: movie.title,
          description: movie.description,
          genre: movie.genre.name,
          director: movie.director.name,
          image: movie.imageurl
        };
      });
      setMovies(moviesFromAPI);
    });
  }, [token]);

  useEffect(() => {
    setViewMovies(movies);
  }, [movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
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
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }} updateUser={updateUser}/>
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? ( 
                    <Col style={{color: "white"}}><p>The list is empty. Loading data from api...</p></Col>
                  ) : (
                    <MovieView movies={movies} user={user} token={token} updateUser={updateUser}/>
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
                    <Col style={{color: "white"}}><p>The list is empty. Loading data from api...</p></Col>
                  ) : (
                    <>
                      {viewMovies.map(movie => (
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
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default MainView;
