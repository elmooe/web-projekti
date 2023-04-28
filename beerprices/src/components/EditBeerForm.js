const EditBeerForm = (props) => {
  return (
    <form className='editBeerForm' onSubmit={() => props.editBeer(props.beer.id)}>
      <div>
      new price: <input value={props.price} onChange={props.handleNewPrice} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default EditBeerForm;
