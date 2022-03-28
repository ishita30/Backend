const express = require('express')
const app = express()
app.listen(3000)

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>')
})
app.get('/about', function (req, res) {
  res.send('<h1>About page</h1>')
})
app.get('/about', function (req, res) {
  res.sendFile('./views/about.html', { root: _dirname })
})

//redirects

app.get('/about-us', (req, res) => {
  res.redirect('/about')
})

//404 page
app.use((req, res) => {
  res.sendFile('./views/404.html', { root: _dirname })
})
