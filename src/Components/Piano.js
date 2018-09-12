import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import SoundfontProvider from './SoundfontProvider';
import 'react-piano/build/styles.css';

const firstNote = MidiNumbers.fromNote('c4');
const lastNote = MidiNumbers.fromNote('f5');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
})

export default function BasicPiano({ captureNote }) {
  return (
    <SoundfontProvider
      instrumentName="acoustic_grand_piano"
      audioContext={audioContext}
      hostname={soundfontHostname}
      render={({ isLoading, playNote, stopNote }) => (
        <Piano
          noteRange={{ first: firstNote, last: lastNote }}

          onPlayNote={(midiNumber) => {
            playNote(midiNumber)
            captureNote(midiNumber)
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
