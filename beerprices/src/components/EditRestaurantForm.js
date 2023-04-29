const EditRestaurantForm = ({editRestaurant, newPintIII, handleNewPintIII, newPintIV, handleNewPintIV }) => {

    return (
        <form onSubmit={editRestaurant}>

        <div>
          pint III: <input value={newPintIII} onChange={handleNewPintIII} /> 
        </div>
        <div>
          pint IV: <input value={newPintIV} onChange={handleNewPintIV} />
        </div>
          <button type="submit">add</button>
        <div>
        </div>
      </form>
        )
    }
    
    export default EditRestaurantForm