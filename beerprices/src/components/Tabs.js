import { useState } from 'react'
import { Beer } from './Beer'
import { Restaurant } from './Restaurant'
import BeerForm from './BeerForm'
import RestaurantForm from './RestaurantForm'
import Filter from './Filter'
import EditBeerForm from './EditBeerForm'
import EditRestaurantForm from './EditRestaurantForm'

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [showBeerForm, setShowBeerForm] = useState(false)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)
  const [selectedBeerId, setSelectedBeerId] = useState(null)
  const [showEditBeerForm, setShowEditBeerForm] = useState(false)
  const [selectedPintId, setSelectedPintId] =useState(null)
  const [showEditRestaurantForm, setShowEditRestaurantForm] = useState(false)
  

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const handleRestaurantClick = (id) => {
    if (id === selectedRestaurantId) {
      setSelectedRestaurantId(null)
      setShowBeerForm(false)
    } else {
      setSelectedRestaurantId(id)
      setShowBeerForm(true)
    }
  }

  const handleBeerClick = (id) => {
    if (id === selectedBeerId) {
      setSelectedBeerId(null)
      setShowEditBeerForm(false)
    } else {
      setSelectedBeerId(id)
      setShowEditBeerForm(true)
    }
  }

  const handleRestaurantEditClick = (id) => {
    if (id === selectedPintId){
      setSelectedPintId(null)
      setShowEditRestaurantForm(false)
    } else{
      setSelectedPintId(id)
      setShowEditRestaurantForm(true)
    }
  }
  

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          ALL PLACES
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          ADD A BAR
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <h2 className="contenth2">Check the Prices of Beers</h2>
          <Filter filteredName={props.filteredName} handleFilter={props.handleFilter} />
          {props.list.map((restaurant) => (
            <div key={restaurant.id}>
              <div>
                <Restaurant restaurant={restaurant} editRestaurant={() => handleRestaurantEditClick(restaurant.id)} addBeer={() => handleRestaurantClick(restaurant.id)} />
                {selectedPintId === restaurant.id && showEditRestaurantForm && (
                  <EditRestaurantForm restaurant={restaurant} 
                  newPintIII={props.newPintIII} handleNewPintIII={props.handleNewPintIII} 
                  newPintIV={props.newPintIV} handleNewPintIV={props.handleNewPintIV}  />
                )}
                <div className='address'>
                  {restaurant.address}
                </div>
              </div>
              {selectedRestaurantId === restaurant.id && showBeerForm && (
                <BeerForm restaurant={restaurant} addBeer={props.addBeer}
                          newName={props.newName} handleNewName={props.handleNewName}
                          newType={props.newType} handleNewType={props.handleNewType}
                          newBrewery={props.newBrevery} handleNewBrewery={props.handleNewBrewery}
                          newPercentage={props.newPercentage} handleNewPercentage={props.handleNewPercentage}
                          newPrice={props.newPrice} handleNewPrice={props.handleNewPrice} />
              )}

              {restaurant.beers.map((beer) => (
                <div key={beer.id}>
                  <Beer beer={beer} editBeer={() => handleBeerClick(beer.id)} />
                  {selectedBeerId === beer.id && showEditBeerForm && (
                    <EditBeerForm beer={beer} editBeer={props.editBeer}
                                  newPrice={props.newPrice} handleNewPrice={props.handleNewPrice}
                                  deleteBeer={props.deleteBeer} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={toggleState === 2 ? "content  active-content" : "content"} >
          <h2 className='contenth2'>Add a bar or a restaurant</h2>
          <RestaurantForm addRestaurant={props.addRestaurant} 
                          newResName={props.newResName} handleNewResName={props.handleNewResName} 
                          newAddress={props.newAddress} handleNewAddress={props.handleNewAddress} 
                          newPintIII={props.newPintIII} handleNewPintIII={props.handleNewPintIII}
                          newPintIV={props.newPintIV} handleNewPintIV={props.handleNewPintIV} />
        </div>
      </div>
    </div>
  )
}

export default Tabs
