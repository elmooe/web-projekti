import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

/**
 * Represents a single restaurant component with its name and prices for pints.
 * 
 * @param {object} props - The props that are passed to this component.
 * @param {object} props.restaurant - The restaurant object containing its name and prices for pints.
 * @param {function} props.editRestaurant - The function to edit a restaurant.
 * @param {function} props.addBeer - The function to add a new beer to a restaurant.
 * @return {JSX.Element} - A JSX element that represents a restaurant component.
 */
export const Restaurant = ({ restaurant, editRestaurant, addBeer }) => {
    return (
        <div className='Beer'>
            <p>{restaurant.name} | Pints: III:{restaurant.pintIII}€ IV:{restaurant.pintIV}€</p>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editRestaurant(restaurant.id)} />
            <FontAwesomeIcon icon={faSquarePlus} onClick={() => addBeer(restaurant.id)} />
        </div>
    )
}