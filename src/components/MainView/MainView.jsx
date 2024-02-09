import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import axios from 'axios';

const MainView = ({ handleCardClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the API when the component mounts
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://your-api-url/movies');
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="main-view">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id} // Assuming each movie has a unique ID
          title={movie.title}
          onClick={() => handleCardClick(movie)}
        />
      ))}
    </div>
  );
};

export default MainView;
