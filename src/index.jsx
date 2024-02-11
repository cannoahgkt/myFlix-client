import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView/MainView';
import MovieView from './components/MovieView/MovieView';

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

// Finds the root of your app
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
