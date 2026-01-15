import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const req = axios.get(baseUrl)
    const data = req.then(response => response.data)
    return data
}

const createNew = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

export default { getPersons, createNew }
