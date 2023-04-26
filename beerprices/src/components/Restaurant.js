import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

export const Restaurant = ({ restaurant, editRestaurant, addBeer }) => {
    return (
        <div className='Beer'>
            <p>{restaurant.name}, {restaurant.address}</p>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editRestaurant(restaurant.id)} />
            <FontAwesomeIcon icon={faSquarePlus} onClick={() => addBeer(restaurant.id)} />
        </div>
    )
}