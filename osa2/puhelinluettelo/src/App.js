import React, {useState, useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personServices from './services/PersonServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName,
      number: newNumber
    }

    const i = persons.findIndex(person => person.name === newName)

    if (i !== -1) {

      if (window.confirm(newName + ' is already added to phonebook, ' + 
      'replace the old number with a new one?')) {

        const id = persons[i].id

        personServices
          .update(id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== id ? person : returnedPerson))

            setMessage("Updated " + returnedPerson.name + "'s number")
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage("Person " + newName +
             " was already removed from the server")
            setPersons(persons.filter(person => person.id !== id))

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

        
      }

    } else {

      personServices
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))

          setMessage("Added " + returnedPerson.name)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

        })

      
    }

    setNewName('')
    setNewNumber('')

  }

  const removePerson = (id) => {
    const removedName = persons.find(person => person.id === id).name

    personServices
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))

    setMessage("Removed " + removedName)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const personsToShow = filter === '' ? persons : 
  persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="message" message={message}/>
      <Notification className="error" message={errorMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} 
      handleNameChange={handleNameChange} newNumber={newNumber} 
      handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleRemoveClick={removePerson}/>
    </div>
  )

}

export default App