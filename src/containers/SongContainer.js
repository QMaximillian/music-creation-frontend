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
    notes: [],
    inTextAreas: false,
    songName: "",
    lyric: ""
  }

  setNotes = (notes) => {
    this.setState({
      notes: notes
    }, () => {console.log("setnotes", this.state.notes)
})
  }

  captureNote = (e) => {
    this.generateNotation(e)
  }

  translateMidi = (midi) => {
    switch (midi) {
      case 60:
         return "C4"
        break;
      case 61:
         return "^C4"
        break;
      case 62:
         return "D4"
        break;
      case 63:
         return "^D4"
        break;
      case 64:
         return "E4"
        break;
      case 65:
         return "F4"
        break;
      case 66:
         return "^F4"
        break;
      case 67:
         return "G4"
        break;
      case 68:
         return "^G4"
        break;
      case 69:
         return "A4"
        break;
      case 70:
         return "^A4"
        break;
      case 71:
         return "B4"
        break;
      case 72:
         return "C5"
        break;
      case 73:
         return "^C5"
        break;
      case 74:
         return "D5"
        break;
      case 75:
         return "^D5"
        break;
      case 76:
         return "E5"
        break;
      case 77:
         return "F5"
        break;
      default:
         " "

    }
  }

  generateNotation = (midiNumber) => {
    console.log("midi",midiNumber)
    const note = this.translateMidi(midiNumber)
    console.log("note", note)
    const addedNote = [...this.state.notes, note]
    console.log("addedNote", addedNote)
    this.setNotes(addedNote)
  }

  displayNotation = () => {
    const notesString = this.state.notes.join(" ")
    console.log("notesString", notesString)
    const notation = `X: 1 \nC: Marlon \nM: 4/4 \nL: 1/4 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] ${notesString}|]`
    console.log("notation", notation)
    return notation
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
    }, () => console.log("handle song change", this.state))
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
<<<<<<< HEAD
          <div>
            <Midi notation={this.displayNotation(}/>
          </div>
          <div>
            <Notation notation={this.displayNotation(}/>
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
            captureNote={this.captureNote}
            // notation={this.state.notation}
            />
          </div>
=======
          <div>Midi <Midi notation={this.displayNotation()}/></div>
          <div>Notation <Notation notation={this.displayNotation()}/></div>
          <SongView
          handleSongChange={this.handleSongChange}
          handleTextAreaOnBlur={this.handleTextAreaOnBlur}
          handleTextAreaOnFocus={this.handleTextAreaOnFocus}/>
          <div>Piano <BasicPiano
          stateOfTextArea={this.state.inTextAreas}
           captureNote={this.captureNote} /> </div>
>>>>>>> 22de47b1ff4d9ba3c64648d2edefa5a3f97c6fe2
        </div>
     )
   }
 }
