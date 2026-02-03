require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const currentDate = new Date()
const Person = require('./models/person')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) || '- no content' })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      'error': 'content missing'
    })
  }

  const person = new Person(body)
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (!person) {
    response.status(404).end()
  }
  response.send(person)
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => console.log(error))
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate.toString()}</p>
    `)
})
