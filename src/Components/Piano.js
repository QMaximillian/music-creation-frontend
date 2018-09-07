import React from 'react';
import ReactDOM from 'react-dom';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontProvider from './SoundfontProvider';

// CSS styles are required in order to render piano correctly. Importing CSS requires
// a CSS loader. Alternatively, copy the CSS file directly from src/styles.css into your <head>.
import 'react-piano/build/styles.css';

const firstNote = MidiNumbers.fromNote('c3');
const lastNote = MidiNumbers.fromNote('f5');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
})

export default function BasicPiano() {
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}

          // onPlayNote={(midiNumber) => {
          //   // Play a given note - see notes below
          // }}
          // onStopNote={(midiNumber) => {
          //   // Stop playing a given note - see notes below
          // }}

          onPlayNote={(midiNumber) => {
            playNote(midiNumber)
          }}

          onStopNote={(midiNumber) => {
            stopNote(midiNumber)
          }}

          width={1000}
          keyboardShortcuts={keyboardShortcuts}

          disabled={isLoading}
        />
      )}
    />


  );
}


//
{/* <SoundfontProvider
  instrumentName="acoustic_grand_piano"
  audioContext={audioContext}
  hostname={soundfontHostname}
  render={({ isLoading, playNote, stopNote }) => (
    <Piano
      noteRange={noteRange}
      width={containerWidth}
      onPlayNote={playNote}
      onStopNote={stopNote}
      disabled={isLoading}
    />
  )}
/> */}
