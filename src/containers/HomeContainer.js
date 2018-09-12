import React, { Component } from 'react'
import withAuth from '../hocs/withAuth'
import MusicianSongRoom from '../components/MusicianSongRoom'
import LyricistSongRoom from '../components/LyricistSongRoom'
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


    render() {
      // console.log(this.props.lyricistSongRooms)
       return (

        <div>
          <label>MusicRooms</label>

          {this.mappedMusicianSongRooms()}
          <div>
            <br />
            <br />
            <br />
            <br />
          </div>
          <label>LyricRooms</label>

          {this.mappedLyricistSongRooms()}
        </div>
     )
   }
}

export default withAuth(HomeContainer)
