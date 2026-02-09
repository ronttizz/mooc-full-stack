const mongoose = require('mongoose')
const express = require('express')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const app = express()

app.use(express.json())

mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(_result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

app.use('/api/blogs', blogsRouter)

module.exports = app
