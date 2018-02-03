import React, { Component } from 'react';
import './App.css';
import  Main from  './main.js';
import Login from './components/authentication/login.js';
import Register from './components/authentication/register.js';

class App extends Component {
  render() {
    return (
      <div>
              <div>
              <Main />
              </div>

      </div>
    );
  }
}

export default App;
