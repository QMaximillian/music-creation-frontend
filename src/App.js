import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import SongContainer from './containers/SongContainer'
import UserSignUp from './components/UserSignUp'
import Login from './components/Login'

export default class App extends Component {

  state = {
    auth: {
      currentUser: {}
    }
  }

  handleLoginUser = (user) => {
    const newAuth = {
        ...this.state.auth,
        currentUser: user
    }

    this.setState({
      auth: {
        currentUser: newAuth
      }
    })

  }
  render() {
    const loggedIn = !!this.state.auth.currentUser.id
    return (
      <Fragment>
        <Router>
        <Switch>
        <Route exact path="/" render={() => <SongContainer />}/>
        <Route exact path="/song-container" component={SongContainer}></Route>
        <Route exact path='/login' render={() => <Login loggedIn={loggedIn} handleLoginUser={this.handleLoginUser}/>}/>
        {/* <UserSignUp /> */}
        {/* <SongContainer /> */}
        </Switch>
      </Router>
      </Fragment>
    )
    }
  }
