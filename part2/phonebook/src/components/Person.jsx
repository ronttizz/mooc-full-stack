const Person = ({name, number, id}) => {
  const deletePerson = (id) => {
    console.log(`delete ${id}`)
  }
  return <div>{name} {number} <button onClick={() => deletePerson(id)}>delete</button></div>
}

export default Person
