const EditBeerForm = ({ beer, newPrice, handleNewPrice, editBeer }) => {
  return (
    <form className='editBeerForm' onSubmit={() => editBeer(beer.id)}>
      <div>
      new price: <input value={newPrice} onChange={handleNewPrice} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default EditBeerForm
