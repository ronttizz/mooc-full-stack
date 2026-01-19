import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const fetchData = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })
  }
  useEffect(fetchData, [])

  return (
    <div>
      <div>find countries <input onChange={(event) => setSearch(event.target.value)} value={search} /></div>
    </div>
  )
}

export default App
