import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Beer = ({beer, editBeer, deleteBeer}) => {
    return (
        <div className='BeerList'>
            <p>{beer.name}, {beer.type}, {beer.brewery}, {beer.percentage}%, {beer.price}€</p>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editBeer(beer.id)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteBeer(beer.id)}/>
        </div>
    )
}