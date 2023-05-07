/**
 * BeerForm component for adding a new beer to a restaurant.
 * @param {Object} props - The props object containing the following props:
 * @param {Object} restaurant - The restaurant object to which the new beer is added.
 * @param {Function} addBeer - The function that adds the new beer.
 * @param {string} newName - The name of the new beer.
 * @param {Function} handleNewName - The function that handles changes to the new beer's name.
 * @param {string} newType - The type of the new beer.
 * @param {Function} handleNewType - The function that handles changes to the new beer's type.
 * @param {string} newBrewery - The brewery of the new beer.
 * @param {Function} handleNewBrewery - The function that handles changes to the new beer's brewery.
 * @param {string} newPercentage - The alcohol percentage of the new beer.
 * @param {Function} handleNewPercentage - The function that handles changes to the new beer's alcohol percentage.
 * @param {string} newPrice - The price of the new beer.
 * @param {Function} handleNewPrice - The function that handles changes to the new beer's price.
 * @returns {JSX.Element} The rendered BeerForm component.
 */
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