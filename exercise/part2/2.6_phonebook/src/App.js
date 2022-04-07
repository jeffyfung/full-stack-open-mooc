import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const url = 'http://localhost:3001';
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get(`${url}/persons`)
      .then(response => setPersons(response.data));
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios.post(`${url}/persons`, { name: newName, number: newNumber })
        .then(res => {
          console.log(res.data);
          setPersons(persons.concat(res.data));
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const updateEntriesBySearch = (event) => setSearchText(event.target.value);

  const getFilteredPersons = () => persons.filter(person => person.name.toLowerCase().includes(searchText));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchText} handleChange={updateEntriesBySearch} />
      
      <h2>add a new</h2>
      <PersonForm
        newNameValue={newName}
        newNumValue={newNumber} 
        handleNewName={setNewName}
        handleNewNum={setNewNumber}
        handleSubmit={addPerson}
      />

      <h2>Numbers</h2>
      {getFilteredPersons().map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App