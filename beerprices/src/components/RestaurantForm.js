/**
 * A form component for adding a new restaurant.
 * 
 * @property {function} addRestaurant - Function to add new restaurant
 * @property {string} newResName - Name of the new restaurant to be added
 * @property {function} handleNewResName - Function to handle changes to the new restaurant name
 * @property {string} newAddress - Address of the new restaurant to be added
 * @property {function} handleNewAddress - Function to handle changes to the new restaurant address
 * @property {number} newPintIII - Price of pint III for the new restaurant to be added
 * @property {function} handleNewPintIII - Function to handle changes to the price of pint III for the new restaurant
 * @property {number} newPintIV - Price of pint IV for the new restaurant to be added
 * @property {function} handleNewPintIV - Function to handle changes to the price of pint IV for the new restaurant
 * @returns {JSX.Element} - A JSX.Element representing the RestaurantForm component
 */
const RestaurantForm = ({ addRestaurant, newResName, handleNewResName, newAddress, handleNewAddress, newPintIII, handleNewPintIII, newPintIV, handleNewPintIV }) => {

  return (
      <form className='restaurantForm' onSubmit={addRestaurant}>
      <div>
        name: <input className="inputContainer" value={newResName} onChange={handleNewResName} />
      </div>
      <div>
        address: <input className="inputContainer" value={newAddress} onChange={handleNewAddress} />
      </div>
      <div>
        pint III: <input className="inputContainer" value={newPintIII} onChange={handleNewPintIII} />
      </div>
      <div>
        pint IV: <input className="inputContainer" value={newPintIV} onChange={handleNewPintIV} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
      )
  }
  
  export default RestaurantForm