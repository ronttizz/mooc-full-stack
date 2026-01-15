import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const req = axios.get(baseUrl)
    const data = req.then(response => response.data)
    return data
}

export default { getPersons }
