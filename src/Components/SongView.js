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
          name="content"
          placeholder="Lyrics"
          value={this.props.content}
          onChange={(event) => this.props.handleLyricChange(event)}
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
