import React, { Component } from 'react'
import SongContainer from '../containers/SongContainer'
import HomeContainer from '../containers/HomeContainer'
import { Route } from 'react-router-dom'

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
          clearSong={this.clearSong} currentSong={this.state.currentSong}/>
    }

   render() {
     // console.log(this.state.currentSong)
     const { song_name } = this.props.musicianSongRoom
     return (
        <div>
          {
            this.state.empty ?
            <div onDoubleClick={() => this.handleSongPick(this.props.musicianSongRoom)}>
              <div>{song_name}</div>
            </div> :
            this.renderMusicianSongPage()
          }
          </div>

     )
   }
 }
