const express = require('express')
const app = express()
app.listen(3000)
let users = {}
app.get('/users', (req, res) => {
  res.send(users)
})
//get

//post->to send data from front end to backend
