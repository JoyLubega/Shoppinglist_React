import React, { Component } from 'react';
import {  BrowserRouter, Route}  from 'react-router-dom'

import './App.css';
import  Main from  './main.js';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
              <div>
                 <Main />
              </div>

      </BrowserRouter>
    );
  }
}

export default App;
