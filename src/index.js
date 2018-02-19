import React from 'react';
import ReactDOM from 'react-dom';

// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
