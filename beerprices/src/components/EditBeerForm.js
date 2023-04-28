import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

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
