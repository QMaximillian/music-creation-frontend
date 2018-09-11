import React from 'react';
import ReactDOM from 'react-dom';
// import { ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from './constants';
// import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
