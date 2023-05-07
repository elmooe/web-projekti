import { useState } from 'react'
import { Beer } from './Beer'
import { Restaurant } from './Restaurant'
import BeerForm from './BeerForm'
import RestaurantForm from './RestaurantForm'
import Filter from './Filter'
import EditBeerForm from './EditBeerForm'
import EditRestaurantForm from './EditRestaurantForm'

/**
 * Component for rendering a tabbed interface with options to view all places and add a bar or restaurant.
 * 
 * @param {Object} props - The props object containing methods and data for rendering the component.
 * @param {Array} props.list - The array of restaurant objects to display.
 * @param {string} props.filteredName - The current value of the search filter.
 * @param {function} props.handleFilter - The function to handle changes to the search filter.
 * @param {function} props.addRestaurant - The function to handle adding a new restaurant.
 * @param {string} props.newResName - The current value of the new restaurant name input field.
 * @param {function} props.handleNewResName - The function to handle changes to the new restaurant name input field.
 * @param {string} props.newAddress - The current value of the new restaurant address input field.
 * @param {function} props.handleNewAddress - The function to handle changes to the new restaurant address input field.
 * @param {string} props.newPintIII - The current value of the new restaurant's third pint input field.
 * @param {function} props.handleNewPintIII - The function to handle changes to the new restaurant's third pint input field.
 * @param {string} props.newPintIV - The current value of the new restaurant's fourth pint input field.
 * @param {function} props.handleNewPintIV - The function to handle changes to the new restaurant's fourth pint input field.
 * @param {function} props.editRestaurant - The function to handle editing an existing restaurant.
 * @param {function} props.newName - The current value of the new beer name input field.
 * @param {function} props.handleNewName - The function to handle changes to the new beer name input field.
 * @param {function} props.newType - The current value of the new beer type input field.
 * @param {function} props.handleNewType - The function to handle changes to the new beer type input field.
 * @param {function} props.newBrewery - The current value of the new beer brewery input field.
 * @param {function} props.handleNewBrewery - The function to handle changes to the new beer brewery input field.
 * @param {function} props.newPercentage - The current value of the new beer percentage input field.
 * @param {function} props.handleNewPercentage - The function to handle changes to the new beer percentage input field.
 * @param {function} props.newPrice - The current value of the new beer price input field.
 * @param {function} props.handleNewPrice - The function to handle changes to the new beer price input field.
 * @param {function} props.addBeer - The function to handle adding a new beer to a restaurant.
 * @param {function} props.editBeer - The function to handle editing an existing beer.
 * @param {function} props.deleteBeer - The function to handle deleting a beer from a restaurant.
 * @returns {JSX.Element} - The JSX code to render the component.
 */
function Tabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [showBeerForm, setShowBeerForm] = useState(false)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)
  const [selectedBeerId, setSelectedBeerId] = useState(null)
  const [showEditBeerForm, setShowEditBeerForm] = useState(false)
  const [selectedPintId, setSelectedPintId] = useState(null)
  const [showEditRestaurantForm, setShowEditRestaurantForm] = useState(false)


  /**
   * Set the toggle state to the given index.
   * 
   * @param {number} index - The index to set the toggle state to.
   */
  const toggleTab = (index) => {
    setToggleState(index)
  }

  /**
   * Handle click events for restaurants.
   * 
   * @param {number} id - The ID of the restaurant being clicked.
   */
  const handleRestaurantClick = (id) => {
    if (id === selectedRestaurantId) {
      setSelectedRestaurantId(null)
      setShowBeerForm(false)
    } else {
      setSelectedRestaurantId(id)
      setShowBeerForm(true)
    }
  }

  /**
   * Handle click events for beers.
   * 
   * @param {number} id - The ID of the beer being clicked.
   */
  const handleBeerClick = (id) => {
    if (id === selectedBeerId) {
      setSelectedBeerId(null)
      setShowEditBeerForm(false)
    } else {
      setSelectedBeerId(id)
      setShowEditBeerForm(true)
    }
  }

  /**
   * Handle click events for restaurant edits.
   * @param {number} id - The ID of the restaurant being edited.
   */
  const handleRestaurantEditClick = (id) => {
    if (id === selectedPintId) {
      setSelectedPintId(null)
      setShowEditRestaurantForm(false)
    } else {
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
                  <EditRestaurantForm restaurant={restaurant} editRestaurant={props.editRestaurant}
                    newPintIII={props.newPintIII} handleNewPintIII={props.handleNewPintIII}
                    newPintIV={props.newPintIV} handleNewPintIV={props.handleNewPintIV} />
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
          <div className="hr-container">
            <hr className="hr" />
          </div>
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
