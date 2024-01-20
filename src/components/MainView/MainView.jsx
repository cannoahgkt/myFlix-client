import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

const MainView = ({ handleCardClick }) => {
  const movies = [
    { title: 'Movie 1' },
    { title: 'Movie 2' },
    { title: 'Movie 3' },
  ];

  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          key={movie.title}
          title={movie.title}
          onClick={() => handleCardClick(movie)}
        />
      ))}
    </div>
  );
};

export default MainView;
