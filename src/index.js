import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render((


    <div>
    <App />
  </div>
    ), document.getElementById('root'));
registerServiceWorker();
