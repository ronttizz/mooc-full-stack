require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const currentDate = new Date()
const Person = require('./models/person')

morgan.token('body', function (request, _response) { return JSON.stringify(request.body) || '- no content' })

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (_request, response, next) => {
  Person.find({}).then(people => {
    response.json(people)
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      'error': 'content missing'
    })
  }

  const person = new Person(body)

  person.save().then(savedPerson => {
    return response.json(savedPerson)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => response.json(person).end())
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      person.number = request.body.number
      person
        .save()
        .then(_result => response.status(200).end())
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(_result => response.status(204).end())
    .catch(error => next(error))
})

app.get('/info', (_request, response) => {
  Person
    .find({})
    .then(people => {
      response.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p>${currentDate.toString()}</p>
        `)
    })
})

app.use(errorHandler)
