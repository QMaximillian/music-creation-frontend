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
