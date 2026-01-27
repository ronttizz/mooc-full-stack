import axios from "axios";

const baseUrl = 'http://localhost:3001/api/persons/'

const getAll = () => {
    const req = axios.get(baseUrl)
    const data = req.then(response => response.data)
    return data
}

const createNew = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const deleteEntry = id => {
    const req = axios.delete(baseUrl + id)
    return req.then(res => res.data)
}

const updateEntry = (id, object) => {
    const req = axios.put(baseUrl + id, object)
    return req.then(res => res.data)
} 

export default { getAll, createNew, deleteEntry, updateEntry }
