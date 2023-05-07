const BeerForm = ({ restaurant, addBeer, newName, handleNewName, newType, handleNewType,
                    newBrewery, handleNewBrewery, newPercentage, handleNewPercentage,
                    newPrice, handleNewPrice }) => {
    return (
      <form className='beerForm' onSubmit={() => addBeer(restaurant.id)}>
        <div>
        <h4>Add new beer</h4>
          name: <input className="inputContainer" value={newName} onChange={handleNewName} />
        </div>
        <div>
          type: <input className="inputContainer" value={newType} onChange={handleNewType} />
        </div>
        <div>
          brewery: <input className="inputContainer" value={newBrewery} onChange={handleNewBrewery} />
        </div>
         <div>
          percentage: <input className="inputContainer" value={newPercentage} onChange={handleNewPercentage} />
        </div>
         <div>
          price: <input className="inputContainer" value={newPrice} onChange={handleNewPrice} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default BeerForm