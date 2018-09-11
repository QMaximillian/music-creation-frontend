export const fetchLoginUser = (user) => {
  console.log(user)
  const url = 'http://localhost:3001/api/v1/login'

  const options = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }

    return fetch(url, options)
    .then(resp => resp.json())
  }

export const fetchReauthUser = () => {
  const url = 'http://localhost:3001/api/v1/reauth'
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  }
  return fetch(url, options)
  .then(resp => resp.json())
}
