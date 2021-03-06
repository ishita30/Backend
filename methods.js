const express = require('express')
const res = require('express/lib/response')
const app = express()
const mongoose = require('mongoose')

//middleware function, post, front->json
app.use(express.json()) //global middleware function
app.listen(3000)
let users = [
  {
    id: 1,
    name: 'Ishita',
  },
  {
    id: 2,
    name: 'Rachit',
  },
]

//mini app
const userRouter = express.Router()
const authRouter = express.Router()
//base route , router to use
app.use('/user', userRouter)
app.use('/auth', authRouter)

userRouter
  .route('/')
  .get(getUser) //path specific middleware
  .post(postUser)
  .patch(updateUser)
  .delete(deleteUser)

userRouter.route('/:id').get(getUserById)

authRouter.route('/signup').get(middleware, getSignUp).post(postSignUp)

// app.get('/user', (req, res) => {
//   res.send(users)
// })

// //get
// app.get('/user', (req, res) => {
//   console.log(req.query)
//   res.send(users)
// })

// //post->to send data from front end to backend
// app.post('/user', (req, res) => {
//   console.log(req.body)
//   users = req.body
//   res.json({
//     message: 'data receive successfully',
//     user: req.body,
//   })
// })

// //update->patch
// app.patch('/user', (req, res) => {
//   console.log('req.body->', req, res)
//   //update data in users obj
//   let dataToBeUpdated = req.body
//   for (key in req.body) {
//     users[key] = dataToBeUpdated[key]
//   }
//   res.json({
//     message: 'data updated successfully',
//   })
// })

// //to delete the data
// app.delete('/user', (req, res) => {
//   users = {}
//   res.json({
//     message: 'data has been deleted',
//   })
// })

// //parameters
// app.get('/user/:username', (req, res) => {
//   console.log(req.params.username)
//   console.log(req.params)
//   res.send('user id received')
// })
function middleware(req, res, next) {
  console.log('middleware encountered')
  next() //it will call the next function i.e.getSignUp
}
function getUser(req, res) {
  res.send(users)
}

function postUser(req, res) {
  console.log(req.body)
  users = req.body
  res.json({
    message: 'data received successfully',
    user: req.body,
  })
}

function updateUser(req, res) {
  console.log('req.body->', req.body)
  //update data in users obj
  let dataToBeUpdated = req.body
  for (key in req.body) {
    users[key] = dataToBeUpdated[key]
  }
  res.json({
    message: 'data updated successfully',
  })
}

function deleteUser(req, res) {
  users = {}
  res.json({
    message: 'data has been deleted',
  })
}

function getUserById(req, res) {
  console.log(req.params.id)
  let paramId = req.params.id
  let obj = {}
  for (let i = 0; i < users.length; i++) {
    if (users[i]['id'] == paramId) {
      obj = users[i]
    }
  }
  res.json({
    message: 'req received',
    data: obj,
  })
}

function getSignUp(req, res) {
  console.log('getSignUp called')

  res.sendFile('/public/index.html', { root: __dirname })
}

function postSignUp(req, res) {
  let obj = req.body
  console.log('backend', obj)
  res.json({
    message: 'user signed up',
    data: obj,
  })
}

const db_link =
  'mongodb+srv://admin:viIyDk7UsajqTM2Z@cluster0.jnbow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose
  .connect(db_link)

  .then(function (db) {
    console.log(db)
    console.log('db connected')
  })
  .catch(function (err) {
    console.log(err)
  })

//schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    min: 8,
  },
})

//model

const userModel = mongoose.model('userModel', userSchema)
//what name to take of model

function createUser() {
  let user = {
    name: 'Ishita',
    email: 'abc@gmail.com',
    password: '12345',
    confirmPassword: '12345',
  }

  let data = userModel.create(user)
  console.log(data)
}
