import React, { Component } from 'react'



export default class SongView extends Component {
  // console.log(this.props);


  // handleReceiveNewText = ({ content }) => {
  //   if (content !== this.state.content) {
  //     this.setState({ content })
  //   }
  // }





  render () {
    console.log(this.props);
  return(
    <div>
      <form
        onBlur={this.props.handleTextAreaOnBlur}
        onFocus={this.props.handleTextAreaOnFocus}
        className="ui grid container" onSubmit={this.props.handleSongSubmit}
      >
        <label>Song: {this.props.songName}</label>
        <br />
        <textarea
          style={{ width:"900px", height:"100px" }}
          name="content"
          placeholder="Lyrics"
          value={this.props.content}
          onChange={(event) => this.props.handleLyricChange(event)}
          // name="lyrics"
          // placeholder="Lyrics"
          // // value={props.lyrics}
          // onChange={(event) => props.handleSongChange(event)}
        >
        </textarea>
    </form>
  </div>

  )
}
}
