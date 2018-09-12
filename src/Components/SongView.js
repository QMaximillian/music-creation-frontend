import React from 'react'


const SongView = (props) => {
  // console.log(props);
  return(
    <div>
      <form
        onBlur={props.handleTextAreaOnBlur}
        onFocus={props.handleTextAreaOnFocus}
        className="ui grid container" onSubmit={props.handleSongSubmit}
      >
        <input
            // style={{ width:"500px", height:"300px" }}
            name="songName"
            placeholder={"Song Name"}
            // value={props.song.attributes.name}
            onChange={(event) => props.handleSongChange(event)}
          >
        </input>
        <textarea
          // style={{ width:"500px", height:"300px" }}
          name="lyrics"
          placeholder="Lyrics"
          // value={props.lyrics}
          onChange={(event) => props.handleSongChange(event)}
        >
        </textarea>
        <button
        className="massive ui button" type="Submit">Submit
      </button>
    </form>
  </div>

  )
}


export default SongView
