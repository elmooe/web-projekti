import './App.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import BeerFrom from './components/BeerForm'
import { Beer } from './components/Beer'
import beerService from './services/beerService'
import Notification from './components/Notification'

const App = () => {
  const [beers, setBeers] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newBrevery, setNewBrewery] = useState('')
  const [newPercentage, setNewPercentage] = useState('')
  const [newHopness, setNewHopness] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('')

  useEffect(() => {
    beerService
      .getAll()
      .then(initialList => {
        setBeers(initialList)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewType = (event) => {
    setNewType(event.target.value)
  }

  const handleNewBrewery = (event) => {
    setNewBrewery(event.target.value)
  }

  const handleNewPercentage = (event) => {
    setNewPercentage(event.target.value)
  }

  const handleNewHopness = (event) => {
    setNewHopness(event.target.value)
  }
  const handleFilter = (event) => {
    setFilteredName(event.target.value)
  }

  const addBeer = (event) => {
    event.preventDefault()
    const personToUpdateNumber = beers.find(person => person.name === newName)
    if (beers.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const replacedNumber = {...personToUpdateNumber, number: newType}
  
        beerService
        .updateBeer(personToUpdateNumber.id, replacedNumber)
        .then(returnedPerson => {
          setBeers(beers.map(person => person.id !== personToUpdateNumber.id ? person : returnedPerson))
          setNotificationMessage(`${personToUpdateNumber.name}'s number has been changed`)
          setNotificationStyle('green')
          setTimeout(() => {
            setNotificationMessage('')
          }, 3000)
  
          setNewName('')
        setNewType('')
        setNewBrewery('')
        setNewPercentage('')
        setNewHopness('')
        })
      } else {
        setNewName('')
        setNewType('')
      }
    } else {
      const newBeer = {
        name: newName,
        type: newType,
        brewery: newBrevery,
        percentage: newPercentage,
        hopness: newHopness
      }
      
      beerService
      .create(newBeer)
      .then(createdBeer => {
        setBeers(beers.concat(createdBeer))
        setNotificationMessage(`Added ${newBeer.name}`)
        setNotificationStyle('green')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
  
        setNewName('')
        setNewType('')
        setNewBrewery('')
        setNewPercentage('')
        setNewHopness('')
      })
      .catch(error => {
        console.log(error.response.data)
        setNotificationMessage(`Beer validation failed: ${JSON.stringify(error.response.data)}`)
        setNotificationStyle('red')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
  
        setNewName('')
        setNewType('')
        setNewBrewery('')
        setNewPercentage('')
        setNewHopness('')
      })
    }
  }
  

  const deleteFromList = (id) => {
    const choosedBeer = beers.find(beer => beer.id === id)
    if (window.confirm(`Delete ${choosedBeer.name} ?`)) {
      beerService
      .deleteBeer(choosedBeer.id)
      .then(() => {
        setNotificationMessage(`${choosedBeer.name}'s has been deleted`)
        setNotificationStyle('green')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
        setBeers(beers.filter(beer => beer.id !== id))
      })
      .catch(error => {
        setNotificationMessage(`Information of ${choosedBeer.name} has already been removed from server`)
        setNotificationStyle('red')
        setTimeout(() => {
          setNotificationMessage('')
        }, 3000)
      })
    }
  }

  const editBeer = (id) => {
    const beerToEdit = beers.find(beer => beer.id === id)
    //setEditMode(true)
    setNewName(beerToEdit.name)
    setNewType(beerToEdit.type)
    setNewBrewery(beerToEdit.brewery)
    setNewPercentage(beerToEdit.percentage)
    setNewHopness(beerToEdit.hopness)
  }
  
  const filteredBeers = filteredName === ''
    ? beers : beers.filter(beer => beer.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Check the prices of beers</h2>
      <Notification message={notificationMessage} style={notificationStyle}/>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <h2>Add a new beer</h2>
      <BeerFrom addBeer={addBeer} newName={newName} handleNewName={handleNewName}
                  newType={newType} handleNewType={handleNewType}
                  newBrewery={newBrevery} handleNewBrewery={handleNewBrewery}
                  newPercentage={newPercentage} handleNewPercentage={handleNewPercentage}
                  newHopness={newHopness} handleNewHopness={handleNewHopness} />
      <h2>Beers</h2>
      {filteredBeers.map((beer) => 
      <Beer key={beer.id} beer={beer} editBeer={editBeer} deleteBeer={(id) => deleteFromList(id)} />
      )}
    </div>
  )
}

export default App
