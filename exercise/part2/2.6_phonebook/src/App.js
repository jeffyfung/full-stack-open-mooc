import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');

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
      <div>filter shown with <input value={searchText} onChange={updateEntriesBySearch}/></div>
      
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {getFilteredPersons().map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App