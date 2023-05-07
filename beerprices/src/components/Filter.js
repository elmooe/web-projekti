/**
 * A component that displays a search input field to filter a list of bars by name.
 * @param {Object} props - The props object of the component.
 * @param {string} props.filteredName - The current filtered name value.
 * @param {function} props.handleFilter - The function to handle the change of the filter input.
 * @returns {JSX.Element} - The rendered JSX of the component.
 */
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
