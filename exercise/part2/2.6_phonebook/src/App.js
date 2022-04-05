import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 },
    { name: 'hi', id: 2 }
  ]) 
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    setPersons(persons.concat({name: newName, id: persons.length + 1}));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <div key={person.id}>{person.name}</div>)}
    </div>
  )
}

export default App