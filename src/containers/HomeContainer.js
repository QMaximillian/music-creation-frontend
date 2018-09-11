import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import withAuth from '../hocs/withAuth'

class HomeContainer extends Component {
     render() {
       return (
        <div>
          HomeContainer
        </div>
     )
   }
 }

export default withAuth(HomeContainer)
