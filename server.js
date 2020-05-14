const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/weaterDB', { useNewUrlParser: true })

app.use('/', api)

const port = 3000
app.listen(process.env.PORT || port, function () {
  console.log(`WeatherApp running on port ${port}`)
})
