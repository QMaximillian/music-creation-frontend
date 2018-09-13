// const headerOptions = {
//
// }

export const fetchGetUser = (user_id) => {
  return fetch(`http://localhost:3001/api/v1/users/${user_id}`,
    {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }})
  .then(resp => resp.json())
}

export const fetchPostLyricSongRoom = (id) => {
  console.log(id);
  const data = {

      'lyricist_id': id,
      'musician_id': id,
      'song_name': "Honey"
    }
  fetch(`http://localhost:3001/api/v1/song_rooms`, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json())
  .then(console.log)
}


export const fetchPostMusicSongRoom = (id) => {
  console.log("Music", id);
}
