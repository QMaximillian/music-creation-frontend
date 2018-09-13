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
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';


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

  findSongName = (matchID) => {
    // console.log("firz bit", this.state.lyricSongRooms );
    const matchName = this.state.lyricSongRooms.data.attributes["lyricist-song-rooms"].find(room => {
          room.id === matchID
    })

    // console.log("Match Name", matchName)

  }




  render() {

    // console.log("State Lyric App", this.state.lyricistSongRooms)
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
          <Route exact path='/song-room/:id/:song_name' render={(props) => {
            console.log("props", props.match.params);
            const matchID = props.match.params.id
            const songName = props.match.params.song_name
          return <SongContainer songName={songName} id={matchID}/>}}/>
        </Switch>
      </Fragment>
    )
    }
  }



  //




// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };
//
// function ButtonAppBar(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="title" color="inherit" className={classes.grow}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
//
// ButtonAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(ButtonAppBar);
//
