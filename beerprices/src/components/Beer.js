import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const Beer = ({beer, editBeer }) => {
    return (
        <div className='BeerList'>
            <p>{beer.name}, {beer.type}, {beer.brewery}, {beer.percentage}%, {beer.price}€</p>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editBeer(beer.id)} />
        </div>
    )
}