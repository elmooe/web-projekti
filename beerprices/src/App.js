import './App.css'
import { useState, useEffect } from 'react'
import beerService from './services/beerService'
import Tabs from './components/Tabs'

const App = () => {
  const [restaurants, setRestaurants] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newBrevery, setNewBrewery] = useState('')
  const [newPercentage, setNewPercentage] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const [newResName, setNewResName] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newPintIII, setNewPintIII] = useState('')
  const [newPintIV, setNewPintIV] = useState('')

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

  const handleNewPrice = (event) => {
    setNewPrice(event.target.value)
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
  const handleNewPintIII = (event) => {
    setNewPintIII(event.target.value)
  }
  const handleNewPintIV = (event) => {
    setNewPintIV(event.target.value)
  }

  const resetFields = () => {
    setNewName('')
    setNewType('')
    setNewBrewery('')
    setNewPercentage('')
    setNewPrice('')
  }

  //lisää oluen halutulle ravintolalle
  const addBeer = (id) => {
    const restaurantToAdd = restaurants.find(restaurant => restaurant.id === id)
    const newBeer = {
      name: newName,
      type: newType,
      brewery: newBrevery,
      percentage: newPercentage,
      price: newPrice,
    }
    beerService
      .createBeer(restaurantToAdd.id, newBeer)
      .then(returnedBeer => {
        const updatedRestaurants = restaurants.map(restaurant => restaurant.id === id ? {...restaurant, beers: restaurant.beers.concat(returnedBeer)} : restaurant)
        setRestaurants(updatedRestaurants)
        resetFields()
      })
      .catch(error => {
        console.log(error.response.data)
        resetFields()
      })
  }
  
  //poistaa halutun oluen listalta
  const deleteFromList = (id) => {
    const restaurantIndex = restaurants.findIndex(restaurant => restaurant.beers.some(beer => beer.id === id))
    if (restaurantIndex === -1) {
      return
    }
  
    const beerIndex = restaurants[restaurantIndex].beers.findIndex(beer => beer.id === id)
    if (window.confirm(`Delete ${restaurants[restaurantIndex].beers[beerIndex].name} ?`)) {
      beerService
        .deleteBeer(restaurants[restaurantIndex].id, id)
        .then(() => {
          const newRestaurants = [...restaurants];
          newRestaurants[restaurantIndex].beers.splice(beerIndex, 1)
          setRestaurants(newRestaurants)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const editBeer = (id) => {
    const beerToEdit = restaurants.find(restaurant => restaurant.beers.some(beer => beer.id === id))
    console.log(beerToEdit.id)
    const updatedBeer = {
      ...beerToEdit,
      price: newPrice,
    }
    beerService
      .updateBeer(beerToEdit.restaurantId, beerToEdit.id, updatedBeer)
      .then(() => {
        const updatedRestaurants = restaurants.map(restaurant => {
          if (restaurant.id === beerToEdit.restaurantId) {
            const updatedBeers = restaurant.beers.map(beer => {
              if (beer.id === beerToEdit.id) {
                return updatedBeer
              }
              return beer
            })
            return {
              ...restaurant,
              beers: updatedBeers,
            }
          }
          return restaurant
        })
        setRestaurants(updatedRestaurants)
        setNewPrice('')
      })
      .catch(error => {
        console.log(error)
      })
  }
  

  const resetRFields = () => {
    setNewResName('')
    setNewAddress('')
    setNewPintIII('')
    setNewPintIV('')
  }

  //ravintolan lisäys ilman oluita
  const addRestaurant = (event) => {
    event.preventDefault()
    const restaurantToUpdate = restaurants.find(restaurant => restaurant.name === newResName)
    if (restaurants.some(restaurant => restaurant.name === newResName)) {
      if (window.confirm(`${newResName} update info?`)) {
        
        var replacedRestaurant
  
        if((newPintIII && newPintIV) === null || (newPintIII && newPintIV) === ""){
          replacedRestaurant = {...restaurantToUpdate, address: newAddress}
        } else if (newPintIII === null || newPintIII === ""){
          replacedRestaurant = {...restaurantToUpdate, address: newAddress, pintIv: newPintIV}
        } else if (newPintIV === null || newPintIV === ""){
          replacedRestaurant = {...restaurantToUpdate, address: newAddress, pintIII: newPintIII}
        } else {replacedRestaurant = {...restaurantToUpdate, address: newAddress, pintIII: newPintIII, pintIV: newPintIV}}
  
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
        pintIII: newPintIII,
        pintIV: newPintIV,
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
      <Tabs filteredName={filteredName} handleFilter={handleFilter}
            list={filteredRestaurants} editBeer={editBeer}
            deleteBeer={deleteFromList} addBeer={addBeer}
            newName={newName} handleNewName={handleNewName}
            newType={newType} handleNewType={handleNewType}
            newBrewery={newBrevery} handleNewBrewery={handleNewBrewery}
            newPercentage={newPercentage} handleNewPercentage={handleNewPercentage}
            newPrice={newPrice} handleNewPrice={handleNewPrice}
            addRestaurant={addRestaurant}
            newResName={newResName} handleNewResName={handleNewResName} 
            newAddress={newAddress} handleNewAddress={handleNewAddress} 
            newPintIII={newPintIII} handleNewPintIII={handleNewPintIII}
            newPintIV={newPintIV} handleNewPintIV={handleNewPintIV}
      />
    </div>
  )
}

export default App