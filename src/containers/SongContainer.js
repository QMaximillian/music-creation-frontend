import React, { Component } from 'react'
// import Editor from './Components/Editor'
import MidiContainer from '../Components/Midi'
import Notation from '../Components/Notation'
import Editor from '../Components/Editor'
import BasicPiano from '../Components/Piano'
import SongView from '../Components/SongView.js'

export default class SongContainer extends Component {

  state = {
    notes: [` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`,` yy`],
    inTextAreas: false,
    songName: "",
    lyrics: [`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`,`word`],
  }

  setNotes = (notes) => {
    this.setState({
      notes: notes
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
         return "c4"
        break;
      case 73:
         return "^c4"
        break;
      case 74:
         return "d4"
        break;
      case 75:
         return "^d4"
        break;
      case 76:
         return "e4"
        break;
      case 77:
         return "e4"
        break;
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
    const notation = `X: 1 \nC: Marlon \nL: 1/16 \nM: 4/4 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] ${this.generateBar(this.state.notes)}|] \nw:${this.generateBar(this.state.lyrics)}`
    return notation
  }

  handleSongChange = (e) => {
    // console.log(e.target.value)
    const placeHere = this.state.lyrics.indexOf(`word`)
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
  }

  generateLyrics = (word) => {
    console.log("gen", word);
    let addedWord = []
    if (this.state.lyrics[15]===`word`) {
      const placeHere = this.state.lyrics.indexOf(`word`)
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

  // handleKeyPress = (e) => {
  //   console.log("handlekeypress", e.target)
  // }

   render() {
     return (
        <div>
          <div>Midi <MidiContainer generateAudStr={this.generateAudStr()}/></div>
          {/* <div>Midi <Midi generateAudStr={"^D4 ^D4 ^D4 ^D4|^D4 ^F4 ^G4 ^G4|^G4  yy  yy  yy| yy  yy  yy  yy"}/></div> */}
          {/* <div>Editor <Editor notation={this.displayNotation}/></div> */}
          <div>Notation <Notation notation={this.displayNotation()}/></div>
          <SongView lyrics={this.state.lyrics} handleKeyPress={this.handleKeyPress}
          handleSongChange={this.handleSongChange}
          handleTextAreaOnBlur={this.handleTextAreaOnBlur}
          handleTextAreaOnFocus={this.handleTextAreaOnFocus}/>
          <div>Piano <BasicPiano
          stateOfTextArea={this.state.inTextAreas}
           captureNote={this.captureNote} /> </div>
        </div>
     )
   }
 };
