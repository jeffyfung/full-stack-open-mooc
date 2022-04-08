import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './components/PersonForm'
import PhonebookServices from './services/Phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    PhonebookServices.getAll().then(res => setPersons(res.data))
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingEntry = persons.find((person) => person.name === newName);
    if (existingEntry) {
      if (newNumber === existingEntry.number) {
        alert(`${newName} is already added to phonebook`);
      } else if (window.confirm(`${existingEntry.name} is already added to phonebook, replace the old number with a new one?`)) {
        existingEntry.number = newNumber;
        PhonebookServices.updateNumber(existingEntry)
          .then(res => {
            setPersons(persons.map(p => p.id === res.data.id? res.data : p));
            setNewName('');
            setNewNumber('');
            setStatusMessage({ content: `Updated ${res.data.name}`, status: 0 });
            setTimeout(() => setStatusMessage(null), 5000)
          })
          .catch(err => {
            setStatusMessage({ content: `Information of ${existingEntry.name} already removed from server`, status: 1 });
            console.log(err);
          })
      }
    } else {
      let tmpName = newName;
      PhonebookServices.addPerson({ name: newName, number: newNumber })
        .then(res => {
          setPersons(persons.concat(res.data));
          setNewName('');
          setNewNumber('');
          setStatusMessage({ content: `Updated ${res.data.name}`, status: 0 });
          setTimeout(() => setStatusMessage(null), 5000);
        })
        .catch(err => {
          setStatusMessage({ content: `Information of ${tmpName} already removed from server`, status: 1 });
          console.log(err);
        })
    }
  }

  const updateEntriesBySearch = (event) => setSearchText(event.target.value);

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      PhonebookServices.removePerson(person)
        .then(res => setPersons(persons.filter(p => p.id != person.id)))
        .catch(err => console.log(err));
    }
  }

  const getFilteredPersons = () => persons.filter(person => person.name.toLowerCase().includes(searchText));

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message = {statusMessage}/>

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
      {getFilteredPersons().map(person => (
        <div key={person.name}>
          {person.name} {person.number} <button type='button' onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

export default App