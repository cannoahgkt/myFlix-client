import React from 'react';

const MovieView = ({ movie, handleBackButtonClick }) => {
  return (
    <div className="movie-view">
      <h2>{movie.title}</h2>
      {/* Render other movie details (description, poster image, genre, director, etc.) */}
      <button onClick={() => handleBackButtonClick()}>Back to MainView</button>
    </div>
  );
};

export default MovieView;
