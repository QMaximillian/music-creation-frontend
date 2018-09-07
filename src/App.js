import React, { Component } from 'react';
import './App.css';
import SongContainer from './containers/SongContainer'


export default class App extends Component {


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
        <SongContainer />
      </div>
    )
    }
  }
