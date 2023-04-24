const Filter = ({ filteredName, handleFilter }) => {
    return (
      <form>
        <div>
          find beers by name <input value={filteredName} onChange={handleFilter} />
        </div>
      </form>
    )
}

export default Filter
