import { useState } from 'react'
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson, setNewPerson] = useState(emptyPerson)
  const [searchTerm, setSearchTerm] = useState('')

  // Handle functions
  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some((person) => newPerson.name === person.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson(emptyPerson)
    } else {
      const personsCopy = [...persons]
      setPersons(personsCopy.concat({
        name: newPerson.name,
        number: newPerson.number,
        id: personsCopy.length + 1
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
