const RestaurantForm = ({ addRestaurant, newResName, handleNewResName, newAddress, handleNewAddress, newPintIII, handleNewPintIII, newPintIV, handleNewPintIV }) => {

  return (
      <form onSubmit={addRestaurant}>
      <div>
        name: <input value={newResName} onChange={handleNewResName} />
      </div>
      <div>
        address: <input value={newAddress} onChange={handleNewAddress} />
      </div>
      <div>
        pint III: <input value={newPintIII} onChange={handleNewPintIII} /> pint IV: <input value={newPintIV} onChange={handleNewPintIV} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
      )
  }
  
  export default RestaurantForm