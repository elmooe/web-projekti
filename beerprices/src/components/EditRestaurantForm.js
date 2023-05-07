/**
 * Component for editing a restaurant's pint III and pint IV values.
 * 
 * @param {Object} props - The props object containing the following properties:
 * @param {Object} restaurant - The restaurant to edit.
 * @param {Function} editRestaurant - The function to call when the form is submitted.
 * @param {string} newPintIII - The new value for the restaurant's pint III.
 * @param {Function} handleNewPintIII - The function to call when the pint III input value changes.
 * @param {string} newPintIV - The new value for the restaurant's pint IV.
 * @param {Function} handleNewPintIV - The function to call when the pint IV input value changes.
 * @returns {JSX.Element} A form for editing a restaurant's pint III and pint IV values.
 */
const EditRestaurantForm = ({ restaurant, editRestaurant, newPintIII, handleNewPintIII, newPintIV, handleNewPintIV }) => {
  return (
    <form className='editRestaurantForm' onSubmit={() => editRestaurant(restaurant.id)}>
      <div>
        pint III: <input value={newPintIII} onChange={handleNewPintIII} />
      </div>
      <div>
        pint IV: <input value={newPintIV} onChange={handleNewPintIV} />
      </div>
      <button className="small" type="submit">add</button>
      <div>
      </div>
    </form>
  )
}

export default EditRestaurantForm