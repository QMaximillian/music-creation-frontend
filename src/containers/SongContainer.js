import React, { Component } from 'react'
// import Editor from './Components/Editor'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT } from '../constants';
import Midi from '../components/Midi'
import Notation from '../components/Notation'
import BasicPiano from '../components/Piano'
import SongView from '../components/SongView.js'

export default class SongContainer extends Component {

  state = {
    notation: `X: 1 \nC: Marlon \nM: 4/4 \nL: 1/8 \nQ:1/4=88 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]`,
    inTextAreas: false,
    songName: "",
    lyric: "",
    musicChannels: []

  }

  componentDidMount() {
    fetch(`${API_ROOT}/api/v1/music_channels`)
      .then(res => res.json())
      .then(musicChannels => this.setState({ musicChannels: musicChannels.data })
    )
  }

  handleSongChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleTextAreaOnFocus = (event) => {
    event.persist()
      this.setState({
        inTextAreas: true
      })
  }

  handleTextAreaOnBlur = (event) => {
    event.persist()
      this.setState({
        inTextAreas: false
      })
  }




   render() {
     console.log(this.state.musicChannels);
     return (
        <div>
          <div>
            <Midi notation={this.state.notation}/>
          </div>
          <div>
            <Notation notation={this.state.notation}/>
          </div>
          <div>
            <SongView
              handleSongChange={this.handleSongChange}
              handleTextAreaOnBlur={this.handleTextAreaOnBlur}
              handleTextAreaOnFocus={this.handleTextAreaOnFocus}
            />
          </div>
          <div>
            <BasicPiano
            stateOfTextArea={this.state.inTextAreas}
            notation={this.state.notation}
            />
          </div>
        </div>
     )
   }
 }
