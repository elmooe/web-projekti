const Filter = ({ filteredName, handleFilter }) => {
    return (
      <form>
        <div>
          find bar by name <input value={filteredName} onChange={handleFilter} />
        </div>
      </form>
    )
}

export default Filter
