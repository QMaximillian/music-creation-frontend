import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
// import SongContainer from './containers/SongContainer'
// import UserSignUp from './components/UserSignUp'
import Login from './components/Login'
import HomeContainer from './containers/HomeContainer'
import { fetchReauthUser } from './authAdapter'
import Navbar from './components/Navbar.js'

export default class App extends Component {

  state = {
    auth: {
      authenticating: true,
      currentUser: {}
    }
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
      authenticating: false,
      currentUser: user
    }
  }))
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
          <Route exact path="/profile" render={() => <HomeContainer    loggedIn={loggedIn}/>}/>
          <Route exact path='/login' render={() => <Login
            loggedIn={loggedIn} handleLoginUser={this.handleLoginUser}/>}/>
        </Switch>
      </Fragment>
    )
    }
  }
