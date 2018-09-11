fetch(``, {
  method: "",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'},
  body: JSON.stringify({})
  })
.then(resp => resp.json())
.then(console.log)
