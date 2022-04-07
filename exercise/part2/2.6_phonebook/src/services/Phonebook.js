import axios from 'axios'

const url = 'http://localhost:3001';

const getAll = () => {
  return axios.get(`${url}/persons`)
}

const addPerson = person => {
  return axios.post(`${url}/persons`, person);
}

export default { getAll, addPerson }