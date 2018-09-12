import React from 'react'
// import { Link } from 'react-router-dom'


const Navbar = (props) => {
  // console.log(props)
  return(
    <div>
    {props.loggedIn ? (
      <div>
        <button onClick={() => props.handleLogout()}>Logout</button>
      </div>) : null
    }
  </div>
  )
}

export default Navbar
