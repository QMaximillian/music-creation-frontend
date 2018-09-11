import React from 'react';
import ReactDOM from 'react-dom';
import { ActionCableProvider } from 'react-actioncable-provider'
import { API_WS_ROOT } from './constants';
// import './index.css';
import App from './App';


ReactDOM.render(<App />, document.getElementById('root'));
