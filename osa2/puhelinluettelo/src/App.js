import React, { useState, useEffect } from 'react'
import contactService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setError] = useState(null)
  const [noteMessage, setNote] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(p => p.name)

    if(names.includes(personObject.name)){
      if(window.confirm(`${personObject.name} is already added to phonebook, `
                        +`replace the old number with a new one?`)) {
        contactService
          .update(persons.find(p => p.name === personObject.name).id, personObject)
              .then(
                setPersons((persons.filter(p => p.name !== personObject.name)).concat(personObject))
              )
              .then(note => {
                setNote(
                  `Contact '${personObject.name}' succesfully updated`
                )
                setTimeout(() => {
                  setNote(null)
                }, 5000)
              })
          .catch(error => {
            setError(
              `Contact '${personObject.name}' was already removed from server or ${error}`
            )
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons((persons.filter(p => p.name !== personObject.name)))
          })
        
      }
    }
    else 
    {
      contactService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
        .then(note => {
          setNote(
            `Contact '${personObject.name}' succesfully added`
          )
          setTimeout(() => {
            setNote(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setError(
            error.response.data.error
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
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
      <ErrorNotification message={errorMessage} />
      <Notification message={noteMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>Add a new</h3>
      <Persons addContact={addContact} newName={newName} handleNewName={handleNewName} newNumber={newNumber}
            handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Numbers persons={filteredContacts} setPersons={setPersons}/>
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

const Numbers = ({persons, setPersons}) => {
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
          <Person 
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}/>
        )}
      </tbody>
    </table>
  )
}

const Person = ({person, persons, setPersons}) => {
  return (
    <tr>
      <td>{person.name} </td>
      <td>{person.number} </td>
      <td>
        <button onClick={() =>
          {if(window.confirm(`Delete ${person.name}?`)) 
            {
              contactService
                .remove(person.id)
            }
            setPersons(persons.filter(p => p.id !== person.id))
          }}>delete
        </button>
      </td>
    </tr>
  )
}

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="note">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App
