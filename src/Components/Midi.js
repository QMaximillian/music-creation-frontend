import React from 'react';
import { Midi } from 'react-abc';

export default class MidiContainer extends React.Component {
  state = {
    notation: this.props.generateAudStr
  }



  render() {
    return (
   < Midi notation={this.state.notation}  program/>
    )
  }
 }
