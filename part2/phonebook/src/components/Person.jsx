import personsService from '../services/persons'

const Person = ({name, number, id, persons, setPersons}) => {
  const deletePerson = (id, name) => {
    const del = window.confirm(`Delete ${name} ?`)
    if (del) {
      personsService.deleteEntry(id).then(res => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }
  return <div>{name} {number} <button onClick={() => deletePerson(id, name)}>delete</button></div>
}

export default Person
