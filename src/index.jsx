import React from 'react';
import ReactDOM from 'react-dom';
import  MainView  from './components/MainView/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const MyFlixApplication = () => {
  return (
    <div className="main-content">
      <MainView />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MyFlixApplication />
  </React.StrictMode>,
  document.getElementById('root')
);
