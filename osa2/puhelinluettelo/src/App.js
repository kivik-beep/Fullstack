import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    if(names.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else 
    {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredContacts = (filter.length > 0)
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Persons addContact={addContact} handleNewName={handleNewName} newNumber={newNumber}
            handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Numbers persons={filteredContacts} />
    </div>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with 
      <input 
        value={filter} 
        onChange={handleFilter}
      />
    </div>
  )
}

const Persons = ({addContact, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNewName}
        />
      </div>
      <div>
        number: 
        <input 
          value={newNumber}
          onChange={handleNewNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = ({persons}) => {
  return (
    <table>
      <thead>
        <tr>
          <td><b>name</b></td>
          <td><b>number</b></td>
        </tr>
      </thead>
      <tbody>
        {persons.map(person =>
        <Person key={person.name} person={person}/>
        )}
      </tbody>
    </table>
  )
}

const Person = ({person}) => {
  return (
    <tr>
      <td>{person.name} </td>
      <td>{person.number}</td>
    </tr>
  )
}

export default App
