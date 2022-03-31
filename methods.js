const express = require('express')
const app = express()

//middleware function, post, front->json
app.use(express.json())
app.listen(3000)
let users = {}
app.get('/user', (req, res) => {
  res.send(users)
})

//get

//post->to send data from front end to backend
app.post('/user', (req, res) => {
  console.log(req.body)
  users = req.body
  res.json({
    message: 'data receive successfully',
    user: req.body,
  })
})

//update->patch
app.patch('/user', (req, res) => {
  console.log('req.body->', req, res)
  //update data in users obj
  let dataToBeUpdated = req.body
  for (key in req.body) {
    users[key] = dataToBeUpdated[key]
  }
  res.json({
    message: 'data updated successfully',
  })
})

//to delete the data
app.delete('/user',(req,res)=>
{
  users={};
  res.json({
    message: "data has been deleted";
  })
}
)