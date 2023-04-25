import { useState, useEffect } from 'react'
import { Beer } from './Beer'
import { Restaurant } from './Restaurant'

function Tabs(props) {
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    setToggleState(index)
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
            <Restaurant restaurant={restaurant} editRestaurant={props.editRestaurant} deleteRestaurant={props.deleteRestaurant} />

          <ul className=''>
          {restaurant.beers.map((beer) => (
            <div key={beer.id}>
              <Beer beer={beer} editBeer={props.editBeer} deleteBeer={props.deleteBeer} />
            </div>
          ))}
          </ul>
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