import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data));
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(
        {
          name: newName,
          number: newNumber
        }
      ));
      setNewName('');
      setNewNumber('');
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