import React from 'react';

const MovieCard = ({ title, onClick }) => {
  return (
    <div className="movie-card" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default MovieCard;
