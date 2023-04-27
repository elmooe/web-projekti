const Filter = ({ filteredName, handleFilter }) => {
    return (
      <form>
        <div className="filter">
        <input className="filterInput" value={filteredName} onChange={handleFilter} placeholder="Search a bar by name..."/>
        </div>
      </form>
    )
}

export default Filter
