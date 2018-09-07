import React, { Component } from 'react'
// import Editor from './Components/Editor'
import Midi from '../components/Midi'
import Notation from '../components/Notation'
import BasicPiano from '../components/Piano'
import SongView from '../components/SongView.js'

export default class SongContainer extends Component {

  state = {
    notation: `X: 1 \nC: Marlon \nM: 4/4 \nL: 1/8 \nQ:1/4=88 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]`,
    inTextAreas: false,
    songName: "",
    lyric: ""

  }

  handleSongChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state))
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
     return (
        <div>
          <div>Midi <Midi notation={this.state.notation}/></div>
          <div>Notation <Notation notation={this.state.notation}/></div>
          <SongView
          handleSongChange={this.handleSongChange}
          handleTextAreaOnBlur={this.handleTextAreaOnBlur}
          handleTextAreaOnFocus={this.handleTextAreaOnFocus}/>
          <div>Piano <BasicPiano
          stateOfTextArea={this.state.inTextAreas}
           notation={this.state.notation}/> </div>
        </div>
     )
   }
 };
