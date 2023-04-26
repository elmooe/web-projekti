const BeerForm = ({ addBeer, newName, handleNewName, newType, handleNewType,
                      newBrewery, handleNewBrewery, newPercentage, handleNewPercentage,
                      newHopness, handleNewHopness }) => {
    return (
      <form onSubmit={addBeer}>
        <div>
        <h4>Add new beer</h4>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          type: <input value={newType} onChange={handleNewType} />
        </div>
        <div>
          brewery: <input value={newBrewery} onChange={handleNewBrewery} />
        </div>
         <div>
          percentage: <input value={newPercentage} onChange={handleNewPercentage} />
        </div>
         <div>
          hopness: <input value={newHopness} onChange={handleNewHopness} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default BeerForm