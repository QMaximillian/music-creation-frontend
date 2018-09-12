import React, { Component } from 'react'



export default class SongView extends Component {
  // console.log(this.props);


  // handleReceiveNewText = ({ content }) => {
  //   if (content !== this.state.content) {
  //     this.setState({ content })
  //   }
  // }





  render () {
    // this.fetchWebSocket()
  return(
    <div>
      <form
        onBlur={this.props.handleTextAreaOnBlur}
        onFocus={this.props.handleTextAreaOnFocus}
        className="ui grid container" onSubmit={this.props.handleSongSubmit}
      >
        <label>Song Name</label>
        <textarea
          // style={{ width:"500px", height:"300px" }}
<<<<<<< HEAD
          name="content"
          placeholder="Lyrics"
          value={this.props.content}
          onChange={(event) => this.props.handleLyricChange(event)}
=======
          name="lyrics"
          placeholder="Lyrics"
          // value={props.lyrics}
          onChange={(event) => props.handleSongChange(event)}
>>>>>>> b8c5b855a64676723f8237e7b13be20c9c2d35e3
        >
        </textarea>
        <button
        className="massive ui button" type="Submit">Submit
      </button>
    </form>
  </div>

  )
}
}
