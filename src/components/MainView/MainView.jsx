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
  const [favoriteUpdated, setFavoriteUpdated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesFiltered, setMoviesFiltered] = useState([]);

  const handleUpdateFavorite = () => {
    fetch(`https://cfmovies-ffc8e49a7be5.herokuapp.com/users/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error('Error fetching user data:', error));
  };

  useEffect(() => {
    if (user && token) {
      if (!favoriteUpdated) {
        handleUpdateFavorite();
        setFavoriteUpdated(true);
      }
      fetch('https://cfmovies-ffc8e49a7be5.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          const moviesFromAPI = data.map((movie) => ({
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              Birth: movie.Director.Birth,
              Death: movie.Director.Death,
            },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          }));
          setMovies(moviesFromAPI);
          setMoviesFiltered(moviesFromAPI);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    }
  }, [user, token, favoriteUpdated]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((searchTerm) => {
    const filteredMovies = moviesFromAPI.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMoviesFiltered(filteredMovies);
  }, 300);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        loggedOut={onLoggedOut}
      />
      <Row className="main-view justify-content-md-center">
        <Routes>
        <Route path="/signup" element={
            <>{user ? (<Navigate to="/"/>
            ) : (
              <Col className="col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <SignupView />
              </Col>
            )}</>
          }/>
          <Route path="/login" element={
            <>{user ? (<Navigate to="/"/>
            ) : (
              <Col className="col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token);}} />
              </Col>
            )}</>
          }/>
          <Route path="/profile/:username" element={
            <>{!user ? (
              <Navigate to="/login" replace />
            ) : (
              <Col md={8}>
                <ProfileView user={user} token={token} onRemoveFavorite={handleUpdateFavorite} loggedOut={onLoggedOut}/>
              </Col>
            )}</>
          }/>
          <Route path="/movies/:movieId" element={
            <>{!user ? (
              <Navigate to="/login" replace />
            ) : moviesFromAPI.length === 0 ? (
              <Col>The list is empty!</Col>
            ) : (
              <Col md={8}>
                <MovieView className="movieViewTile" movies={moviesFromAPI} />
              </Col>
            )}</>
          }/>
          <Route
            path="/"
            element={
              <>{!user ? (
                <Navigate to="/login" replace />
              ) : moviesFromAPI.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <>
                  <Col md={12}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search movies..."
                        className="searchBar"
                      />
                  </Col>
                  <>{moviesFiltered.map((movie) => (
                    <Col className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6 col-xxs-6 col-4 mb-5 movieCardTile" key={movie._id}>
                      <MovieCard
                        movie={movie}
                        user={user}
                        token={token}
                        onToggleFavorite={handleUpdateFavorite}
                      />
                    </Col>
                  ))}</>
                </>
              )}</>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
}

export default MainView;
