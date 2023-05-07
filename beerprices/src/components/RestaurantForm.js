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