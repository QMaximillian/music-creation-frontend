import React from 'react';
import { Editor } from 'react-abc';
// import { editorProps } from '../../src/defaults/props';

const id = 'react-abc-editor-id';

export default ({notation}) => (
  <div>
    <textarea
      defaultValue={notation()}
      id={id}
    />
    <div id="midi" />
    <Editor
      editArea={id}
      editorParams={{
        // ...editorProps.editorParams,
        generate_midi: true,
        midi_id: 'midi',
      }}
    />
  </div>
);
