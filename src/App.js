import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import './App.css'
// import SongContainer from './containers/SongContainer'
// import UserSignUp from './components/UserSignUp'
import Login from './components/Login'
import HomeContainer from './containers/HomeContainer'
import { fetchReauthUser } from './authAdapter'
import Navbar from './components/Navbar.js'
import SongContainer from './containers/SongContainer'
import { fetchGetUser } from './fetchAdapter'


export default class App extends Component {

  state = {
    auth: {
      authenticating: true,
      currentUser: {}
    },
    musicianSongRooms: {},
    lyricistSongRooms: {}
  }

  componentDidMount(){
    if (localStorage.getItem('token')) {
      fetchReauthUser().then(resp => {
     this.handleLoginUser(resp.user)
      })
    } else {
      this.setState(prevState => {
        return {
          auth: {
          ...prevState.auth,
          authenticating: false
          }
        }
      })
    }

  }

  handleLoginUser = (user) => {

  this.setState(prevState => ({
    auth: {
      ...prevState.auth,
      // authenticating: false,
      currentUser: user
    }
  }), () => fetchGetUser(this.state.auth.currentUser.id).then(resp => this.setState({
    musicianSongRooms: resp,
    lyricistSongRooms: resp
  })))
}


  handleLogout = () => {
    this.setState(prevState => {
      return {
        auth: {
          ...prevState.auth,
          currentUser: {}
        }
      }
    })
    localStorage.clear()

    return <Link to='/' />
  }

  handleUserSongRoomsMusician = () => {
    console.log("Musician", this.state.musicianSongRooms);
    if (Object.keys(this.state.musicianSongRooms).length > 0) {
      console.log(this.state.musicianSongRooms);
      return this.state.musicianSongRooms.data.attributes['lyricist-song-rooms']
    }
  }

  handleUserSongRoomsLyricist = () => {
    if (Object.keys(this.state.lyricistSongRooms).length > 0) {
        return this.state.lyricistSongRooms.data.attributes['lyricist-song-rooms']
      }
  }




  render() {
      const loggedIn = !!this.state.auth.currentUser.id
    return (
      <Fragment>
        <Navbar
          loggedIn={loggedIn}
          handleLogout={this.handleLogout}/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/profile" />}/>
          <Route exact path="/profile" render={() => <HomeContainer  musicianSongRooms={this.handleUserSongRoomsMusician()}
          lyricistSongRooms={this.handleUserSongRoomsLyricist()}
          loggedIn={loggedIn} currentUser={this.state.auth.currentUser}/>}/>
          <Route exact path='/login' render={() => <Login
            loggedIn={loggedIn} handleLoginUser={this.handleLoginUser}/>}/>
          />
          <Route exact path='/song-room/:id' render={(props) => {
            const matchID=props.match.params.id
          return <SongContainer id={matchID}/>}}/>
        </Switch>
      </Fragment>
    )
    }
  }
