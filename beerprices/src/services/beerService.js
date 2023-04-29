import axios from 'axios'

const baseUrl = '/api/restaurants'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//uusi ravintola
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

//uusi olut ravintolalle
const createBeer = (id, newObject) => {
    const request = axios.post(`${baseUrl}/${id}/beers`, newObject)
    return request.then(response => response.data)
}

//poistaa oluen halutusta ravintolasta
const deleteBeer = (restaurantId, beerId) => {
    const request = axios.delete(`${baseUrl}/${restaurantId}/beers/${beerId}`)
    return request.then(response => response.data)
}

//ei vielä otettu käyttöön
const updateBeer = (restuarantId, beerId, newObject) => {
    const request = axios.put(`${baseUrl}/${restuarantId}/beers/${beerId}`, newObject)
    return request.then(response => response.data)
}

//tuopin päivitys ravintolalle
const updatePint = (restaurantId, newObject) => {
    const request = axios.put(`${baseUrl}/${restaurantId}`, newObject)
    return request.then(response => response.data)
}

const beerService = { create, getAll, deleteBeer, updateBeer, createBeer };

export default beerService;