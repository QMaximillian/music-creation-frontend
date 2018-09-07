import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editor from './Components/Editor'
import Midi from './Components/Midi'
import Notation from './Components/Notation'
import BasicPiano from './Components/Piano'


class App extends Component {

  state={
    notation: `X: 1 \nC: Marlon \nM: 4/4 \nL: 1/8 \nQ:1/4=88 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]`
  }
  render() {
    return (
      <div className="App">
        {/* <div>Editor < Editor editable={true} listener={{ highlight: function(abcElem) {console.log}, modelChanged: function(abcElem) {console.log} } } /></div> */}
        <div>Midi < Midi notation={this.state.notation}/></div>
        <div>Notation < Notation notation={this.state.notation}/></div>
        <div>Piano < BasicPiano notation={this.state.notation}/> </div>
      </div>
    );
  }
}

export default App;
