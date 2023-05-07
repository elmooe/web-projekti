import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 * Form component for editing a beer's price.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.beer - The beer object to be edited.
 * @param {number} props.newPrice - The new price of the beer.
 * @param {Function} props.handleNewPrice - The function to handle new price input changes.
 * @param {Function} props.editBeer - The function to handle beer price edit submission.
 * @param {Function} props.deleteBeer - The function to handle beer deletion.
 * @returns {JSX.Element} - The JSX element for the beer edit form.
 */
const EditBeerForm = ({ beer, newPrice, handleNewPrice, editBeer, deleteBeer }) => {
  return (
    <form className='editBeerForm' onSubmit={() => editBeer(beer.id)}>
      <div>
      new price: <input value={newPrice} onChange={handleNewPrice} />
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteBeer(beer.id)}/>
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default EditBeerForm
