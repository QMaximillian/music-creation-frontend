import React, { Component } from 'react'
import withAuth from '../hocs/withAuth'
import MusicianSongRoom from '../components/MusicianSongRoom'
import LyricistSongRoom from '../components/LyricistSongRoom'
import { fetchPostLyricSongRoom, fetchPostMusicSongRoom } from '../fetchAdapter'

// import { Route } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'

class HomeContainer extends Component {


    mappedMusicianSongRooms = () => {
      if (this.props.musicianSongRooms !== undefined) {
        // console.log(this.props.musicianSongRooms);
        return this.props.musicianSongRooms.map(musicianSongRoom => {
          return <MusicianSongRoom key={musicianSongRoom.id}
            musicianSongRoom={musicianSongRoom}
          />
        })
      }
    }

    mappedLyricistSongRooms = () => {
      if (this.props.lyricistSongRooms !== undefined) {
        // console.log(this.props.lyricistSongRooms);
        return this.props.lyricistSongRooms.map(lyricistSongRoom => {
          return <LyricistSongRoom key={lyricistSongRoom.id}
            lyricistSongRoom={lyricistSongRoom}
          />
        })
      }
    }

    createRoom = (type, id) => {
      if (type === "musician") {
        fetchPostLyricSongRoom(id)
      }

      if (type === 'lyricist') {
        // console.log(id, this.props)
        fetchPostLyricSongRoom(id)
      }
    }

    // handleSongNameChange = (event) => {
    //   this.setState({
    //     [event.target.name]: event.target.value
    //   })
    // }



    render() {
      console.log(this.props.lyricistSongRooms);
      const { id } = this.props.currentUser
       return (

        <div>
          <label>MusicRooms</label>
          <button onClick={() => this.createRoom("musician", id)}>Create MusicRoom</button>
          {/* <input name="songname" onChange={(event) => this.handleSongNameChange(event)}/> */}
          {this.mappedMusicianSongRooms()}
            <div>
              <br />
              <br />
              <br />
              <br />
            </div>
          <label>LyricRooms</label>
          <button onClick={() => this.createRoom("lyricist", id)}>Create LyricRoom</button>
          {this.mappedLyricistSongRooms()}
        </div>

     )
   }
}

export default withAuth(HomeContainer)
