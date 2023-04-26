import { useState } from 'react'
import { Beer } from './Beer'
import { Restaurant } from './Restaurant'
import BeerForm from './BeerForm'

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1)
  const [showBeerForm, setShowBeerForm] = useState(false)
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)

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

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          KAIKKI
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          PULLOT
        </button>
      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"}>
          <h2>Ravintolat</h2>
          <hr />
          {props.list.map((restaurant) => (
            <div key={restaurant.id}>
              <div onClick={() => handleRestaurantClick(restaurant.id)}>
                <Restaurant restaurant={restaurant} addBeer={props.addBeer} />
              </div>
              {selectedRestaurantId === restaurant.id && showBeerForm && (
                <BeerForm addBeer={props.addBeer} newName={props.newName} handleNewName={props.handleNewName}
                          newType={props.newType} handleNewType={props.handleNewType}
                          newBrewery={props.newBrevery} handleNewBrewery={props.handleNewBrewery}
                          newPercentage={props.newPercentage} handleNewPercentage={props.handleNewPercentage}
                          newHopness={props.newHopness} handleNewHopness={props.handleNewHopness} />
              )}

              {restaurant.beers.map((beer) => (
                <div key={beer.id}>
                  <Beer beer={beer} editBeer={props.editBeer} deleteBeer={props.deleteBeer} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"} >
          <h2>Content 2</h2>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Tabs
