import React from 'react';
import { Editor } from 'react-abc';

const notation =`X: 1 \nC: Nicholas Smith \nM: 4/4 \nL: 1/8 \nQ:1/4=88 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]`;

const id = 'a-random-id';

export default ({ notation}) => (
  <div>
    <textarea
      defaultValue={`X: 1 \nC: Nicholas Smith \nM: 4/4 \nL: 1/8 \nQ:1/4=88 \n%%staves {V1} \nV: V1 clef=treble \n[V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]`}
      id={id}
    />
    <Editor
      editArea={id}
    />
  </div>
);
// "X: 1 \
// C: Nicholas Smith \
// M: 4/4 \
// L: 1/8 \
// Q:1/4=88 \
// %%staves {V1} \
// V: V1 clef=treble \
// [V: V1] (d3 _B =B_A =A2 | _A2 _B=B G2) (cB | d8)|]"
