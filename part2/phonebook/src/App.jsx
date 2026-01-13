import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const emptyPerson = {
    name: '',
    number: ''
  }
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState(emptyPerson)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => newPerson.name === person.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson(emptyPerson)
    } else {
      const personsCopy = [...persons]
      setPersons(personsCopy.concat({
        name: newPerson.name,
        number: newPerson.number
      }))
      setNewPerson(emptyPerson)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input onChange={handleSearchTermChange} value={searchTerm} /></div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input onChange={handleNameChange} value={newPerson.name} /></div>
        <div>number: <input onChange={handleNumberChange} value={newPerson.number} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
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
