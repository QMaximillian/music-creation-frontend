import React, { Component } from 'react'
import SongContainer from '../containers/SongContainer'
import { Link } from 'react-router-dom'
// import HomeContainer from '../containers/HomeContainer'

export default class MusicianSongRoom extends Component {

    state = {
      currentSong: {},
      empty: true

    }

    handleSongPick = (musicianSongRoom) => {
      this.setState({
        currentSong: musicianSongRoom,
        empty: false
      })
    }

    clearSong = () => {
      this.setState({
        currentSong: {},
        empty: true
      })
    }

    renderMusicianSongPage = (musicianSongRoom) => {
      // IMPORTANT //
      // Rendering SongContainer? Or a specific MusicRoomContainer? //
      console.log(this.props.musicianSongRoom)
        return <SongContainer
          clearSong={this.clearSong} id={this.state.currentSong.id}/>
    }

   render() {
     // console.log(this.state.currentSong)
     const { song_name } = this.props.musicianSongRoom
     return (
        <div>
          {
            this.state.empty ?
            <div onDoubleClick={() => this.handleSongPick(this.props.musicianSongRoom)}>
              <Link to={`/song-room/${this.props.musicianSongRoom.id}`}>
              <div>{song_name}</div>
            </Link>
            </div> :
            this.renderMusicianSongPage()
          }
          </div>

     )
   }
 }
