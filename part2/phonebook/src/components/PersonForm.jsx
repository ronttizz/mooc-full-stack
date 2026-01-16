const PersonForm = ({onSubmit, nameHandler, numberHandler, data}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input onChange={nameHandler} value={data.name} /></div>
      <div>number: <input onChange={numberHandler} value={data.number} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm
