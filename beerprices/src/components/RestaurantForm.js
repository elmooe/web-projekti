const RestaurantForm = ({ addRestaurant, newResName, handleNewResName, newAddress, handleNewAddress }) => {

return (
    <form onSubmit={addRestaurant}>
    <div>
      name: <input value={newResName} onChange={handleNewResName} />
    </div>
    <div>
      address: <input value={newAddress} onChange={handleNewAddress} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
    )
}

export default RestaurantForm