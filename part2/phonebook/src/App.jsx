import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  // States
  const emptyPerson = {
    name: '',
    number: '',
    id: null
  }
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState(emptyPerson)
  const [searchTerm, setSearchTerm] = useState('')

  // Handle functions
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => newPerson.name === person.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson(emptyPerson)
    } else {
      personsService
        .createNew({
          name: newPerson.name,
          number: newPerson.number
        })
        .then(res => {
          setPersons(persons.concat(res))
          setNewPerson(emptyPerson)
        })
    }
  }

  const handleNameChange = (event) => {
    const newPersonCopy = {...newPerson}
    newPersonCopy.name = event.target.value
    setNewPerson(newPersonCopy)
  }

  const handleNumberChange = (event) => {
    const newPersonCopy = {...newPerson}
    newPersonCopy.number = event.target.value
    setNewPerson(newPersonCopy)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Data fetching
  const fetchData = () => {
    personsService.getAll().then(personsData =>{
      setPersons(personsData)
    })
  }

  useEffect(fetchData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchTermChange} searchTerm={searchTerm} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        nameHandler={handleNameChange}
        numberHandler={handleNumberChange}
        data={newPerson}
        />
      <h3>Numbers</h3>
      {persons.map(person => {
        if (!searchTerm) {
          return <Person key={person.id} name={person.name} number={person.number} />
        } else if (person.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return <Person key={person.id} name={person.name} number={person.number} />
        }
      })}
    </div>
  )
}

export default App
