import './App.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import BeerFrom from './components/BeerForm'
import beerService from './services/beerService'
import Tabs from './components/Tabs'

const App = () => {
  const [beers, setBeers] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newBrevery, setNewBrewery] = useState('')
  const [newPercentage, setNewPercentage] = useState('')
  const [newHopness, setNewHopness] = useState('')
  const [filteredName, setFilteredName] = useState('')

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
    const beerToUpdate = beers.find(beer => beer.name === newName)
    if (beers.some(beer => beer.name === newName)) {
      if (window.confirm(`${newName} update info?`)) {
        const replacedBeer = {...beerToUpdate, type: newType, brewery: newBrevery, percentage: newPercentage, hopness: newHopness }
  
        beerService
        .updateBeer(beerToUpdate.id, replacedBeer)
        .then(returnedBeer => {
          setBeers(beers.map(beer => beer.id !== beerToUpdate.id ? beer : returnedBeer))
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
        setNewName('')
        setNewType('')
        setNewBrewery('')
        setNewPercentage('')
        setNewHopness('')
      })
      .catch(error => {
        console.log(error.response.data)
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
        setBeers(beers.filter(beer => beer.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const editBeer = (id) => {
    const beerToEdit = beers.find(beer => beer.id === id)
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
      <h4>Add new beer</h4>
      <BeerFrom addBeer={addBeer} newName={newName} handleNewName={handleNewName}
                  newType={newType} handleNewType={handleNewType}
                  newBrewery={newBrevery} handleNewBrewery={handleNewBrewery}
                  newPercentage={newPercentage} handleNewPercentage={handleNewPercentage}
                  newHopness={newHopness} handleNewHopness={handleNewHopness} />
      <h2>Beers</h2>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />
      <Tabs list={filteredBeers} editBeer={editBeer} deleteBeer={deleteFromList} />

    </div>
  )
}

export default App
