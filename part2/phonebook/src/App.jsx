import { useState } from 'react'

const App = () => {
  const emptyPerson = {
    name: '',
    number: ''
  }
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newPerson, setNewPerson] = useState(emptyPerson)

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input onChange={handleNameChange} value={newPerson.name} /></div>
        <div>number: <input onChange={handleNumberChange} value={newPerson.number} /></div>
        <div><button type="submit">add</button></div>
        <div>debug: {newPerson.name} {newPerson.number}</div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

export default App
