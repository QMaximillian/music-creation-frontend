import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

componentDidMount(){
  const musicWebSocket = this.openConnection()

  musicWebSocket.onopen = (event) => {
    const subscribeMsg = {"command":"subscribe","identifier":"{\"channel\":\"MusicMessagesChannel\"}"}
    musicWebSocket.send(JSON.stringify(subscribeMsg))
  }
}

openConnection = () => {
  return new WebSocket("ws://localhost:3000/cable")
}

  render() {
    return (
      <div>

      </div>
    );
  }
}

export default App;
