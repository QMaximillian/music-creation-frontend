import React, { Component } from 'react'
import SongContainer from '../containers/SongContainer'
import { Link } from 'react-router-dom'
// import HomeContainer from '../containers/HomeContainer'
// import { ActionCableProvider } from 'react-actioncable-provider'


export default class LyricistSongRoom extends Component {

    state = {
      currentSong: {},
      empty: true

    }


    // render(){
    //   console.log(this.props);
    //   return (
    //     <div>LyricistSongRoom</div>
    //   )
    // }
   //
    handleSongPick = (lyricistSongRoom) => {
      this.setState({
        currentSong: lyricistSongRoom,
        empty: false
      })
    }
   //
    // clearSong = () => {
    //   this.setState({
    //     currentSong: {},
    //     empty: true
    //   })
    // }
   //
    renderLyricistSongPage = (lyricistSongRoom) => {
      // IMPORTANT //
      // Rendering SongContainer? Or a specific MusicRoomContainer? //
      console.log(this.props.lyricistSongRoom)
        return (
          // <ActionCableProvider url='ws://localhost:3001/api/v1/cable'>
          // <Redirect to='/song-container/'/>


          <SongContainer
          // clearSong={this.clearSong}
           id={this.state.currentSong.id}
        />

        )
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
              <Link to={`/song-room/${this.props.lyricistSongRoom.id}`}>
              <div>{song_name}</div>
            </Link>
            </div> :
            this.renderLyricistSongPage()

          }
          </div>

     )
   }
 }
