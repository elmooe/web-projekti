import './App.css'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import BeerForm from './components/BeerForm'
import beerService from './services/beerService'
import Tabs from './components/Tabs'
import RestaurantForm from './components/RestaurantForm'

const App = () => {
  const [restaurants, setRestaurants] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newBrevery, setNewBrewery] = useState('')
  const [newPercentage, setNewPercentage] = useState('')
  const [newHopness, setNewHopness] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const [newResName, setNewResName] = useState('')
  const [newAddress, setNewAddress] = useState('')

  useEffect(() => {
    beerService
      .getAll()
      .then(initialList => {
        setRestaurants(initialList)
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

  const handleNewResName = (event) => {
    setNewResName(event.target.value)
  }

  const handleNewAddress = (event) => {
    setNewAddress(event.target.value)
  }

  const resetFields = () => {
    setNewName('')
    setNewType('')
    setNewBrewery('')
    setNewPercentage('')
    setNewHopness('')
  }

  const addBeer = (event) => {
    event.preventDefault()
    const beerToUpdate = restaurants.find(beer => beer.name === newName)
    if (restaurants.some(beer => beer.name === newName)) {
      if (window.confirm(`${newName} update info?`)) {
        const replacedBeer = {...beerToUpdate, type: newType, brewery: newBrevery, percentage: newPercentage, hopness: newHopness }
  
        beerService
        .updateBeer(beerToUpdate.id, replacedBeer)
        .then(returnedBeer => {
          setRestaurants(restaurants.map(beer => beer.id !== beerToUpdate.id ? beer : returnedBeer))
          resetFields()
        })
      } else {
        resetFields()
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
        setRestaurants(restaurants.concat(createdBeer))
        resetFields()
      })
      .catch(error => {
        console.log(error.response.data)
        resetFields()
      })
    }
  }

  const deleteFromList = (id) => {
    const choosedBeer = restaurants.find(beer => beer.id === id)
    if (window.confirm(`Delete ${choosedBeer.name} ?`)) {
      beerService
      .deleteBeer(choosedBeer.id)
      .then(() => {
        setRestaurants(restaurants.filter(beer => beer.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const editBeer = (id) => {
    const beerToEdit = restaurants.find(beer => beer.id === id)
    setNewName(beerToEdit.name)
    setNewType(beerToEdit.type)
    setNewBrewery(beerToEdit.brewery)
    setNewPercentage(beerToEdit.percentage)
    setNewHopness(beerToEdit.hopness)
  }

  const resetRFields = () => {
    setNewResName('')
    setNewAddress('')
  }
  
  //ravintolan lisäys ilman oluita
  const addRestaurant = (event) => {
    event.preventDefault()
    const restaurantToUpdate = restaurants.find(restaurant => restaurant.name === newResName)
    if (restaurants.some(restaurant => restaurant.name === newResName)) {
      if (window.confirm(`${newResName} update info?`)) {
        const replacedRestaurant = {...restaurantToUpdate, address: newAddress }
  
        beerService
        .updateBeer(restaurantToUpdate.id, replacedRestaurant)
        .then(returnedRestaurant => {
          setRestaurants(restaurants.map(restaurant => restaurant.id !== restaurantToUpdate.id ? restaurant : returnedRestaurant))
          resetRFields()
        })
      } else {
        resetRFields()
      }
    } else {
      const newRestaurant = {
        name: newResName,
        address: newAddress,
        beers: []
      }
      
      beerService
      .create(newRestaurant)
      .then(createdRestaurant => {
        setRestaurants(restaurants.concat(createdRestaurant))
        resetRFields()
      })
      .catch(error => {
        console.log(error.response.data)
        resetRFields()
      })
    }
  }
  
  const filteredRestaurants = filteredName === ''
    ? restaurants : restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Check the prices of beers</h2>
      <h4>Add new beer</h4>
      <BeerForm addBeer={addBeer} newName={newName} handleNewName={handleNewName}
                  newType={newType} handleNewType={handleNewType}
                  newBrewery={newBrevery} handleNewBrewery={handleNewBrewery}
                  newPercentage={newPercentage} handleNewPercentage={handleNewPercentage}
                  newHopness={newHopness} handleNewHopness={handleNewHopness} />

      <RestaurantForm addRestaurant={addRestaurant} newResName={newResName} handleNewResName={handleNewResName} newAddress={newAddress} handleNewAddress={handleNewAddress} />

      <h2>Beers</h2>
      <Filter filteredName={filteredName} handleFilter={handleFilter} />

      <Tabs list={filteredRestaurants} editBeer={editBeer} deleteBeer={deleteFromList} />
    </div>
  )
}

export default App
