import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routes from "./Routes"
import Menu from "./menu/Menu"

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

