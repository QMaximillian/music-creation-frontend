import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { fetchLoginUser } from '../authAdapter'
// import HomeContainer from '../containers/HomeContainer'
export default class Login extends Component {

  state = {
    fields: {
      username: '',
      password: ''
    }
  }

  handleChange = (event) => {
    // console.log(event.target)
    event.persist()
    this.setState(prevState => {
      return {
        fields: {
          ...prevState.fields,
          [event.target.name]:event.target.value
        }
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetchLoginUser(this.state.fields).then(resp => {
      this.props.handleLoginUser(resp.user)
      localStorage.setItem('token', resp.jwt)
    })
  }

   render() {
     const { fields } = this.state
     if (this.props.loggedIn) {
       return <Redirect to='profile'/>
     } else {
     return (
        <div>
          {this.state.error ? <h1>Try again</h1> : null}
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>Username</label>
                <input
                  name="username"
                  placeholder="username"
                  value={fields.username}
                  onChange={this.handleChange}/>
              </div>
              <div>
                <label>Password</label>
                <input
                name="password"
                type="password"
                placeholder="password"
                value={fields.password}
                onChange={this.handleChange}/>
              </div>
              <button type="text">Login</button>
            </form>
          </div>
          <div>
          </div>
        </div>
     )
   }
 }
 }
