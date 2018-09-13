import React, { Component } from 'react'
// import Editor from './Components/Editor'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT } from '../constants';
import MidiContainer from '../components/Midi'
import Notation from '../components/Notation'
import Editor from '../components/Editor'
import BasicPiano from '../components/Piano'
import SongView from '../components/SongView.js'


class SongContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: [` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`],
      inTextAreas: false,
      songName: "",
      lyrics: [`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`,`__`],
      content: '',
      mcontent: '',
      lyricMessageId: 0,
      musicMessageId: 0
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
      content: resp.data.attributes['lyric-message']['content'],
      musicMessageId: resp.data.attributes['music-message'].id,
    mcontent: resp.data.attributes['music-message']['content']
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

    fetch(`http://localhost:3001/api/v1/music_messages/${this.state.musicMessageId}`, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({content: this.state.mcontent})
      })

    }




  setNotes = (notes) => {
    this.setState({
      notes: notes
    })
  }

  setMContent = (nstring) => {
    this.setState({
      mcontent: nstring
    })
  }

  setLyrics = (lyrics) => {
    this.setState({
      lyrics: lyrics
    }, () => {console.log("setWord", this.state.lyrics)
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
    const note = this.translateMidi(midiNumber)
    let addedNote = []
    if (this.state.notes[15]===` yy`) {
      const placeHere = this.state.notes.indexOf(` yy`)
      addedNote = [...this.state.notes]
      addedNote[placeHere] = note
    } else {
      addedNote = [...this.state.notes.slice(1), note]
    }
    this.setMContent(this.generateBar(addedNote))
    this.setNotes(addedNote)
  }

  generateBar = (arr) => {
    const Bar1 = arr.slice(0, 4).join(" ")
    const Bar2 = arr.slice(4, 8).join(" ")
    const Bar3 = arr.slice(8, 12).join(" ")
    const Bar4 = arr.slice(12, 16).join(" ")
    const fullBar = `${Bar1}|${Bar2}|${Bar3}|${Bar4}`
    console.log("fullbar", fullBar)
    return fullBar
  }

  generateAudStr = () => {
    const Bar1 = this.state.notes.slice(0, 4).join(" ")
    const Bar2 = this.state.notes.slice(4, 8).join(" ")
    const Bar3 = this.state.notes.slice(8, 12).join(" ")
    const Bar4 = this.state.notes.slice(12, 16).join(" ")
    const fullBar = `${Bar1}|${Bar2}|${Bar3}|${Bar4}`
    console.log("audiofullbar", fullBar)
    return fullBar
  }

  displayNotation = () => {
    const notation = `X: 1 \nC: Marlon \nL: 1/16 \nM: 4/4 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] ${(this.state.mcontent)}|] \nw:${this.generateBar(this.state.lyrics)}`
    return notation
  }

  handleLyricChange = (e) => {
    // console.log(e.target.value)
    const placeHere = this.state.lyrics.indexOf(`__`)
    // console.log("placehere", placeHere)
    const stateSize = this.state.lyrics.slice(0, placeHere).length
    // console.log("statesize", stateSize)
    const valueArr = e.target.value.split(" ")
    // console.log("valueArr", valueArr)
    const valueSize = valueArr.length
    // console.log("valueSize", valueSize)
    if (valueSize > stateSize){
      console.log("last", valueArr[valueArr.length-2]);
      this.generateLyrics(valueArr[valueArr.length-2])
    }


    this.setState({
      [e.target.name]: e.target.value
    })
     // () => console.log("handle song change", this.state)
  }

  // handleSongChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   }, () => console.log("handle song change", this.state))
  //     }

  generateLyrics = (word) => {
    console.log("gen", word);
    let addedWord = []
    if (this.state.lyrics[15]===`__`) {
      const placeHere = this.state.lyrics.indexOf(`__`)
      addedWord = [...this.state.lyrics]
      addedWord[placeHere] = word
      console.log("cond1", addedWord, "placehere", placeHere);
    } else {
      console.log("word", word);

      addedWord = [...this.state.lyrics.slice(1),  `${word}`]
      console.log("added the state", addedWord);

      // addedWord[-1] = ` ${word}`
      // console.log("added the word", addedWord);
    }
    console.log("bottomgen", addedWord);
    this.setLyrics(addedWord)
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

  // handleLyricChange = (event) => {
  //



   render() {

     return (
        <div>

          <button onClick={(event) => this.fetchUpdateSongRoom(event)}>Save Song</button>
          {/* <div> */}
            {/* <MidiContainer generateAudStr={this.generateAudStr()}/></div> */}
          {/* <div>Midi <Midi generateAudStr={"^D4 ^D4 ^D4 ^D4|^D4 ^F4 ^G4 ^G4|^G4  yy  yy  yy| yy  yy  yy  yy"}/></div> */}
          {/* <div>Editor <Editor notation={this.displayNotation}/></div> */}
          <div>
            <Notation notation={this.displayNotation()}/>
          </div>
          <div>
            <SongView
              content={this.state.content}
              handleLyricChange={this.handleLyricChange}
              lyrics={this.state.lyrics}
              handleKeyPress={this.handleKeyPress}
              // handleSongChange={this.handleSongChange}
              handleTextAreaOnBlur={this.handleTextAreaOnBlur}
              handleTextAreaOnFocus={this.handleTextAreaOnFocus}
            />
          </div>
          <div>
            <BasicPiano
            stateOfTextArea={this.state.inTextAreas}
             captureNote={this.captureNote} />
         </div>
        </div>
     )
   }
 }

 export default SongContainer
