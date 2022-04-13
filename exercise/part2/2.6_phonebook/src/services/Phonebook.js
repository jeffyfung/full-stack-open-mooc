import axios from 'axios'

const url = '/api';

const getAll = () => {
  return axios.get(`${url}/persons`)
}

const addPerson = person => {
  return axios.post(`${url}/persons`, person);
}

const removePerson = person => {
  return axios.delete(`${url}/persons/${person.id}`);
}

const updateNumber = person => {
  return axios.put(`${url}/persons/${person.id}`, person);
}

export default { getAll, addPerson, removePerson, updateNumber }