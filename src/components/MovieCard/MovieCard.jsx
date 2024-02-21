import "./MovieCard.scss";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFav, handleFavClick }) => {

  return (
    <Card className="h-100">
      <Link to={`/moviedata/${movie.Title}`}>
        <Card.Img 
        variant="top" 
        src={movie.ImagePath}
        id="movie-cover" 
        />
      </Link>
      <Card.Body>
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
              size={20}
              color="red"
              onClick={() => handleFavClick(movie, true)}
            />
          ) : (
            <Heart
              size={20}
              color="red"
              onClick={() => handleFavClick(movie, false)}
            />
          )}
        </div>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Title>{movie.Year}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <Link to={`/moviedata/${movie.Title}`} className="open-button">
          Open
        </Link>
      </Card.Footer>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired
  }).isRequired,
  handleFavClick: PropTypes.func.isRequired,
  isFav: PropTypes.bool.isRequired
};