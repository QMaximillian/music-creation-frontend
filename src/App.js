import React, { Component } from 'react';
import './App.css';
import SongContainer from './containers/SongContainer'
import UserSignUp from './components/UserSignUp'
import Login from './components/Login'

export default class App extends Component {


  render() {
    return (
      <div>
        <Login />
        {/* <UserSignUp /> */}
        {/* <SongContainer /> */}
      </div>
    )
    }
  }
