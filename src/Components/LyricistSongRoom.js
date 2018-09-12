import React, { Component } from 'react'
import SongContainer from '../containers/SongContainer'
import HomeContainer from '../containers/HomeContainer'
import { Route } from 'react-router-dom'

export default class LyricistSongRoom extends Component {

    state = {
      currentSong: {},
      empty: true

    }

    render(){
      console.log(this.props);
      return (
        <div>LyricistSongRoom</div>
      )
    }
   //
    handleSongPick = (lyricistSongRoom) => {
      this.setState({
        currentSong: lyricistSongRoom,
        empty: false
      })
    }
   //
    clearSong = () => {
      this.setState({
        currentSong: {},
        empty: true
      })
    }
   //
    renderLyricistSongPage = (lyricistSongRoom) => {
      // IMPORTANT //
      // Rendering SongContainer? Or a specific MusicRoomContainer? //
      console.log(this.props.lyricistSongRoom)
        return <SongContainer
          clearSong={this.clearSong} currentSong={this.state.currentSong}/>
    }
   //
   render() {
     // console.log(this.state.currentSong)
     const { song_name } = this.props.lyricistSongRoom
     return (
        <div>
          {
            this.state.empty ?
            <div onDoubleClick={() => this.handleSongPick(this.props.lyricistSongRoom)}>
              <div>{song_name}</div>
            </div> :
            this.renderLyricistSongPage()
          }
          </div>

     )
   }
 }
