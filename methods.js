const express = require('express')
const app = express()

//middleware function, post, front->json
app.use(express.json())
app.listen(3000)
let users = {}
app.get('/users', (req, res) => {
  res.send(users)
})

//get

//post->to send data from front end to backend
app.post('/users', (req, res) => {
  console.log(req.body)
  users = req.body.Name
  res.send({
    message: 'data receive successfully',
    user: req.body,
  })
})
