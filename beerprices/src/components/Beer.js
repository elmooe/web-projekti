import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

/**
 * React component for displaying a single beer item and an icon to edit it.
 * @component
 * @param {object} beer - The beer object containing name, type, brewery, percentage and price.
 * @param {function} editBeer - A function to be called when the edit icon is clicked, passing the beer id as a parameter.
 * @returns {JSX.Element} - A React component that displays a single beer item and an edit icon.
*/
export const Beer = ({beer, editBeer }) => {
    return (
        <div className='BeerList'>
            <p>{beer.name}, {beer.type}, {beer.brewery}, {beer.percentage}%, {beer.price}€</p>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editBeer(beer.id)} />
        </div>
    )
}