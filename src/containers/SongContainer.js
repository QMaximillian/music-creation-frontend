import React, { Component } from 'react'
// import Editor from './Components/Editor'
// import { API_ROOT } from '../constants';
import Midi from '../components/Midi'
import Notation from '../components/Notation'
import BasicPiano from '../components/Piano'
import SongView from '../components/SongView.js'
// import ActionCable from 'actioncable'



class SongContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [],
      inTextAreas: false,
      content: '',
      lyricMessageId: 0
    }

  //   const cable = ActionCable.createConsumer('ws://localhost:3001/api/v1/cable')
  //
  //   this.sub = cable.subscriptions.create('LyricsChannel', {
  // received: this.handleLyricChange
    // })
  }


  componentDidMount () {
    this.fetchGetSongRoom()
  }

  //ActionCable Stuff


  fetchGetSongRoom = () => {
    fetch(`http://localhost:3001/api/v1/song_rooms/${this.props.id}`, {
      method: "GET",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }).then(resp => resp.json()).then(resp =>

    this.setState({
      lyricMessageId: resp.data.attributes['lyric-message'].id,
    content: resp.data.attributes['lyric-message']['content']
  }))
}


  fetchUpdateSongRoom = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3001/api/v1/lyric_messages/${this.state.lyricMessageId}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({content: this.state.content})
      })
  }





  setNotes = (notes) => {
    this.setState({
      notes: notes
    //}, () => {console.log("setnotes", this.state.notes)
})
  }

  captureNote = (e) => {
    this.generateNotation(e)
  }

  translateMidi = (midi) => {
    switch (midi) {
      case 60:
         return "C4"
      case 61:
         return "^C4"
      case 62:
         return "D4"
      case 63:
         return "^D4"
      case 64:
         return "E4"
      case 65:
         return "F4"
      case 66:
         return "^F4"
      case 67:
         return "G4"
      case 68:
         return "^G4"
      case 69:
         return "A4"
      case 70:
         return "^A4"
      case 71:
         return "B4"
      case 72:
         return "C5"
      case 73:
         return "^C5"
      case 74:
         return "D5"
      case 75:
         return "^D5"
      case 76:
         return "E5"
      case 77:
         return "F5"
      default:
         " "

    }
  }

  generateNotation = (midiNumber) => {
    // console.log("midi",midiNumber)
    const note = this.translateMidi(midiNumber)
    // console.log("note", note)
    const addedNote = [...this.state.notes, note]
    // console.log("addedNote", addedNote)
    this.setNotes(addedNote)
  }

  displayNotation = () => {
    const notesString = this.state.notes.join(" ")
    // console.log("notesString", notesString)
    const notation = `X: 1 \nC: Marlon \nM: 4/4 \nL: 1/4 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] ${notesString}|]`
    // console.log("notation", notation)
    return notation
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

  handleLyricChange = (event) => {

    if (this.state.content !== event.target.value) {
    this.setState({
      [event.target.name]: event.target.value
    })
     // () => console.log("handle song change", this.state)
  }
  }


   render() {

     return (
        <div>

          <button onClick={(event) => this.fetchUpdateSongRoom(event)}>Save Song</button>
          <div>
            <Midi notation={this.displayNotation()}/>
          </div>
          <div>
            <Notation notation={this.displayNotation()}/>
          </div>
          <div>
            <SongView
              content={this.state.content}
              handleLyricChange={this.handleLyricChange}
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
        </div>
     )
   }
 }

 export default SongContainer
