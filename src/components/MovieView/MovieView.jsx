import "./MovieView.scss";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../MovieCard/MovieCard";

export const MovieView = ({
  user,
  addFav,
  removeFav,
  favMovies,
  moviedata,
  handleFavClick
}) => {
  const { title: urlTitle } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const topRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const movie = moviedata.find((m) => m.Title === urlTitle);

    if (movie) {
      const similarMovies = moviedata.filter(
        (m) => m.Genre.Name === movie.Genre.Name && m._id !== movie._id
      );
      setMovie(movie);
      setSimilarMovies(similarMovies);
      setIsFav(user.FavoriteMovies.includes(movie._id));
    }
  }, [urlTitle, moviedata, user, favMovies]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);
  }, [pathname]);

  useEffect(() => {
    if (movie) {
    setIsFav(favMovies.includes(movie._id));
    }
  }, [favMovies, movie]);

  return (
    <>
      {movie && (
        <div>
          <div ref={topRef} />
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                className="w-100"
                id="movie-poster"
                aria-label="movie-poster"
                src={movie.ImagePath}
                alt={movie.Title}
                style={{ maxWidth: "600px" }}
              />
            </div>
            <div className="fav-icon"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              overflow: 'hidden',
              padding: '5px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'white')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {isFav ? (
                <HeartFill
                  id="remove-fav-button"
                  size={20}
                  color="red"
                  onClick={() => handleFavClick(movie, true)}
                  aria-label="remove from favorites"
                />
              ) : (
                <Heart
                  id="add-fav-button"
                  size={20}
                  color="red"
                  onClick={() => handleFavClick(movie, false)}
                  aria-label="add to favorites"
                />
              )}
            </div>

            <div>
              <span>
                <h1>{movie.Title}</h1>
              </span>
            </div>
            <div>
              <span>
                <h3>
                  {movie.Year} - {movie.Rating} - {movie.Runtime}
                </h3>
              </span>
            </div>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <span>
                <iframe
                  src={movie.TrailerPath.replace("watch?v=", "embed/")}
                  title="Movie Trailer"
                  id="trailer"
                  aria-label="trailer"
                  className="trailer-button"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </span>
            </div>
            <h4>Watch Trailer</h4>
            <div className="mt-3">
              <span>Director: </span>
              <span>{movie.Director.Name}</span>
            </div>
            <div>
              <span>Genre: </span>
              <span>{movie.Genre.Name}</span>
            </div>

            <div className="mt-3">
              <p 
              id="movie-description" 
              aria-label="movie-description"
              style={{ maxWidth: "800px", margin: "0 auto" }}
              >
                <span>{movie.Description}</span>
              </p>
            </div>
          </div>

          <br />
          <h2>Similar movies</h2>
          <Container className="mb-3">
            <Row>
              {similarMovies.map((movie) => (
                <Col
                  md={3}
                  key={`${movie._id}-${isFav}`}
                  className="movie-card"
                >
                  <MovieCard
                    movie={movie}
                    addFav={addFav}
                    removeFav={removeFav}
                    isFav={favMovies.includes(movie._id)}
                    handleFavClick={handleFavClick}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

MovieView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  addFav: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  favMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  moviedata: PropTypes.array.isRequired,
  handleFavClick: PropTypes.func.isRequired
};