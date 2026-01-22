const express = require('express')
const app = express()
const PORT = 3001
const currentDate = new Date()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const rand_n = Math.floor(Math.random() * 100000).toString()
  if (!persons.find(person => person.id == rand_n)) {
    return rand_n
  } else {
    generateId()
  }
}

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      'error': 'content missing'
    })
  }
  const person = {
    "id": generateId(),
    ...body,
  }
  persons.push(person)
  response.send(201)
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
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (!person) {
    response.status(404).end()
  }
  persons = persons.filter(person => person.id !== id)
  response.status(200).end()
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${currentDate.toString()}</p>
    `)
})
