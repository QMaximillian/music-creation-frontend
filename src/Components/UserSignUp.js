import React, { Component } from 'react'
// import {} from '../adapters'

export default class UserLogin extends Component {

state = {
    user: {
      username: '',
      password: ''
    }
}

handleFetchUser = (event) => {
  event.preventDefault()
  fetch(`http://localhost:3001/api/v1/users`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify({
      user: {
        username: this.state.user.username,
        password: this.state.user.password
      }
    })
    })
  .then(resp => resp.json())
  .then(console.log)
}

handleSignUp = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

  render() {
  return(
    <div>
      <form onChange={(event) => this.handleSignUp(event)} onSubmit={(event) => this.handleFetchUser(event)}>
        <input name="username" value={this.state.username}  placeholder="username"></input><br/>
        <input name="password" value={this.state.password} placeholder="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
}
