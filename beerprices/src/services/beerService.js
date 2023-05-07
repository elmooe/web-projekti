/**
 * Represents a beer service object that communicates with the backend REST API.
 * @module beerService
*/
import axios from 'axios'

const baseUrl = '/api/restaurants'

/**
 * Retrieves all restaurants from the backend.
 * @function getAll
 * @returns {Promise} - A promise that resolves to an array of restaurants.
 */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

/**
 * Sends a POST request to create a new restaurant to the backend.
 * @function create
 * @param {object} newObject - The new restaurant object to be created.
 * @returns {Promise} - A promise that resolves to the created restaurant object.
 */
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

/**
 * Sends a POST request to create a new beer for a specific restaurant to the backend.
 * @function createBeer
 * @param {string} id - The ID of the restaurant.
 * @param {object} newObject - The new beer object to be created.
 * @returns {Promise} - A promise that resolves to the created beer object.
 */
const createBeer = (id, newObject) => {
    const request = axios.post(`${baseUrl}/${id}/beers`, newObject)
    return request.then(response => response.data)
}

/**
 * Sends a DELETE request to delete a specific beer from a specific restaurant in the backend.
 * @function deleteBeer
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {string} beerId - The ID of the beer to be deleted.
 * @returns {Promise} - A promise that resolves to the deleted beer object.
 */
const deleteBeer = (restaurantId, beerId) => {
    const request = axios.delete(`${baseUrl}/${restaurantId}/beers/${beerId}`)
    return request.then(response => response.data)
}

/**
 * Sends a PUT request to update a specific beer for a specific restaurant in the backend.
 * @function updateBeer
 * @param {string} restuarantId - The ID of the restaurant.
 * @param {string} beerId - The ID of the beer to be updated.
 * @param {object} newObject - The new beer object with updated fields.
 * @returns {Promise} - A promise that resolves to the updated beer object.
 */
const updateBeer = (restuarantId, beerId, newObject) => {
    const request = axios.put(`${baseUrl}/${restuarantId}/beers/${beerId}`, newObject)
    return request.then(response => response.data)
}

/**
 * Sends a PUT request to update a specific pint for a specific restaurant in the backend.
 * @function updatePint
 * @param {string} restaurantId - The ID of the restaurant.
 * @param {object} newObject - The new pint object with updated fields.
 * @returns {Promise} - A promise that resolves to the updated pint object.
 */
const updatePint = (restaurantId, newObject) => {
    const request = axios.put(`${baseUrl}/${restaurantId}`, newObject)
    return request.then(response => response.data)
}

const beerService = { create, getAll, deleteBeer, updateBeer, createBeer, updatePint }

export default beerService