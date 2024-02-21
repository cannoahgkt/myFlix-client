import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView/MainView';
import MovieView from './components/MovieView/MovieView';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const MyFlixApplication = () => {
  const [currentView, setCurrentView] = useState('main');
  const [selectedMovie, setSelectedMovie] = useState({ title: 'Test Movie' });

  const handleCardClick = () => {
    setCurrentView('movie');
  };

  const handleBackButtonClick = () => {
    setCurrentView('main');
  };

  return (
    <div>
      {currentView === 'main' ? (
        <MainView handleCardClick={handleCardClick} />
      ) : (
        <MovieView movie={selectedMovie} handleBackButtonClick={handleBackButtonClick} />
      )}
    </div>
  );
};

const cors = require('cors');
let allowedOrigins = ['myflixonline.netlify.app', 'http://localhost:8080'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Finds the root of your app
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);

