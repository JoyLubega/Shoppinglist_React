import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';
import Main from './main.js';

import Login from './components/authentication/login.js';
import Register from './components/authentication/register.js';
import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>

    <div>
    <App />
  </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
