import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"

import Countries from './component/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = () => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setCountries(res.data)
      })
  }
  useEffect(fetchData, [])

  return (
    <div>
      <div>find countries <input onChange={(event) => setSearchTerm(event.target.value)} value={searchTerm} /></div>
      <Countries countries={countries.filter(c => c.name.official.includes(searchTerm))} />
    </div>
  )
}

export default App
